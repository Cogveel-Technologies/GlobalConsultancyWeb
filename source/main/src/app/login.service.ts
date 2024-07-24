import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class loginService {

    constructor(private http: HttpClient) { }
    loggedInUser:any;
    logIn() {
        // call api when available
        return of({
            name: "kamran",
            email: "kamran@gmail.com",
            password: "kamran@123",
            role: "admin",
            modules: "admin,consultancy,student"
        })
    }

    isLoggedIn() {
        return localStorage.getItem('name') != null;
    }
    role() {
        return localStorage.getItem('role') != null;
    }

    setLoggedinUser(user:any){
        this.loggedInUser = user;
    }
    getAccessibleModules(){
        return this.loggedInUser.modules.split(",")
    }
}