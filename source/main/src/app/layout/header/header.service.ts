import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  
  private apiUrl = 'https://www.affectionate-mcnulty.180-179-213-167.plesk.page/api'; // Your API base URL

  constructor(private http: HttpClient) { }

  // Admin data API call with ID
  getAdminData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin-data/${id}`);
  }
  

  // Student data API call with ID
  getStudentData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/student-data/${id}`);
  }

  // Agent data API call with ID
  getAgentData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/agent-data/${id}`);
  }

  // Consultancy data API call with ID
  getConsultancyData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultancy-data/${id}`);
  }
}
