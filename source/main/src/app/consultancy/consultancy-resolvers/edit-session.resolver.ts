import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { SessionData } from "../consultancy-models/data.session";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class SessionResolver implements Resolve<SessionData>{
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const id = route.paramMap.get("id");
        return of( {
            Id:2,
            SessionName: "Spring Semester",
            InstituteId: 102,
            Year: "2024"
        })  
    }
    
}