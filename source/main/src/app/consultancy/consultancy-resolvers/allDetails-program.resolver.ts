import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProgramData } from "../consultancy-models/data.program";
import { map, Observable, switchMap } from "rxjs";
import { ConsultancyApi } from "../consultancy-services/api.service";
import { ConsultancyService } from "../consultancy-services/consultancy.service";

@Injectable({
    providedIn:'root'
})

export class allProgramDetails implements Resolve<ProgramData> {
    constructor(
      private consultancyApiService: ConsultancyApi,
      private consultancyService: ConsultancyService
    ) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<ProgramData> | Promise<ProgramData> | Observable<ProgramData> {
      const id = +route.paramMap.get('id');
      const defaultData = this.consultancyService.defaultRenderData();
      defaultData.ProgramId = String(id);
      console.log(defaultData)
  
      return this.consultancyApiService.getProgramDetails(defaultData).pipe(
        switchMap((res) => {
          console.log(res)
          return this.consultancyApiService.getProgramDetails(defaultData);
        })
      );
    }
  }
  
