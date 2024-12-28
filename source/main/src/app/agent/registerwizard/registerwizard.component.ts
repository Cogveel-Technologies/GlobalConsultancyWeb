
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AgentService } from '../agent.service';
import { Student } from '../models/student.model'; // Adjust the import as necessary
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../agent.service'; // Import the PaginatedResponse interface
import { StudentDocument } from '../models/studentDocument.model';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';





@Component({
  selector: 'app-registerwizard',
  templateUrl: './registerwizard.component.html',
  styleUrls: ['./registerwizard.component.scss']
})
export class RegisterwizardComponent implements OnInit {


  // HFormGroup2: FormGroup;
  documentForm: FormGroup;
  educationData: any;  // Define educationData to store the fetched data
  documentTypes: any[] = [];  
  isEditMode = false; 
  isEditsMode = false; 
  isEdittingMode = false; 
   uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>;
  //  tests$: Observable<any>; // Observable to hold the test data
  testByStudentId$: Observable<any>; // Observable to hold API response
  educationEntries$!: Observable<any>;
  isLinear = false;
  HFormGroup1?: UntypedFormGroup;
  HFormGroup2?: UntypedFormGroup;
  ContactForm?: UntypedFormGroup;
  educationForm: UntypedFormGroup;
  testForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Edit Student',
      items: ['Student List'],
      active: 'Edit Student',
    },
  ];

  errorMessage = '';
  isEditModee = false; // Track whether we are in edit mode
  
  documentToEditId: number | null = null; // Store the ID of the document being edited
  testData: any;
  selectedRecord: any;
  selectedId: number | null = null;  // Explicit type for clarity
  studentData: Student | null = null;
  countries: any[] = [];
  iseditingmode = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _formBuilder: UntypedFormBuilder,
    private agentService: AgentService,
    private router: Router,
    private dialog: MatDialog,
  ) {
   
    // Retrieve the selected ID in the constructor
    // this.selectedId = this.agentService.getSelectedId();
    // console.log('Selected ID:', this.selectedId);
    

    // Retrieve query parameters in the constructor
    this.route.queryParams.subscribe(params => {
      this.selectedId = +params['id'] || null; // Use '+' to convert string to number
      console.log('Student ID:', this.selectedId);
    });





    this.loadCountries();
    
   
  }


  ngOnInit(): void {
    this.agentService.studentPaginationState.subscribe(res => {
      if(res){
        this.agentService.pagination.next(true)
      }
    })


    this.loadUploadedDocument();
    this.selectedRecord = this.agentService.getSelectedRecord();
    this.fetchStudentById(this.selectedId);
     
     this.fetchStudentEducation();
    
     this.testByStudId();
     this.initDocumentForm();


    

    // Initialize form groups
    this.HFormGroup1 = this._formBuilder.group({});
    
    this.ContactForm = this._formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      residentialAddress: ['', Validators.required],
      mailingAddress: ['', Validators.required]
    });

    this.HFormGroup2 = this._formBuilder.group({
      // file: ['', Validators.required],
      studentName: ['', Validators.required],  // Required field with no initial value
      dob: ['', Validators.required],  // Required date of birth field
      citizenship: ['', Validators.required],  // Required citizenship field
      language: ['', Validators.required],  // Required language field
      passportExpiry: ['', Validators.required],  // Required passport expiry field
      emailAddress: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      residentialAddress: ['', Validators.required],
      mailingAddress: ['']

    });
    this.educationForm = this.fb.group({
      id: [null], // Use this field to track if it's edit mode
      countryOfEducation: [],
      higherLevelOfEducation: [],
      gradingScheme: [],
      gradingAverage: [],
    });
    this.testForm = this.fb.group({
      testName: [],
      testType: [],
      subject: [],
      testDate: [],
      testDuration: [],
      score: [],
    });

    this.loadDocumentTypes();
  }


  private fetchStudentById(id: number): void {
    this.agentService.getStudentById(id).subscribe(
      (student) => {
        this.studentData = student;
        console.log('Fetched student data:', this.studentData);
        this.loadUploadedDocument();
        this.patchForm(); // Call patchForm here
      },
      (error) => console.error('Error fetching student data:', error)
    );
  }

  toggleEdit() {
    this.iseditingmode = !this.iseditingmode;
    
    if (this.iseditingmode) {
      // Populate the form group with student data when editing starts
      this.HFormGroup2.patchValue({
        studentName: this.studentData?.studentName || '',
        dob: this.studentData?.dob ? new Date(this.studentData.dob).toISOString().split('T')[0] : '',  // Ensure valid date format
        citizenship: this.studentData?.citizenship || '',
        language: this.studentData?.language || '',
        passportExpiry: this.studentData?.passportExpiry ? new Date(this.studentData.passportExpiry).toISOString().split('T')[0] : '', // Ensure valid date format
        emailAddress: this.studentData?.emailAddress || '',
        contactNo: this.studentData?.contactNo || '',
        residentialAddress: this.studentData?.residentialAddress || '',
        mailingAddress: this.studentData?.mailingAddress || ''
      });
    } else {
      // Save changes and call update API if exiting edit mode
      if (this.HFormGroup2.valid) {
        this.updateStudent();
      } else {
        console.log('Form is invalid');
      }
    }
  }
  

  
  updateStudent() {
    if (this.HFormGroup2.valid) {
      const updatedStudent = { ...this.studentData, ...this.HFormGroup2.value };
      
      this.agentService.updateStudentData(this.studentData.id, updatedStudent).subscribe({
        next: (response) => {
          console.log('Student updated successfully', response);
  
          // Fetch the latest data from the server
          this.fetchStudentById(this.studentData.id);
  
          // Exit editing mode
          this.iseditingmode = false;
        },
        error: (error) => {
          console.error('Error updating student:', error);
        }
      });
    } else {
      console.log('Form is invalid');
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
    
  saveContactInfo(): void {
    if (this.ContactForm.valid) {
      const contactInfo = this.ContactForm.value;
      // this.agentService.saveStudentContactInfo(contactInfo).subscribe(
      //   (response) => {
      //     console.log('Contact information saved:', response);
      //   },
      //   (error) => console.error('Error saving contact info:', error)
      // );
    }
  }

  initDocumentForm() {
    this.documentForm = this.fb.group({
      studentName: [{ value: '', disabled: true }, Validators.required],
      contactNo: [{ value: '', disabled: true }, Validators.required],
      documentType: [],
      remarks: [],
      file: ['', Validators.required],
    });
  }

  private patchForm() {
    if (this.studentData) {
      this.documentForm.patchValue({
        studentName: this.studentData.studentName || '',
        contactNo: this.studentData.contactNo || '',
      });
    }
  }
  
  
  loadDocumentTypes() {
     this.agentService.getDocumentTypes().subscribe(
      (response) => {
        if (response.status === 200 || response.status === 201) {
          this.documentTypes = response.data;
        } else {
          console.error('Failed to load document types:', response.message);
        }
      },
      (error) => {
        console.error('Error loading document types:', error);
      }
    );
    // this.subscriptions.add(documentTypesSubscription);
  }
  
  


  loadUploadedDocument() {
    if (this.studentData) {
      this.uploadedDocument$ = this.agentService.getUploadedDocuments({
        studentId: this.studentData.id,
        limit: 10,
        orderBy: 'Id',
        sortExpression: 'desc',
        currentPage: 1,
        isDeleted: false 
      });
    }
  }

  onDocumentFormSubmit() {
    if (this.documentForm.valid && this.studentData) {
      const documentTypeId = this.documentForm.get('documentType')?.value;
      const studentId = this.selectedId;
      const remarks = this.documentForm.get('remarks')?.value;
      const file = this.documentForm.get('file')?.value;
      const uploadedBy = 'yourUserId'; // Replace with the actual user ID or username.

      const formData = new FormData();
      formData.append('DocumentTypeId', documentTypeId);
      formData.append('StudentId', studentId.toString());
      formData.append('Remarks', remarks);
      formData.append('UploadedBy', uploadedBy);
      formData.append('File', file);

      if (this.isEditMode && this.documentToEditId !== null) {
        this.agentService.updateStudentDocument(this.documentToEditId, formData).subscribe(
          response => {
            console.log('Update Success', response);
          },
          error => {
            console.log('Update Error', error);
            this.errorMessage = 'Error updating the document. Please try again later.';
          }
        );
      } else {
        console.log(formData,"applicatiosss");
        this.agentService.submitStudentDocument(formData).subscribe(
         
          response => {
            console.log('Submit Success', response);
            // window.location.reload();
            this.documentForm.reset();
            window.scrollTo(0,0);
            this.loadUploadedDocument();  // Reload the document after a successful upload
          },
          error => {
            console.log('Submit Error', error);
            this.errorMessage = 'Error submitting the document. Please try again later.';
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill all required fields.';
      console.log('Form is not valid or student is null');
    }
  }

  getDocumentTypeName(documentTypeId: number): string {
    const documentType = this.documentTypes.find(type => type.id === documentTypeId);
    return documentType ? documentType.documentType : 'Unknown';
  }

  viewDocument(documentUrl: string) {
    window.open(documentUrl, '_blank');
  }

  deleteDocument(documentId: number) {
    this.agentService.deleteStudentDocument(documentId).subscribe(
      response => {
        console.log('Delete Success', response);
        this.loadUploadedDocument();  // Reload the document list after deletion
      },
      error => {
        console.log('Delete Error', error);
        this.errorMessage = 'Error deleting the document. Please try again later.';
      }
    );
  }
   
  editDocument(documentId: number) {
    this.agentService.getDocumentById(documentId).subscribe(
      document => {
        this.isEditMode = true;
        this.documentToEditId = document.id;

        this.documentForm.patchValue({
          documentType: document.documentTypeId,
          remarks: document.remarks,
        });

        this.documentForm.get('file')?.setValue(document.file);
      },
      error => {
        console.error('Error fetching document details:', error);
        this.errorMessage = 'Error fetching document details. Please try again later.';
      }
    );
  }

  backToPreviousSecreen(){
    this.router.navigate(['/agent/list-students'], {
      queryParams: { origin: 'application' } // Pass the origin as 'listStudents'
    });
  }

 
    // Reset the form and exit edit mode
    onEducationNext(): void {
      if (this.educationForm.valid) {
        const educationData = {
          studentId: this.selectedId, // Replace with actual student ID
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
         this.agentService.getEducationEntriesByStudentId(this.selectedId).subscribe({
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

  onAddEducation(){
    // Scroll to the bottom of the page after patching the form
    window.scrollTo(0, 650);
    // Scroll to the bottom with smooth behavior after patching the form
//  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });


  }
  
 
  onTestSubmit(): void {
    if (this.testForm.valid) {
      // Map form data to match the API's expected structure
      const testData = {
        testName: this.testForm.value.testName,
        subject: this.testForm.value.subject,
        studentId: this.selectedId, // Use the actual student ID if available
        testType: this.testForm.value.testType,
        testDate: this.testForm.value.testDate, // Ensure it's a valid date string
        testDuration: this.testForm.value.testDuration.toString(), // Convert to string if necessary
        score: this.testForm.value.score.toString(), // Convert to string if necessary
      };
  
      // Check if we are updating an existing test or creating a new one
      if (this.isEditsMode) {
        // Update API call
        this.agentService.updateTest(this.testData.id, testData).subscribe({
          next: (response) => {
            console.log('Test details updated successfully:', response);
          
          
           
            this.testByStudId(); // Refresh the test list
            this.onTestReset();
            // this.editTestId = null; // Clear the test ID
            // window.scrollTo(0, 0); // Scroll to the top of the page
            
          },
          error: (error) => {
            console.error('Error updating test details:', error);
          },
        });
      } else {
        // Create API call
        this.agentService.addTest(testData).subscribe({
          next: (response) => {
            console.log('Test details added successfully:', response);
            // alert('Test details saved successfully!');
            this.testByStudId();
            this.testForm.reset();
             // Scroll to the top of the page after patching the form
          // window.scrollTo(0, 0);
          },
          error: (error) => {
            console.error('Error saving test details:', error);
            // alert('Failed to save the test details. Please try again.');
          },
        });
      }
     
    }
  }
  
  onTestReset(): void {
    this.testForm.reset();
    this.isEditsMode = false;
  }

  testByStudId(){
    const studeentId = this.selectedId; // Replace with the actual student ID
     this.testByStudentId$ = this.agentService.getAllTestByStudentId(studeentId);
  }

  updateTest(id: number): void {
    // Fetch the test entry by ID from the service
    this.agentService.getTestByStudentId(id).subscribe({
      next: (response) => {
        if (response?.data) {
          // Store the fetched test data
          this.testData = response.data; // Assuming response.data contains the test information
          
          console.log('Fetched test data:', this.testData);
  
          // Call a function to patch the form with this data
          this.patchTestForm(this.testData);
  
          // Scroll to the desired position after patching the form
          // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          window.scrollTo(0,650);
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
  
  deleteTest(id: number): void{
    this.agentService.deleteTestById(id).subscribe({
      next: () => {
          console.log("test deleted successfullyyyyyyyyy")
        // Refresh the grid
       
        this.testByStudId();
      },
      error: (error) => {
        console.error('Error deleting test  entry:', error);
        
      },
    }); 
  }

// dialog
openConfirmationDialog(): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '400px',
    data: { message: 'Do you want to finalize your application?' },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.applyApplication(); // Call API if user confirms
    }
  });
}

applyApplication(): void {
  // Define the payload as required by the backend API
  const applicationData = {
    studentId:  this.selectedId || 0, // Replace with actual studentId value
    programId: this.selectedRecord.programId || 0, // Replace with actual programId value
    sessionId: this.selectedRecord.sessionId || 0, // Replace with actual sessionId value
  };

  // Log payload for debugging
  console.log('Sending application payload:', applicationData);

  // Call the agent service to finalize the application
  this.agentService.finalizeApplication(applicationData).subscribe({
    next: (response) => {
      console.log('Application finalized successfully:', response);
      alert('Your application has been successfully processed.');
      this.router.navigate(['/agent/application-list']);
    },
    error: (error) => {
      console.error('Error finalizing application:', error);
      alert('Failed to process the application. Please try again.');
    },
  });
}
navigateBack(){
  this.router.navigate(['/agent/list-students']);
}

}
