// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable, throwError } from "rxjs";
// import { catchError, tap } from "rxjs/operators";
// import { ToastrService } from "ngx-toastr";

// @Injectable({
//     providedIn: "root"
// })
// export class HttpErrorInterceptor implements HttpInterceptor {
//     constructor(private toastr: ToastrService) {}

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(req).pipe(
//             catchError((error: HttpErrorResponse) => {
//                 // Determine the error message
//                 let errorMsg = '';
//                 if (error.error instanceof ErrorEvent) {
//                     // Client-side error
//                     errorMsg = `Client-side error: ${error.error.message}`;
//                 }else if(error.error.status >= 400){
//                     errorMsg = error.error.message
//                 } else {
//                     // Server-side error
//                     errorMsg = `Server-side error: ${error.status} ${error.message}`;
//                 }

//                 // Display the error message
//                 this.toastr.error(errorMsg);

//                 // Optionally log error to console for debugging
//                 console.error('Error occurred:', error);

//                 // Throw the error for further handling (e.g., in components)
//                 return throwError(() => new Error(errorMsg));
//             })
//         );
//     }
// }
