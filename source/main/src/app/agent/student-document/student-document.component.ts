import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-document',
  templateUrl: './student-document.component.html',
  styleUrls: ['./student-document.component.scss']
})
export class StudentDocumentComponent implements OnInit {
  documentForm: FormGroup;
  hide3 = true;
  breadscrums = [
    {
      title: 'Student Details',
      items: ['Forms'],
      active: 'Add Document',
    },
  ];
  user: any;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private agentService: AgentService,
    private router: Router  
  ) {
    this.initDocumentForm();
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

  initDocumentForm() {
    this.documentForm = this.fb.group({
      studentName: [{ value: '',}, Validators.required],
      contactNo: [{ value: '', }, Validators.required],
      documentType: ['', Validators.required],
      remarks: ['', Validators.required],
      file: ['', Validators.required],
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
      this.documentForm.patchValue({
        studentName: this.user.studentName || '',
        contactNo: this.user.contactNo || '',
        documentType: this.user.documentType || '',
        remarks: this.user.remarks || '',
        file: this.user.file || '',
      });
    }
  }

  onDocumentFormSubmit() {
    console.log('User ID:', this.user.id);
    console.log('Form Values:', this.documentForm.value);
    
    if (this.documentForm.valid) {
      if (this.isFormPrefilled()) {
        this.agentService.updateStudentDocument(this.user.id, this.documentForm.value).subscribe(
          response => {
            console.log('Update Success', response);
          },
          error => {
            console.log('Update Error', error);
          }
        );
      } else {
        this.agentService.submitStudentDocument(this.documentForm.value).subscribe(
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
