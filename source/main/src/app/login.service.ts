import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { login } from "./general-models/login.model";


@Injectable({
    providedIn: 'root'
})

export class loginService {
    private baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }
    logIn(data:login) {
        // call api when available
        return this.http.post(`${this.baseUrl}/Login`,data)
    }

}