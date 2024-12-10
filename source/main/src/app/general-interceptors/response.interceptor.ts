import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          const body = res.body;

          // Handle success responses
          if (body?.status && body.status >= 200 && body.status <= 299 && body.status !== 201) {
            this.toastr.success(body.message || 'Operation successful');
          }

          // Handle application-level errors, excluding 404
          if (body?.status && body.status >= 400 && body.status !== 404) {
            this.toastr.error(body.message || 'An error occurred');
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Skip displaying a message for 404 errors
        if (error.status === 404) {
          return throwError(() => error); // Simply rethrow the error without any message
        }

        // Handle other errors globally
        this.toastr.error(
          error.error?.message || 
          'Unexpected error occurred'
        );

        return throwError(() => error); // Rethrow the error
      })
    );
  }
}
