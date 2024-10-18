import { Component, OnInit } from '@angular/core';
import { SessionData } from '../consultancy-models/data.session';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent {
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private router:Router) { }
  breadscrums = [
    {
      title: 'Sessions',
      items: ['Consultancy'],
      active: 'Sessions',
    },
  ];
  sessions: Observable<SessionData[]>;
  defaultData = { ...this.consultancyService.defaultRenderData() };
  consultancyId = localStorage.getItem("id");
  instituteSelected: boolean = false;
  instituteListForm: FormGroup;
  institutes: Observable<SpecificConsultancyRelated[]>;
  institute$: BehaviorSubject<null | number> = new BehaviorSubject<null | number>(null);
  program$: BehaviorSubject<string|number> = new BehaviorSubject('');
  subscription: Subscription = new Subscription();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize: number, pageIndex: number }> = new BehaviorSubject<{ pageSize: number, pageIndex: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  sorting$: BehaviorSubject<{field:string,direction:string}>= new BehaviorSubject<{field:string,direction:string}>({field:this.defaultData.OrderBy,direction:this.defaultData.sortExpression});
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  currentPageIndex:number;
  instituteList = new FormControl();
  programList = new FormControl();
  search$ = new BehaviorSubject<boolean>(false);
  programs:Observable<SpecificConsultancyRelated[]>;
  previousInstituteId:number = 0;
  previousProgramId:number = 0;




  // get sessions
  getSessions(data: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getSession(data).pipe(map(response => {
      this.records = response['pageInfo']['totalRecords'];
      return response['data']
    }))
  }


  ngOnInit() {
    // get institutes
    if(!this.instituteSelected){
      this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId).pipe(tap(res=>{
        this.institute$.next(res[0].id)
        this.instituteList.setValue(res[0].id)
        this.search$.next(true)
      }))
    }

     // check if user is navigating from the edit form
     this.consultancyService.showList.subscribe(state=>{
      this.instituteSelected = state;
    })

      // check if user is on edit or view page (render back to list)
      if(this.instituteSelected){
        const instituteId = localStorage.getItem("instituteId");
        this.institute$.next(+instituteId);
        this.defaultData.InstituteId = instituteId;
        this.sessions = this.getSessions(this.defaultData);
      }

    this.subscription.add(combineLatest([this.institute$, this.searchTerm$, this.pagination$, this.sorting$, this.search$, this.program$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([instituteId, searchTerm, pageRelated, sort, search, programId]) => {
        if(instituteId && this.previousInstituteId !== instituteId){
          console.log("institute")
          this.previousInstituteId = instituteId
          this.defaultData.InstituteId = String(instituteId)
          this.programs = this.consultancyApiService.getAllPrograms(this.defaultData)
        }
        if(programId && this.previousProgramId !== programId){
          console.log("program")
          this.previousProgramId = +programId;
          this.defaultData.ProgramId = String(programId)
        }
        if (search || searchTerm) {
          console.log(search)
          this.defaultData.InstituteId = String(instituteId);
          this.defaultData.ProgramId = String(programId);
          this.defaultData.searchText = searchTerm;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.currentPage = pageRelated.pageIndex;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field;
          console.log(this.defaultData)
          return this.sessions = this.getSessions(this.defaultData)
        } else {
          return of([])
        }
      })).subscribe(res => {
        console.log(res)
        if (res.length) {
          this.instituteSelected = true
        }
      }))
  }

  onInstituteChange(event: any) {
    this.search$.next(false);
    this.institute$.next(event.value)
    localStorage.setItem("instituteId",event.value)
  }

  onProgramChange(event:any){
    this.search$.next(false);
    this.program$.next(event.value)
  }

  onSearch(){
    this.search$.next(true)
  }

  onDeleteSession(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
      this.subscription.add(this.consultancyApiService.deleteSession(id).subscribe(res => {
        this.sessions = this.getSessions(this.defaultData)
      }));
    }
  }

  // page event
  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex
    this.pagination$.next({pageSize:event.pageSize,pageIndex:event.pageIndex+1})
  }

   // sort event
   onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
        this.sorting$.next({field:field,direction:direction})
    }

  addSession() { 
    this.router.navigate(["consultancy/register-session"])
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false);
    this.subscription.unsubscribe()
  }
}
