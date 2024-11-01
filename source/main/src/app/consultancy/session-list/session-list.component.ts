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
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private router: Router) { }
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
  institutes: Observable<SpecificConsultancyRelated[]>;
  institute$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  program$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  subscription: Subscription = new Subscription();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize: number, pageIndex: number }> = new BehaviorSubject<{ pageSize: number, pageIndex: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression })
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  currentPageIndex: number;
  instituteList = new FormControl(0);
  programList = new FormControl(0);
  search$ = new BehaviorSubject<boolean>(false);
  programs: Observable<SpecificConsultancyRelated[]>;
  previousInstituteId: number = 0;
  previousProgramId: number = 0;
  sessionFromProgram: number = 0;





  // get sessions
  getSessions(data: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getSession(data).pipe(map(response => {
      console.log(response)
      this.records = response['pageInfo']['totalRecords'];
      return response['data']
    }))
  }


  ngOnInit() {
    this.institutes = this.consultancyApiService.getSpecificInstitutes();
    // get sessions from program details
    this.subscription.add(this.consultancyService.sendProgramId.subscribe(res => {
      if (res) {
        console.log(res)
        this.sessionFromProgram = +res.programId
        this.institute$.next(res.instituteId)
        this.instituteList.setValue(+res.instituteId);
        this.program$.next(this.sessionFromProgram)
        this.search$.next(true)
      }
    }));

    // get institutes
    if (!this.sessionFromProgram) {
      console.log("entered")
      console.log(this.defaultData)
      this.sessions = this.getSessions(this.defaultData)
      this.institute$.next(0)
      this.search$.next(true)
    }

    // check if user is navigating from the edit form
    this.consultancyService.showList.subscribe(state => {
      this.instituteSelected = state;
    })

    // check if user is on edit or view page (render back to list)
    // if (this.instituteSelected) {
    //   const instituteId = localStorage.getItem("instituteId");
    //   this.institute$.next(+instituteId);
    //   this.defaultData.InstituteId = instituteId;
    //   this.sessions = this.getSessions(this.defaultData);
    // }

    this.subscription.add(combineLatest([this.institute$, this.program$, this.searchTerm$, this.pagination$, this.sorting$, this.search$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([instituteId, programId, searchTerm, pageRelated, sort, search]) => {
        console.log(instituteId);
        if ((instituteId || instituteId === 0) && this.previousInstituteId !== instituteId) {
          console.log("institute")
          this.previousInstituteId = +instituteId
          console.log(instituteId)
          if (instituteId) {
            this.defaultData.InstituteId = String(instituteId);
          } else {
            this.defaultData.InstituteId = '';
          }
          this.defaultData.ProgramId = '';
          this.programs = of([]);
          this.programList.setValue(0);
          this.programs = this.consultancyApiService.getAllPrograms(this.defaultData)
        }

        if (programId && this.previousProgramId !== programId) {
          console.log("program")
          console.log(programId)
          this.programList.setValue(+programId)
          this.previousProgramId = +programId;
          this.defaultData.InstituteId = '';
          this.defaultData.ProgramId = String(programId)
        }

        if (search) {
          console.log(this.defaultData)
          this.defaultData.searchText = searchTerm;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.currentPage = pageRelated.pageIndex;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field;
          return this.sessions = this.getSessions(this.defaultData)
        } else {
          return of([])
        }
      })).subscribe())
  }

  onInstituteChange(value: any) {
    this.search$.next(false);
    console.log(value)
    this.institute$.next(value)
  }

  onProgramChange(event: any) {
    this.search$.next(false);
    this.program$.next(event.value)
  }

  onSearch() {
    this.currentPageIndex = 0;
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1 })
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
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 })
  }

  // sort event
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
    this.sorting$.next({ field: field, direction: direction })
  }

  addSession() {
    this.router.navigate(["consultancy/register-session"])
  }

  onIntakes(sessionId: number, instituteId: number, programId:number) {
    console.log(programId)
    this.consultancyService.getIntakesofSession.next({ instituteId: instituteId, programId: programId, sessionId: sessionId })
    this.router.navigate(["consultancy/intake-list"])
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false);
    this.consultancyService.sendProgramId.next({ programId: '', instituteId: '' })
    this.subscription.unsubscribe()
  }
}
