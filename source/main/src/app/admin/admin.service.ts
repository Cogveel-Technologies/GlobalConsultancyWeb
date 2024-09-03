import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from './listusers/user.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Role } from './list-roles/role.model';
import { Consultancy } from './consultancy-list/consultancy.model';

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

  constructor(private http: HttpClient) { }

  private buildUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }


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


  /// Methods Of Roles Component

  createRole(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Role`, data);
  }

  // Get a list of roles with pagination, sorting, and searching
  getRolesList(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean }): Observable<PaginatedResponse<Role>> {
    let url = `${this.apiUrl}/Role?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}`;
    if (params.searchTerm) {
      url += `&searchText=${params.searchTerm}`;
    }
    if (params.isDeleted !== undefined) {
      url += `&isDeleted=${params.isDeleted}`;
    }

    return this.http.get<PaginatedResponse<Role>>(url).pipe(
      tap(response => console.log('Fetched roles:', response)),  // Log the full response
      catchError(this.handleError<PaginatedResponse<Role>>('getRolesList', {
        data: [],
        pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
        status: 0,
        message: ''
      }))
    );
  }


  deleteRole(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/Role/byId?id=${id}`);
  }
  updateRole(id: number, roleName: string): Observable<any> {
    const url = `${this.apiUrl}/Role/${id}`;  // Assuming the API endpoint uses the ID in the URL path
    const body = { roleName };  // The body should be an object with the roleName property
  
    return this.http.put<any>(url, body);  // Send the PUT request with the URL and body
  }

 //methods for consultancy
 registerConsultancy(consultancyData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Consultancy`, consultancyData);
  }
 
  deleteConsultancy(consultancyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Consultancy/byId?id=${consultancyId}`);
  }
 
  
  // methods for list-consultancy
  // Get a list of consultancies with pagination, sorting, and searching
getConsultancyList(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean }): Observable<PaginatedResponse<Consultancy>> {
  let url = `${this.apiUrl}/Consultancy?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}`;
  if (params.searchTerm) {
    url += `&searchText=${params.searchTerm}`;
  }
  if (params.isDeleted !== undefined) {
    url += `&isDeleted=${params.isDeleted}`;
  }

  return this.http.get<PaginatedResponse<Consultancy>>(url).pipe(
    tap(response => console.log('Fetched consultancies:', response)),  // Log the full response
    catchError(this.handleError<PaginatedResponse<Consultancy>>('getConsultancyList', {
      data: [],
      pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
      status: 0,
      message: ''
    }))
  );
}

getConsultancyById(id: number): Observable<Consultancy> {
  return this.http.get<Observable<Consultancy>>(`${this.apiUrl}/Consultancy/byId?Id=${id}`).pipe(map(res => res['data']))
}
updateConsultancy(consultancyId: number, consultancyData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/Consultancy/${consultancyId}`, consultancyData);
}
   // --------- update-consutancy ----------------
//    updateConsultancy(data: ConsultancyData) {
//     return this.http.put(`${this.baseUrl}/Consultancy/${data.id}`, data)
// }

}
