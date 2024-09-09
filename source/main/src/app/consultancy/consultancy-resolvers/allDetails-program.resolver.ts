import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProgramData } from "../consultancy-models/data.program";
import { Observable } from "rxjs";
import { ConsultancyApi } from "../consultancy-services/api.service";

@Injectable({
    providedIn:'root'
})

export class allProgramDetails implements Resolve<ProgramData>{
    constructor(private consultancyApiService:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProgramData> {
        const id = +route.paramMap.get('id');
        return this.consultancyApiService.getProgramDetails(id)
    }
}