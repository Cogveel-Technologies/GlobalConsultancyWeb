import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramData } from '../consultancy-models/data.program';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import {  FormControl, FormGroup } from '@angular/forms';
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

  constructor(private router: Router, private consultancyApiService: ConsultancyApi, private consultancyService: ConsultancyService, private toastr: ToastrService) { }
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
  subscription:Subscription = new Subscription();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize: number, pageIndex: number }> = new BehaviorSubject<{ pageSize: number, pageIndex: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  sorting$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultData.sortExpression);
  courseStatus:boolean[]= [true,false];


getPrograms(params:ConsultancyDetailsOptions){
  return this.consultancyApiService.getPrograms(params).pipe
  (map(res => {
    this.records = res['pageInfo']['totalRecords'];
    return res['data']
  }))
}

  ngOnInit() {
    this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId);

    this.subscription.add(combineLatest([this.institute$, this.session$, this.intake$, this.searchTerm$, this.pagination$, this.sorting$]).pipe(switchMap(([instituteId, sessionId, intakeId, search, pageRelated,sorting]) => {
      if (instituteId && !sessionId) {
        console.log("institute")
        this.defaultData.InstituteId = String(instituteId);
         this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData);
         return of([])
      } else if (sessionId && !intakeId) {
        console.log("session")
        this.defaultData.SessionId = String(sessionId);
         this.intakes = this.consultancyApiService.getSpecificIntakes(this.defaultData);
         this.session$.next(null)
         return of([])
      } else if (intakeId) {
        console.log("intake")
        this.defaultData.IntakeId = String(intakeId);
        this.defaultData.searchText = search
        this.defaultData.pageSize = pageRelated.pageSize
        this.defaultData.currentPage = pageRelated.pageIndex
        this.defaultData.sortExpression = sorting
         return this.programs = this.getPrograms(this.defaultData);
      } else {
        return of([])
      }
    })).subscribe((res) => {
      if(res.length){
        this.selectedOptions = true;
      }
    }))
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
    if(con){
      this.subscription.add(this.consultancyApiService.deleteProgram(id).subscribe(()=>{
        this.programs = this.getPrograms(this.defaultData);
      }));
    }
  }
 
}
