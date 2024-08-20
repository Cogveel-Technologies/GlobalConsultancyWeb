// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  thirdForm: FormGroup;
  hide3 = true;
  breadscrums = [
    {
      title: 'Admin Roles',
      items: ['Roles'],
      active: 'Add Roles',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.initThirdForm();
  }

  initThirdForm() {
   this.thirdForm = this.fb.group({
      
      adminRole: [''],
    
    });
  }

  onThirdFormSubmit() {
    if (this.thirdForm.valid) {
      console.log('Form Value', this.thirdForm.value);
      // You can add further logic here to handle form submission, e.g., sending data to a server.
    } else {
      console.log('Form is not valid');
      // Optionally, mark all fields as touched to trigger validation messages in the UI.
      this.thirdForm.markAllAsTouched();
    }
  }
}
