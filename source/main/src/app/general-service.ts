import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private spinnerSubject = new BehaviorSubject<boolean>(false);
  spinner$ = this.spinnerSubject.asObservable();
  private activeRequests = 0; // Tracks number of active API requests

  showSpinner(): void {
    this.activeRequests++;
    this.spinnerSubject.next(true); // Show spinner
  }

  hideSpinner(): void {
    this.activeRequests = Math.max(this.activeRequests - 1, 0);
    if (this.activeRequests === 0) {
      this.spinnerSubject.next(false); // Hide spinner only when all requests are complete
    }
  }
}
