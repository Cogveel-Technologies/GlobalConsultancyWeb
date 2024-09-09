import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AgentDetails } from "../consultancy-models/data.agent";
import { ConsultancyApi } from "../consultancy-services/api.service";

@Injectable({
    providedIn:"root"
})

export class AgentResolver implements Resolve<AgentDetails>{
    constructor(private consultancyApiService:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'];
        return this.consultancyApiService.getAgentDetails(id)
    }
}