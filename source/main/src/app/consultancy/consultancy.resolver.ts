import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ConsultancyData } from "./consultancy-models/data.consultancy";
import { Observable, of } from "rxjs";
import { ConsultancyService } from "./consultancy.service";

@Injectable({
    providedIn:"root"
})

export class ConsultancyResolver implements Resolve<ConsultancyData>{
    constructor(private consultancyService:ConsultancyService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
        this.consultancyService.data = this.consultancyService.data
        return of(this.consultancyService.data)
    }
}