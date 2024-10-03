import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../agent.service';
import { Router } from '@angular/router';
import { Student } from 'app/agent/models/student.model';
import { Observable, Subscription } from 'rxjs';
import { PaginatedResponse } from '../agent.service'; // Import the PaginatedResponse interface
import { StudentDocument } from '../models/studentDocument.model';

@Component({
  selector: 'app-student-document',
  templateUrl: './student-document.component.html',
  styleUrls: ['./student-document.component.scss']
})
export class StudentDocumentComponent implements OnInit, OnDestroy {
  documentForm: FormGroup;
  documentTypes: any[] = [];  
  uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>;
  breadscrums = [
    {
      title: 'Add Document',
      items: ['Students List'],
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
    const routeSubscription = this.route.data.subscribe((data: { student: Student | null }) => {
      this.student = data.student;
      console.log('Resolved student:', this.student);
      this.patchForm();
      this.loadUploadedDocument();
    });
    this.subscriptions.add(routeSubscription);

    // Check for the origin and modify breadcrumb accordingly
    const origin = this.route.snapshot.queryParams['origin'];
    if (origin === 'studentProfile') {
      this.breadscrums = [
        {
          title: 'Add Document',
          items: ['Student Profile'],
          active: 'Add Document',
        },
      ];
    }

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
  
  onDocumentFormSubmit() {
    if (this.documentForm.valid && this.student) {
      const documentTypeId = this.documentForm.get('documentType')?.value;
      const studentId = this.student.id;
      const remarks = this.documentForm.get('remarks')?.value;
      const file = this.documentForm.get('file')?.value;
      const uploadedBy = 'yourUserId'; // Replace with the actual user ID or username.

      const formData = new FormData();
      formData.append('DocumentTypeId', documentTypeId);
      formData.append('StudentId', studentId.toString());
      formData.append('Remarks', remarks);
      formData.append('UploadedBy', uploadedBy);
      formData.append('File', file);

      const origin = this.route.snapshot.queryParams['origin'];

      if (this.isEditMode && this.documentToEditId !== null) {
        const updateSubscription = this.agentService.updateStudentDocument(this.documentToEditId, formData).subscribe(
          response => {
            console.log('Update Success', response);
            this.navigateToOrigin(origin);
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
  
  deleteDocument(documentId: number) {
    const deleteSubscription = this.agentService.deleteStudentDocument(documentId).subscribe(
      response => {
        console.log('Delete Success', response);
        this.loadUploadedDocument();  // Reload the document list after deletion
      },
      error => {
        console.log('Delete Error', error);
        this.errorMessage = 'Error deleting the document. Please try again later.';
      }
    );
    this.subscriptions.add(deleteSubscription);
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

        this.documentForm.get('file')?.setValue(document.file);
      },
      error => {
        console.error('Error fetching document details:', error);
        this.errorMessage = 'Error fetching document details. Please try again later.';
      }
    );
    this.subscriptions.add(editSubscription);
  }

  onCancel() {
    const origin = this.route.snapshot.queryParams['origin'];

    if (origin === 'studentProfile') {
      this.router.navigate(['/student/student-profile']);
    } else if (origin === 'listStudents') {
      this.router.navigate(['/agent/list-students']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  navigateToOrigin(origin: string) {
    if (origin === 'studentProfile') {
      this.router.navigate(['/student/student-profile']);
    } else if (origin === 'listStudents') {
      this.router.navigate(['/agent/list-students']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
