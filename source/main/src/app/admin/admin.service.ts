import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from './listusers/user.model';
import { tap, map, catchError } from 'rxjs/operators';

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
export class AdminService {
  private apiUrl = 'https://www.affectionate-mcnulty.180-179-213-167.plesk.page/api'; // Your API base URL
  private currentPageSubject = new BehaviorSubject<number>(1);
  private pageSizeSubject = new BehaviorSubject<number>(10);

  constructor(private http: HttpClient) {}

  private buildUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }
    // // Sample mock data
    // private mockDocuments = [
    //   { documenttype: 'Passport' },
    //   { documenttype: 'Driver License' },
    //   { documenttype: 'ID Card' }
    // ];

  // Submit user data to the server
  submitUserData(userData: User): Observable<any> {
    const url = this.buildUrl('User'); // Update to your actual endpoint
    console.log("Submitting user data:", userData);
    return this.http.post(url, userData).pipe(
      catchError(this.handleError('submitUserData'))
    );
  }

  // Get a list of users with pagination, sorting, and searching
  getUsersList(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean }): Observable<PaginatedResponse<User>> {
    let url = `${this.apiUrl}/User?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}`;
    if (params.searchTerm) {
      url += `&searchText=${params.searchTerm}`;
    }
    if (params.isDeleted !== undefined) {
      url += `&isDeleted=${params.isDeleted}`;
    }

    return this.http.get<PaginatedResponse<User>>(url).pipe(
      tap(response => console.log('Fetched users:', response)),  // Log the full response
      catchError(this.handleError<PaginatedResponse<User>>('getUsersList', {
        data: [], 
        pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
        status: 0, 
        message: '' 
      }))
    );
  }

  // // Get the current page from BehaviorSubject
  // getCurrentPage(): Observable<number> {
  //   return this.currentPageSubject.asObservable();
  // }

  // // Set the current page in BehaviorSubject
  // setCurrentPage(page: number): void {
  //   this.currentPageSubject.next(page);
  // }

  // // Get the page size from BehaviorSubject
  // getPageSize(): Observable<number> {
  //   return this.pageSizeSubject.asObservable();
  // }

  // // Set the page size in BehaviorSubject
  // setPageSize(size: number): void {
  //   this.pageSizeSubject.next(size);
  // }

  // Handle errors from HTTP requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUserById(id: number): Observable<User> {
    console.log(id, "service id");
    const url = this.buildUrl(`User/byId?id=${id}`); // Correctly format the query parameter
    return this.http.get<{ data: User, status: number, message: string }>(url).pipe(
      tap(response => console.log('Fetched user:', response)),
      map(response => response.data), // Extract the user data
      catchError(error => {
        console.error('Error fetching user:', error);
        return of(null); // Return a safe value or handle the error appropriately
      })
    );
  }

  updateUserData(userId: number, userData: User): Observable<any> {
    console.log("Updating user data");
    const url = this.buildUrl(`User/${userId}`);
    return this.http.put(url, userData).pipe(
      tap(response => console.log('Updated user data:', response)),
      catchError(this.handleError('updateUserData'))
    );
  }

  deleteUser(userId: number): Observable<any> {
    console.log(`Deleting user with id ${userId}`);
    const url = this.buildUrl(`User/byId?id=${userId}`);
    return this.http.delete(url).pipe(
      tap(response => console.log('Deleted user:', response)),
      catchError(this.handleError('deleteUser'))
    );
  }

//////documentType methods//////
addDocumentType(documentData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/DocumentType`, documentData);
}

 
getDocuments(): Observable<{ data: any[], status: number, message: string }> {
  return this.http.get<{ data: any[], status: number, message: string }>(`${this.apiUrl}/DocumentType/all`);
}
deleteDocument(documentId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/DocumentType/byId?id=${documentId}`);
  // const url = this.buildUrl(`User/byId?id=${userId}`);
}
editDocument(documentId: number, documentData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/DocumentType/${documentId}`, documentData)

}
}
