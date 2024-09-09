import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, of, startWith, Subscription, switchMap, throttleTime } from 'rxjs';
import { IntakeData } from '../consultancy-models/data.intake';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-intakes-list',
  templateUrl: './intakes-list.component.html',
  styleUrls: ['./intakes-list.component.scss']
})
export class IntakesListComponent {
  breadscrums = [
    {
      title: 'Intake List',
      items: ['Consultancy'],
      active: 'Intake List',
    },
  ];
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService) { }
  intakes!: Observable<IntakeData[]>
  intakeSelected: boolean = false;
  consultancyId: string = localStorage.getItem("id");
  sessionListForm: FormGroup;
  sessions: Observable<SpecificConsultancyRelated[]>
  session$: BehaviorSubject<null | number> = new BehaviorSubject<null | number>(null);
  subscription: Subscription = new Subscription();
  defaultData:ConsultancyDetailsOptions = this.consultancyService.defaultRenderData();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{pageSize:number,pageIndex:number}> = new BehaviorSubject<{pageSize:number,pageIndex:number}>({pageSize:this.defaultData.pageSize, pageIndex:this.defaultData.currentPage});
  sorting$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultData.sortExpression);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  
  

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

    this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData)

  
    this.subscription.add(combineLatest([this.session$, this.searchTerm$, this.pagination$, this.sorting$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([sessionId, search, pageRelated, sort]) => {
        if (sessionId) {
          this.defaultData.IntakeId = String(sessionId);
          this.defaultData.searchText = search;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.currentPage = pageRelated.pageIndex;
          this.defaultData.sortExpression = sort;
          return this.intakes = this.getIntakes(this.defaultData);
        } else {
          return of([])
        }
      })).subscribe(res => {
        if (res.length) {
          this.intakeSelected = true
        }
      }))
  }

  onSessionChange(event: any) {
    this.session$.next(event.value)
  }

    // page event
    onPageChange(event: PageEvent) {
      console.log(event)
      this.pagination$.next({pageSize:event.pageSize,pageIndex:event.pageIndex+1})
    }
  
     // sort event
     onSortChange(event: any) {
      if (event.direction === '') {
        event.direction = 'asc'
      }
      this.sorting$.next(event.direction)
    }

  addProgram() { }

  deleteIntake(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
     this.subscription.add(this.consultancyApiService.deleteIntake(id).subscribe(res => {
        this.intakes = this.getIntakes(this.defaultData);
      }));
    }
  }

  onDestroy() {
    this.subscription.unsubscribe()
  }
}
