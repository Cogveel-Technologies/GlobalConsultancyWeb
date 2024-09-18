// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { AgentService } from '../agent.service';
// import * as CryptoJS from 'crypto-js';

// @Component({
//   selector: 'app-student-register',
//   templateUrl: './student-register.component.html',
//   styleUrls: ['./student-register.component.scss']
// })
// export class StudentRegisterComponent implements OnInit {
//   thirdForm: FormGroup;
//   hide3 = true;
//   breadscrums = [
//     {
//       title: 'Student Details',
//       items: ['Forms'],
//       active: 'Add Student',
//     },
//   ];
//   user: any;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder, 
//     private route: ActivatedRoute, 
//     private router: Router, 
//     private snackBar: MatSnackBar, 
//     private agentService: AgentService
//   ) {
//     this.initThirdForm();
//   }

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       const studentId = params['id'];
//       if (studentId) {
//         console.log(studentId, ".....................");
//         this.fetchStudentById(studentId);
//       }
//     });
//   }

//   initThirdForm() {
//     this.thirdForm = this.fb.group({
//       studentName: ['', Validators.required],
//       dob: ['', Validators.required],
//       citizenship: ['', Validators.required],
//       language: ['', Validators.required],
//       passportExpiry: ['', Validators.required],
//       emailAddress: ['', [Validators.required, Validators.email]],
//       contactNo: ['', Validators.required],
//       residentialAddress: ['', Validators.required],
//       mailingAddress: ['', Validators.required],
//       agentId: ['', Validators.required],
//       password: ['', Validators.required],
//       instituteId: ['', Validators.required],
//     });

//     // Debug: Log form status changes
//     this.thirdForm.statusChanges.subscribe(status => {
//       console.log('Form Status: ', status);
//       console.log('Form Errors: ', this.thirdForm.errors);
//       console.log('Form Controls: ', this.thirdForm.controls);
//     });
//   }

//   decryptData(data: string): string {
//     const key = CryptoJS.enc.Utf8.parse('1234567890123456');
//     const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
//     const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
//     return decrypted.toString(CryptoJS.enc.Utf8);
//   }

//   fetchStudentById(studentId: string) {
//     this.agentService.getStudentById(+studentId).subscribe(
//       student => {
//         this.user = student;
//         this.patchForm();
//       },
//       error => {
//         console.error('Error fetching student data:', error);
//       }
//     );
//   }

//   patchForm() {
//     if (this.user) {
//       this.thirdForm.patchValue({
//         studentName: this.user.studentName || '',
//         dob: this.user.dob || '',
//         citizenship: this.user.citizenship || '',
//         language: this.user.language || '',
//         passportExpiry: this.user.passportExpiry || '',
//         emailAddress: this.user.emailAddress || '',
//         contactNo: this.user.contactNo || '',
//         residentialAddress: this.user.residentialAddress || '',
//         mailingAddress: this.user.mailingAddress || '',
//         agentId: this.user.agentId || '',
//         password: this.user.password || '',
//         instituteId: this.user.instituteId || '',
//       });
//     }
//   }

//   onThirdFormSubmit() {
//     if (this.thirdForm.valid) {
//       const origin = this.route.snapshot.queryParams['origin']; // Fetch the origin parameter
  
//       if (this.isFormPrefilled()) {
//         this.agentService.updateStudentData(this.user.id, this.thirdForm.value).subscribe(
//           response => {
//             console.log('Update Success', response);
//             this.navigateToOrigin(origin);
//           },
//           error => {
//             console.log('Update Error', error);
//             this.showSnackBar('Update failed. Please try again.');
//           }
//         );
//       } else {
//         this.agentService.submitStudentData(this.thirdForm.value).subscribe(
//           response => {
//             console.log('Submit Success', response);
//             this.router.navigate(['/agent/list-students']);
//           },
//           error => {
//             console.log('Submit Error', error);
//             this.showSnackBar('Submission failed. Please try again.');
//           }
//         );
//       }
//     } else {
//       this.errorMessage = 'Please fill all required fields.';
//       console.log('Form is not valid');
//     }
//   }
  
//   // Utility method to handle navigation based on origin
//   navigateToOrigin(origin: string) {
//     if (origin === 'studentProfile') {
//       this.router.navigate(['/student/student-profile']);
//     } else if (origin === 'listStudents') {
//       this.router.navigate(['/agent/list-students']);
//     } else {
//       // Navigate to a defined default route or handle the absence of origin
//       this.router.navigate(['/agent/list-students']); // Ensure this route exists
//     }
//   }
  
//   isFormPrefilled(): boolean {
//     return !!this.user && !!this.user.id;
//   }

//   showSnackBar(message: string) {
//     this.snackBar.open(message, 'Close', {
//       duration: 4000,
//     });
//   }
//   onCancel() {
//     const origin = this.route.snapshot.queryParams['origin'];
  
//     if (origin === 'studentProfile') {
//       this.router.navigate(['/student/student-profile']);
//     } else if (origin === 'listStudents') {
//       this.router.navigate(['/agent/list-students']);
//     } else {
//       // Navigate to a defined default route or handle the absence of origin
//       this.router.navigate(['/agent/list-students']); // Ensure this route exists
//     }
//   }
  
  
  
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentService } from '../agent.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {
  thirdForm: FormGroup;
  hide3 = true;
  breadscrums = [
    {
      title: 'Student Details',
      items: ['Forms'],
      active: 'Add Student',
    },
  ];
  user: any;
  errorMessage: string = '';
  agents: any[] = []; // To store agent list from backend
  institutes: any[] = []; // To store institute list from backend

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private snackBar: MatSnackBar, 
    private agentService: AgentService
  ) {
    this.initThirdForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const studentId = params['id'];
      if (studentId) {
        console.log(studentId, ".....................");
        this.fetchStudentById(studentId);
      }
    });
    this.fetchAgents();
    this.fetchInstitutes();
  }

  initThirdForm() {
    this.thirdForm = this.fb.group({
      studentName: ['', Validators.required],
      dob: ['', Validators.required],
      citizenship: ['', Validators.required],
      language: ['', Validators.required],
      passportExpiry: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      residentialAddress: ['', Validators.required],
      mailingAddress: ['', Validators.required],
      agentId: ['', Validators.required], // Dropdown for agent
      password: ['', Validators.required],
      instituteId: ['', Validators.required], // Dropdown for institute
    });

    // Debug: Log form status changes
    this.thirdForm.statusChanges.subscribe(status => {
      console.log('Form Status: ', status);
      console.log('Form Errors: ', this.thirdForm.errors);
      console.log('Form Controls: ', this.thirdForm.controls);
    });
  }

  // Fetch agents from backend
  fetchAgents() {
    this.agentService.getAgents().subscribe(
      (data) => {
        this.agents = data;
        console.log('Agents:', this.agents);
      },
      (error) => {
        console.error('Error fetching agents:', error);
      }
    );
  }

  // Fetch institutes from backend
  fetchInstitutes() {
    this.agentService.getInstitutes().subscribe(
      (data) => {
        this.institutes = data;
        console.log('Institutes:', this.institutes);
      },
      (error) => {
        console.error('Error fetching institutes:', error);
      }
    );
  }

  decryptData(data: string): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
    const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  fetchStudentById(studentId: string) {
    this.agentService.getStudentById(+studentId).subscribe(
      student => {
        this.user = student;
        this.patchForm();
      },
      error => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  patchForm() {
    if (this.user) {
      this.thirdForm.patchValue({
        studentName: this.user.studentName || '',
        dob: this.user.dob || '',
        citizenship: this.user.citizenship || '',
        language: this.user.language || '',
        passportExpiry: this.user.passportExpiry || '',
        emailAddress: this.user.emailAddress || '',
        contactNo: this.user.contactNo || '',
        residentialAddress: this.user.residentialAddress || '',
        mailingAddress: this.user.mailingAddress || '',
        agentId: this.user.agentId || '', // Set agent from fetched data
        password: this.user.password || '',
        instituteId: this.user.instituteId || '', // Set institute from fetched data
      });
    }
  }

  onThirdFormSubmit() {
    if (this.thirdForm.valid) {
      const origin = this.route.snapshot.queryParams['origin']; // Fetch the origin parameter

      if (this.isFormPrefilled()) {
        this.agentService.updateStudentData(this.user.id, this.thirdForm.value).subscribe(
          response => {
            console.log('Update Success', response);
            this.navigateToOrigin(origin);
          },
          error => {
            console.log('Update Error', error);
            this.showSnackBar('Update failed. Please try again.');
          }
        );
      } else {
        this.agentService.submitStudentData(this.thirdForm.value).subscribe(
          response => {
            console.log('Submit Success', response);
            this.navigateToOrigin(origin);
          },
          error => {
            console.log('Submit Error', error);
            this.showSnackBar('Submission failed. Please try again.');
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill all required fields.';
      console.log('Form is not valid');
    }
  }

  // Utility method to handle navigation based on origin
  navigateToOrigin(origin: string) {
    if (origin === 'studentProfile') {
      this.router.navigate(['/student/student-profile']);
    } else if (origin === 'listStudents') {
      this.router.navigate(['/agent/list-students']);
    } else {
      // Navigate to a defined default route or handle the absence of origin
      this.router.navigate(['/agent/list-students']); // Ensure this route exists
    }
  }

  isFormPrefilled(): boolean {
    return !!this.user && !!this.user.id;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
    });
  }

  onCancel() {
    const origin = this.route.snapshot.queryParams['origin'];

    if (origin === 'studentProfile') {
      this.router.navigate(['/student/student-profile']);
    } else if (origin === 'listStudents') {
      this.router.navigate(['/agent/list-students']);
    } else {
      // Navigate to a defined default route or handle the absence of origin
      this.router.navigate(['/agent/list-students']); // Ensure this route exists
    }
  }
}
