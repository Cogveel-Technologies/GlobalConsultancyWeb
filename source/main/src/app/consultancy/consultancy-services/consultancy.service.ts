
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { ConsultancyApi } from "./api.service";
import { ConsultancyDetailsOptions } from "../consultancy-models/data.consultancy-get-options";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: "root"
})

export class ConsultancyService {
  constructor(private route: ActivatedRoute, private consultancyApiService: ConsultancyApi) { }
  data: ConsultancyData[];
  editMode: boolean = false;
  editId = new BehaviorSubject<number|null>(null);


  defaultRenderData(): ConsultancyDetailsOptions {
    const defaultData = {
      limit: 5,
      OrderBy: 'id',
      sortExpression: 'asc',
      CurrentPage: 1,
      searchText:'',
      InstituteId:9,
      ProgramId:24,
      SessionId:2
    }
    return defaultData
  }

}