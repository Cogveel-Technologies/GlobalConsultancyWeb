import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyData } from '../consultancy-models/data.consultancy';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent implements OnInit {
  breadscrums = [
    {
      title: 'Consultancy List',
      items: ['Consultancy'],
      active: 'Consultancy List',
    },
  ];

  constructor(
    private router: Router,
    private consultancyService: ConsultancyService,
    private consultancyApiService: ConsultancyApi,
    private toastr: ToastrService
  ) { }

  editMode: boolean;
  consultancies!: Observable<ConsultancyData[]>;
  defaultData: ConsultancyDetailsOptions =  { ...this.consultancyService.defaultRenderData() };
  length:number;
  pageSize:number;
  currentPage:number;
  search = new BehaviorSubject<string>(this.defaultData.searchText);
  private subscriptions: Subscription = new Subscription();

  



  updateDOM(params: ConsultancyDetailsOptions) {
    return this.consultancies = this.consultancyApiService.getConsultancy(this.pageSize,this.currentPage,params).pipe(tap(res=>{
      this.length = res['pageInfo']['totalRecords'];
    }), map(res=>res['data']));
  }

  ngOnInit() {

    // Retrieve consultancy data
    this.updateDOM(this.defaultData);

    // Subscribe to search text changes
    this.subscriptions.add(combineLatest([ this.search.pipe(debounceTime(700),distinctUntilChanged())]).pipe(switchMap(([search]) => {
      // this.defaultData.limit = pagination.pageSize;
      // this.defaultData.CurrentPage = pagination.pageIndex + 1;
      this.defaultData.searchText = search
      return this.updateDOM(this.defaultData);
    })).subscribe())
  }



  addConsultancy() {
    this.router.navigate(['consultancy/register-consultancy']);
  }

  deleteConsultancy(id: number) {
    const con = confirm("Are you sure?");
    if (con) {
      this.consultancyApiService.deleteConsultancy(id).subscribe(res => {
        this.toastr.success("Deleted Successfully")
        this.updateDOM(this.defaultData);
      });
    }
  }

  onSortChange(sortEvent: Sort) {
    if (sortEvent.direction === '') {
      sortEvent.direction = 'asc'
    }
    // this.features.get("sort").setValue(sortEvent.direction)
  }
 

  receiveSearchText(val: string) {
    this.search.next(val)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
