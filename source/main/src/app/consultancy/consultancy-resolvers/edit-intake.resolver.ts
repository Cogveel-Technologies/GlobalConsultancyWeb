import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IntakeData } from "../consultancy-models/data.intake";
import { ConsultancyApi } from "../consultancy-services/api.service";

@Injectable({
    providedIn: 'root'
})

export class IntakeResolver implements Resolve<IntakeData> {
    constructor(private consultancyServiceApi:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     const id = +route.paramMap.get('id')
        return this.consultancyServiceApi.getIntakeDetails(id)
    }
}