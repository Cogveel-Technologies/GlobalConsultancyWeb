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
  getSessionsOfInstitute: BehaviorSubject<{instituteName?:string,instituteId?:number|string|null}> = new BehaviorSubject(null);
  getIntakesofSession:BehaviorSubject<{sessionId?:number|string, instituteName:string, programName:string, sessionName, instituteId?:number|string, programId?:number|string }|null> = new BehaviorSubject(null)
  consultancyInstitutes: BehaviorSubject<{countryName:string,consultancyName:string,consultancyId:number}|null> = new BehaviorSubject<{countryName:string,consultancyName:string,consultancyId:number}>(null)
  editProgramCurrentPageAndPageSize: BehaviorSubject<null|{pageIndex:number,pageSize:number,search:boolean}> = new BehaviorSubject(null)
  programEditState:BehaviorSubject<null|boolean> = new BehaviorSubject(null)
  instituteEditState:BehaviorSubject<null|boolean> = new BehaviorSubject(null)
  editInstituteCurrentPageAndPageSize: BehaviorSubject<null|{pageIndex:number,pageSize:number,search:boolean,countryId:number|string}> = new BehaviorSubject(null)
  sessionEditState:BehaviorSubject<null|boolean> = new BehaviorSubject(null);
  editSessionCurrentPageAndPageSize: BehaviorSubject<null|{pageIndex:number,pageSize:number,search:boolean}> = new BehaviorSubject(null)
  intakeEditState:BehaviorSubject<null|boolean> = new BehaviorSubject(null)
  editIntakeCurrentPageAndPageSize: BehaviorSubject<null|{pageIndex:number,pageSize:number,search:boolean}> = new BehaviorSubject(null)
  agentEditorViewState:BehaviorSubject<null|boolean> = new BehaviorSubject(null);
  editAgentCurrentPageAndPageSize: BehaviorSubject<null|{pageIndex:number,pageSize:number,search:boolean}> = new BehaviorSubject(null)
  getIntakesOfProgam: BehaviorSubject<null|{instituteId?:number,instituteName?:string,programId?:number,programName?:string}> = new BehaviorSubject(null)
  instituteSessionState:BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(false)
  instituteProgramState:BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(false)
  intakeProgramState: BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(false)
  intakeSessionState: BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(false)
  instituteSessions: BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(false)
  activeRoute: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null)
  breadscrumState:BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(null)
}