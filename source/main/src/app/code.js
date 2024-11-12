// {/* <section class="content">
//   <div class="content-block">
//     <div class="block-header" *ngFor="let breadscrum of breadscrums">
//       <!-- breadcrumb -->
//       <app-breadcrumb [title]="breadscrum.title" [items]="breadscrum.items"
//         [active_item]="breadscrum.active">
//       </app-breadcrumb>
//     </div>
//     <div class="row clearfix">
//       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//         <div class="card">
//           <!-- <div class="header">
//               <h2>
//                 <strong>Student Wizard</strong>
//               </h2>
//             </div> -->
//           <div class="body">
//             <mat-horizontal-stepper [linear]="isLinear" #stepper>
//               <mat-step [stepControl]="HFormGroup1!">
//                 <form [formGroup]="HFormGroup1!">
//                   <ng-template matStepLabel>Program Description</ng-template>
//                   <div class="program-info-container">
//                     <h2>Program Information</h2>

//                     <div class="program-info">
//                       <div class="info-field">
//                         <label>Institution</label>
//                         <p>{{selectedRecord?.instituteName}}</p>
//                       </div>
//                       <div class="info-field">
//                         <label>Program</label>
//                         <p>{{selectedRecord?.programName}}</p>
//                       </div>

//                       <div class="info-field">
//                         <label>Province</label>
//                         <p>{{selectedRecord?.province}}</p>
//                       </div>
//                       <div class="info-field">
//                         <label>Applocation Fee</label>
//                         <p>{{selectedRecord?.applicationFee}}</p>
//                       </div>
//                       <div class="info-field">
//                         <label>Year Established</label>
//                         <p>{{ selectedRecord?.yearEstablished | date: 'yyyy'
//                           }}</p>
//                       </div>
//                       <div class="info-field full-width">
//                         <label>About Institute</label>
//                         <p>{{ selectedRecord?.aboutInstitute }}</p>
//                       </div>
//                     </div>

//                     <div class="program-summary">
//                       <div class="program-title">
//                         <h3>Master in Business Administration - MBA</h3>
//                         <span class="duration-badge">24 Months</span>
//                       </div>
//                       <div class="program-details">
//                         <div>
//                           <label>Average Processing Time</label>
//                           <p>48 Hrs</p>
//                         </div>
//                         <div>
//                           <label>Tuition Fee</label>
//                           <p>USD 25860 per year</p>
//                         </div>
//                         <div>
//                           <label>SEVIS Fee</label>
//                           <p>USD 350 one-time</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div class="button-container">
//                       <button mat-raised-button matStepperNext
//                         color="primary">Next</button>
//                     </div>
//                   </div>

//                 </form>
//               </mat-step>

//               <!-- documents -->
//               <mat-step [stepControl]="documentForm!">
//                 <form [formGroup]="documentForm!"
//                   (ngSubmit)="onDocumentFormSubmit()">
//                   <ng-template matStepLabel>Documents</ng-template>
//                   <div class="program-info-container">
//                     <h2>Document Upload</h2>

//                     <div class="program-info">
//                       <!-- <form class="m-4" [formGroup]="documentForm" (ngSubmit)="onDocumentFormSubmit()"> -->
//                       <div class="row">

//                         <!-- Student Name Field -->
//                         <div
//                           class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                           <mat-form-field class="example-full-width">
//                             <mat-label>Student Name</mat-label>
//                             <input matInput formControlName="studentName"
//                               readonly>
//                             <mat-icon
//                               class="material-icons-two-tone color-icon p-3"
//                               matSuffix>person</mat-icon>
//                           </mat-form-field>
//                         </div>

//                         <!-- Student Phone Number Field -->
//                         <div
//                           class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
//                           <mat-form-field class="example-full-width">
//                             <mat-label>Student Phone Number</mat-label>
//                             <input matInput formControlName="contactNo"
//                               readonly>
//                             <mat-icon
//                               class="material-icons-two-tone color-icon p-3"
//                               matSuffix>phone</mat-icon>
//                           </mat-form-field>
//                         </div>

//                         <!-- Document Type Dropdown -->
//                         <mat-form-field class="example-full-width">
//                           <mat-label>Document Type</mat-label>
//                           <mat-select formControlName="documentType" required>
//                             <mat-option *ngFor="let type of documentTypes"
//                               [value]="type.id">
//                               {{ type.documentType }}
//                             </mat-option>
//                           </mat-select>
//                           <mat-icon
//                             class="material-icons-two-tone color-icon p-3"
//                             matSuffix>description</mat-icon>
//                         </mat-form-field>

//                         <!-- File Upload Component -->
//                         <div
//                           class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
//                           <label>Upload</label>
//                           <app-file-upload
//                             formControlName="file"></app-file-upload>
//                         </div>

//                       </div>

//                       <!-- Remarks Textarea -->

//                       <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                         <mat-form-field class="example-full-width">
//                           <mat-label>Remarks</mat-label>
//                           <textarea matInput formControlName="remarks"
//                             required></textarea>
//                           <mat-icon
//                             class="material-icons-two-tone color-icon p-3"
//                             matSuffix>note</mat-icon>
//                         </mat-form-field>
//                       </div>

//                       <!-- Submit and Cancel Buttons -->

//                       <div class="button-container">
//                         <button class="btn-space"
//                           [disabled]="!documentForm.valid" mat-raised-button
//                           color="primary">
//                           {{ isEditMode ? 'Update' : 'Submit' }}
//                         </button>

//                         <!-- <button type="button" mat-raised-button color="warn" (click)="onCancel()">Back</button> -->
//                       </div>

//                       <!-- </form> -->
//                     </div>
//                     <div class="button-container">
//                       <button mat-raised-button matStepperPrevious color="warn"
//                         class="msr-2">Back</button>
//                       <button mat-raised-button matStepperNext
//                         color="primary">Next</button>
//                     </div>
//                   </div>

//                 </form>
//                 <!-- Display uploaded documents -->
//                 <div class="row mt-4"
//                   *ngIf="uploadedDocument$ | async as response">
//                   <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                     <div class="card">
//                       <div class="header mb-3">
//                         <h2>Uploaded Documents</h2>
//                       </div>

//                       <!-- Uploaded Document Table -->
//                       <table class="table table-hover table-responsive">
//                         <thead class="thead-light">
//                           <tr>

//                             <th>Document Type</th>
//                             <th>Remarks</th>
//                             <!-- <th>Uploaded By</th> -->
//                             <th>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr
//                             *ngFor="let document of response.data; let i = index">

//                             <td data-label="Document Type">{{
//                               getDocumentTypeName(document.documentTypeId)
//                               }}</td>
//                             <td data-label="Remarks">{{ document.remarks }}</td>
//                             <!-- <td data-label="Uploaded By">{{ document.uploadedBy }}</td> -->
//                             <td data-label="Actions">
//                               <button mat-icon-button color="primary"
//                                 (click)="viewDocument(document.file)">
//                                 <mat-icon>visibility</mat-icon>
//                               </button>
//                               <button mat-icon-button color="warn"
//                                 (click)="deleteDocument(document.id)">
//                                 <!-- <mat-icon>delete</mat-icon> -->
//                                 <app-feather-icons [icon]="'trash-2'"
//                                   [class]="'tbl-fav-delete'"></app-feather-icons>
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </mat-step>
//               <!-- personal info -->
//               <mat-step [stepControl]="HFormGroup2!">
//                 <form [formGroup]="HFormGroup2!">
//                   <ng-template matStepLabel>Personal Info</ng-template>
              
//                   <div class="program-info-container">
//                     <h2>Personal Information</h2>
//                     <!-- Edit Button positioned at the top-right -->
//                     <button mat-raised-button color="accent" class="edit-btn" (click)="toggleEdit()">
//                       {{ iseditingmode ? 'Save' : 'Edit' }}
//                     </button>
              
//                     <div class="program-info">
//                       <div class="info-field">
//                         <label>Student Name</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.studentName }}</p>
//                         <input *ngIf="iseditingmode" formControlName="studentName" />
//                       </div>
//                       <div class="info-field">
//                         <label>Date of Birth</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.dob | date: 'yyyy-MM-dd' }}</p>
//                         <input *ngIf="iseditingmode" type="date" formControlName="dob" />
//                       </div>
                      
//                       <div class="info-field">
//                         <label>Citizenship</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.citizenship }}</p>
//                         <div *ngIf="iseditingmode">
//                           <select class="form-control" formControlName="citizenship">
//                             <option *ngFor="let country of countries" [value]="country.countryName">
//                               {{ country.countryName }}
//                             </option>
//                           </select>
//                         </div>
//                       </div>
                      
                      
//                       <div class="info-field">
//                         <label>Citizenship</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.citizenship }}</p>
//                         <mat-form-field *ngIf="iseditingmode" appearance="fill" class="full-width">
//                           <mat-label>Citizenship</mat-label>
//                           <mat-select formControlName="citizenship">
//                             <mat-option *ngFor="let country of countries" [value]="country.countryName">
//                               {{ country.countryName }}
//                             </mat-option>
//                           </mat-select>
//                         </mat-form-field>
//                       </div>   
// //                        
//                       <div class="info-field">
//                         <label>Language</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.language }}</p>
//                         <input *ngIf="iseditingmode" formControlName="language" />
//                       </div>
//                       <div class="info-field">
//                         <label>Passport Expiry</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.passportExpiry | date: 'yyyy-MM-dd' }}</p>
//                         <input *ngIf="iseditingmode" type="date" formControlName="passportExpiry" />
//                       </div>
//                       <div class="info-field">
//                         <label>Email Address</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.emailAddress }}</p>
//                         <input *ngIf="iseditingmode" formControlName="emailAddress" />
//                       </div>
//                       <div class="info-field">
//                         <label>Contact Number</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.contactNo }}</p>
//                         <input *ngIf="iseditingmode" formControlName="contactNo" />
//                       </div>
//                       <div class="info-field">
//                         <label>Residential Address</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.residentialAddress }}</p>
//                         <input *ngIf="iseditingmode" formControlName="residentialAddress" />
//                       </div>
//                       <div class="info-field">
//                         <label>Mailing Address</label>
//                         <p *ngIf="!iseditingmode">{{ studentData?.mailingAddress }}</p>
//                         <input *ngIf="iseditingmode" formControlName="mailingAddress" />
//                       </div>
//                     </div>
              
//                     <div class="button-container">
//                       <button mat-raised-button matStepperPrevious color="warn" class="msr-2">Back</button>
//                       <button mat-raised-button matStepperNext color="primary" [disabled]="!HFormGroup2!.valid">
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </mat-step>
              
//               <!-- contact info -->
//               <mat-step [stepControl]="HFormGroup2!">
//                 <form [formGroup]="HFormGroup2!">
//                   <ng-template matStepLabel>Contact Info</ng-template>

//                   <div class="program-info-container">
//                     <h2>Contact Info</h2>

//                     <div class="program-info">
//                       <div class="info-field">
//                         <mat-form-field appearance="fill" class="full-width">
//                           <mat-label>Email Address</mat-label>
//                           <input matInput type="email"
//                             formControlName="emailAddress"
//                             placeholder="Enter student email" required />
//                         </mat-form-field>
//                       </div>
//                       <div class="info-field">
//                         <mat-form-field appearance="fill" class="full-width">
//                           <mat-label>Contact Number</mat-label>
//                           <input matInput type="tel" formControlName="contactNo"
//                             placeholder="Enter contact number" required />
//                         </mat-form-field>
//                       </div>
//                       <div class="info-field">
//                         <mat-form-field appearance="fill" class="full-width">
//                           <mat-label>Residential Address</mat-label>
//                           <input matInput formControlName="residentialAddress"
//                             placeholder="Enter residential address" required />
//                         </mat-form-field>
//                       </div>
//                       <div class="info-field">
//                         <mat-form-field appearance="fill" class="full-width">
//                           <mat-label>Mailing Address</mat-label>
//                           <input matInput formControlName="mailingAddress"
//                             placeholder="Enter mailing address" required />
//                         </mat-form-field>
//                       </div>
//                     </div>
//                     <div class="button-container">
//                       <button mat-raised-button matStepperPrevious color="warn"
//                         class="msr-2">Back</button>
//                       <button mat-raised-button matStepperNext color="primary"
//                         [disabled]="!HFormGroup2!.valid">Next</button>
//                     </div>
//                   </div>

//                 </form>
//               </mat-step>

//               <!-- education -->
//               <mat-step>
//                 <ng-template matStepLabel> Education </ng-template>
//                 <div class="program-info-container">
//                   <h2>
//                     <strong>Add Education</strong>
//                   </h2>

//                   <div class="program-info">

//                     <div class="body">
//                       <div class="example-container">
//                         <div class="row">
//                           <!-- Country of Education -->
//                           <div
//                             class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                             <mat-form-field class="example-full-width"
//                               appearance="fill">
//                               <mat-label>Country of Education</mat-label>
//                               <input matInput>
//                               <mat-icon matSuffix>public</mat-icon>
//                             </mat-form-field>
//                           </div>

//                           <!-- Highest Level of Education -->
//                           <div
//                             class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                             <mat-form-field class="example-full-width"
//                               appearance="fill">
//                               <mat-label>Highest Level of Education</mat-label>
//                               <input matInput>
//                               <mat-icon matSuffix>school</mat-icon>
//                             </mat-form-field>
//                           </div>

//                           <!-- Grading Scheme -->
//                           <div
//                             class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                             <mat-form-field class="example-full-width"
//                               appearance="fill">
//                               <mat-label>Grading Scheme</mat-label>
//                               <input matInput>
//                               <mat-icon matSuffix>assignment</mat-icon>
//                             </mat-form-field>
//                           </div>

//                           <!-- Grade Average -->
//                           <div
//                             class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
//                             <mat-form-field class="example-full-width"
//                               appearance="fill">
//                               <mat-label>Grade Average</mat-label>
//                               <input matInput>
//                               <mat-icon matSuffix>bar_chart</mat-icon>
//                             </mat-form-field>
//                           </div>
//                         </div>

//                         <p class="text-muted">*10th and 12* Grade details are
//                           mandatory</p>

//                         <div class="col-md-12">
//                           <button mat-raised-button matStepperPrevious
//                             color="warn" class="me-2">Back</button>
//                           <button mat-raised-button matStepperNext
//                             color="primary">Next</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </mat-step>

//               <mat-step>
//                 <ng-template matStepLabel>Done</ng-template>
//                 <p>You are now done.</p>
//                 <div>
//                   <button mat-raised-button matStepperPrevious color="warn"
//                     class="msr-2">Back</button>
//                   <button mat-raised-button color="primary"
//                     (click)="stepper.reset()">Reset</button>
//                 </div>
//               </mat-step>

//             </mat-horizontal-stepper>
//           </div>
//         </div>
//       </div>
//     </div>

//   </div>
// </section> */}







// import { Component, OnInit, OnDestroy } from '@angular/core';
// import {
//   UntypedFormBuilder,
//   UntypedFormGroup,
//   Validators,
// } from '@angular/forms';
// import { AgentService } from '../agent.service';
// import { Student } from '../models/student.model'; // Adjust the import as necessary
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';
// import { PaginatedResponse } from '../agent.service'; // Import the PaginatedResponse interface
// import { StudentDocument } from '../models/studentDocument.model';

// @Component({
//   selector: 'app-applications',
//   templateUrl: './applications.component.html',
//   styleUrls: ['./applications.component.scss']
// })
// export class ApplicationsComponent implements OnInit {
//   // HFormGroup2: FormGroup;
//   documentForm: FormGroup;
//   documentTypes: any[] = [];  
//   uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>;
//   isLinear = false;
//   HFormGroup1?: UntypedFormGroup;
//   HFormGroup2?: UntypedFormGroup;

//   breadscrums = [
//     {
//       title: 'Student Application',
//       items: ['Search'],
//       active: 'Application',
//     },
//   ];

//   errorMessage = '';
//   isEditMode = false; // Track whether we are in edit mode
//   documentToEditId: number | null = null; // Store the ID of the document being edited

//   selectedRecord: any;
//   selectedId: number | null = null;  // Explicit type for clarity
//   studentData: Student | null = null;
//   countries: any[] = [];
//   iseditingmode = false;
//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private _formBuilder: UntypedFormBuilder,
//     private agentService: AgentService,
//     private router: Router
//   ) {
//     this.initDocumentForm();
//     // Retrieve the selected ID in the constructor
//     this.selectedId = this.agentService.getSelectedId();
//     console.log('Selected ID:', this.selectedId);
//     // this.HFormGroup2 = this.fb.group({
//     //   studentName: [''],
//     //   dob: [''],
//     //   citizenship: [''],
//     //   language: [''],
//     //   passportExpiry: [''],
//     //   emailAddress: [''],
//     //   contactNo: [''],
//     //   residentialAddress: [''],
//     //   mailingAddress: ['']
//     // });
//     this.loadCountries();
//   }

//   ngOnInit(): void {
//     this.selectedRecord = this.agentService.getSelectedRecord();
//     this.fetchStudentById(this.selectedId);
//     // this.patchForm();
    

//     // Initialize form groups
//     this.HFormGroup1 = this._formBuilder.group({});
    
//     this.HFormGroup2 = this._formBuilder.group({
//       file: ['', Validators.required],
//       studentName: ['', Validators.required],  // Required field with no initial value
//       dob: ['', Validators.required],  // Required date of birth field
//       citizenship: ['', Validators.required],  // Required citizenship field
//       language: ['', Validators.required],  // Required language field
//       passportExpiry: ['', Validators.required],  // Required passport expiry field
//       emailAddress: ['', [Validators.required, Validators.email]],
//       contactNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
//       residentialAddress: ['', Validators.required],
//       mailingAddress: ['']
//     });

//     this.loadDocumentTypes();
//   }

//   private fetchStudentById(id: number): void {
//     this.agentService.getStudentById(id).subscribe(
//       (student) => {
//         this.studentData = student;
//         console.log('Fetched student data:', this.studentData);
//         this.loadUploadedDocument();
//         this.patchForm(); // Call patchForm here
//       },
//       (error) => console.error('Error fetching student data:', error)
//     );
//   }
//   toggleEdit() {
//     this.iseditingmode = !this.iseditingmode;
//     if (this.iseditingmode) {
//       // Populate the form group with student data when editing starts
//       this.HFormGroup2.patchValue({
//         studentName: this.studentData.studentName,
//         dob: this.studentData.dob ? new Date(this.studentData.dob).toISOString().split('T')[0] : null,  // Ensure valid date format
//         citizenship: this.studentData.citizenship,
//         language: this.studentData.language,
//         passportExpiry: this.studentData.passportExpiry ? new Date(this.studentData.passportExpiry).toISOString().split('T')[0] : null, // Ensure valid date format
//         emailAddress: this.studentData.emailAddress,
//         contactNo: this.studentData.contactNo,
//         residentialAddress: this.studentData.residentialAddress,
//         mailingAddress: this.studentData.mailingAddress
//       });
//     }
    
//   }
//     // Function to load countries
//     loadCountries() {
//       this.agentService.getCountries().subscribe(
//         (response) => {
//           this.countries = response.data; // Assuming your API returns a "data" array with countries
//         },
//         (error) => {
//           console.error('Error fetching countries:', error);
//         }
//       );
//     }
//   saveContactInfo(): void {
//     if (this.HFormGroup2.valid) {
//       const contactInfo = this.HFormGroup2.value;
//       // this.agentService.saveStudentContactInfo(contactInfo).subscribe(
//       //   (response) => {
//       //     console.log('Contact information saved:', response);
//       //   },
//       //   (error) => console.error('Error saving contact info:', error)
//       // );
//     }
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

//   private patchForm() {
//     if (this.studentData) {
//       this.documentForm.patchValue({
//         studentName: this.studentData.studentName || '',
//         contactNo: this.studentData.contactNo || '',
//       });
//     }
//   }
  
//   loadDocumentTypes() {
//     this.agentService.getDocumentTypes().subscribe(
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
//   }

//   loadUploadedDocument() {
//     if (this.studentData) {
//       this.uploadedDocument$ = this.agentService.getUploadedDocuments({
//         studentId: this.studentData.id,
//         limit: 10,
//         orderBy: 'Id',
//         sortExpression: 'desc',
//         currentPage: 1,
//         isDeleted: false 
//       });
//     }
//   }

//   onDocumentFormSubmit() {
//     if (this.documentForm.valid && this.studentData) {
//       const documentTypeId = this.documentForm.get('documentType')?.value;
//       const studentId = this.studentData.id;
//       const remarks = this.documentForm.get('remarks')?.value;
//       const file = this.documentForm.get('file')?.value;
//       const uploadedBy = 'yourUserId'; // Replace with the actual user ID or username.

//       const formData = new FormData();
//       formData.append('DocumentTypeId', documentTypeId);
//       formData.append('StudentId', studentId.toString());
//       formData.append('Remarks', remarks);
//       formData.append('UploadedBy', uploadedBy);
//       formData.append('File', file);

//       if (this.isEditMode && this.documentToEditId !== null) {
//         this.agentService.updateStudentDocument(this.documentToEditId, formData).subscribe(
//           response => {
//             console.log('Update Success', response);
//           },
//           error => {
//             console.log('Update Error', error);
//             this.errorMessage = 'Error updating the document. Please try again later.';
//           }
//         );
//       } else {
//         this.agentService.submitStudentDocument(formData).subscribe(
//           response => {
//             console.log('Submit Success', response);
//             // window.location.reload();
//             this.loadUploadedDocument();  // Reload the document after a successful upload
//           },
//           error => {
//             console.log('Submit Error', error);
//             this.errorMessage = 'Error submitting the document. Please try again later.';
//           }
//         );
//       }
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

//   deleteDocument(documentId: number) {
//     this.agentService.deleteStudentDocument(documentId).subscribe(
//       response => {
//         console.log('Delete Success', response);
//         this.loadUploadedDocument();  // Reload the document list after deletion
//       },
//       error => {
//         console.log('Delete Error', error);
//         this.errorMessage = 'Error deleting the document. Please try again later.';
//       }
//     );
//   }
   
//   editDocument(documentId: number) {
//     this.agentService.getDocumentById(documentId).subscribe(
//       document => {
//         this.isEditMode = true;
//         this.documentToEditId = document.id;

//         this.documentForm.patchValue({
//           documentType: document.documentTypeId,
//           remarks: document.remarks,
//         });

//         this.documentForm.get('file')?.setValue(document.file);
//       },
//       error => {
//         console.error('Error fetching document details:', error);
//         this.errorMessage = 'Error fetching document details. Please try again later.';
//       }
//     );
//   }
// }

