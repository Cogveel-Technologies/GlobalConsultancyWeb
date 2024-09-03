import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Student } from 'app/agent/models/student.model';
import { AgentService } from 'app/agent/agent.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  breadscrums = [
    {
      title: 'View Student',
      items: ['Agent'],
      active: 'List Students',
    },
  ];

  documentTypes: any[] = []; 
  uploadedDocument$: Observable<any>;
  
  private subscriptions: Subscription = new Subscription();  // Manage all subscriptions

  constructor(private route: ActivatedRoute, private agentService: AgentService) {}

  ngOnInit() {
    // Subscribe to route data
    const routeSubscription = this.route.data.subscribe((data: { student: Student | null }) => {
      this.student = data.student;
      console.log('Resolved student:', this.student);
      this.loadUploadedDocument();  // Load the uploaded document when the component initializes
    });
    this.subscriptions.add(routeSubscription);

    // Load document types when component initializes
    this.loadDocumentTypes();
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
        limit: 10, // You can adjust this value as needed
        orderBy: 'Id', // You can change this to the appropriate field name
        sortExpression: 'desc', // Sort order
        currentPage: 1, // The page number you want to load
        isDeleted: false // Set this based on whether you want to include deleted records
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

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }
}
