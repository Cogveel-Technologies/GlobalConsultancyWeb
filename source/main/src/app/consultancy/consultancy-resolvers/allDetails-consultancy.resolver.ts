import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { of } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class allConsultancyDetails implements Resolve<ConsultancyData> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.paramMap.get('id');
        console.log(id)
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
          })
    }
}