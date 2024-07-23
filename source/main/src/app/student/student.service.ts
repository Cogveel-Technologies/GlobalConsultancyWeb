import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }

  // Dummy data for testing
  private documents = [
    { id: 1, documentType: 'Passport', remarks: 'Valid till 2025' },
    { id: 2, documentType: 'ID Card', remarks: 'Valid till 2023' },
    // Add more documents as needed
  ];

  getDocuments(): Observable<any> {
    return of(this.documents); // Replace with actual API call
  }
}
