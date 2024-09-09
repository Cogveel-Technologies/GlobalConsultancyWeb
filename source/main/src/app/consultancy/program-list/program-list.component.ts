import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramData } from '../consultancy-models/data.program';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {

  breadscrums = [
    {
      title: 'Program List',
      items: ['Programs'],
      active: 'Program List',
    },
  ];

  constructor(private router: Router, private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService) { }
  editMode: boolean;
  programs!: Observable<ProgramData[]>;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  consultancyId: string = localStorage.getItem("id");
  selectedOptions: boolean = false;
  institutes: Observable<SpecificConsultancyRelated[]>;
  sessions: Observable<SpecificConsultancyRelated[]>;
  intakes: Observable<SpecificConsultancyRelated[]>;
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
  sorting$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultData.sortExpression);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  previousSessionState: (number | null) = null;
  previousIntakeState: (number | null) = null;
  previousInstituteState: (number | null) = null;


  getPrograms(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getPrograms(params).pipe
      (map(res => {
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }))
  }

  ngOnInit() {
    this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId);


    this.subscription.add(
      combineLatest([this.institute$, this.session$, this.intake$, this.isPublic$, this.searchTerm$, this.pagination$, this.sorting$]).pipe(
        switchMap(([instituteId, sessionId, intakeId, isPublic, search, pageRelated, sorting]) => {

          console.log("institute: " + instituteId);
          console.log("session: " + sessionId);
          console.log("intake: " + intakeId);

          if (instituteId && !sessionId && !intakeId) {
            this.defaultData.InstituteId = String(instituteId);
            // Make API call for sessions based on institute
            this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData);
            return of([]);  // Return empty observable since you're handling the API call separately
          }
          // When institute and session are selected but intake is not
          else if (instituteId && sessionId && !intakeId) {
            this.defaultData.SessionId = String(sessionId);
            // check if user may change institute after selecting a session
            if (instituteId !== this.previousInstituteState) {
              this.previousInstituteState = instituteId;
              this.session$.next(null)
              this.intake$.next(null)
            }
            // Make API call for intakes based on session
            this.intakes = this.consultancyApiService.getSpecificIntakes(this.defaultData);
            return of([]);
          } 
          else if (instituteId && intakeId && isPublic === null) {
            this.defaultData.IntakeId = String(intakeId)
            // check if user may change institute after selecting a session and intake
            if (instituteId !== this.previousInstituteState) {
              this.intake$.next(null)
            }
            return of([]);
          }
          // When all dropdowns are selected and isPublic is not null
          else if (instituteId && intakeId && isPublic !== null) {
            console.log("entered")
            this.defaultData.IntakeId = String(intakeId);
            this.defaultData.searchText = search;
            this.defaultData.pageSize = pageRelated.pageSize;
            this.defaultData.currentPage = pageRelated.pageIndex;
            this.defaultData.sortExpression = sorting;
            this.defaultData.IsPublic = String(isPublic);

            // Fetch programs based on all selections
            return this.programs = this.getPrograms(this.defaultData);
          }
          // Default case: no valid selection yet
          else {
            return of([]);
          }
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
  }
  onSessionChange(event: any) {
    this.session$.next(event.value)
  }
  onIntakeChange(event: any) {
    this.intake$.next(event.value)
  }

  isPublic(event: any) {
    this.isPublic$.next(event.value)
  }

  addProgram() {
    this.router.navigate(['consultancy/register-program'])
  }

  // page event
  onPageChange(event: PageEvent) {
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 })
  }

  // sort event
  onSortChange(event: any) {
    if (event.direction === '') {
      event.direction = 'asc'
    }
    this.sorting$.next(event.direction)
  }


  deleteProgram(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
      this.subscription.add(this.consultancyApiService.deleteProgram(id).subscribe(() => {
        this.programs = this.getPrograms(this.defaultData);
      }));
    }
  }

}
