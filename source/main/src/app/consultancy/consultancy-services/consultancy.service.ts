import { Injectable } from "@angular/core";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { ConsultancyDetailsOptions } from "../consultancy-models/data.consultancy-get-options";
import { BehaviorSubject, startWith } from "rxjs";
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';
import { FormControl } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";


@Injectable({
  providedIn: "root"
})

export class ConsultancyService {
  constructor() { }
  data: ConsultancyData[];
  selectedCountryName: BehaviorSubject<string> = new BehaviorSubject<string>('') 
  pageSize:number = PAGE_SIZE_OPTIONS[0]

  defaultRenderData(): ConsultancyDetailsOptions {
    const defaultData = {
      OrderBy: 'id',
      sortExpression: 'asc',
      pageSize: this.pageSize,
      currentPage:1,
      totalElements:0,
      searchText:'',
      InstituteId:'',
      ProgramId:'',
      SessionId:'',
      ConsultancyId:'',
      CountryId:'',
      IntakeId:'',
      IsPublic:'',
    }
    return defaultData
  }

  defaultData:ConsultancyDetailsOptions = {...this.defaultRenderData()};


  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{pageSize:number,pageIndex:number}> = new BehaviorSubject<{pageSize:number,pageIndex:number}>({pageSize:this.defaultData.pageSize, pageIndex:this.defaultData.currentPage});
  sorting$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultData.sortExpression);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);


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
}