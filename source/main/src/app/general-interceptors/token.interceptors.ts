import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class checkToken implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')
        const newCloneReq = req.clone({
            setHeaders:{
                Authorization: `Bearer ${token}`
            }
        })
        return next.handle(newCloneReq)
    }
}