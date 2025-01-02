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
    const baseUrl = environment.apiUrl

    console.log(req.url)
    if (req.url === `${baseUrl}/Login`) {
      return next.handle(req); 
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log("TTTTT")
      localStorage.clear()
      this.router.navigate(['/authentication/signin']);
      return throwError(() => new Error('No token found'));
    }


    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleTokenExpiration(); 
        }
        return throwError(() => error);
      })
    );
  }

  private handleTokenExpiration(): void {
    localStorage.removeItem('token'); 
    // this.router.navigate(['/authentication/signin']); 
  }
}
