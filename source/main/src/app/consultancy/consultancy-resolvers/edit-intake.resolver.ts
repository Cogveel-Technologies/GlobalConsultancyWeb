import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { IntakeData } from "../consultancy-models/data.intake";

@Injectable({
    providedIn: 'root'
})

export class IntakeResolver implements Resolve<IntakeData> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     const id = route.paramMap.get('id')
        return of({
            ProgramId: 2,
            InstituteId: 102,
            SessionId: 2022,
            NoOfIntake: 1400,
            Year: 2021,
            Id: 2
        })
    }
}