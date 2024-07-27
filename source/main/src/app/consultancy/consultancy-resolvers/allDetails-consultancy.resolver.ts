import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { ConsultancyApi } from "../consultancy-services/api.service";

@Injectable({
    providedIn:"root"
})

export class allConsultancyDetails implements Resolve<ConsultancyData> {
    constructor(private consultancyServiceApi:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');
        return this.consultancyServiceApi.getConsultancyDetails(id)
}}