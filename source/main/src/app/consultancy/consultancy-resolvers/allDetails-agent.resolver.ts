import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ConsultancyApi } from "../consultancy-services/api.service";
import { AgentDetails } from "../consultancy-models/data.agent";

@Injectable({
    providedIn:"root"
})

export class allAgentDetails implements Resolve<AgentDetails> {
    constructor(private consultancyServiceApi:ConsultancyApi){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.paramMap.get('id');
        return this.consultancyServiceApi.getAgentDetails(id)
}}