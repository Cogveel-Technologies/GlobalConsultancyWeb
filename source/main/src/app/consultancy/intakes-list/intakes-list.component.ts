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
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private router: Router) { }
  intakes!: Observable<IntakeData[]>
  sessionSelected: boolean = false;
  consultancyId: string = localStorage.getItem("id");
  sessionListForm: FormGroup;
  sessions: Observable<{ id: number, sessionName: string }[]>
  institutes: Observable<SpecificConsultancyRelated[]>
  programs: Observable<SpecificConsultancyRelated[]>
  program$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('')
  institute$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  session$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  subscription: Subscription = new Subscription();
  defaultData: ConsultancyDetailsOptions = this.consultancyService.defaultRenderData();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize: number, pageIndex: number }> = new BehaviorSubject<{ pageSize: number, pageIndex: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression });
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  currentPageIndex: number;
  institute = new FormControl(0);
  program = new FormControl();
  session = new FormControl();
  search$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  previousInstituteId: string = '';
  previousProgramId: string = '';
  previousSessionId: number = 0;
  intakesFromSession: boolean = false;
  isProgramId:boolean = false;



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

    // intakes from session list
    this.consultancyService.getIntakesofSession.subscribe(res => {
      if (res) {
        this.intakesFromSession = true
        this.institute$.next(res.instituteId)
        this.institute.setValue(+res.instituteId)
        this.program$.next(res.programId)
        this.session$.next(res.sessionId)
      }
    })

    // check if user is navigating from the edit form
    // this.consultancyService.showList.subscribe(state=>{
    //   console.log(state)
    //   this.sessionSelected = state;
    // })

    // check if user is on edit or view page (render back to list)
    // if(this.sessionSelected){
    //   const sessionId = localStorage.getItem("sessionId");
    //   this.session$.next(+sessionId);
    //   this.defaultData.SessionId = sessionId;
    //   this.intakes = this.getIntakes(this.defaultData);
    // }


    this.institutes = this.consultancyApiService.getSpecificInstitutes()
    this.intakes = this.getIntakes(this.defaultData)



    this.subscription.add(combineLatest([this.institute$, this.program$, this.session$, this.searchTerm$, this.pagination$, this.sorting$, this.search$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([instituteId, programId, sessionId, searchTerm, pageRelated, sort, search]) => {
        console.log(instituteId)
        console.log(this.previousInstituteId)
        if ((instituteId || instituteId === 0) && this.previousInstituteId !== String(instituteId)) {
          console.log("only institute id")
          if(instituteId === 0){
            console.log(this.defaultData)
            this.defaultData.InstituteId = '';
            this.programs = of([])
            this.sessions = of([]);
          }else{
            this.defaultData.InstituteId = String(instituteId);
            this.programs = this.consultancyApiService.getAllPrograms(this.defaultData);
          }
          this.previousInstituteId = String(instituteId);
          this.defaultData.ProgramId = '';
          this.defaultData.SessionId = '';
          this.isProgramId = true;
          this.program.setValue('')
        }
        if (programId && this.previousProgramId !== String(programId)) {
          console.log("only program id")
          this.previousProgramId = String(programId)
          this.defaultData.ProgramId = String(programId);
          this.defaultData.SessionId = '';
          this.defaultData.InstituteId = '';
          this.program.setValue(programId)
          this.session.setValue('');
          this.isProgramId = true;
          console.log(this.defaultData)
          this.sessions = this.consultancyApiService.getProgramSessions(this.defaultData)
        }
        if (sessionId && this.previousSessionId !== sessionId) {
          console.log("only session id")
          this.previousSessionId = Number(sessionId);
          this.defaultData.InstituteId = '';
          this.defaultData.ProgramId = '';
          this.defaultData.SessionId = String(sessionId)
          this.session.setValue(sessionId)
          console.log(this.defaultData)
        }
        if (search) {
          this.defaultData.currentPage = pageRelated.pageIndex
          this.defaultData.searchText = searchTerm;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field;
          return this.intakes = this.getIntakes(this.defaultData);
        } else {
          return of([])
        }
      })).subscribe())
  }

  onSessionChange(event: any) {
    this.search$.next(false)
    this.session$.next(event.value)
    localStorage.setItem("sessionId", event.value)
  }

  onProgramChange(event: any) {
    this.search$.next(false)
    this.program$.next(event.value)
    console.log(event.value)
  }

  onInstituteChange(event: any) {
    console.log(event)
    this.search$.next(false)
    this.institute$.next(event.value)
  }

  // page event
  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 })
  }

  // sort event
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
    this.sorting$.next({ field: field, direction: direction })
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

  onSearch() {
    this.currentPageIndex = 0;
    this.pagination$.next({ pageSize:this.defaultData.pageSize, pageIndex:1})
    this.search$.next(true)
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false);
    this.consultancyService.getIntakesofSession.next({ instituteId: '', programId: '', sessionId: '' })
    this.subscription.unsubscribe()
  }
}
