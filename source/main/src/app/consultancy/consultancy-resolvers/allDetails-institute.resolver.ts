import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { InstituteData } from "../consultancy-models/data.institute";
import { ConsultancyApi } from "../consultancy-services/api.service";

@Injectable({
    providedIn:"root"
})

export class allInstituteDetails implements Resolve<InstituteData> {
    constructor(private consultancyApiService:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');
        return this.consultancyApiService.getInstituteDetails(id)
    }
}