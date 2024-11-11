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

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  documentForm: FormGroup;
  documentTypes: any[] = [];  
  uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>;
  isLinear = false;
  HFormGroup1?: UntypedFormGroup;
  HFormGroup2?: UntypedFormGroup;

  breadscrums = [
    {
      title: 'Student Application',
      items: ['Search'],
      active: 'Application',
    },
  ];

  errorMessage = '';
  isEditMode = false; // Track whether we are in edit mode
  documentToEditId: number | null = null; // Store the ID of the document being edited

  selectedRecord: any;
  selectedId: number | null = null;  // Explicit type for clarity
  studentData: Student | null = null;

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
  }

  ngOnInit(): void {
    this.selectedRecord = this.agentService.getSelectedRecord();
    this.fetchStudentById(this.selectedId);
    // this.patchForm();
    

    // Initialize form groups
    this.HFormGroup1 = this._formBuilder.group({});
    
    this.HFormGroup2 = this._formBuilder.group({
      file: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      residentialAddress: ['', Validators.required],
      mailingAddress: ['']
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
  
  saveContactInfo(): void {
    if (this.HFormGroup2.valid) {
      const contactInfo = this.HFormGroup2.value;
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
}
