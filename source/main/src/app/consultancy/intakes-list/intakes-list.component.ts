import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
import { IntakeData } from '../consultancy-models/data.intake';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intakes-list',
  templateUrl: './intakes-list.component.html',
  styleUrls: ['./intakes-list.component.scss']
})
export class IntakesListComponent {
  breadscrums = [
    {
      title: 'Intakes',
      items: ['Consultancy'],
      active: 'Intakes',
    },
  ];
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private router:Router) { }
  intakes!: Observable<IntakeData[]>
  sessionSelected: boolean = false;
  consultancyId: string = localStorage.getItem("id");
  sessionListForm: FormGroup;
  sessions: Observable<{id:number,sessionName:string}[]>
  institutes: Observable<SpecificConsultancyRelated[]>
  programs: Observable<SpecificConsultancyRelated[]>
  program$: BehaviorSubject <string|number> = new BehaviorSubject<string|number>('')
  institute$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  session$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  subscription: Subscription = new Subscription();
  defaultData:ConsultancyDetailsOptions = this.consultancyService.defaultRenderData();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{pageSize:number,pageIndex:number}> = new BehaviorSubject<{pageSize:number,pageIndex:number}>({pageSize:this.defaultData.pageSize, pageIndex:this.defaultData.currentPage});
  sorting$: BehaviorSubject<{field:string,direction:string}>= new BehaviorSubject<{field:string,direction:string}>({field:this.defaultData.OrderBy,direction:this.defaultData.sortExpression});
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  currentPageIndex:number;
  institute = new FormControl();
  program = new FormControl();
  session = new FormControl();
  search$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  previousInstituteId:number = 0;
  previousProgramId:number = 0;
  previousSessionId:number = 0;
  
  

  getIntakes(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getIntakes(params).pipe
      (map(res => {
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }))
  }

  // get all data
  ngOnInit() {
    this.sessionListForm = new FormGroup({
      session: new FormControl()
    })

      // check if user is navigating from the edit form
      this.consultancyService.showList.subscribe(state=>{
        console.log(state)
        this.sessionSelected = state;
      })

    // check if user is on edit or view page (render back to list)
    // if(this.sessionSelected){
    //   const sessionId = localStorage.getItem("sessionId");
    //   this.session$.next(+sessionId);
    //   this.defaultData.SessionId = sessionId;
    //   this.intakes = this.getIntakes(this.defaultData);
    // }
    // this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData)
    this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId).pipe(tap(res=>{
      this.defaultData.ConsultancyId = this.consultancyId
      this.institute$.next(res[0]['id']);
      this.institute.setValue(res[0]['id']);
      this.search$.next(true)
    }))
   
  
    this.subscription.add(combineLatest([this.institute$, this.program$,this.session$, this.searchTerm$, this.pagination$, this.sorting$, this.search$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([instituteId,programId,sessionId,searchTerm, pageRelated, sort,search]) => {
        if(instituteId && this.previousInstituteId !== instituteId && !programId){
          console.log("only institute id")
          this.previousInstituteId = +instituteId;
          this.defaultData.InstituteId = String(instituteId);
          this.programs = this.consultancyApiService.getAllPrograms(this.defaultData);
        }
        if(programId && this.previousProgramId !== programId){
          console.log("only program id")
          this.previousProgramId = Number(programId)
          this.defaultData.ProgramId = String(programId);
          this.sessions = this.consultancyApiService.getProgramSessions(this.defaultData)
        }
        if(sessionId && this.previousSessionId !== sessionId){
          this.previousSessionId = Number(sessionId);
          this.defaultData.SessionId = String(sessionId)
        }
        if (search) {
          console.log("search")
          this.defaultData.InstituteId = String(instituteId);
          this.defaultData.SessionId = String(sessionId);
          this.defaultData.ProgramId = String(programId);
          console.log(this.defaultData)
          this.defaultData.searchText = searchTerm;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.currentPage = pageRelated.pageIndex;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field;
          return this.intakes = this.getIntakes(this.defaultData);
        } else {
          return of([])
        }
      })).subscribe(res => {

      }))
  }

  onSessionChange(event: any) {
    this.search$.next(false)
    this.session$.next(event.value)
    localStorage.setItem("sessionId", event.value)
  }

  onProgramChange(event:any){
    this.search$.next(false)
    this.program$.next(event.value)
    console.log(event.value)
  }

  onInstituteChange(event:any){
    this.search$.next(false)
    this.institute$.next(event.value)
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

  addIntake() { 
    this.router.navigate(['/consultancy/register-intake'])
  }

  deleteIntake(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
     this.subscription.add(this.consultancyApiService.deleteIntake(id).subscribe(res => {
        this.intakes = this.getIntakes(this.defaultData);
      }));
    }
  }

  onSearch(){
    this.search$.next(true)
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false);
    this.subscription.unsubscribe()
  }
}
