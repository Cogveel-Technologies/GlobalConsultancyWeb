import { Component, OnInit } from '@angular/core';
import { SessionData } from '../consultancy-models/data.session';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'app/admin/admin.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent {
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private router: Router, private adminService: AdminService) { }
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
  institutes: Observable<SpecificConsultancyRelated[]> | any;
  institute$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  program$: BehaviorSubject<string | number> = new BehaviorSubject<string | number>('');
  subscription: Subscription = new Subscription();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize?: number, pageIndex?: number, search?: boolean }> = new BehaviorSubject<{ pageSize: number, pageIndex: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression })
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  currentPageIndex: number;
  instituteList = new FormControl(0);
  programList = new FormControl(0);
  consultancyList = new FormControl(0);
  search$ = new BehaviorSubject<boolean>(false);
  programs: Observable<SpecificConsultancyRelated[]> | any;
  previousInstituteId: string | number = '';
  previousProgramId: number = 0;
  sessionFromProgram: number = 0;
  roleName: string = localStorage.getItem("roleName")
  consultancies: Observable<[{ id: number, consultancyName: string }]>;
  instituteId: number
  instituteName: string
  programName: string
  sessionEditState: boolean;
  sessionsOfInstitute: boolean = false;






  // get sessions
  getSessions(data: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getSession(data).pipe(
      tap(res => {
        if ((!res['data'] || res['data'].length === 0) && data.currentPage > 1) {
          console.log("Condition met: No data and currentPage > 1");
          this.pagination$.next({ pageIndex: this.defaultData.currentPage - 1, pageSize: this.defaultData.pageSize, search: true });
        }
      }),
      filter(res => !((!res['data'] || res['data'].length === 0) && data.currentPage > 1)),
      map(response => {
        console.log(response)
        this.records = response['pageInfo']['totalRecords'];
        return response['data']
      }))
  }


  ngOnInit() {
    // get session of particular institute
    this.consultancyService.getSessionsOfInstitute.subscribe(res => {
      if (res) {
        this.sessionsOfInstitute = true
        this.institute$.next(res.instituteId)
        this.instituteName = res.instituteName
        this.search$.next(true)
        this.consultancyService.instituteSessionState.next(true)
      }
    })


    this.consultancyService.sessionEditState.subscribe(res => {
      console.log(res)
      this.sessionEditState = res
    })


    if (this.sessionEditState) {
      this.consultancyService.editSessionCurrentPageAndPageSize.subscribe(res => {
        console.log(res)
        this.pagination$.next({ pageSize: res.pageSize, pageIndex: res.pageIndex })
        this.search$.next(res.search)
      })
    }
    // if superadmin has logged in
    if (this.roleName === 'superadmin') {
      this.defaultData.IsAdmin = true;
      this.consultancyApiService.getSpecificInstitutes(this.defaultData).pipe(map(res => {
        res = [{ id: 0, name: 'All' }, ...res]
        return res
      })).subscribe(res => this.institutes = res)
    } else {
      this.consultancyApiService.getSpecificInstitutes(this.defaultData).pipe(map(res => {
        res = [{ id: 0, name: 'All' }, ...res]
        return res
      })).subscribe(res => this.institutes = res)
    }


    // get institutes
    if (!this.sessionsOfInstitute) {
      console.log("entered")
      console.log(this.defaultData)
      this.sessions = this.getSessions(this.defaultData)
      this.institute$.next(0)
      this.search$.next(true)
    }


    this.sessions = combineLatest([this.institute$, this.program$, this.searchTerm$, this.pagination$, this.sorting$, this.search$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([instituteId, programId, searchTerm, pageRelated, sort, search]) => {
        console.log(instituteId);
        console.log(this.previousInstituteId)
        if ((instituteId || instituteId === 0) && this.previousInstituteId !== instituteId) {
          console.log("TTTTTTTTTTTTTHHHHHHHHHH")
          console.log(instituteId)
          this.previousInstituteId = instituteId
          if (instituteId) {
            this.defaultData.InstituteId = String(instituteId)
          } else {
            console.log("PPPPPPP")
            this.defaultData.InstituteId = '';
            this.defaultData.ProgramId = '';
            this.programs = []
          }
          console.log(this.defaultData)
        }

        if (search) {
          console.log(this.defaultData)

          if (searchTerm) {
            this.defaultData.currentPage = 1;
            this.currentPageIndex = 0;
          } else {
            this.defaultData.currentPage = pageRelated.pageIndex;
            this.currentPageIndex = pageRelated.pageIndex - 1;
          }

          this.defaultData.searchText = searchTerm;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field;
          console.log(this.defaultData)
          return this.getSessions(this.defaultData)
        } else {
          return of()
        }
      }))
  }

  onProgramChange(event: any) {
    this.search$.next(false);
    this.program$.next(event)
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
        this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage })
      }));
    }
  }

  onInstituteSelected(event: any) {
    this.instituteId = event
    this.search$.next(false);
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

  addSession() {
    this.router.navigate(["consultancy/register-session"])
  }

  onIntakes(sessionId: number, instituteName: string, programName: string, sessionName: string, instituteId: number) {
    this.consultancyService.getIntakesofSession.next({ sessionId, instituteName, programName, sessionName, instituteId })
    this.router.navigate(["consultancy/intake-list"])
  }


  onEditorViewSession() {
    this.consultancyService.editSessionCurrentPageAndPageSize.next({ pageIndex: this.defaultData.currentPage, pageSize: this.defaultData.pageSize, search: true })
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false);
    this.consultancyService.getSessionsOfInstitute.next({instituteId:'',instituteName:''})
    this.consultancyService.sessionEditState.next(false)
    this.subscription.unsubscribe()
  }
}
