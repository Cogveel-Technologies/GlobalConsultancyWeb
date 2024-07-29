import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()

export class errorInterceptor implements HttpInterceptor {
    constructor(private router:Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error:HttpErrorResponse)=>{
            let errorMsg = ''
            if(error.error instanceof ErrorEvent){
                errorMsg = `Client-side error: ${error.error.message}`
            }else{
                errorMsg = `Server-side error: ${error.status} ${error.message}`;
            }
            console.error(errorMsg);
            return throwError(errorMsg);
        }))
    }
}