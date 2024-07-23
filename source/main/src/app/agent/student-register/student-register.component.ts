import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private agentService: AgentService) {
    this.initThirdForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encryptedData = params['data'];
      if (encryptedData) {
        this.user = this.decryptData(encryptedData);
        this.patchForm();
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
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      agent: ['', Validators.required],
      residentialAddress: ['', Validators.required],
      mailingAddress: ['', Validators.required],
    });
  }

  decryptData(data: string): any {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // Your secret key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
    const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  patchForm() {
    if (this.user) {
      this.thirdForm.patchValue({
        studentName: this.user.studentName || '',
        dob: this.user.dob || '',
        citizenship: this.user.citizenship || '',
        language: this.user.language || '',
        passportExpiry: this.user.passportExpiry || '',
        email: this.user.email || '',
        contactNo: this.user.contactNo || '',
        agent: this.user.agent || '',
        residentialAddress: this.user.residentialAddress || '',
        mailingAddress: this.user.mailingAddress || '',
      });
    }
  }

  onThirdFormSubmit() {
    if (this.thirdForm.valid) {
      if (this.isFormPrefilled()) {
        this.agentService.updateStudentData(this.user.id, this.thirdForm.value).subscribe(
          response => {
            console.log('Update Success', response);
          },
          error => {
            console.log('Update Error', error);
          }
        );
      } else {
        this.agentService.submitStudentData(this.thirdForm.value).subscribe(
          response => {
            console.log('Submit Success', response);
          },
          error => {
            console.log('Submit Error', error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill all required fields.';
      console.log('Form is not valid');
    }
  }

  isFormPrefilled(): boolean {
    return !!this.user && !!this.user.id; // Check if user and user.id exist and are truthy
  }
}
