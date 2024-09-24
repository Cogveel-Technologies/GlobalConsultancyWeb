import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminusersComponent implements OnInit, OnDestroy {
  thirdForm: FormGroup;
  hide3 = true;
  breadscrums = [
    {
      title: 'Add Users',
      items: ['Admin'],
      active: 'Users',
    },
  ];
  user: any;
  errorMessage: string = '';
  genders: string[] = ['Male', 'Female', 'Other'];

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {
    this.initThirdForm();
  }

  ngOnInit() {
    const routeSub = this.route.queryParams.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        console.log(userId, ".....................");
        this.fetchUserById(userId);
      }
    });
    this.subscriptions.push(routeSub);
  }

  initThirdForm() {
    this.thirdForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      gender: ['', Validators.required],
      // phoneNumber: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    });

    // Debug: Log form status changes
    const formStatusSub = this.thirdForm.statusChanges.subscribe(status => {
      console.log('Form Status: ', status);
      console.log('Form Errors: ', this.thirdForm.errors);
      console.log('Form Controls: ', this.thirdForm.controls);
    });
    this.subscriptions.push(formStatusSub);
  }

  decryptData(data: string): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Your secret key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Initialization vector
    const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  fetchUserById(userId: string) {
    const fetchUserSub = this.adminService.getUserById(+userId).subscribe(
      user => {
        this.user = user;
        this.patchForm();
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
    this.subscriptions.push(fetchUserSub);
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
        phoneNumber: this.user.phoneNumber || '',
      });
    }
  }

  onThirdFormSubmit() {
    if (this.thirdForm.valid) {
      const submitSub = (this.isFormPrefilled() ?
        this.adminService.updateUserData(this.user.id, this.thirdForm.value) :
        this.adminService.submitUserData(this.thirdForm.value)
      ).subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['/admin/listusers']);
        },
        error => {
          console.log('Error', error);
          this.showSnackBar(this.isFormPrefilled() ? 'Update failed. Please try again.' : 'Submission failed. Please try again.');
        }
      );
      this.subscriptions.push(submitSub);
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
