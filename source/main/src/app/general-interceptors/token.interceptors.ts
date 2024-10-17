import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class CheckToken implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Clone the request to add the Authorization header if the token exists
    const newCloneReq = req.clone({
      setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
    });

    return next.handle(newCloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if the error is a 401 Unauthorized error
        if (error.status === 401) {
          // Handle the logout when the token is expired or unauthorized
          this.handleTokenExpiration();
        }
        return throwError(() => error);
      })
    );
  }

  // This function handles logout and redirection
  private handleTokenExpiration(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
    this.router.navigate(['/authentication/signin']); // Redirect to the login page
  }
}
