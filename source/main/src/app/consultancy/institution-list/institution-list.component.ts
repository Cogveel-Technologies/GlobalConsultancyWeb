import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, startWith, Subscription, switchMap, tap } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})

export class InstitutionListComponent {
 
  breadscrums = [
    {
      title: 'Institution List',
      items: ['Consultancy'],
      active: 'Institution List',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private consultancyService:ConsultancyService,private consultancyApiService:ConsultancyApi, private toastr:ToastrService) { }
  editMode: boolean
  institutes: any;
  defaultData:ConsultancyDetailsOptions;
  features:FormGroup;
  totalItems:number = 10;
  private subscriptions: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentPage: number = 1;
  paginationOptions: number[] = [5, 10, 25, 100];
  pageSize: number = this.paginationOptions[0];
  
  getInstitutes(pageSize:number,currentPage:number, params:ConsultancyDetailsOptions){
     this.institutes = this.consultancyApiService.getInstitutes(pageSize,currentPage,params)
  }
  ngOnInit() {
    this.defaultData = {...this.consultancyService.defaultRenderData()};
    this.getInstitutes(this.pageSize, this.currentPage, this.defaultData)


    this.features = new FormGroup({
      searchText: new FormControl(this.defaultData.searchText),
      sort: new FormControl(this.defaultData.sortExpression),
    })


    const search$ = this.features.get('searchText').valueChanges.pipe(startWith(this.features.get('searchText').value),debounceTime(1000), distinctUntilChanged());
;
    const sort$ = this.features.get('sort').valueChanges.pipe(startWith(this.features.get("sort").value));


  }

  addInstitute() {
    this.router.navigate(['consultancy/register-consultancy'])
  }

  deleteInstitute(id:number){
    const con =  confirm("Are you sure?")
    if(con){
      this.consultancyApiService.deleteInstitute(id).subscribe(res=> {
        this.institutes = this.consultancyApiService.getInstitutes(this.pageSize,this.currentPage,this.defaultData)
      });
    }
  }

  refreshPage() {
    console.log("Refresh button clicked");
    // Add your refresh logic here
  }

  onPageChange($event:PageEvent){
    console.log($event)
    this.features.get('currentPage').setValue($event.pageIndex+1)
    this.features.get("pageSize").setValue($event.pageSize)
  }

  onSortChange(sortEvent:Sort){
    if(sortEvent.direction === ''){
      sortEvent.direction = 'asc'
    }
    this.features.get("sort").setValue(sortEvent.direction)
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

}