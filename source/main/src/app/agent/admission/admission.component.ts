import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {
  breadscrums = [
    {
      title: 'Student Admission',
      items: ['Agent'],
      active: 'Search',
    },
  ];
  searchForm: FormGroup;

  // Form controls for autocomplete inputs
  programCtrl = new FormControl();
  sessionCtrl = new FormControl();
  intakeYearCtrl = new FormControl();
  countryCtrl = new FormControl();
  instituteCtrl = new FormControl(); // New control for institutes
  courseTypeCtrl = new FormControl();
  programCategoryCtrl = new FormControl();

  // Options and filtered options for each autocomplete
  programOptions = [];
  filteredProgramOptions: Observable<any[]>;

  sessionOptions = [];
  filteredSessionOptions: Observable<any[]>;

  intakeYearOptions = [];
  filteredIntakeYearOptions: Observable<any[]>;

  countryOptions = [];
  filteredCountryOptions: Observable<any[]>;

  instituteOptions = []; // New array for institute options
  filteredInstituteOptions: Observable<any[]>; // New observable for filtered institutes

  courseTypeOptions = [];
  filteredCourseTypeOptions: Observable<any[]>;

  programCategoryOptions = [];
  filteredProgramCategoryOptions: Observable<any[]>;

  constructor(private fb: FormBuilder, private adminService: AgentService) {
    this.searchForm = this.fb.group({
      programId: this.programCtrl,
      sessionId: this.sessionCtrl,
      intakeYear: this.intakeYearCtrl,
      countryId: this.countryCtrl,
      instituteId: this.instituteCtrl, // Add institute control to the form
      courseTypeId: this.courseTypeCtrl,
      programCategoryId: this.programCategoryCtrl,
    });
  }

  ngOnInit() {
    this.fetchSessions();
    this.fetchIntakeYears();
    this.fetchCountries();
    this.fetchProgramCategories();
    this.fetchCourseTypes();

    // Initialize autocomplete filters
    this.filteredProgramOptions = this.createFilter(this.programCtrl, this.programOptions);
    this.filteredSessionOptions = this.createFilter(this.sessionCtrl, this.sessionOptions);
    this.filteredIntakeYearOptions = this.createFilter(this.intakeYearCtrl, this.intakeYearOptions);
    this.filteredCountryOptions = this.createFilter(this.countryCtrl, this.countryOptions);
    this.filteredProgramCategoryOptions = this.createFilter(this.programCategoryCtrl, this.programCategoryOptions);
    this.filteredCourseTypeOptions = this.createFilter(this.courseTypeCtrl, this.courseTypeOptions);

    // Subscribe to country control changes to fetch institutes
    this.countryCtrl.valueChanges.subscribe(selectedCountry => {
      const selectedCountryObj = this.countryOptions.find(country => country.countryName === selectedCountry);
      if (selectedCountryObj) {
        this.fetchInstitutes(selectedCountryObj.id);
      }
    });

    // Subscribe to institute control changes to fetch programs
    this.instituteCtrl.valueChanges.subscribe(selectedInstitute => {
      const selectedInstituteObj = this.instituteOptions.find(institute => institute.name === selectedInstitute);
      if (selectedInstituteObj) {
        this.fetchPrograms(selectedInstituteObj.id);
      }
    });
  }

  // Fetch functions to retrieve data from the API
  fetchPrograms(instituteId: number) { // Updated to fetch programs by institute ID
    this.adminService.getProgramsByInstitute(instituteId).subscribe((response) => {
      if (response && response) {
        this.programOptions = response;
        this.filteredProgramOptions = this.createFilter(this.programCtrl, this.programOptions);
      }
    });
  }
   // New function to fetch institutes based on selected country ID
   fetchInstitutes(countryId: number) {
    this.adminService.getInstitutesByCountry(countryId).subscribe((response) => {
      this.instituteOptions = response;
      this.filteredInstituteOptions = this.createFilter(this.instituteCtrl, this.instituteOptions);
    });
  }

  fetchSessions() {
    this.adminService.getSessions().subscribe((response) => {
      if (response && response.data) {
        this.sessionOptions = response.data;
        this.filteredSessionOptions = this.createFilter(this.sessionCtrl, this.sessionOptions);
      }
    });
  }

  fetchIntakeYears() {
    this.adminService.getIntakeYears().subscribe((response) => {
      if (response && response.data) {
        this.intakeYearOptions = response.data;
        this.filteredIntakeYearOptions = this.createFilter(this.intakeYearCtrl, this.intakeYearOptions);
      }
    });
  }

  fetchCountries() {
    this.adminService.getCountries().subscribe((response) => {
      if (response && response.data) {
        this.countryOptions = response.data;
        this.filteredCountryOptions = this.createFilter(this.countryCtrl, this.countryOptions);
      }
    });
  }

 

  fetchProgramCategories() {
    this.adminService.getCategory("programCategory").subscribe((data) => {
      this.programCategoryOptions = data;
      this.filteredProgramCategoryOptions = this.createFilter(this.programCategoryCtrl, this.programCategoryOptions);
    });
  }

  fetchCourseTypes() {
    this.adminService.getCategory("courseType").subscribe((data) => {
      this.courseTypeOptions = data;
      this.filteredCourseTypeOptions = this.createFilter(this.courseTypeCtrl, this.courseTypeOptions);
    });
  }

  // Utility function to create filtered autocomplete options
  private createFilter(control: FormControl, options: any[]): Observable<any[]> {
    return control.valueChanges.pipe(
      startWith(''),
      map(value => value ? this.filterOptions(value, options) : options.slice())
    );
  }

  private filterOptions(value: string, options: any[]): any[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => 
      (option.name && option.name.toLowerCase().includes(filterValue)) ||
      (option.countryName && option.countryName.toLowerCase().includes(filterValue))
    );
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      // Submit logic here
    }
  }

  onCancel() {
    this.searchForm.reset();
  }
}
