import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of, tap } from "rxjs";
import { InstituteService } from "../consultancy-services/institute.service";
import { ConsultancyApi } from "../consultancy-services/api.service";




@Injectable({
    providedIn:"root"
})

export class InstituteResolver implements Resolve<any>{
    constructor(private instituteService:InstituteService, private route:ActivatedRoute, private consultancyApiService:ConsultancyApi){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // call the api here when available
        const id = route.params['id'];
        return this.consultancyApiService.getInstituteDetails(id);
        
    }
}