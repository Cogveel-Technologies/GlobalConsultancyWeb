import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramData } from '../consultancy-models/data.program';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
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
      title: 'Programs',
      items: ['Consultancy'],
      active: 'Programs',
    },
  ];

  constructor(private router: Router, private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService) { }
  editMode: boolean;
  programs!: Observable<ProgramData[]>;
  programsOnInstitutes: Observable<SpecificConsultancyRelated[]>;
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
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression });
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  previousSessionState: (number | null) = null;
  previousIntakeState: (number | null) = null;
  previousInstituteState: number = 0;
  sessionFormControl = new FormControl();
  intakeFormControl = new FormControl();
  currentPageIndex: number;
  publicOptions: boolean[];
  search$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  instituteControl: FormControl = new FormControl();



  getPrograms(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getPrograms(params).pipe
      (map(res => {
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }))
  }

  ngOnInit() {
    if (!this.selectedOptions) {
      this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId).pipe(tap(res => {
        this.search$.next(true);
        this.institute$.next(res[0]['id']);
        this.instituteControl.setValue(res[0]['id'])
      }));
    }

    this.subscription.add(this.consultancyService.showList.subscribe(state => {
      this.selectedOptions = state;
    }));

    combineLatest([this.institute$, this.search$, this.searchTerm$, this.pagination$, this.sorting$]).pipe( throttleTime(1000, undefined, { leading: true, trailing: true }),
    distinctUntilChanged(),
    switchMap(([instituteId, search, searchTerm, pageRelated, sorting]) => {
      if (instituteId && this.previousInstituteState !== instituteId) {
        console.log(instituteId)
        this.previousInstituteState = instituteId
        this.defaultData.InstituteId = String(instituteId);
        this.publicOptions = [true, false];
      } 
      if (search) {
        console.log(this.defaultData)
        this.defaultData.searchText = searchTerm;
        this.defaultData.pageSize = pageRelated.pageSize;
        this.defaultData.currentPage = pageRelated.pageIndex;
        this.defaultData.sortExpression = sorting.direction;
        this.defaultData.OrderBy = sorting.field;
        return this.programs = this.getPrograms(this.defaultData)
      } 
      return of([])
    })).subscribe(res => console.log(res))

    // if we click on view or edit pencil, and then navigate back
    // if (this.selectedOptions) {
    //   console.log("hello")
    //   const instituteId = localStorage.getItem("instituteId")
    //   const sessionId = localStorage.getItem("sessionId")
    //   const intakeId = localStorage.getItem("intakeId")
    //   const isPublic = JSON.parse(localStorage.getItem("isPublic"))
    //   this.institute$.next(+instituteId)
    //   this.intake$.next(+intakeId)
    //   this.isPublic$.next(isPublic)
    //   this.defaultData.InstituteId = instituteId
    //   this.defaultData.SessionId = sessionId
    //   this.defaultData.IntakeId = intakeId
    //   this.defaultData.IsPublic = localStorage.getItem("isPublic")
    //   this.programs = this.getPrograms(this.defaultData)
    // }
  }

  onInstituteChange(event: any) {
    console.log(event)
    this.institute$.next(event.value)
  }

  isPublic(event: any) {
    console.log(event)
    // this.search$.next(event.value)
  }

  addProgram() {
    this.router.navigate(['consultancy/register-program'])
  }

  // page event
  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 })
    // this.search$.next(true)
  }
  // sort event
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
    this.sorting$.next({ field: field, direction: direction })
    // this.search$.next(true)
  }

  deleteProgram(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
      this.subscription.add(this.consultancyApiService.deleteProgram(id).subscribe(() => {
        this.programs = this.getPrograms(this.defaultData);
      }));
    }
  }

  // onSearchData() {
  //   this.search$.next(true)
  // }

  ngOnDestroy() {
    this.consultancyService.showList.next(false)
    this.subscription.unsubscribe();
  }

}
