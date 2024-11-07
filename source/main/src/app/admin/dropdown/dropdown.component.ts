import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  breadscrums = [
    {
      title: 'Add Dropdown',
      items: ['Admin'],
      active: 'Dropdown',
    },
  ];

  dropdownForm: FormGroup;
  addedValues: string[] = []; // Array to store added dropdown values

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    // Initialize the form with controls for dropdown name and a temporary value input
    this.dropdownForm = this.fb.group({
      dropDownListName: ['', Validators.required], // Required field for dropdown name
      dropDownValue: ['']                          // Temporary field for entering dropdown values
    });
  }

  // Method to add value to the array
  addValue(): void {
    const value = this.dropdownForm.get('dropDownValue').value?.trim();
    if (value && !this.addedValues.includes(value)) { // Ensure it's not empty or duplicate
      this.addedValues.push(value);
      this.dropdownForm.get('dropDownValue').reset(); // Clear the input field
    }
  }

  // Method to remove value from the array
  removeValue(index: number): void {
    if (index > -1) {
      this.addedValues.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.dropdownForm.get('dropDownListName').valid && this.addedValues.length > 0) {
      const dropdownData = {
        dropDownListId: 0,  // Assuming this is 0 for new entries
        dropDownListName: this.dropdownForm.value.dropDownListName,
        dropDownValues: this.addedValues.join(','),  // Convert array to comma-separated string
        createdBy: 0,  // Set the createdBy ID (update this as needed)
        updatedBy: 0   // Set the updatedBy ID (update this as needed)
      };
  
      this.adminService.submitDropdownData(dropdownData).subscribe(
        response => {
          console.log('Data submitted successfully:', response);
          // this.dropdownForm.reset();
          this.addedValues = [];
        },
        error => {
          console.error('Error submitting data:', error);
        }
      );
    } else {
      console.log('Form is invalid or no values added');
    }
  }
  

  // Method to reset the form or handle cancel action
  onCancel(): void {
    this.dropdownForm.reset();
    this.addedValues = []; // Clear the added values array
  }
}
