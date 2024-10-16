
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  programOptions = [];
  sessionOptions = [];
  intakeYearOptions = [];
  countryOptions = [];
  courseTypeOptions = [];
  programCategoryOptions = [];

  constructor(private fb: FormBuilder, private adminService: AgentService) {
    this.searchForm = this.fb.group({
      programId: [''],
      sessionId: [''],
      intakeYear: [''],
      countryId: [''],
      courseTypeId: [''],
      programCategoryId: ['']
    });
  }

  ngOnInit() {
    this.fetchPrograms();
    this.fetchSessions();
    this.fetchIntakeYears();
    this.fetchCountries();
    // this.fetchCourseTypes();
    // this.fetchProgramCategories();
    this.fetchProgramCategories(); // Fetch program categories
    this.fetchCourseTypes(); // Fetch course types
  }

  fetchPrograms() {
    this.adminService.getPrograms().subscribe((response) => {
      this.programOptions = response.data; // Access the 'data' property
     
    });
  }
  
  fetchSessions() {
    this.adminService.getSessions().subscribe((response) => {
      if (response && response.data) {
        this.sessionOptions = response.data;
      }
    });
  }
  
  fetchIntakeYears() {
    this.adminService.getIntakeYears().subscribe((response) => {
      if (response && response.data) {
        this.intakeYearOptions = response.data;
       
      }
    });
  }
  

  fetchCountries() {
    this.adminService.getCountries().subscribe((response) => {
      if (response && response.data) {
        this.countryOptions = response.data;
      }
    });
  }
   
  fetchProgramCategories() {
    this.adminService.getCategory("programCategory").subscribe((data) => {
      this.programCategoryOptions = data;
    });
  }
  
  fetchCourseTypes() {
    this.adminService.getCategory("courseType").subscribe((data) => {
      this.courseTypeOptions = data;
    });
  }
  
  // fetchCourseTypes() {
  //   this.adminService.getCourseTypes().subscribe((data) => {
  //     this.courseTypeOptions = data;
  //   });
  // }

  // fetchProgramCategories() {
  //   this.adminService.getProgramCategories().subscribe((data) => {
  //     this.programCategoryOptions = data;
  //   });
  // }

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
