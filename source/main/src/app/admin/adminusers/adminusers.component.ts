// adminusers.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminusersComponent implements OnInit {
  thirdForm: FormGroup;
  hide3 = true;
  breadscrums = [
    {
      title: 'Admin Users',
      items: ['Forms'],
      active: 'Add Users',
    },
  ];
  user: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
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
      firstName: [''],
      middleName: [''],
      lastName: [''],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      gender: ['', [Validators.required]],
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
        firstName: this.user.firstName || '',
        middleName: this.user.middleName || '',
        lastName: this.user.lastName || '',
        password: this.user.password || '',
        email: this.user.email || '',
        address: this.user.address || '',
        gender: this.user.gender || '',
      });
    }
  }

  onThirdFormSubmit() {
    if (this.thirdForm.valid) {
      console.log('Form Value', this.thirdForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  isFormPrefilled(): boolean {
    return !!this.user && !!this.user.id; // Check if user and user.id exist and are truthy
  }
}
