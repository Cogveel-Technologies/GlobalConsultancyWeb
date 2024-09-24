import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  breadscrums = [
    {
      title: ' Add Document Type',
      items: ['Admin'],
      active: 'Document Type',
    },
  ];

  documentForm: FormGroup;
  documents$: Observable<any[]>;  // Observable to hold the document list
  displayedColumns: string[] = ['srNo', 'documentType', 'actions'];  // Columns for the table
  editingDocumentId: number | null = null;  // Track the currently edited document
  editingDocumentType: string = '';  // Store the edited document type

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {}

  ngOnInit() {
    this.initDocumentForm();
    this.loadDocuments();  // Load documents on initialization
  }

  initDocumentForm() {
    this.documentForm = this.fb.group({
      documenttype: ['', Validators.required]
    });
  }

  onDocumentFormSubmit() {
    if (this.documentForm.valid) {
      const documentData = {
        documenttype: this.documentForm.get('documenttype').value
      };
      
      this.adminService.addDocumentType(documentData).subscribe(
        (response) => {
          console.log('Document submission successful', response);
          window.location.reload();  // Reload the entire page after successful submission
          this.snackBar.open('Document submitted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          });
        },
        (error) => {
          console.error('Document submission failed', error);
        }
      );
    }
  }

  loadDocuments() {
    this.documents$ = this.adminService.getDocuments().pipe(
      map(response => response.data)  // Extract the data property from the response
    );
  }

  editDocument(documentId: number) {
    const document = this.documents$.pipe(
      map(docs => docs.find(doc => doc.id === documentId))
    ).subscribe(doc => {
      this.editingDocumentId = documentId;  // Set the ID of the document being edited
      this.editingDocumentType = doc.documentType;  // Set the current document type value
    });
  }
  

  updateDocument(documentId: number) {
    if (this.editingDocumentType.trim() === '') {
      this.snackBar.open('Document type cannot be empty', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error']
      });
      return;
    }

    const updatedData = {
      documenttype: this.editingDocumentType
    };
    
    this.adminService.editDocument(documentId, updatedData).subscribe(
      (response) => {
        console.log('Document updated successfully', response);
        this.editingDocumentId = null;  // Reset editing state
        this.loadDocuments();  // Reload the documents
        this.snackBar.open('Document updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        console.error('Document update failed', error);
      }
    );
  }
  cancelEdit() {
    this.editingDocumentId = null;  // Clear the editing ID to exit edit mode
    this.editingDocumentType = '';  // Reset the editing document type
  }
  
  deleteDocument(documentId: number) {
    this.adminService.deleteDocument(documentId).subscribe(
      (response) => {
        console.log('Document deleted successfully', response);
        this.loadDocuments();  // Reload documents after successful delete
        this.snackBar.open('Document deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        console.error('Document deletion failed', error);
      }
    );
  }
}

