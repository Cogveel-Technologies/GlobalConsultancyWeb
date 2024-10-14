import { Injectable } from "@angular/core";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { ConsultancyDetailsOptions } from "../consultancy-models/data.consultancy-get-options";
import { BehaviorSubject, startWith } from "rxjs";
import { PAGE_SIZE_OPTIONS } from '@shared/components/pagination/pagination.component';




@Injectable({
  providedIn: "root"
})

export class ConsultancyService {
  constructor() { }
  data: ConsultancyData[];
  selectedCountryName: BehaviorSubject<string> = new BehaviorSubject<string>('') 
  pageSize:number = PAGE_SIZE_OPTIONS[0]
  showList:BehaviorSubject<null | boolean> = new BehaviorSubject(null);

  defaultRenderData(): ConsultancyDetailsOptions {
    const defaultData = {
      OrderBy: 'id',
      sortExpression: 'asc',
      pageSize: this.pageSize,
      currentPage:1,
      totalElements:'',
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
  
  countrySelected: BehaviorSubject<number|null> = new BehaviorSubject(null); 
  editOrViewPage:BehaviorSubject<boolean> = new BehaviorSubject(false);
  sendSessionId:BehaviorSubject<number|null> = new BehaviorSubject(null);
}