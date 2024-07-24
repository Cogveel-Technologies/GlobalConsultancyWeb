import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of, tap } from "rxjs";
import { InstituteService } from "../consultancy-services/institute.service";




const data = [
    {Id:0, InstituteName: "lksdjffffffffff", AboutInstitute: "sdklfjasdppppp", Province: "klsdjfasdlj", Country: "sdkljfaskl", YearEstablished: "kldsjfklasj", Email: "klsdjflaskj", PhoneNo: "jkldjflaksdj", Website: "jklsdjfaklj", LinkedInUrl: "kljsdflk", FbUrl: "jkjasdfklj" },
    {Id:1, InstituteName: "lksdjf", AboutInstitute: "sdklfjasd", Province: "klsdjfasdlj", Country: "sdkljfaskl", YearEstablished: "kldsjfklasj", Email: "klsdjflaskj", PhoneNo: "jkldjflaksdj", Website: "jklsdjfaklj", LinkedInUrl: "kljsdflk", FbUrl: "jkjasdfklj" },
    {Id:2, InstituteName: "lksdjf", AboutInstitute: "sdklfjasd", Province: "klsdjfasdlj", Country: "sdkljfaskl", YearEstablished: "kldsjfklasj", Email: "klsdjflaskj", PhoneNo: "jkldjflaksdj", Website: "jklsdjfaklj", LinkedInUrl: "kljsdflk", FbUrl: "jkjasdfklj" },
  ]

@Injectable({
    providedIn:"root"
})

export class InstituteResolver implements Resolve<any>{
    constructor(private instituteService:InstituteService, private route:ActivatedRoute){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');
        // call the api here when available
        return of(data.find(el=> el.Id === id));
        
    }
}