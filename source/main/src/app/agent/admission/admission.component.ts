import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AgentService } from '../agent.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';

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
      activeRoute: `${this.router.url}`

    },
  ];
  searchForm: FormGroup;
  data: any[] = [];  // Array to hold the search results
  mainRoute:string;

  // Pagination variables
  totalItems = 0;
  currentPage = 1;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  itemsPerPage: number = this.pageSizeOptions[0];
  mainRoute: string
  // Form controls for autocomplete inputs
  programCtrl = new FormControl();
  sessionCtrl = new FormControl();
  intakeYearCtrl = new FormControl();
  countryCtrl = new FormControl();
  instituteCtrl = new FormControl();
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

  instituteOptions = [];
  filteredInstituteOptions: Observable<any[]>;

  courseTypeOptions = [];
  filteredCourseTypeOptions: Observable<any[]>;

  programCategoryOptions = [];
  filteredProgramCategoryOptions: Observable<any[]>;


  constructor(private fb: FormBuilder, private adminService: AgentService,  private router: Router, private consultancyService: ConsultancyService) {
 {

    this.searchForm = this.fb.group({
      programId: this.programCtrl,
      
      sessionId: this.sessionCtrl,
      intakeYear: this.intakeYearCtrl,
      countryId: this.countryCtrl,
      instituteId: this.instituteCtrl,
      courseTypeId: this.courseTypeCtrl,
      programCategoryId: this.programCategoryCtrl,
       
    });
  }

  ngOnInit() {


    this.mainRoute = this.router.url;
    console.log(this.mainRoute)

    this.consultancyService.activeRoute.next(this.mainRoute)

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

    // Subscribe to program control changes to fetch sessions based on selected program
    this.programCtrl.valueChanges.subscribe(selectedProgram => {
      const selectedProgramObj = this.programOptions.find(program => program.name === selectedProgram);
      if (selectedProgramObj) {
        this.fetchSessions(selectedProgramObj.id);
      }
    });
  }

  // Fetch functions to retrieve data from the API
  fetchPrograms(instituteId: number) {
    this.adminService.getProgramsByInstitute(instituteId).subscribe((response) => {
      if (response) {
        this.programOptions = response;
        this.filteredProgramOptions = this.createFilter(this.programCtrl, this.programOptions);
      }
    });
  }

  fetchInstitutes(countryId: number) {
    this.adminService.getInstitutesByCountry(countryId).subscribe((response) => {
      this.instituteOptions = response;
      this.filteredInstituteOptions = this.createFilter(this.instituteCtrl, this.instituteOptions);
    });
  }

  fetchSessions(programId: number) {
    this.adminService.getSessionsByProgram(programId).subscribe((response) => {
      if (response) {
        this.sessionOptions = response;
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

  // Submit form to search with pagination
  onSubmit() {
    this.currentPage = 1; // Reset to the first page on new search
    this.getSearchResults();
  }

  // Pagination event handler
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getSearchResults();
  }

  // Fetch paginated results based on search parameters
  private getSearchResults() {
    const selectedCountryObj = this.countryOptions.find(country => country.countryName === this.countryCtrl.value);
    const selectedInstituteObj = this.instituteOptions.find(institute => institute.name === this.instituteCtrl.value);
    const selectedProgramObj = this.programOptions.find(program => program.name === this.programCtrl.value);
    const selectedSessionObj = this.sessionOptions.find(session => session.name === this.sessionCtrl.value);

    const searchParams = {
      CountryId: selectedCountryObj ? selectedCountryObj.id : null,
      InstituteId: selectedInstituteObj ? selectedInstituteObj.id : null,
      ProgramId: selectedProgramObj ? selectedProgramObj.id : null,
      SessionId: selectedSessionObj ? selectedSessionObj.id : null,
      limit: this.itemsPerPage,
      OrderBy: 'Id',
      sortExpression: 'desc',
      CurrentPage: this.currentPage,
      isDeleted: false
    };

    this.adminService.genericSearch(searchParams).subscribe(
      (response) => {
        this.data = response.data;
        this.totalItems = response.pageInfo?.totalRecords || 0;  // Assuming backend response contains totalRecords in pageInfo
      },
      (error) => {
        console.error("API Error: ", error);
      }
    );
  }

  onCancel(): void {
    this.searchForm.reset();
    this.currentPage = 1;  // Reset page to 1
    this.itemsPerPage = this.pageSizeOptions[0];  // Reset to default page size
    this.data = [];  // Reset data to an empty array
  }
  
  onApply(record: any) {
    this.adminService.storeSelectedRecord(record);
    this.adminService.setShowOnlyApplyButton(true); // Set flag to show only "Apply" button
    this.router.navigate(['/agent/list-students'],
      {
     queryParams: {origin: 'admission' }
     
   });

    // this.router.navigate(['/agent/list-students']);
    console.log(record, 'record apply');
}
 
  // Example of reset function
  resetCountrySelection(): void {
    this.countryCtrl.setValue(null);  // This will reset the dropdown to its initial state
    this.searchForm.reset();
  }
   // Reset functions for each field
   resetInstituteSelection(): void {
    this.instituteCtrl.setValue(null);  // Reset Institute selection
    this.resetProgramSelection();
    this.resetSessionSelection();
    // this.searchForm.reset();
  }

  resetProgramSelection(): void {
    this.programCtrl.setValue(null);  // Reset Program selection
    this.resetSessionSelection();
    // this.searchForm.reset();
  }

  resetSessionSelection(): void {
    this.sessionCtrl.setValue(null);  // Reset Session selection
    // this.searchForm.reset();
  }
}
