import { Component, OnInit, OnDestroy } from '@angular/core';
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


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  // HFormGroup2: FormGroup;
  documentForm: FormGroup;
  educationData: any;  // Define educationData to store the fetched data
  documentTypes: any[] = [];  
  isEditMode = false; 
  uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>;
  educationEntries$!: Observable<any>;
  isLinear = false;
  HFormGroup1?: UntypedFormGroup;
  HFormGroup2?: UntypedFormGroup;
  ContactForm?: UntypedFormGroup;
  educationForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Student Application',
      items: ['Search'],
      active: 'Application',
    },
  ];

  errorMessage = '';
  isEditModee = false; // Track whether we are in edit mode
  documentToEditId: number | null = null; // Store the ID of the document being edited

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
    private router: Router
  ) {
    this.initDocumentForm();
    // Retrieve the selected ID in the constructor
    this.selectedId = this.agentService.getSelectedId();
    console.log('Selected ID:', this.selectedId);
    
    this.loadCountries();
  }

  ngOnInit(): void {
    this.selectedRecord = this.agentService.getSelectedRecord();
    this.fetchStudentById(this.selectedId);
     this.fetchStudentEducation();
   


    


    

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
      countryOfEducation: [],
      higherLevelOfEducation: [],
      gradingScheme: [],
      gradingAverage: [],
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
      documentType: ['', Validators.required],
      remarks: ['', Validators.required],
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
      const studentId = this.studentData.id;
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
        this.agentService.submitStudentDocument(formData).subscribe(
          response => {
            console.log('Submit Success', response);
            // window.location.reload();
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
  //education
  onEducationNext(): void {
    if (this.educationForm.valid) {
      // Transforming the form data to match the backend structure
      const educationData = {
        studentId: this.selectedId,
        countryOfEducation: this.educationForm.value.countryOfEducation,
        higherLevelOfEducation: this.educationForm.value.higherLevelOfEducation,
        gradingScheme: this.educationForm.value.gradingScheme,
        gradingAverage: this.educationForm.value.gradingAverage,
      };

      this.agentService.addEducation(educationData).subscribe({
        next: (response) => {
          // Refresh the grid
          this.fetchStudentEducation();
          console.log('Education details added successfully:', response);
          this.educationForm.reset();
        },
        error: (error) => {
          console.error('Error saving education details:', error);
        },
      });
    } else {
      console.log('Please fill out all required fields.');
    }
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
    this.educationEntries$ = of([]); // Empty observable on error
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

        // Scroll to the top of the page after patching the form
        window.scrollTo(0, 0);
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
    this.educationForm.patchValue({
      countryOfEducation: data.countryOfEducation,
      higherLevelOfEducation: data.higherLevelOfEducation,
      gradingScheme: data.gradingScheme,
      gradingAverage: data.gradingAverage,
    });
  }






}
