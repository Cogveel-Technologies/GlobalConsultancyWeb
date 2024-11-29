import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
})
export class SearchableDropdownComponent implements OnInit {
  @Input() options: any[] = []; // Options for the dropdown
  @Input() displayField; // Field to display in the dropdown
  @Input() valueField = 'id'; // Field to emit when selected
  @Input() placeholder = 'Search'; // Placeholder text
  @Input() programInstitute = '';
  @Input() sessionInstitue ='';
  @Input() sessionProgram = '';
  @Input() intakeInstitute = '';
  @Input() intakeProgram = '';
  @Input() intakeSession = '';
  @Input() placeHolder = '';
  @Input() clearInputField = '';
  @Input() instituteConsultancyData = '';

  @Output() selectionChange = new EventEmitter<any>(); // Emit selected option

  filteredOptions: any[] = []; // Filtered options for the dropdown
  searchText = ''; // Search text for filtering


  ngOnInit(): void {
    // If no options are passed, use dummy data
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(){
    if(this.programInstitute){
      this.searchText = this.programInstitute
    }
    if(this.sessionInstitue){
      this.searchText = this.sessionInstitue
    }
    if(this.intakeInstitute){
      this.searchText = this.intakeInstitute
    }
    if(this.intakeProgram){
      this.searchText = this.intakeProgram
    }
    if(this.intakeSession){
      this.searchText = this.intakeSession
    }
    if(this.instituteConsultancyData === ''){
      this.searchText = this.instituteConsultancyData
    }
  }

  filterData(): void {
    const filter = this.searchText.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option[this.displayField]?.toLowerCase().includes(filter)
    );
  }

  onFocus(): void {
    // Ensure filteredOptions is updated when the input field is focused
    this.filteredOptions = [...this.options];
  }

  onSelect(selected: any): void {
    // Update input field to show the name, not the id
    this.searchText = selected[this.displayField];
    // Emit the selected ID (or the full object if needed)
    this.selectionChange.emit(selected[this.valueField]);

    console.log(selected[this.valueField])
  }
}
