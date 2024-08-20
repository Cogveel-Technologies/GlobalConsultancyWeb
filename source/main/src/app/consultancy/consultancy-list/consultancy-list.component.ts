import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyData } from '../consultancy-models/data.consultancy';
import {  combineLatest, distinctUntilChanged, map, Observable, startWith, switchMap, tap, throttleTime } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  length: number;
  currentPage: number = 1;
  paginationOptions: number[] = [5, 10, 25, 100];
  pageSize: number = this.paginationOptions[0];
  search = new FormControl();
  searchText$ = this.search.valueChanges.pipe(startWith(''));
  private subscriptions: Subscription = new Subscription();





  getConsultancies(limit: number, currentPage: number, params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getConsultancy(limit, currentPage, params).pipe(tap(res => {
      if(res['data']){
      this.currentPage = res['pageInfo']['currentPage'] + 1;
      }
    }), map(res => res['data']));
  }

  ngOnInit() {

    // Retrieve consultancy data
    this.consultancies = this.getConsultancies(this.pageSize, this.currentPage, this.defaultData);

    // latest values emitted
    this.consultancies = combineLatest([this.searchText$])
    .pipe(
      throttleTime(1000,undefined,{ leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([searchTerm]) => {
        this.defaultData.searchText = searchTerm || '';
        return this.getConsultancies(this.pageSize, this.currentPage, this.defaultData);
      })
    );
  
  }



  addConsultancy() {
    this.router.navigate(['consultancy/register-consultancy']);
  }

  deleteConsultancy(id: number) {
    const con = confirm("Are you sure?");
    if (con) {
      this.consultancyApiService.deleteConsultancy(id).subscribe(res => {
        this.consultancies = this.getConsultancies(this.pageSize, this.currentPage, this.defaultData);
      });
    }
  }

  onSortChange(sortEvent: Sort) {
    if (sortEvent.direction === '') {
      sortEvent.direction = 'asc'
    }
    // this.features.get("sort").setValue(sortEvent.direction)
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
