import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of, tap } from "rxjs";
import { ConsultancyService } from "../consultancy-services/consultancy.service";


@Injectable({
    providedIn:"root"
})

export class ConsultancyResolver implements Resolve<any>{
    constructor(private consultancyService:ConsultancyService, private activeRoute:ActivatedRoute){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
      const id = this.activeRoute.params['id'];
      // call the edit api from the service file when available 
      return of({
        Id: 1,
        ConsultancyName: "Future Insights Consultancy",
        Phone1: 2234567890,
        Phone2: 2876543210,
        Email1: "info@futureinsights.com",
        Email2: "support@futureinsights.com",
        Country: "USA",
        State: "California",
        City: "Los Angeles",
        Address: "456 Sunset Boulevard",
        Street: "Sunset Boulevard",
        Pincode: "90028",
        RegistrationNo: "FIC-2024-002",
        Website: "https://futureinsights.com",
        FbUrl: "https://facebook.com/futureinsights",
        LinkedInUrl: "https://linkedin.com/company/futureinsights",
        YearEstablished: 2012,
        Password: "anothersecurepassword"
      },)
    }
}