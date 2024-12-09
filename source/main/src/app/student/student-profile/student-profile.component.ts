import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Student } from 'app/agent/models/student.model';
import { AgentService } from 'app/agent/agent.service';
import { PaginatedResponse } from 'app/agent/agent.service'; 
import { StudentDocument } from 'app/agent/models/studentDocument.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  documentForm: FormGroup;
  educationData: any;
  isEditMode = false;
  isEditsMode = false;
  isEdittingMode = false; 
  testByStudentId$: Observable<any>;
  educationEntries$!: Observable<any>;
  isLinear = false;
  ContactForm?: FormGroup;
  educationForm: FormGroup;
  testForm: FormGroup;

  errorMessage = '';
  documentToEditId: number | null = null;
  testData: any;
  selectedRecord: any;
  selectedId: number | null = null;
  studentData: Student | null = null;
  countries: any[] = [];

  student: Student | null = null;
  breadscrums = [
    {
      title: 'Student Profile',
      items: ['Student'],
      active: 'Student Profile',
    },
  ];
  documentTypes: any[] = [];
  uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>;

  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, 
              private agentService: AgentService,
              private router: Router,
              private fb: FormBuilder) {  }

  ngOnInit() {
    const studentId = localStorage.getItem('id');
    if (studentId) {
      const studentSubscription = this.agentService.getStudentById(+studentId).subscribe(
        (student: Student) => {
          this.student = student;
          console.log('Fetched student:', this.student);
          this.testByStudId();
          this.loadUploadedDocument();
          this.loadCountries();
          this.fetchStudentEducation();
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
      this.subscriptions.add(studentSubscription);
    } else {
      console.error('No student ID found in localStorage');
    }

    this.loadDocumentTypes();
    // this.testByStudId();
   

    this.testForm = this.fb.group({
      testName: ['', Validators.required],
      testType: ['', Validators.required],
      subject: ['', Validators.required],
      testDate: ['', Validators.required],
      testDuration: ['', Validators.required],
      score: ['', Validators.required],
    });

    this.educationForm = this.fb.group({
      id: [null], // Use this field to track if it's edit mode
      countryOfEducation: [],
      higherLevelOfEducation: [],
      gradingScheme: [],
      gradingAverage: [],
    });
  }

  loadDocumentTypes() {
    const documentTypesSubscription = this.agentService.getDocumentTypes().subscribe(
      (response) => {
        if (response.status === 200) {
          this.documentTypes = response.data;
        } else {
          console.error('Failed to load document types:', response.message);
        }
      },
      (error) => {
        console.error('Error loading document types:', error);
      }
    );
    this.subscriptions.add(documentTypesSubscription);
  }

  loadUploadedDocument() {
    if (this.student) {
      this.uploadedDocument$ = this.agentService.getUploadedDocuments({
        studentId: this.student.id,
        limit: 10,
        orderBy: 'Id',
        sortExpression: 'desc',
        currentPage: 1,
        isDeleted: false 
      });
    }
  }

  getDocumentTypeName(documentTypeId: number): string {
    const documentType = this.documentTypes.find(type => type.id === documentTypeId);
    return documentType ? documentType.documentType : 'Unknown';
  }

  viewDocument(documentUrl: string) {
    window.open(documentUrl, '_blank');
  }

  editStudent() {
    if (this.student) {
      this.router.navigate(['/agent/register-student'], {
        queryParams: { id: this.student.id, origin: 'studentProfile' }
      });
    }
  }
    // Function to load countries
    loadCountries() {
      this.agentService.getCountries().subscribe(
        (response) => {
          this.countries = response.data; // Assuming your API returns a "data" array with countries
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
    }

  editDocument() {
    if (this.student) {
      this.router.navigate(['/agent/student-document'], {
        queryParams: { id: this.student.id, origin: 'studentProfile' }
      });
    }
  }

  onTestSubmit(): void {
    if (this.testForm.valid) {
      const testData = {
        testName: this.testForm.value.testName,
        subject: this.testForm.value.subject,
        studentId:this.student.id,
        testType: this.testForm.value.testType,
        testDate: this.testForm.value.testDate,
        testDuration: this.testForm.value.testDuration.toString(),
        score: this.testForm.value.score.toString(),
      };

      if (this.isEditsMode) {
        this.agentService.updateTest(this.testData.id, testData).subscribe({
          next: () => {
            console.log('Test details updated successfully');
            this.testByStudId();
            this.onTestReset();
          },
          error: (error) => {
            console.error('Error updating test details:', error);
          },
        });
      } else {
        this.agentService.addTest(testData).subscribe({
          next: () => {
            console.log('Test details added successfully');
            this.testByStudId();
            this.testForm.reset();
          },
          error: (error) => {
            console.error('Error saving test details:', error);
          },
        });
      }
    }
  }

  onTestReset(): void {
    this.testForm.reset();
    this.isEditsMode = false;
  }

  testByStudId() {
   
      const studentId = this.student.id;
      this.testByStudentId$ = this.agentService.getAllTestByStudentId(studentId);
  
      // Subscribe to the observable to print the response
      this.testByStudentId$.subscribe(response => {
        console.log('Response:', response); // Logs the response
      });
    
  }
  
  updateTest(id: number): void {
    this.agentService.getTestByStudentId(id).subscribe({
      next: (response) => {
        if (response?.data) {
          this.testData = response.data;
          console.log('Fetched test data:', this.testData);
          this.patchTestForm(this.testData);
          window.scrollTo(0, 650);
        } else {
          console.warn('No test data found for the provided ID.');
        }
      },
      error: (error) => {
        console.error('Error fetching test entry:', error);
      },
    });
  }

  patchTestForm(data: any): void {
    this.isEditsMode = true;
    this.testForm.patchValue({
      testName: data.testName,
      testType: data.testType,
      testDate: data.testDate,
      subject: data.subject,
      testDuration: data.testDuration,
      score: data.score,
    });
  }

  deleteTest(id: number): void {
    this.agentService.deleteTestById(id).subscribe({
      next: () => {
        console.log("Test deleted successfully");
        this.testByStudId();
      },
      error: (error) => {
        console.error('Error deleting test entry:', error);
      },
    });
  }

  onAddEducation() {
    window.scrollTo(0, 650);
  }
   // Reset the form and exit edit mode
   onEducationNext(): void {
    if (this.educationForm.valid) {
      const educationData = {
        studentId: this.student.id,// Replace with actual student ID
        countryOfEducation: this.educationForm.value.countryOfEducation,
        higherLevelOfEducation: this.educationForm.value.higherLevelOfEducation,
        gradingScheme: this.educationForm.value.gradingScheme,
        gradingAverage: this.educationForm.value.gradingAverage,
      };
  
      if (this.isEdittingMode) {
        this.agentService.updateEducationEntryByEducationId(this.educationData.id, educationData)
          .subscribe({
            next: (response) => {
              console.log('Education details updated successfully:', response);
              this.fetchStudentEducation(); // Refresh the grid
              this.resetForm();
            },
            error: (error) => {
              console.error('Error updating education details:', error);
            },
          });
      } else {
        this.agentService.addEducation(educationData)
          .subscribe({
            next: (response) => {
              console.log('Education details added successfully:', response);
              this.fetchStudentEducation(); // Refresh the grid
              this.resetForm();
            },
            error: (error) => {
              console.error('Error saving education details:', error);
            },
          });
      }
    } else {
      console.log('Please fill out all required fields.');
    }
  }
  
  resetForm(): void {
    this.educationForm.reset();
    this.isEdittingMode = false;
  }


deleteEducation(id: number): void {
  this.agentService.deleteEducation(id).subscribe({
    next: () => {
        console.log("education deleted successfullyyyyyyyyy")
      // Refresh the grid
      // this.educationEntries$ = this.agentService.getEducationEntriesByStudentId(id);
      this.fetchStudentEducation();
    },
    error: (error) => {
      console.error('Error deleting education entry:', error);
      
    },
  });
}




fetchStudentEducation(){
  // Fetch and handle education data
     this.agentService.getEducationEntriesByStudentId(this.student.id).subscribe({
     next: (response) => {
     console.log('Service response:', response); // Log the response
     this.educationEntries$ = of(response.data ? [response.data] : []); // Pass the response to educationEntries$
    // this.educationEntries$ = response.data ; // Pass the response to educationEntries$
// Log the educationEntries$ Observable
this.educationEntries$.subscribe({
  next: (data) => {
    console.log('Logged data from educationEntries$', data); // This will log the emitted data
  },
  error: (error) => {
    console.error('Error in educationEntries$ observable:', error);
  }
});
},
error: (error) => {
console.error('Error fetching education entries:', error); // Log the error
// this.educationEntries$ = of([]); // Empty observable on error
},
});


}


updateEducation(id: number): void {
  // Fetch the education entry by ID from the service
  this.agentService.getEducationEntryByEducationId(id).subscribe({
    next: (response) => {
      // Store the response in educationData
      this.educationData = response.data; // Assuming response.data contains the education information
      console.log('Fetched education data:', this.educationData);
      
      // Optionally, call another function to patch the form with this data
      this.patchEducationForm(this.educationData);

      // Scroll to the bottom of the page after patching the form
      window.scrollTo(0, 600);
    },
    error: (error) => {
      console.error('Error fetching education entry:', error);
    },
  });
}

// Function to patch form data, assuming you have a form to populate
patchEducationForm(data: any): void {
  // Your logic for patching the form
  // This is an example if you are using a reactive form (FormGroup)
  this.isEdittingMode = true;
  this.educationForm.patchValue({
    countryOfEducation: data.countryOfEducation,
    higherLevelOfEducation: data.higherLevelOfEducation,
    gradingScheme: data.gradingScheme,
    gradingAverage: data.gradingAverage,
  });
}


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
