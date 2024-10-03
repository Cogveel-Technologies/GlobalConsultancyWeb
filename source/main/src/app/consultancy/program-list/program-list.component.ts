import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramData } from '../consultancy-models/data.program';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith, Subscription, switchMap, tap } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { PageEvent } from '@angular/material/paginator';
import { distinctUntilChanged } from 'rxjs';



@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {

  breadscrums = [
    {
      title: 'Program List',
      items: ['Consultancy'],
      active: 'Program List',
    },
  ];

  constructor(private router: Router, private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService) { }
  editMode: boolean;
  programs!: Observable<ProgramData[]>;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  consultancyId: string = localStorage.getItem("id");
  selectedOptions: boolean = false;
  institutes: Observable<SpecificConsultancyRelated[] | null>;
  sessions: Observable<SpecificConsultancyRelated[] | null>;
  intakes: Observable<SpecificConsultancyRelated[] | null>;
  instituteForm: FormGroup;
  institute$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  session$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  intake$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  subscription: Subscription = new Subscription();
  courseStatus: boolean[] = [true, false];
  isPublic$: BehaviorSubject<boolean | null> = new BehaviorSubject(null)
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize: number, pageIndex: number }> = new BehaviorSubject<{ pageSize: number, pageIndex: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  sorting$: BehaviorSubject<{field:string,direction:string}>= new BehaviorSubject<{field:string,direction:string}>({field:this.defaultData.OrderBy,direction:this.defaultData.sortExpression});
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  previousSessionState: (number | null) = null;
  previousIntakeState: (number | null) = null;
  previousInstituteState: (number | null) = null;
  sessionFormControl = new FormControl(); 
  intakeFormControl = new FormControl();



  getPrograms(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getPrograms(params).pipe
      (map(res => {
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }), tap(res=>{
        if(!res.length && params.searchText === ''){
          this.router.navigate(["consultancy/no-data-found"])
        }
      }))
  }

  ngOnInit() {
    if(!this.selectedOptions){
      this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId);
    }

    this.subscription.add(this.consultancyService.showList.subscribe(state=>{
      this.selectedOptions = state;
    }));

    // if we click on view or edit pencil, and then navigate back
    if(this.selectedOptions){
      console.log("hello")
      const instituteId = localStorage.getItem("instituteId")
      const sessionId =  localStorage.getItem("sessionId")
      const intakeId = localStorage.getItem("intakeId")
      const isPublic = JSON.parse(localStorage.getItem("isPublic"))
      this.institute$.next(+instituteId)
      this.intake$.next(+intakeId)
      this.isPublic$.next(isPublic)
      this.defaultData.InstituteId = instituteId
      this.defaultData.SessionId = sessionId
      this.defaultData.IntakeId = intakeId
      this.defaultData.IsPublic = localStorage.getItem("isPublic")
      this.programs = this.getPrograms(this.defaultData)
    }


this.subscription.add(
  combineLatest([
    this.institute$.pipe(distinctUntilChanged()),  
    this.session$.pipe(distinctUntilChanged()),    
    this.intake$.pipe(distinctUntilChanged()),    
    this.isPublic$.pipe(distinctUntilChanged()), 
    this.searchTerm$,
    this.pagination$,
    this.sorting$
  ])
  .pipe(
    switchMap(([instituteId, sessionId, intakeId, isPublic, search, pageRelated, sorting]) => {
      console.log(instituteId)
      console.log(sessionId)
      console.log(intakeId)

      console.log(this.previousSessionState)
      
      // When the institute changes (or is reselected), reset session and intake
      if (instituteId && instituteId !== this.previousInstituteState) {

        // Store the last selected institute
        this.previousInstituteState = instituteId;

        // Reset session form control and BehaviorSubject to ensure no default value
        this.sessionFormControl.reset(); 
        this.intakeFormControl.reset();
        this.session$.next(null);  
        this.intake$.next(null);
        this.sessions = null;
        this.intakes = null

        // Make API call for sessions based on the selected institute
        this.defaultData.InstituteId = String(instituteId);
        this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData).pipe(
          tap(() => {
            // After getting the new sessions, clear the session selection to avoid default
            this.sessionFormControl.reset();
            this.session$.next(null);
          })
        );
        
        return of([]);  // Return empty observable
      }

      // When institute and session are selected, but intake is not
      if (instituteId && sessionId && !intakeId) {
        console.log("hello")
        if (sessionId !== this.previousSessionState) {
          console.log("hello2222")
          this.previousSessionState = sessionId;
          this.defaultData.SessionId = String(sessionId);

          // Make API call for intakes based on session
          this.intakes = this.consultancyApiService.getSpecificIntakes(this.defaultData);
          return of([]);
        }else{
           // Make API call for intakes based on session
           this.intakes = this.consultancyApiService.getSpecificIntakes(this.defaultData);
           return of([]);
        }
      }

      if (instituteId && sessionId && intakeId) {
        console.log("helllooooo")
        if (sessionId !== this.previousSessionState) {
          this.intake$.next(null)
          this.previousSessionState = sessionId;
        }
      }

      // Handle rest of the selections (intake and isPublic)
      if (instituteId && intakeId && isPublic !== null) {
        this.defaultData.IntakeId = String(intakeId);
        this.defaultData.searchText = search;
        this.defaultData.pageSize = pageRelated.pageSize;
        this.defaultData.currentPage = pageRelated.pageIndex;
        this.defaultData.sortExpression = sorting.direction;
        this.defaultData.OrderBy = sorting.field;
        this.defaultData.IsPublic = String(isPublic);

        // Fetch programs based on all selections
        return this.programs = this.getPrograms(this.defaultData);
      }

      // Default case: return an empty observable
      return of([]);
    })
  ).subscribe((res) => {
    if (res.length) {
      this.selectedOptions = true;
    }
  })
);


  }

  onInstituteChange(event: any) {
    this.institute$.next(event.value)
    localStorage.setItem("instituteId",event.value)
  }
  onSessionChange(event: any) {
    this.session$.next(event.value)
    localStorage.setItem("sessionId",event.value)
  }
  onIntakeChange(event: any) {
    this.intake$.next(event.value)
    console.log("hello")
    localStorage.setItem("intakeId",event.value)
  }

  isPublic(event: any) {
    this.isPublic$.next(event.value)
    localStorage.setItem("isPublic",event.value)
  }

  addProgram() {
    this.router.navigate(['consultancy/register-program'])
  }

  // page event
  onPageChange(event: PageEvent) {
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 })
  }



     // sort event
     onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
      this.sorting$.next({field:field,direction:direction})
    }



  deleteProgram(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
      this.subscription.add(this.consultancyApiService.deleteProgram(id).subscribe(() => {
        this.programs = this.getPrograms(this.defaultData);
      }));
    }
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false)
    this.subscription.unsubscribe();
  }

}
