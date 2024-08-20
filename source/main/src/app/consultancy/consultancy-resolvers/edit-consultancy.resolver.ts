import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ConsultancyApi } from "../consultancy-services/api.service";
import { ConsultancyData } from "../consultancy-models/data.consultancy";


@Injectable({
    providedIn:"root"
})

export class ConsultancyResolver implements Resolve<ConsultancyData>{
    constructor( private consultancyApiService:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
      const id = route.params['id'];
      return this.consultancyApiService.getConsultancyDetails(id);
}}