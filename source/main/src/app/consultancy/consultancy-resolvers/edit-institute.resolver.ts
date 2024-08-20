import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ConsultancyApi } from "../consultancy-services/api.service";




@Injectable({
    providedIn:"root"
})

export class InstituteResolver implements Resolve<any>{
    constructor( private route:ActivatedRoute, private consultancyApiService:ConsultancyApi){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // call the api here when available
        const id = route.params['id'];
        return this.consultancyApiService.getInstituteDetails(id);
        
    }
}