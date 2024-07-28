import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProgramData } from "../consultancy-models/data.program";
import { Observable, of } from "rxjs";
import { ConsultancyApi } from "../consultancy-services/api.service";

@Injectable({
    providedIn:'root'
})

export class ProgramResolver implements Resolve<ProgramData>{
    constructor(private consultancyApiService:ConsultancyApi){}
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProgramData> | Promise<ProgramData> | ProgramData {
    const id = +route.params['id'];
    return this.consultancyApiService.getProgramDetails(id)
   }
}