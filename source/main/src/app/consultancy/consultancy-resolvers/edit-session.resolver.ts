import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { SessionData } from "../consultancy-models/data.session";
import { Observable, of } from "rxjs";
import { ConsultancyService } from "../consultancy-services/consultancy.service";
import { ConsultancyApi } from "../consultancy-services/api.service";

@Injectable({
    providedIn:"root"
})

export class SessionResolver implements Resolve<SessionData>{
    constructor(private consultancyApiService:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const id = +route.paramMap.get("id");
        return this.consultancyApiService.getSessionDetails(id)
    }
    
}