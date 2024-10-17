// import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent {
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
      agentFirstName: [''],
      agentMiddleName: [''],
      agentLastName: [''],
      agentPhone: [''],
      email: [''],
      // termcondition: [false, Validators.requiredTrue]
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
