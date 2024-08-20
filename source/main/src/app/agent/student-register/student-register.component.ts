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
      agentId: ['', Validators.required],
      password: ['', Validators.required],
      instituteId: ['', Validators.required],
    });

    // Debug: Log form status changes
    this.thirdForm.statusChanges.subscribe(status => {
      console.log('Form Status: ', status);
      console.log('Form Errors: ', this.thirdForm.errors);
      console.log('Form Controls: ', this.thirdForm.controls);
    });
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
        agentId: this.user.agentId || '',
        password: this.user.password || '',
        instituteId: this.user.instituteId || '',
      });
    }
  }

  onThirdFormSubmit() {
    if (this.thirdForm.valid) {
      if (this.isFormPrefilled()) {
        this.agentService.updateStudentData(this.user.id, this.thirdForm.value).subscribe(
          response => {
            console.log('Update Success', response);
            this.router.navigate(['/agent/list-students']);
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
            this.router.navigate(['/agent/list-students']);
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

  isFormPrefilled(): boolean {
    return !!this.user && !!this.user.id;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
    });
  }
}
