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
  sessionListForm: FormGroup;
  sessions: Observable<{ id: number, sessionName: string }[]>|any;
  institutes: Observable<SpecificConsultancyRelated[]> |any;
  programs: Observable<SpecificConsultancyRelated[]>|any;
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
  intakesFromSession: boolean|number = true;
  isProgramId: boolean = true;
  roleName:string = localStorage.getItem("roleName");
  instituteName:string;
  programName:string;
  sessionName:string;
  intakeEditState:boolean
  instituteIdFromPrograms:number





  getIntakes(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getIntakes(params).pipe
      (map(res => {
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }))
  }

  // get all data
  ngOnInit() {
    this.consultancyService.activeRoute.next(this.router.url)
    
    this.sessionListForm = new FormGroup({
      session: new FormControl()
    })

    this.consultancyService.intakeEditState.subscribe(res => {
      console.log(res)
      this.intakeEditState = res
    })

    if(this.intakeEditState){
      this.consultancyService.editIntakeCurrentPageAndPageSize.subscribe(res => {
        console.log(res)
        this.pagination$.next({ pageSize: res.pageSize, pageIndex: res.pageIndex })
        this.search$.next(res.search)
      })
    }

    // intakes from program list
    this.consultancyService.getIntakesOfProgam.subscribe(res => {
      if(res){
        console.log("pppsdfjasdklfjaslfjasklj")
        this.instituteIdFromPrograms = res.instituteId
        this.intakesFromSession = false;
        this.institute$.next(res.instituteId)
        this.instituteName = res.instituteName;
        this.program$.next(res.programId)
        this.programName = res.programName;
        this.consultancyService.intakeProgramState.next(true)
      }
    })

    // intakes from session list
    this.consultancyService.getIntakesofSession.subscribe(res => {
      if (res && res.sessionId) {
        console.log(res)
        console.log("ksdfksttekjttttttt")
        this.intakesFromSession = true
        this.institute$.next(res.instituteId)
        this.instituteName = res.instituteName;
        this.session$.next(res.sessionId)
        this.sessionName = res.sessionName;
        this.consultancyService.intakeSessionState.next(true)
      }
    })

    if(this.roleName !== "superadmin"){
      this.consultancyApiService.getSpecificInstitutes(this.defaultData).pipe(map(res=>{
        res = [{id:0, name:'All'}, ...res]
        return res
      })).subscribe(res=>{
         this.institutes = res
        })
    }else{
      console.log("super adminnnnn")
      this.defaultData.IsAdmin = true;
      this.consultancyApiService.getSpecificInstitutes(this.defaultData).pipe(map(res=>{
        res = [{id:0, name:'All'}, ...res]
        return res
      })).subscribe(res =>{
         this.institutes = res
        })
    }
  



    this.intakes = combineLatest([this.institute$, this.program$, this.session$, this.searchTerm$, this.pagination$, this.sorting$, this.search$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([instituteId, programId, sessionId, searchTerm, pageRelated, sort, search]) => {
        console.log(instituteId)
        console.log(+this.previousInstituteId)
        if ((instituteId || instituteId === 0) && +this.previousInstituteId !== instituteId) {
          console.log("hello")
          if(instituteId !== this.instituteIdFromPrograms){
            this.programName = ''
          }
          this.programs = [];
          this.sessions = [];
          if (instituteId === 0) {
            console.log(this.defaultData)
            this.defaultData.InstituteId = '';
          } else {
            console.log(instituteId, "--------------")
            this.defaultData.InstituteId = ''+instituteId;
            console.log(this.defaultData)
            if(!this.intakesFromSession){
              console.log(this.intakesFromSession)
              this.consultancyApiService.getAllPrograms(this.defaultData).subscribe(res=> this.programs =  res);
            }else{
              console.log("MmMMmMMmmmmMmM")
              this.consultancyApiService.getSpecificSessions(this.defaultData).subscribe(res => this.sessions = res)
            }
          }
          this.previousInstituteId = String(instituteId);
          this.defaultData.ProgramId = '';
          this.defaultData.SessionId = '';
          this.isProgramId = true;
        }
        if (programId && String(this.previousProgramId) !== String(programId) && !this.intakesFromSession) {
          console.log("only program id")
          this.previousProgramId = String(programId)
          this.defaultData.ProgramId = String(programId);
          this.defaultData.SessionId = '';
          this.defaultData.InstituteId = '';
          this.program.setValue(programId)
          this.session.setValue('');
          this.isProgramId = true;
          console.log(this.defaultData)
          this.consultancyApiService.getProgramSessions(this.defaultData).subscribe(res=> {
            console.log(res)
            this.sessions = res
          })
        }
        if (sessionId && this.previousSessionId !== sessionId) {
          console.log("only session id")
          this.previousSessionId = Number(sessionId);
          // this.defaultData.InstituteId = '';
          this.defaultData.ProgramId = '';
          this.defaultData.SessionId = String(sessionId)
          this.session.setValue(sessionId)
          console.log(this.defaultData)
        }
        if (search) {
          if(searchTerm){
            this.defaultData.currentPage = 1;
            this.currentPageIndex = 0;
          }else{
            this.defaultData.currentPage = pageRelated.pageIndex;
            this.currentPageIndex = pageRelated.pageIndex - 1;
          }
          this.defaultData.searchText = searchTerm;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field;
          console.log(this.defaultData)
          return this.getIntakes(this.defaultData);
        } else {
          return of()
        }
      }))
  }

  onSessionChange(event: any) {
    this.search$.next(false)
    this.session$.next(event)
    localStorage.setItem("sessionId", event)
  }

  onProgramChange(event: any) {
    this.search$.next(false)
    this.program$.next(event)
    console.log(event)
  }

  onInstituteSelected(event: any) {
    console.log(event)
    this.search$.next(false)
    this.institute$.next(event)
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
        this.pagination$.next({ pageSize:this.defaultData.pageSize, pageIndex: this.defaultData.currentPage })
      }));
    }
  }

  onSearch() {
    this.currentPageIndex = 0;
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1 })
    this.search$.next(true)
  }

  onEditorViewIntake(){
    this.consultancyService.editIntakeCurrentPageAndPageSize.next({ pageIndex: this.defaultData.currentPage, pageSize: this.defaultData.pageSize, search: true })
  }
  

  ngOnDestroy() {
    this.intakesFromSession = true
    this.consultancyService.showList.next(false);
    this.consultancyService.getIntakesOfProgam.next(null)
    this.consultancyService.getIntakesofSession.next(null)
    this.consultancyService.intakeEditState.next(false)
    this.subscription.unsubscribe()
  }
}
