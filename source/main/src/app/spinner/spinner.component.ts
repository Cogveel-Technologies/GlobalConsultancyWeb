import { Component, ChangeDetectorRef } from '@angular/core';
import { GeneralService } from 'app/general-service';

@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="isLoading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading: boolean = false;

  constructor(
    private generalService: GeneralService,
    private cdr: ChangeDetectorRef
  ) {
    this.generalService.spinner$.subscribe((state) => {
      console.log('Spinner state:', state); // Debug log
      this.isLoading = state;
      this.cdr.detectChanges(); // Ensure UI updates
    });
  }
}
