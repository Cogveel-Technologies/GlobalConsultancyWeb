import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Student } from 'app/agent/models/student.model';
import { AgentService } from 'app/agent/agent.service';
import { PaginatedResponse } from 'app/agent/agent.service';// Import the PaginatedResponse interface
import { of } from 'rxjs';
import { StudentDocument } from 'app/agent/models/studentDocument.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  educationData: any;
  testByStudentId$: Observable<any>;
  educationEntries$!: Observable<any>;
  breadscrums = [
    {
      title: 'View Student',
      items: ['Student List'],
      active: 'View Student',
    },
  ];
  
 
  documentTypes: any[] = []; 
  // uploadedDocument$: Observable<any>;
  uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>; // Correctly define the Observable
  
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
    this.fetchStudentEducation();
    this.testByStudId();
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
  


 

  testByStudId() {
   
      const studentId = this.student.id;
      this.testByStudentId$ = this.agentService.getAllTestByStudentId(studentId);
  
      // Subscribe to the observable to print the response
      this.testByStudentId$.subscribe(response => {
        console.log('Response:', response); // Logs the response
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


  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }
}
