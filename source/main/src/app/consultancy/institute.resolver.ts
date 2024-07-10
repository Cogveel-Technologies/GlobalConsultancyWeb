import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { InstituteService } from "./institute.service";

@Injectable({
    providedIn:"root"
})

export class InstituteData implements Resolve<any>{
    constructor(private instituteService:InstituteService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.instituteService.setInstituteData(this.instituteService.ELEMENT_DATA) //change it then with api data
    }
}