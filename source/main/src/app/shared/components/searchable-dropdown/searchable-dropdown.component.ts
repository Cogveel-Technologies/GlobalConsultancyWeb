import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
})
export class SearchableDropdownComponent implements OnInit, OnChanges {
  @Input() options: any[] = []; // Options for the dropdown
  @Input() displayField; // Field to display in the dropdown
  @Input() valueField = 'id'; // Field to emit when selected
  @Input() placeholder = 'Search'; // Placeholder text
  @Input() programInstitute = '';
  @Input() sessionInstitue = '';
  @Input() sessionProgram = '';
  @Input() intakeInstitute = '';
  @Input() intakeProgram = '';
  @Input() intakeSession = '';
  @Input() placeHolder = '';
  @Input() clearInputField = '';
  @Input() instituteConsultancyData = '';
  @Input() instituteCountry = ''
  @Input() instituteConsultancy = ''

  @Output() selectionChange = new EventEmitter<any>(); // Emit selected option

  filteredOptions: any[] = []; // Filtered options for the dropdown
  searchText = ''; // Search text for filtering

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  ngOnChanges(): void {
    if (this.programInstitute) {
      this.searchText = this.programInstitute;
    } else if (this.sessionInstitue) {
      this.searchText = this.sessionInstitue;
    } else if (this.intakeInstitute) {
      this.searchText = this.intakeInstitute;
    } else if (this.intakeProgram) {
      this.searchText = this.intakeProgram;
    } else if (this.intakeSession) {
      this.searchText = this.intakeSession;
    } else if (this.instituteConsultancyData === '') {
      this.searchText = this.instituteConsultancyData;
    } 
    
    if(this.instituteConsultancy){
      this.searchText = this.instituteConsultancy
    }
     if(this.instituteCountry){
      this.searchText = this.instituteCountry
    }
  
    this.cdr.detectChanges();
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

    console.log(selected[this.valueField]);
  }
}
