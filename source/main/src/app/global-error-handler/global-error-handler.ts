import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const toastr = this.injector.get(ToastrService);
    let errorMsg = '';
    // Check if error is an instance of ErrorEvent (client-side)
    if (error instanceof ErrorEvent) {
      errorMsg = `Client-side error: ${error.message}`;
    } 
    // toastr.error(errorMsg)
  }
}
