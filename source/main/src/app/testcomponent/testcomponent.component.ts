
// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.scss']
})
export class TestcomponentComponent {
  thirdForm: FormGroup;
  hide3 = true;
  breadscrums = [
    {
      title: 'Admin Agents',
      items: ['Forms'],
      active: 'Add Agents',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.initThirdForm();
  }

  initThirdForm() {
    this.thirdForm = this.fb.group({
      agentCompany: [''],
      alternateCompanyName: [''],
      companyAddress: [''],
      companyWebsite: [''],
      agentFirstName: ['', Validators.required],
      agentMiddleName: [''],
      agentLastName: ['', Validators.required],
      agentPhone: ['', Validators.required],
      termcondition: [false, Validators.requiredTrue]
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
