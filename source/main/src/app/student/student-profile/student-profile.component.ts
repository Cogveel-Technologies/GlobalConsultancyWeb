import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Student } from 'app/agent/models/student.model';
import { AgentService } from 'app/agent/agent.service';
import { PaginatedResponse } from 'app/agent/agent.service'; 
import { StudentDocument } from 'app/agent/models/studentDocument.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  breadscrums = [
    {
      title: 'Profile',
      items: ['Extra'],
      active: 'Profile',
    },
  ];
  documentTypes: any[] = [];
  uploadedDocument$: Observable<PaginatedResponse<StudentDocument>>;
  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, 
              private agentService: AgentService,
              private router: Router) {}

  ngOnInit() {
    const studentId = localStorage.getItem('id');

    if (studentId) {
      const studentSubscription = this.agentService.getStudentById(+studentId).subscribe(
        (student: Student) => {
          this.student = student;
          console.log('Fetched student:', this.student);
          this.loadUploadedDocument();
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
  
  // Navigate to the registration form
  editStudent() {
    if (this.student) {
      this.router.navigate(['/agent/register-student'], {
        queryParams: { id: this.student.id, origin: 'studentProfile' } // Pass the origin
      });
    }
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
