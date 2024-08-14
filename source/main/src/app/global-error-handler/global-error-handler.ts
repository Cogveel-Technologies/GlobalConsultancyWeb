import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    console.log("hello")
    const toastr = this.injector.get(ToastrService);
    let errorMsg = '';

    // Check if error is an instance of ErrorEvent (client-side)
    if (error instanceof ErrorEvent) {
      errorMsg = `Client-side error: ${error.message}`;
    } else {
      // Handle unexpected errors
      errorMsg = `Unexpected error: ${error.message || error.toString()}`;
    }

    toastr.error(errorMsg)
    // Optionally log the error to the console or an external service
    console.error('GlobalErrorHandler:', error);
  }
}
