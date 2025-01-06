import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'app/admin/admin.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-add-dropdown-values',
  templateUrl: './add-dropdown-values.component.html',
  styleUrls: ['./add-dropdown-values.component.scss']
})
export class AddDropdownValuesComponent {
  breadscrums = [
    {
      title: 'Add Dropdown',
      items: ['SuperAdmin','Dropdown'],
      active: 'Add Dropdown',
    },
  ];

  dropdownForm: FormGroup;
  addedValues: string[] = []; // Array to store added dropdown values
  dropDownValues:any

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    // Initialize the form with controls for dropdown name and a temporary value input
    this.dropdownForm = this.fb.group({
      dropdownId: [], // Required field for dropdown name
      value: ['']                          // Temporary field for entering dropdown values
    });

    this.adminService.getDropDown().pipe(map(res=> res['data'])).subscribe(res => this.dropDownValues = res)
  }

  // Method to add value to the array
  addValue(): void {
    console.log("")
    const value = this.dropdownForm.get('value').value?.trim();
    if (value && !this.addedValues.includes(value)) { // Ensure it's not empty or duplicate
      this.addedValues.push(value);
      this.dropdownForm.get('value').reset(); // Clear the input field
    }
  }

  dropDownSelected(value:number){
    this.dropdownForm.get('dropdownId').setValue(value)
    console.log(this.dropdownForm.value)
  }

  // Method to remove value from the array
  removeValue(index: number): void {
    if (index > -1) {
      this.addedValues.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.dropdownForm.value.value = this.addedValues.join(",")
    console.log(this.dropdownForm.value)
    this.adminService.addDropDownValues(this.dropdownForm.value).subscribe(res => console.log(res))
  }
  

  // Method to reset the form or handle cancel action
  onCancel(): void {
    this.dropdownForm.reset();
    this.addedValues = []; // Clear the added values array
    this.router.navigate(['/admin/dropdown']);
  }
}
