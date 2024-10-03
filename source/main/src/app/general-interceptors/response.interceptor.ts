import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(res => {
        // console.log(res)
        if(res instanceof HttpResponse){
            const body = res.body;

            if(body && body.status >= 400){
                this.toastr.error(body.message || "An Error Occured");
            }else if(body && body.status > 200 && body.status <= 299){
                this.toastr.success(body.message);
            }
        }
    }, catchError(error=>{
        this.toastr.error('Unexpected error occurred');
        return throwError(() => new Error(error.message || 'Unexpected error'));
    })))
 }}
