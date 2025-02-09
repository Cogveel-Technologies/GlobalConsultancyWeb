import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GeneralService } from 'app/general-service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private generalService: GeneralService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.generalService.showSpinner(); // Show spinner on request start

    return next.handle(req).pipe(
      finalize(() => {
        this.generalService.hideSpinner(); // Hide spinner after request completes
      })
    );
  }
}
