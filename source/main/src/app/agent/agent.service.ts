import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs'; // Import throwError
import { Student } from './models/student.model';
import { tap, map, catchError } from 'rxjs/operators';
import { StudentDocument } from './models/studentDocument.model';

export interface PaginatedResponse<T> {
  data: T[];
  pageInfo: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'https://www.affectionate-mcnulty.180-179-213-167.plesk.page/api';
  // private currentPageSubject = new BehaviorSubject<number>(1);
  // private pageSizeSubject = new BehaviorSubject<number>(10);

  constructor(private http: HttpClient) {}

  private buildUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  submitStudentData(studentData: Student) {
    const url = this.buildUrl('Student');
    console.log(studentData, "student data");
    return this.http.post(url, studentData);
  }

  // Get a list of students with pagination, sorting, and searching
  getStudentsList(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean }): Observable<PaginatedResponse<Student>> {
    let url = `${this.apiUrl}/Student?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}`;
    if (params.searchTerm) {
      url += `&searchText=${params.searchTerm}`;
    }
    if (params.isDeleted !== undefined) {
      url += `&isDeleted=${params.isDeleted}`;
    }

    return this.http.get<PaginatedResponse<Student>>(url).pipe(
      tap(response => console.log('Fetched students:', response)),  // Log the full response
      catchError(this.handleError<PaginatedResponse<Student>>('getStudentsList', {
        data: [], 
        pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
        status: 0, 
        message: '' 
      }))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getStudentById(id: number): Observable<Student> {
    console.log(id, "service iddddddddddddddddddddd");
    const url = this.buildUrl(`Student/byId?id=${id}`); // Correctly format the query parameter
    return this.http.get<{ data: Student, status: number, message: string }>(url).pipe(
      tap(response => console.log('Fetched student:', response)),
      map(response => response.data), // Extract the student data
      catchError(error => {
        console.error('Error fetching student:', error);
        return of(null); // Return a safe value or handle the error appropriately
      })
    );
  }

  deleteStudent(studentId: number): Observable<any> {
    console.log(`Delete student with id ${studentId}`);
    const url = this.buildUrl(`Student/byId?id=${studentId}`); // Correctly format the query parameter
    return this.http.delete(url).pipe(
      tap(response => console.log('Delete response:', response)),
      catchError(error => {
        console.error('Error deleting student:', error);
        return throwError(() => new Error('Error deleting student')); // Return an observable with an error message
      })
    );
  }

  updateStudentData(studentId: number, studentData: Student): Observable<any> {
    console.log("Update student with id:", studentId, "and data:", studentData);
    const url = this.buildUrl(`Student/${studentId}`); // Correctly format the URL with the student ID
    return this.http.put(url, studentData).pipe(
      tap(response => console.log('Update response:', response)),
      catchError(error => {
        console.error('Error updating student:', error);
        return throwError(() => new Error('Error updating student')); // Return an observable with an error message
      })
    );
  }

  // Methods for student-document
  submitStudentDocument(formData: FormData): Observable<any> {
    formData.forEach((value, key) => {
      console.log(`${key}:`, value); // Logging the FormData content
    });
  
    return this.http.post(`${this.apiUrl}/StudentDocument`, formData);
  }
  
  getDocumentTypes(): Observable<{ data: any[], status: number, message: string }> {
    return this.http.get<{ data: any[], status: number, message: string }>(`${this.apiUrl}/DocumentType/all`);
  }

  // deleteStudentDocument(documentId: number): Observable<any> {
  //   const url = `${this.apiUrl}/StudentDocument/${documentId}`;
  //   return this.http.delete(url);
  // }
  deleteStudentDocument(documentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/StudentDocument/byId?id=${documentId}`);
  }
 
  
  //METHODS OF  ADD STUDENTDOCUMENT and EDIT
  // getUploadedDocuments(studentId: number): Observable<any> {
  //   const url = `${this.apiUrl}/StudentDocument/StudentId?StudentId=${studentId}`;
  //   return this.http.get<any>(url).pipe(
  //     map(response => response.data) // Extract the 'data' property from the response
  //   );
  // }
  
  getUploadedDocuments(params: { studentId: number, limit: number, orderBy: string, sortExpression: string, currentPage: number, isDeleted: boolean }): Observable<PaginatedResponse<StudentDocument>> {
    let url = `${this.apiUrl}/StudentDocument?StudentId=${params.studentId}&limit=${params.limit}&OrderBy=${params.orderBy}&sortExpression=${params.sortExpression}&CurrentPage=${params.currentPage}&isDeleted=${params.isDeleted}`;
  
    return this.http.get<PaginatedResponse<StudentDocument>>(url).pipe(
      tap(response => console.log('Fetched documents:', response)),  // Log the full response
      catchError(this.handleError<PaginatedResponse<StudentDocument>>('getUploadedDocuments', {
        data: [], 
        pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
        status: 0, 
        message: '' 
      }))
    );
  }
  

  getDocumentById(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/StudentDocument/${documentId}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data) // Extract the 'data' property from the response
    );
  }

  updateStudentDocument(documentId: number, documentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/StudentDocument/${documentId}`, documentData)
    .pipe(
      catchError(error => {
        console.error('Error updating document:', error);
        return throwError(() => new Error('Error updating document')); // Return an observable with an error message
      })
    );
  }
}
