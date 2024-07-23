// {/* <section class="content">
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
//             <form class="m-4" [formGroup]="documentForm" (ngSubmit)="onDocumentFormSubmit()" enctype="multipart/form-data">
//               <div class="row">
//                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Student Name</mat-label>
//                     <mat-select formControlName="studentName" required>
//                       <mat-option *ngFor="let student of students" [value]="student.id">{{ student.studentName}}</mat-option>
//                     </mat-select>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>person</mat-icon>
//                   </mat-form-field>
//                 </div>

//                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Student Phone Number</mat-label>
//                     <mat-select formControlName="contactNo" required>
//                       <mat-option *ngFor="let student of students" [value]="student.contactNo">{{ student.contactNo }}</mat-option>
//                     </mat-select>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>phone</mat-icon>
//                   </mat-form-field>
//                 </div>

//                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Document Type</mat-label>
//                     <mat-select formControlName="documentType" required>
//                       <mat-option value="passport">Passport</mat-option>
//                       <mat-option value="idCard">ID Card</mat-option>
//                       <mat-option value="birthCertificate">Birth Certificate</mat-option>
//                       <!-- Add more options as needed -->
//                     </mat-select>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>description</mat-icon>
//                   </mat-form-field>
//                 </div>
//                 <!-- <div class="col-xl-6 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Upload File</mat-label>
//                     <input matInput formControlName="file" required>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>attach_file</mat-icon>
//                   </mat-form-field>
//                 </div> -->
//                   <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
//                     <label>Upload</label>
//                     <app-file-upload formControlName="file"></app-file-upload>
//                   </div>
//               </div>

//               <div class="row">
//                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Remarks</mat-label>
//                     <textarea matInput formControlName="remarks" required></textarea>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>note</mat-icon>
//                   </mat-form-field>
//                 </div>
//               </div>

//               <div class="row">
//                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                   <button class="btn-space" [disabled]="!documentForm.valid" mat-raised-button color="primary">
//                   Submit
//                   </button>
//                   <button type="button" mat-raised-button color="warn">Cancel</button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section> */}





// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AgentService } from '../agent.service';
// // import { MatFormFieldDefaultOptions } from '@angular/material/form-field';

// @Component({
//   selector: 'app-student-document',
//   templateUrl: './student-document.component.html',
//   styleUrls: ['./student-document.component.scss']
// })
// export class StudentDocumentComponent implements OnInit {
//   documentForm: FormGroup;
//   breadscrums = [
//     {
//       title: 'Student Details',
//       items: ['Forms'],
//       active: 'Add Document',
//     },
//   ];
//   students = [];
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private agentService: AgentService
    
//   ) {
//     this.initDocumentForm();
//   }

//   ngOnInit() {
//     this.fetchStudents();
//   }

//   initDocumentForm() {
//     this.documentForm = this.fb.group({
//       studentName: ['', Validators.required],
//       contactNo: ['', Validators.required],
//       documentType: ['', Validators.required],
//       remarks: ['', Validators.required],
//       file: ['', Validators.required],
//     });
//   }

//   fetchStudents() {
//     this.agentService.getStudentsList().subscribe(
//       data => {
//         this.students = data;
//         console.log(this.students,"these are the students")
//       },
//       error => {
//         console.error('Error fetching students', error);
//       }
//     );
//   }

//   onDocumentFormSubmit() {
//     if (this.documentForm.valid) {
//       this.agentService.submitStudentDocument(this.documentForm.value).subscribe(
        
//         response => {
//           console.log('Submit Success', response);
//           console.log(this.documentForm.value,"form values arsalaan")
//         },
//         error => {
//           console.log('Submit Error', error);
//         }
//       );
//     } else {
//       this.errorMessage = 'Please fill all required fields.';
//       console.log('Form is not valid');
//     }
//   }

// }

