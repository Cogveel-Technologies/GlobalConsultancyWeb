// // // // {/* <section class="content">
// // // //   <div class="content-block">
// // // //     <div class="block-header" *ngFor="let breadscrum of breadscrums">
// // // //       <!-- breadcrumb -->
// // // //       <app-breadcrumb [title]="breadscrum.title" [items]="breadscrum.items" [active_item]="breadscrum.active">
// // // //       </app-breadcrumb>
// // // //     </div>

// // // //     <div class="row clearfix">
// // // //       <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
// // // //         <div class="card">
// // // //           <div class="header">
// // // //             <h2>Document Upload</h2>
// // // //           </div>
// // // //           <div class="body">
// // // //             <form class="m-4" [formGroup]="documentForm" (ngSubmit)="onDocumentFormSubmit()" enctype="multipart/form-data">
// // // //               <div class="row">
// // // //                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
// // // //                   <mat-form-field class="example-full-width">
// // // //                     <mat-label>Student Name</mat-label>
// // // //                     <mat-select formControlName="studentName" required>
// // // //                       <mat-option *ngFor="let student of students" [value]="student.id">{{ student.studentName}}</mat-option>
// // // //                     </mat-select>
// // // //                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>person</mat-icon>
// // // //                   </mat-form-field>
// // // //                 </div>

// // // //                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
// // // //                   <mat-form-field class="example-full-width">
// // // //                     <mat-label>Student Phone Number</mat-label>
// // // //                     <mat-select formControlName="contactNo" required>
// // // //                       <mat-option *ngFor="let student of students" [value]="student.contactNo">{{ student.contactNo }}</mat-option>
// // // //                     </mat-select>
// // // //                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>phone</mat-icon>
// // // //                   </mat-form-field>
// // // //                 </div>

// // // //                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
// // // //                   <mat-form-field class="example-full-width">
// // // //                     <mat-label>Document Type</mat-label>
// // // //                     <mat-select formControlName="documentType" required>
// // // //                       <mat-option value="passport">Passport</mat-option>
// // // //                       <mat-option value="idCard">ID Card</mat-option>
// // // //                       <mat-option value="birthCertificate">Birth Certificate</mat-option>
// // // //                       <!-- Add more options as needed -->
// // // //                     </mat-select>
// // // //                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>description</mat-icon>
// // // //                   </mat-form-field>
// // // //                 </div>
// // // //                 <!-- <div class="col-xl-6 col-lg-4 col-md-12 col-sm-12 mb-3">
// // // //                   <mat-form-field class="example-full-width">
// // // //                     <mat-label>Upload File</mat-label>
// // // //                     <input matInput formControlName="file" required>
// // // //                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>attach_file</mat-icon>
// // // //                   </mat-form-field>
// // // //                 </div> -->
// // // //                   <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
// // // //                     <label>Upload</label>
// // // //                     <app-file-upload formControlName="file"></app-file-upload>
// // // //                   </div>
// // // //               </div>

// // // //               <div class="row">
// // // //                 <div class="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-3">
// // // //                   <mat-form-field class="example-full-width">
// // // //                     <mat-label>Remarks</mat-label>
// // // //                     <textarea matInput formControlName="remarks" required></textarea>
// // // //                     <mat-icon class="material-icons-two-tone color-icon p-3" matSuffix>note</mat-icon>
// // // //                   </mat-form-field>
// // // //                 </div>
// // // //               </div>

// // // //               <div class="row">
// // // //                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
// // // //                   <button class="btn-space" [disabled]="!documentForm.valid" mat-raised-button color="primary">
// // // //                   Submit
// // // //                   </button>
// // // //                   <button type="button" mat-raised-button color="warn">Cancel</button>
// // // //                 </div>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // </section> */}





// // // // import { Component, OnInit } from '@angular/core';
// // // // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // // // import { AgentService } from '../agent.service';
// // // // // import { MatFormFieldDefaultOptions } from '@angular/material/form-field';

// // // // @Component({
// // // //   selector: 'app-student-document',
// // // //   templateUrl: './student-document.component.html',
// // // //   styleUrls: ['./student-document.component.scss']
// // // // })
// // // // export class StudentDocumentComponent implements OnInit {
// // // //   documentForm: FormGroup;
// // // //   breadscrums = [
// // // //     {
// // // //       title: 'Student Details',
// // // //       items: ['Forms'],
// // // //       active: 'Add Document',
// // // //     },
// // // //   ];
// // // //   students = [];
// // // //   errorMessage: string = '';

// // // //   constructor(
// // // //     private fb: FormBuilder,
// // // //     private agentService: AgentService
    
// // // //   ) {
// // // //     this.initDocumentForm();
// // // //   }

// // // //   ngOnInit() {
// // // //     this.fetchStudents();
// // // //   }

// // // //   initDocumentForm() {
// // // //     this.documentForm = this.fb.group({
// // // //       studentName: ['', Validators.required],
// // // //       contactNo: ['', Validators.required],
// // // //       documentType: ['', Validators.required],
// // // //       remarks: ['', Validators.required],
// // // //       file: ['', Validators.required],
// // // //     });
// // // //   }

// // // //   fetchStudents() {
// // // //     this.agentService.getStudentsList().subscribe(
// // // //       data => {
// // // //         this.students = data;
// // // //         console.log(this.students,"these are the students")
// // // //       },
// // // //       error => {
// // // //         console.error('Error fetching students', error);
// // // //       }
// // // //     );
// // // //   }

// // // //   onDocumentFormSubmit() {
// // // //     if (this.documentForm.valid) {
// // // //       this.agentService.submitStudentDocument(this.documentForm.value).subscribe(
        
// // // //         response => {
// // // //           console.log('Submit Success', response);
// // // //           console.log(this.documentForm.value,"form values arsalaan")
// // // //         },
// // // //         error => {
// // // //           console.log('Submit Error', error);
// // // //         }
// // // //       );
// // // //     } else {
// // // //       this.errorMessage = 'Please fill all required fields.';
// // // //       console.log('Form is not valid');
// // // //     }
// // // //   }

// // // // }














// // // <section class="content">
// // //   <div class="container-fluid">
// // //     <div class="block-header" *ngFor="let breadscrum of breadscrums">
// // //       <!-- breadcrumb -->
// // //       <app-breadcrumb [title]="breadscrum.title" [items]="breadscrum.items" [active_item]="breadscrum.active">
// // //       </app-breadcrumb>
// // //     </div>

// // //     <div class="row">
// // //       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
// // //         <div class="card">
// // //           <div class="materialTableHeader">
// // //             <div class="left">
// // //               <ul class="header-buttons-left ms-0">
// // //                 <li class="tbl-title me-2">
// // //                   <h2>Student List</h2>
// // //                 </li>
// // //                 <li class="tbl-search-box">
// // //                   <label for="search-input"><i class="material-icons search-icon">search</i></label>
// // //                   <input placeholder="Search" type="text" #filter (input)="filterStudents(filter.value)" class="browser-default search-field" aria-label="Search box">
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //             <div class="right">
// // //               <ul class="tbl-export-btn">
// // //                 <li class="tbl-header-btn">
// // //                   <div class="m-l-10" matTooltip="ADD">
// // //                     <button mat-mini-fab color="primary" (click)="addStudent()">
// // //                       <mat-icon class="col-white">add</mat-icon>
// // //                     </button>
// // //                   </div>
// // //                 </li>
// // //                 <li class="tbl-header-btn">
// // //                   <div class="m-l-10" matTooltip="REFRESH">
// // //                     <button mat-mini-fab color="primary" (click)="refreshPage()">
// // //                       <mat-icon class="col-white">refresh</mat-icon>
// // //                     </button>
// // //                   </div>
// // //                 </li>
// // //                 <li class="tbl-header-btn">
// // //                   <div class="m-l-10" matTooltip="DELETE">
// // //                     <button mat-mini-fab color="warn">
// // //                       <mat-icon class="col-white">delete</mat-icon>
// // //                     </button>
// // //                   </div>
// // //                 </li>
// // //                 <li>
// // //                   <div class="export-button m-l-10" matTooltip="XLSX">
// // //                     <img src="assets/images/icons/xlsx.png" alt="" />
// // //                   </div>
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>

// // //     <div class="row clearfix">
// // //       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
// // //         <div class="card">
// // //           <div class="header">
// // //             <h2>Student Details</h2>
// // //           </div>
// // //           <div class="body table-responsive">
// // //             <table class="table table-hover table-responsive">
// // //               <thead>
// // //                 <tr>
// // //                   <!-- <th>S No.</th> -->
// // //                   <th>Student Name</th>
// // //                   <th>DOB</th>
// // //                   <!-- <th>Citizenship</th> -->
// // //                   <!-- <th>Language</th> -->
// // //                   <th>Passport Expiry</th>
// // //                   <th>Email</th>
// // //                   <th>Contact No.</th>
// // //                   <th>Agent</th>
// // //                   <th>Residential Address</th>
// // //                   <!-- <th>Mailing Address</th> -->
// // //                   <th>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 <tr *ngFor="let student of filteredStudents">
// // //                   <!-- <td data-label="S No.">{{ student.id }}</td> -->
// // //                   <td data-label="Student Name">{{ student.studentName }}</td>
// // //                   <td data-label="DOB">{{ student.dob }}</td>
// // //                   <!-- <td data-label="Citizenship">{{ student.citizenship }}</td> -->
// // //                   <!-- <td data-label="Language">{{ student.language }}</td> -->
// // //                   <td data-label="Passport Expiry">{{ student.passportExpiry }}</td>
// // //                   <td data-label="Email">{{ student.email }}</td>
// // //                   <td data-label="Contact No.">{{ student.contactNo }}</td>
// // //                   <td data-label="Agent">{{ student.agent }}</td>
// // //                   <td data-label="Residential Address">{{ student.residentialAddress }}</td>
// // //                   <!-- <td data-label="Mailing Address">{{ student.mailingAddress }}</td> -->
// // //                   <td data-label="Actions">
// // //                     <button mat-icon-button color="primary" (click)="editStudent(student.id)" matTooltip="Edit">
// // //                       <mat-icon>edit</mat-icon>
// // //                     </button>
// // //                     <button mat-icon-button color="warn" (click)="deleteStudent(student.id)" matTooltip="Delete">
// // //                       <mat-icon>delete</mat-icon>
// // //                     </button>
// // //                     <button mat-icon-button color="success" (click)="viewStudent(student.id)" matTooltip="View">
// // //                       <mat-icon>visibility</mat-icon>
// // //                     </button>
// // //                     <button mat-icon-button color="success" (click)="addStudentDocument(student.id)" matTooltip="Add Docs">
// // //                       <mat-icon>add</mat-icon>
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               </tbody>
// // //             </table>
// // //             <mat-paginator #paginator [pageIndex]="0" [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // // </section>





// // // })
// // // export class ListStudentsComponent implements OnInit {
// // //   students$: Observable<Student[]>;

// // //   constructor(private studentService: StudentService) {}

// // //   ngOnInit(): void {
// // //     this.students$ = this.studentService.getStudentsList();
// // //   }

// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import * as CryptoJS from 'crypto-js';  // Import CryptoJS
// // import { AgentService } from '../agent.service';
// // import { Student } from '../models/student.model';

// // @Component({
// //   selector: 'app-list-students',
// //   templateUrl: './list-students.component.html',
// //   styleUrls: ['./list-students.component.scss']
// // })
// // export class ListStudentsComponent implements OnInit {

// //   breadscrums = [
// //     {
// //       title: 'Student List',
// //       items: ['Tables'],
// //       active: 'Student List',
// //     },
// //   ];
// //   students: Student[] = [];
// //   filteredStudents: Student[] = [];

// //   constructor(
// //     private router: Router,
// //     private route: ActivatedRoute,
// //     private agentService: AgentService,
// //   ) {}

// //   ngOnInit() {
// //     this.route.data.subscribe((data: { students: Student[] }) => {
// //       this.students = data.students;
// //       this.filteredStudents = [...this.students];
// //     });
// //   }

// //   addStudent() {
// //     console.log("Add student button clicked");
// //     this.router.navigate(['/agent/register-student']);  // Adjust the route as needed
// //   }

// //   refreshPage() {
// //     console.log("Refresh button clicked");
// //     // Reload the current route
// //     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
// //     this.router.navigate(['/agent/list-students']).then(() => {
// //       window.location.reload();
// //     });
// //   }

// //   deleteStudent(studentId: number) {
// //     console.log(`Delete student button clicked for student ${studentId}`);
// //     this.agentService.deleteStudent(studentId).subscribe({
// //       next: (response) => {
// //         console.log('Student deleted successfully', response);
// //         // Reload students after deletion (if needed)
// //         this.students = this.students.filter(student => student.id !== studentId);
// //         this.filteredStudents = this.filteredStudents.filter(student => student.id !== studentId);
// //       },
// //       error: (error) => {
// //         console.error('Error deleting student', error);
// //       }
// //     });
// //   }

// //   encryptData(data: any): string {
// //     const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // Your secret key
// //     const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
// //     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
// //     return encrypted.toString();
// //   }

// //   editStudent(studentId: number) {
// //     const edit = this.students.find(el => el.id === studentId);
// //     if (edit) {
// //       const encryptedData = this.encryptData(edit);
// //       this.router.navigate(['/agent/register-student'], {
// //         queryParams: {
// //           data: encryptedData
// //         }
// //       });
// //     }
// //   }

// //   viewStudent(studentId: number) {
// //     const view = this.students.find(el => el.id === studentId);
// //     if (view) {
// //       const encryptedData = this.encryptData(view);
// //       this.router.navigate(['/agent/view-student'], {
// //         queryParams: {
// //           data: encryptedData
// //         }
// //       });
// //     }
// //   }
// //   addStudentDocument(studentId: number) {
// //     const view = this.students.find(el => el.id === studentId);
// //     if (view) {
// //       const encryptedData = this.encryptData(view);
// //       this.router.navigate(['/agent/student-document'], {
// //         queryParams: {
// //           data: encryptedData
// //         }
// //       });
// //     }
// //   }

// //   filterStudents(searchTerm: string) {
// //     if (!searchTerm) {
// //       this.filteredStudents = [...this.students];
// //     } else {
// //       const lowerCaseTerm = searchTerm.toLowerCase();
// //       this.filteredStudents = this.students.filter(student =>
// //         student.studentName.toLowerCase().includes(lowerCaseTerm) ||
// //         student.dob.toLowerCase().includes(lowerCaseTerm) ||
// //         student.citizenship.toLowerCase().includes(lowerCaseTerm) ||
// //         student.language.toLowerCase().includes(lowerCaseTerm) ||
// //         student.passportExpiry.toLowerCase().includes(lowerCaseTerm) ||
// //         student.email.toLowerCase().includes(lowerCaseTerm) ||
// //         student.contactNo.toLowerCase().includes(lowerCaseTerm) ||
// //         student.agent.toLowerCase().includes(lowerCaseTerm) ||
// //         student.residentialAddress.toLowerCase().includes(lowerCaseTerm) ||
// //         student.mailingAddress.toLowerCase().includes(lowerCaseTerm)
// //       );
// //     }
// //   }
// // }



// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Student } from '../models/student.model';
// import { AgentService } from '../agent.service';

// @Component({
//   selector: 'app-student-list',
//   templateUrl: './student-list.component.html',
//   styleUrls: ['./student-list.component.css']
// })
// export class StudentListComponent {
//   students$: Observable<Student[]>;

//   constructor(private router: Router, private agentService: AgentService) {
//     this.students$ = this.agentService.getStudents();
//   }

//   editStudent(studentId: number) {
//     this.router.navigate(['/agent/register-student'], {
//       queryParams: { id: studentId }
//     });
//   }

//   deleteStudent(studentId: number) {
//     // Logic for deleting student by ID
//     this.agentService.deleteStudent(studentId).subscribe(() => {
//       this.students$ = this.agentService.getStudents(); // Refresh the list
//     });
//   }

//   viewStudent(studentId: number) {
//     this.router.navigate(['/agent/view-student'], {
//       queryParams: { id: studentId }
//     });
//   }

//   addStudentDocument(studentId: number) {
//     this.router.navigate(['/agent/add-student-document'], {
//       queryParams: { id: studentId }
//     });
//   }
// }
