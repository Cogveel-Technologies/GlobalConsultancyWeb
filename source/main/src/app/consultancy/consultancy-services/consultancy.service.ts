
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { ConsultancyApi } from "./api.service";
import { ConsultancyDetailsOptions } from "../consultancy-models/data.consultancy-get-options";
import { BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { PageEvent } from "@angular/material/paginator";


@Injectable({
  providedIn: "root"
})

export class ConsultancyService {
  constructor(private route: ActivatedRoute, private consultancyApiService: ConsultancyApi, private toastr:ToastrService, private router:Router) { }
  data: ConsultancyData[];
  editMode: boolean = false;
  editId = new BehaviorSubject<number|null>(null);
  pageSizeOptions = [5, 10, 25, 100]; // Dropdown options for page size




  defaultRenderData(): ConsultancyDetailsOptions {
    const defaultData = {
      OrderBy: 'id',
      sortExpression: 'asc',
      pageSize: this.pageSizeOptions[0],
      currentPage:1,
      totalElements:0,
      searchText:'',
      InstituteId:'',
      ProgramId:'',
      SessionId:'',
      ConsultancyId:''
    }
    return defaultData
  }

  showSuccessMsgAndNavigate(msg:string,path:string[]){
    this.toastr.success(msg)
    this.router.navigate(path)
  }

 


}