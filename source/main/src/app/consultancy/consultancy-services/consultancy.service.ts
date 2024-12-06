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
      IsDeleted:false,
      IsAdmin:false,
      roleId:''
    }
    return defaultData
  }
  
  countrySelected: BehaviorSubject<number|null> = new BehaviorSubject(null); 
  editOrViewPage:BehaviorSubject<boolean> = new BehaviorSubject(false);
  sendSessionId:BehaviorSubject<number|null> = new BehaviorSubject(null);
  sendInstituteId: BehaviorSubject<{id:number,instituteName:string,consultancyId:number}|null> = new BehaviorSubject(null);
  sendProgramId: BehaviorSubject<{instituteName?:string,programName?:string,instituteId?:number|string,programId?:number|string}|null> = new BehaviorSubject(null);
  getIntakesofSession:BehaviorSubject<{sessionId?:number|string, instituteName:string, programName:string, sessionName }|null> = new BehaviorSubject(null)
  consultancyInstitutes: BehaviorSubject<{countryName:string,consultancyName:string,consultancyId:number}|null> = new BehaviorSubject<{countryName:string,consultancyName:string,consultancyId:number}>(null)
}