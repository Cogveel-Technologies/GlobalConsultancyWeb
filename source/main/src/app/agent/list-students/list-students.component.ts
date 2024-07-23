import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS
import { AgentService } from '../agent.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {

  breadscrums = [
    {
      title: 'Student List',
      items: ['Tables'],
      active: 'Student List',
    },
  ];
  students: Student[] = [];
  filteredStudents: Student[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agentService: AgentService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { students: Student[] }) => {
      this.students = data.students;
      this.filteredStudents = [...this.students];
    });
  }

  addStudent() {
    console.log("Add student button clicked");
    this.router.navigate(['/agent/register-student']);  // Adjust the route as needed
  }

  refreshPage() {
    console.log("Refresh button clicked");
    // Reload the current route
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/agent/list-students']).then(() => {
      window.location.reload();
    });
  }

  deleteStudent(studentId: number) {
    console.log(`Delete student button clicked for student ${studentId}`);
    this.agentService.deleteStudent(studentId).subscribe({
      next: (response) => {
        console.log('Student deleted successfully', response);
        // Reload students after deletion (if needed)
        this.students = this.students.filter(student => student.id !== studentId);
        this.filteredStudents = this.filteredStudents.filter(student => student.id !== studentId);
      },
      error: (error) => {
        console.error('Error deleting student', error);
      }
    });
  }

  encryptData(data: any): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // Your secret key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString();
  }

  editStudent(studentId: number) {
    const edit = this.students.find(el => el.id === studentId);
    if (edit) {
      const encryptedData = this.encryptData(edit);
      this.router.navigate(['/agent/register-student'], {
        queryParams: {
          data: encryptedData
        }
      });
    }
  }

  viewStudent(studentId: number) {
    const view = this.students.find(el => el.id === studentId);
    if (view) {
      const encryptedData = this.encryptData(view);
      this.router.navigate(['/agent/view-student'], {
        queryParams: {
          data: encryptedData
        }
      });
    }
  }
  addStudentDocument(studentId: number) {
    const view = this.students.find(el => el.id === studentId);
    if (view) {
      const encryptedData = this.encryptData(view);
      this.router.navigate(['/agent/student-document'], {
        queryParams: {
          data: encryptedData
        }
      });
    }
  }

  filterStudents(searchTerm: string) {
    if (!searchTerm) {
      this.filteredStudents = [...this.students];
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      this.filteredStudents = this.students.filter(student =>
        student.studentName.toLowerCase().includes(lowerCaseTerm) ||
        student.dob.toLowerCase().includes(lowerCaseTerm) ||
        student.citizenship.toLowerCase().includes(lowerCaseTerm) ||
        student.language.toLowerCase().includes(lowerCaseTerm) ||
        student.passportExpiry.toLowerCase().includes(lowerCaseTerm) ||
        student.email.toLowerCase().includes(lowerCaseTerm) ||
        student.contactNo.toLowerCase().includes(lowerCaseTerm) ||
        student.agent.toLowerCase().includes(lowerCaseTerm) ||
        student.residentialAddress.toLowerCase().includes(lowerCaseTerm) ||
        student.mailingAddress.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
