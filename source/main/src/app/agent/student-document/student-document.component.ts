import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import { Router } from '@angular/router';
import { Student } from 'app/agent/models/student.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-student-document',
  templateUrl: './student-document.component.html',
  styleUrls: ['./student-document.component.scss']
})
export class StudentDocumentComponent implements OnInit, OnDestroy {
  documentForm: FormGroup;
  documentTypes: any[] = [];  
  uploadedDocument$: Observable<any>;  // Observable to hold the single uploaded document
  breadscrums = [
    {
      title: 'Student Details',
      items: ['Forms'],
      active: 'Add Document',
    },
  ];
  student: Student | null = null;
  errorMessage: string = '';
  isEditMode = false; // Track whether we are in edit mode
  documentToEditId: number | null = null; // Store the ID of the document being edited

  private subscriptions: Subscription = new Subscription();  // Manage all subscriptions

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private agentService: AgentService,
    private router: Router  
  ) {
    this.initDocumentForm();
  }

  ngOnInit() {
    // Subscribe to route data
    const routeSubscription = this.route.data.subscribe((data: { student: Student | null }) => {
      this.student = data.student;
      console.log('Resolved student:', this.student);
      this.patchForm();
      this.loadUploadedDocument();  // Load the uploaded document when the component initializes
    });
    this.subscriptions.add(routeSubscription);

    // Load document types when component initializes
    this.loadDocumentTypes();
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

  patchForm() {
    if (this.student) {
      this.documentForm.patchValue({
        studentName: this.student.studentName || '',
        contactNo: this.student.contactNo || '',
      });
    }
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
      this.uploadedDocument$ = this.agentService.getUploadedDocuments(this.student.id);
    }
  }

  onDocumentFormSubmit() {
    if (this.documentForm.valid && this.student) {
      const documentTypeId = this.documentForm.get('documentType')?.value;
      const studentId = this.student.id;
      const remarks = this.documentForm.get('remarks')?.value;
      const file = this.documentForm.get('file')?.value;
      const uploadedBy = 'yourUserId'; // Replace 'yourUserId' with the actual user ID or username.

      // Create a FormData object to match backend expectations
      const formData = new FormData();
      formData.append('DocumentTypeId', documentTypeId);
      formData.append('StudentId', studentId.toString()); // Convert studentId to string
      formData.append('Remarks', remarks);
      formData.append('UploadedBy', uploadedBy);
      formData.append('File', file);

      if (this.isEditMode && this.documentToEditId !== null) {
        const updateSubscription = this.agentService.updateStudentDocument(this.documentToEditId, formData).subscribe(
          response => {
            console.log('Update Success', response);
            window.location.reload();
          },
          error => {
            console.log('Update Error', error);
            this.errorMessage = 'Error updating the document. Please try again later.';
          }
        );
        this.subscriptions.add(updateSubscription);
      } else {
        const submitSubscription = this.agentService.submitStudentDocument(formData).subscribe(
          response => {
            console.log('Submit Success', response);
            window.location.reload();
            this.loadUploadedDocument();  // Reload the document after a successful upload
          },
          error => {
            console.log('Submit Error', error);
            this.errorMessage = 'Error submitting the document. Please try again later.';
          }
        );
        this.subscriptions.add(submitSubscription);
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
   
  editDocument(documentId: number) {
    const editSubscription = this.agentService.getDocumentById(documentId).subscribe(
      document => {
        this.isEditMode = true;
        this.documentToEditId = document.id;

        this.documentForm.patchValue({
          documentType: document.documentTypeId,
          remarks: document.remarks,
        });

        // If the file needs to be handled differently, ensure the correct approach here.
        this.documentForm.get('file')?.setValue(document.file);
      },
      error => {
        console.error('Error fetching document details:', error);
        this.errorMessage = 'Error fetching document details. Please try again later.';
      }
    );
    this.subscriptions.add(editSubscription);
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }
}
