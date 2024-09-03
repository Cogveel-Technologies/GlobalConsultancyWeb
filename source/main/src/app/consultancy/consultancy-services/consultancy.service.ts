import { Injectable } from "@angular/core";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { ConsultancyDetailsOptions } from "../consultancy-models/data.consultancy-get-options";
import { BehaviorSubject } from "rxjs";
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';


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
      IntakeId:''
    }
    return defaultData
  }
}