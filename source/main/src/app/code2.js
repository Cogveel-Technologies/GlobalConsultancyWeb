// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { AgentService } from '../agent.service';
// import { Router } from '@angular/router';
// import { Student } from 'app/agent/models/student.model';
// import { Observable, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-student-document',
//   templateUrl: './student-document.component.html',
//   styleUrls: ['./student-document.component.scss']
// })
// export class StudentDocumentComponent implements OnInit, OnDestroy {
//   documentForm: FormGroup;
//   documentTypes: any[] = [];  
//   uploadedDocument$: Observable<any>;  // Observable to hold the single uploaded document
//   breadscrums = [
//     {
//       title: 'Student Details',
//       items: ['Forms'],
//       active: 'Add Document',
//     },
//   ];
//   student: Student | null = null;
//   errorMessage: string = '';

//   private subscriptions: Subscription = new Subscription();  // Manage all subscriptions

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private agentService: AgentService,
//     private router: Router  
//   ) {
//     this.initDocumentForm();
//   }

//   ngOnInit() {
//     // Subscribe to route data
//     const routeSubscription = this.route.data.subscribe((data: { student: Student | null }) => {
//       this.student = data.student;
//       console.log('Resolved student:', this.student);
//       this.patchForm();
//       this.loadUploadedDocument();  // Load the uploaded document when the component initializes
//     });
//     this.subscriptions.add(routeSubscription);

//     // Load document types when component initializes
//     this.loadDocumentTypes();
//   }

//   initDocumentForm() {
//     this.documentForm = this.fb.group({
//       studentName: [{ value: '', disabled: true }, Validators.required],
//       contactNo: [{ value: '', disabled: true }, Validators.required],
//       documentType: ['', Validators.required],
//       remarks: ['', Validators.required],
//       file: ['', Validators.required],
//     });
//   }

//   patchForm() {
//     if (this.student) {
//       this.documentForm.patchValue({
//         studentName: this.student.studentName || '',
//         contactNo: this.student.contactNo || '',
//       });
//     }
//   }

//   loadDocumentTypes() {
//     const documentTypesSubscription = this.agentService.getDocumentTypes().subscribe(
//       (response) => {
//         if (response.status === 200) {
//           this.documentTypes = response.data;
//         } else {
//           console.error('Failed to load document types:', response.message);
//         }
//       },
//       (error) => {
//         console.error('Error loading document types:', error);
//       }
//     );
//     this.subscriptions.add(documentTypesSubscription);
//   }

//   loadUploadedDocument() {
//     if (this.student) {
//       this.uploadedDocument$ = this.agentService.getUploadedDocuments(this.student.id);
//     }
//   }

//   onDocumentFormSubmit() {
//     if (this.documentForm.valid && this.student) {
//       const documentTypeId = this.documentForm.get('documentType')?.value;
//       const studentId = this.student.id;
//       const remarks = this.documentForm.get('remarks')?.value;
//       const file = this.documentForm.get('file')?.value;
//       const uploadedBy = 'yourUserId'; // Replace 'yourUserId' with the actual user ID or username.

//       // Create a FormData object to match backend expectations
//       const formData = new FormData();
//       formData.append('DocumentTypeId', documentTypeId);
//       formData.append('StudentId', studentId.toString()); // Convert studentId to string
//       formData.append('Remarks', remarks);
//       formData.append('UploadedBy', uploadedBy);
//       formData.append('File', file);

//       const submitSubscription = this.agentService.submitStudentDocument(formData).subscribe(
//         response => {
//           console.log('Submit Success', response);
//           window.location.reload();
//           this.loadUploadedDocument();  // Reload the document after a successful upload
//         },
//         error => {
//           console.log('Submit Error', error);
//           this.errorMessage = 'Error submitting the document. Please try again later.';
//         }
//       );
//       this.subscriptions.add(submitSubscription);
//     } else {
//       this.errorMessage = 'Please fill all required fields.';
//       console.log('Form is not valid or student is null');
//     }
//   }

//   getDocumentTypeName(documentTypeId: number): string {
//     const documentType = this.documentTypes.find(type => type.id === documentTypeId);
//     return documentType ? documentType.documentType : 'Unknown';
//   }

//   viewDocument(documentUrl: string) {
//     window.open(documentUrl, '_blank');
//   }

//   ngOnDestroy() {
//     // Unsubscribe from all subscriptions
//     this.subscriptions.unsubscribe();
//   }
// }





// <section class="content">
//   <div class="content-block">
//     <div class="block-header" *ngFor="let breadscrum of breadscrums">
//       <!-- breadcrumb -->
//       <app-breadcrumb [title]="breadscrum.title" [items]="breadscrum.items" [active_item]="breadscrum.active">
//       </app-breadcrumb>
//     </div>

//     <div class="row clearfix">
//       <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
//         <div class="card">
//           <div class="header">
//             <h2>Document Upload</h2>
//           </div>
//           <div class="body">
//             <form class="m-4" [formGroup]="documentForm" (ngSubmit)="onDocumentFormSubmit()">
//               <div class="row">

//                 <!-- Student Name Field -->
//                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Student Name</mat-label>
//                     <input matInput formControlName="studentName" readonly>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>person</mat-icon>
//                   </mat-form-field>
//                 </div>

//                 <!-- Student Phone Number Field -->
//                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Student Phone Number</mat-label>
//                     <input matInput formControlName="contactNo" readonly>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>phone</mat-icon>
//                   </mat-form-field>
//                 </div>

//                 <!-- Document Type Dropdown -->
//                 <mat-form-field class="example-full-width">
//                   <mat-label>Document Type</mat-label>
//                   <mat-select formControlName="documentType" required>
//                     <mat-option *ngFor="let type of documentTypes" [value]="type.id">
//                       {{ type.documentType }}
//                     </mat-option>
//                   </mat-select>
//                   <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>description</mat-icon>
//                 </mat-form-field>


//                 <!-- File Upload Component -->
//                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
//                   <label>Upload</label>
//                   <app-file-upload formControlName="file"></app-file-upload>
//                 </div>

//               </div>

//               <!-- Remarks Textarea -->
//               <div class="row">
//                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Remarks</mat-label>
//                     <textarea matInput formControlName="remarks" required></textarea>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>note</mat-icon>
//                   </mat-form-field>
//                 </div>
//               </div>

//               <!-- Submit and Cancel Buttons -->
//               <div class="row">
//                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                   <button class="btn-space" [disabled]="!documentForm.valid" mat-raised-button color="primary">
//                     Submit
//                   </button>
//                   <button type="button" mat-raised-button color="warn"
//                     [routerLink]="['/agent/list-students']">Cancel</button>
//                 </div>
//               </div>

//             </form>

//             <div class="row mt-4">
//               <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                 <div class="card">
//                   <div class="header mb-3">
//                     <h2>Document Type List</h2>
//                   </div>

//                   <!-- Uploaded Document Table -->
//                   <table class="table table-hover table-resposive" *ngIf="uploadedDocument$ | async as document">

//                     <thead class="thead-light">
//                       <tr>
//                         <th>Sr No.</th>
//                         <th>Document Type</th>
//                         <th>Remarks</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td data-label="Sr No.">1</td> <!-- Fixed serial number since it's a single document -->
//                         <td data-label="Document Type">
//                           {{ getDocumentTypeName(document.documentTypeId) }}
//                         </td>
//                         <td data-label="Remarks">{{ document.remarks }}</td>
//                         <td data-label="Actions">
//                           <button mat-icon-button color="primary" (click)="viewDocument(document.file)">
//                             <mat-icon>visibility</mat-icon>
//                           </button>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>