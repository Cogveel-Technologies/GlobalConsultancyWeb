import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  thirdForm: FormGroup;
  hide3 = true;
  private subscriptions: Subscription = new Subscription(); // Manage all subscriptions

  breadscrums = [
    {
      title: 'Admin Roles',
      items: ['Admin'],
      active: 'Add Roles',
    },
  ];

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.initThirdForm();
  }

  ngOnInit(): void {
    this.initThirdForm();
  }

  initThirdForm() {
    this.thirdForm = this.fb.group({
      roleName: ['', Validators.required], // Added Validators.required to ensure the field is not empty
    });
  }

  onThirdFormSubmit() {
    if (this.thirdForm.valid) {
      const roleCreationSubscription = this.adminService.createRole(this.thirdForm.value).subscribe({
        next: (response) => {
          console.log('Role created successfully:', response);
          // Handle success, e.g., show a success message, reset the form, etc.
          this.router.navigate(['/admin/listrole']);
        },
        error: (error) => {
          console.error('Error creating role:', error);
          // Handle error, e.g., show an error message to the user
        }
      });
  
      this.subscriptions.add(roleCreationSubscription);
    } else {
      console.log('Form is not valid');
      this.thirdForm.markAllAsTouched();
    }
  }
  

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
}
