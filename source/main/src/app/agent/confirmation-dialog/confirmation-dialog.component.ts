// import { Component } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Are you sure?</h2>
  <mat-dialog-content>
    <p>{{ data.message }}</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No</button>
    <button mat-button color="primary" (click)="onYesClick()">Yes</button>
  </mat-dialog-actions>
`,
styles: [
  `
    mat-dialog-content {
      font-size: 16px;
    }
  `,
],
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

