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
//             <form class="m-4" [formGroup]="documentForm" (ngSubmit)="onDocumentFormSubmit()">
//               <div class="row">
//                 <div class="col-md-6">
//                   <p><strong>ID:</strong> {{ user.id }}</p>
//                   <!-- <p><strong>Name:</strong> {{ user.studentName }}</p> -->
//                   <!-- <p><strong>DOB:</strong> {{ user.dob }}</p> -->
//                   <!-- <p><strong>Citizenship:</strong> {{ user.citizenship }}</p> -->
//                   <!-- <p><strong>Language:</strong> {{ user.language }}</p> -->
//                 </div>
//                 <div class="col-md-6">
//                   <p><strong>Name:</strong> {{ user.studentName }}</p>
//                   <!-- <p><strong>Passport Expiry:</strong> {{ user.passportExpiry }}</p> -->
//                   <!-- <p><strong>Email:</strong> {{ user.email }}</p> -->
//                   <!-- <p><strong>Contact No:</strong> {{ user.contactNo }}</p> -->
//                   <!-- <p><strong>Agent:</strong> {{ user.agent }}</p> -->
//                   <!-- <p><strong>Residential Address:</strong> {{ user.residentialAddress }}</p> -->
//                   <!-- <p><strong>Mailing Address:</strong> {{ user.mailingAddress }}</p> -->
//                 </div>
//               </div>
//               <div class="row">
//                 <div class="col-xl-6 col-lg-4 col-md-12 col-sm-12 mb-3">
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
               
//                 <div class="col-xl-6 col-lg-4 col-md-12 col-sm-12 mb-3">
//                   <mat-form-field class="example-full-width">
//                     <mat-label>Upload File</mat-label>
//                     <input matInput  formControlName="file" required>
//                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>attach_file</mat-icon>
//                   </mat-form-field>
//                 </div>
//               </div>
//               <div class="row">
//                   <div class="col-xl-6 col-lg-4 col-md-12 col-sm-12 mb-3">
//                       <mat-form-field class="example-full-width">
//                         <mat-label>Remarks</mat-label>
//                         <textarea matInput formControlName="remarks" required></textarea>
//                         <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>note</mat-icon>
//                       </mat-form-field>
//                     </div>
//               </div>
//               <div class="row">
//                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                   <button class="btn-space" [disabled]="!documentForm.valid" mat-raised-button color="primary">
//                     {{ isFormPrefilled() ? 'Update Document' : 'Submit' }}
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
  
// </section>
 

//  */}



 

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { AgentService } from '../agent.service';
// import * as CryptoJS from 'crypto-js';  // Import CryptoJS

// @Component({
//   selector: 'app-student-document',
//   templateUrl: './student-document.component.html',
//   styleUrls: ['./student-document.component.scss']
// })
// export class StudentDocumentComponent implements OnInit {
//   documentForm: FormGroup;
//   hide3 = true;
//   breadscrums = [
//     {
//       title: 'Student Details',
//       items: ['Forms'],
//       active: 'Add Document',
//     },
//   ];
//   user: any;
//   errorMessage: string = '';

//   constructor(private fb: FormBuilder, private route: ActivatedRoute,
//     private agentService: AgentService) {
//     this.initDocumentForm();
//   }

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       const encryptedData = params['data'];
//       if (encryptedData) {
//         this.user = this.decryptData(encryptedData);
//         this.patchForm();
//       }
//     });
//   }

//   initDocumentForm() {
//     this.documentForm = this.fb.group({
//       documentType: ['', Validators.required],
//       remarks: ['', Validators.required],
//       file: ['', Validators.required],
      
//     });
//   }

//   decryptData(data: string): any {
//     const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // Your secret key
//     const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
//     const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
//     return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
//   }

//   patchForm() {
//     if (this.user) {
//       this.documentForm.patchValue({
//         documentType: this.user.documentType || '',
//         remarks: this.user.remarks || '',
//         file: this.user.file || '',
        
//       });
//     }
//   }

//   onDocumentFormSubmit() {
//     if (this.documentForm.valid) {
//       if (this.isFormPrefilled()) {
//         this.agentService.updateStudentDocument(this.user.id, this.documentForm.value).subscribe(
//           response => {
//             console.log('Update Success', response);
//           },
//           error => {
//             console.log('Update Error', error);
//           }
//         );
//       } else {
//         this.agentService.submitStudentDocument(this.documentForm.value).subscribe(
//           response => {
//             console.log('Submit Success', response);
//           },
//           error => {
//             console.log('Submit Error', error);
//           }
//         );
//       }
//     } else {
//       this.errorMessage = 'Please fill all required fields.';
//       console.log('Form is not valid');
//     }
//   }

//   isFormPrefilled(): boolean {
//     return !!this.user && !!this.user.id; // Check if user and user.id exist and are truthy
//   }
// }
