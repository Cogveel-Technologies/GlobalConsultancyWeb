import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProgramData } from "../consultancy-models/data.program";
import { map, Observable, of } from "rxjs";
import { ConsultancyApi } from "../consultancy-services/api.service";
import { ConsultancyService } from "../consultancy-services/consultancy.service";

@Injectable({
    providedIn:'root'
})

export class ProgramResolver implements Resolve<ProgramData>{
    constructor(private consultancyApiService:ConsultancyApi, private consultancyService: ConsultancyService){}
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProgramData> | Promise<ProgramData> | Observable<ProgramData>  {
    const id = +route.paramMap.get('id');
    const defaultData = this.consultancyService.defaultRenderData();
    defaultData.ProgramId = String(id)
    return this.consultancyApiService.getProgramDetails(defaultData).pipe(map(res => {
        defaultData.SessionId = String(res.sessionId);
        // return this.consultancyApiService.getProgramDetails(defaultData)
        console.log(res)
        return res
    }))
   }
}