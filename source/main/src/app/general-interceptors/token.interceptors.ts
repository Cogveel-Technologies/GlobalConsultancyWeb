import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "environments/environment";


@Injectable()
export class CheckToken implements HttpInterceptor {
  constructor(private router: Router) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclude the login request (or any other endpoint you wish to exclude from token checking)
    const baseUrl = environment.apiUrl

    console.log(req.url)
    if (req.url === `${baseUrl}/Login`) {
      return next.handle(req);  // Allow the login request to proceed without token
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log("TTTTT")
      localStorage.clear()
      this.router.navigate(['/authentication/signin']);
      return throwError(() => new Error('No token found'));
    }

    // Clone the request to add the Authorization header if the token exists
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized error (token expired or invalid)
        if (error.status === 401) {
          this.handleTokenExpiration(); // Token expired, handle logout and redirection
        }
        return throwError(() => error);
      })
    );
  }

  private handleTokenExpiration(): void {
    localStorage.removeItem('token'); // Remove expired token
    this.router.navigate(['/authentication/signin']); // Redirect to login page
  }
}
