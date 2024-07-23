import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from './models/student.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  constructor(private http: HttpClient) { }
// Dummy data for testing
private students: Student[] = [
  { id: 1, studentName: 'Hadim', dob: '2000-01-01', citizenship: 'USA', 
    language: 'English', passportExpiry: '2025-01-01', email: 'mark@example.com',
     contactNo: '1234567890', agent: 'Agent A', residentialAddress: '123 Main St',
      mailingAddress: '123 Main St' },

      
  { id: 2, studentName: 'Wani', dob: '2001-02-02', citizenship: 'AMM', language: 'Ammlish', passportExpiry: '2025-02-02', email: 'jacob@example.com', contactNo: '2345678901', agent: 'Agent B', residentialAddress: '456 Elm St', mailingAddress: '456 Elm St' },
  { id: 3, studentName: 'Alice', dob: '2002-03-03', citizenship: 'CAN', language: 'French', passportExpiry: '2026-03-03', email: 'alice@example.com', contactNo: '3456789012', agent: 'Agent C', residentialAddress: '789 Oak St', mailingAddress: '789 Oak St' },
  { id: 4, studentName: 'Bob', dob: '2003-04-04', citizenship: 'UK', language: 'English', passportExpiry: '2027-04-04', email: 'bob@example.com', contactNo: '4567890123', agent: 'Agent D', residentialAddress: '101 Pine St', mailingAddress: '101 Pine St' },
  { id: 5, studentName: 'Charlie', dob: '2004-05-05', citizenship: 'AUS', language: 'English', passportExpiry: '2028-05-05', email: 'charlie@example.com', contactNo: '5678901234', agent: 'Agent E', residentialAddress: '202 Birch St', mailingAddress: '202 Birch St' },
  { id: 6, studentName: 'David', dob: '2005-06-06', citizenship: 'NZ', language: 'Maori', passportExpiry: '2029-06-06', email: 'david@example.com', contactNo: '6789012345', agent: 'Agent F', residentialAddress: '303 Cedar St', mailingAddress: '303 Cedar St' },
  { id: 7, studentName: 'Eve', dob: '2006-07-07', citizenship: 'IND', language: 'Hindi', passportExpiry: '2030-07-07', email: 'eve@example.com', contactNo: '7890123456', agent: 'Agent G', residentialAddress: '404 Spruce St', mailingAddress: '404 Spruce St' },
  { id: 8, studentName: 'Frank', dob: '2007-08-08', citizenship: 'JPN', language: 'Japanese', passportExpiry: '2031-08-08', email: 'frank@example.com', contactNo: '8901234567', agent: 'Agent H', residentialAddress: '505 Maple St', mailingAddress: '505 Maple St' },
  { id: 9, studentName: 'Grace', dob: '2008-09-09', citizenship: 'GER', language: 'German', passportExpiry: '2032-09-09', email: 'grace@example.com', contactNo: '9012345678', agent: 'Agent I', residentialAddress: '606 Willow St', mailingAddress: '606 Willow St' },
  { id: 10, studentName: 'Heidi', dob: '2009-10-10', citizenship: 'FRA', language: 'French', passportExpiry: '2033-10-10', email: 'heidi@example.com', contactNo: '0123456789', agent: 'Agent J', residentialAddress: '707 Ash St', mailingAddress: '707 Ash St' },
  { id: 11, studentName: 'Ivan', dob: '2010-11-11', citizenship: 'RUS', language: 'Russian', passportExpiry: '2034-11-11', email: 'ivan@example.com', contactNo: '1234509876', agent: 'Agent K', residentialAddress: '808 Elm St', mailingAddress: '808 Elm St' },
  { id: 12, studentName: 'Judy', dob: '2011-12-12', citizenship: 'BRA', language: 'Portuguese', passportExpiry: '2035-12-12', email: 'judy@example.com', contactNo: '2345610987', agent: 'Agent L', residentialAddress: '909 Pine St', mailingAddress: '909 Pine St' }
];

  getStudents(): Observable<Student[]> {
    return of(this.students); // Return the dummy data as an observable
  }

  submitStudentData(studentData: Student): Observable<any> {
    console.log("Register student");
    // Replace 'your-api-endpoint' with your actual API endpoint
    return this.http.post('your-api-endpoint', studentData);
  }

  updateStudentData(studentId: number, studentData: Student): Observable<any> {
    console.log("Update student");
    // Replace 'your-api-endpoint' with your actual API endpoint
    return this.http.put(`your-api-endpoint/${studentId}`, studentData);
  }

  deleteStudent(studentId: number): Observable<any> {
    console.log(`Delete student with id ${studentId}`);
    // Replace 'your-api-endpoint' with your actual API endpoint
    return this.http.delete(`your-api-endpoint/${studentId}`);
  }
  ///methods of student-document

  submitStudentDocument(studentData: FormData): Observable<any> {
    console.log("Submitting student data");
    return this.http.post('your-api-endpoint', studentData);
  }

  updateStudentDocument(studentId: number, studentData: FormData): Observable<any> {
    console.log("Updating student data");
    return this.http.put(`your-api-endpoint/${studentId}`, studentData);
  }

  // getStudentsList(): Observable<any> {
  //   return this.http.get('/api/students');
  // }
  getStudentsList(): Observable<Student[]> {
    return of(this.students); // Return the dummy data as an observable
  }

}
