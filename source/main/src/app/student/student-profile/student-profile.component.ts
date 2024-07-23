import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service'; // Ensure the path is correct

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Extra'],
      active: 'Profile',
    },
  ];
  
  documents = [];

  constructor(private router: Router,
     private studentService: StudentService) { }

  ngOnInit() {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.studentService.getDocuments().subscribe(
      data => {
        this.documents = data;
      },
      error => {
        console.error('Error fetching documents', error);
      }
    );
  }

  viewDocument(document) {
    this.router.navigate(['/view-document', document.id]);
  }
  addDocument(document) {
    
  }
}
