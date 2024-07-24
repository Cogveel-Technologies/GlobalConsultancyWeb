import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { InstituteData } from "../consultancy-models/data.institute";

@Injectable({
    providedIn:"root"
})

export class allInstituteDetails implements Resolve<InstituteData> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.paramMap.get('id');
        return of({
            Id: 1,
            InstituteName: 'Institute of Technology',
            AboutInstitute: 'A leading institution in technology and innovation.',
            Province: 'Ontario',
            Country: 'Canada',
            YearEstablished: '1985',
            Email: 'info@techinstitute.ca',
            PhoneNo: 12345678901,
            Website: 'https://www.techinstitute.ca',
            LinkedInUrl: 'https://www.linkedin.com/institute-of-technology',
            FbUrl: 'https://www.facebook.com/instituteoftechnology'
          },)
    }
}