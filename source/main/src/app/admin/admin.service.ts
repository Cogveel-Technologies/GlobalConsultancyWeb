import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from './listusers/user.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Role } from './list-roles/role.model';
import { Consultancy } from './consultancy-list/consultancy.model';
import { ConsultancyDetailsOptions } from 'app/consultancy/consultancy-models/data.consultancy-get-options';

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
  private apiUrl = 'https://consultancy.180-179-213-167.plesk.page/api'; // Your API base URL
  private currentPageSubject = new BehaviorSubject<number>(1);
  private pageSizeSubject = new BehaviorSubject<number>(10);
  editUserState = new BehaviorSubject<boolean|null>(null)
  editorViewUserPageState = new BehaviorSubject<any>(null)
  // pageNumber:BehaviorSubject<null|number> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  private buildUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  isEditMode: BehaviorSubject<boolean | null> = new BehaviorSubject(null);
  sendConsultancyId: BehaviorSubject<number | string> = new BehaviorSubject<number | string>('')
  sendRoleId:BehaviorSubject<number|null> = new BehaviorSubject<number>(null)
  updatePermissions: BehaviorSubject<boolean> = new BehaviorSubject(false)
  sendPermissionId:BehaviorSubject<any|boolean> = new BehaviorSubject<any|null>(false)
  consultancyInstituteState:BehaviorSubject<boolean|null> = new BehaviorSubject<any|null>(null)
  consultancyProgramState:BehaviorSubject<boolean|null> = new BehaviorSubject<any|null>(null)
  consultancyPaginationState:BehaviorSubject<null|number> = new BehaviorSubject(null)
  consultancyProgram:BehaviorSubject<null|any> = new BehaviorSubject(null)
  consultancyInstitutePaginationState = new BehaviorSubject<null|boolean>(false)
  consultancyProgramPaginationState = new BehaviorSubject<null|boolean>(false)
  consultancyPageState = new BehaviorSubject<null|boolean>(null)

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

  // Method to get all users
  getAllUsers(): Observable<{ id: number; firstName: string }[]> {
    return this.http.get<any>(`${this.apiUrl}/User/all`).pipe(
      map(response => response.data.map((user: any) => ({
        id: user.id,
        firstName: user.firstName
      })))
    );
  }

// Method to get all roles
getAllRoles(): Observable<{ id: number; roleName: string }[]> {
  return this.http.get<any>(`${this.apiUrl}/Role/all`).pipe(
    map(response => response.data.map((role: any) => ({
      id: role.id,
      roleName: role.roleName
    })))
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
  getConsultancyList(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean, userId?:number, isAdmin?:boolean }): Observable<PaginatedResponse<Consultancy>> {
    let url = `${this.apiUrl}/Consultancy?UserId=${params.userId}&IsAdmin=${params.isAdmin}&limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}&isDeleted=false`;
    // if (params.searchTerm) {
    //   url += `&searchText=${params.searchTerm}`;
    // }
    // if (params.isDeleted !== undefined) {
    //   url += `&isDeleted=${params.isDeleted}`;
    // }

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
  getSuperAdminById(id: number): Observable<any> {
    // Return a dummy object for superadmin
    const superAdmin = {
      sname: 'Superadmin',
      semail: 'superadmin@gmail.com'
    };

    // Simulating an observable that returns the dummy superadmin data
    return of(superAdmin);
  }

  getAllConsultancies(data:ConsultancyDetailsOptions) {
    return this.http.get(`${this.apiUrl}/Consultancy/All?CountryId=${data.CountryId}&Isdeleted=true`).pipe(map(res => res['data']));
  }

  getConsultanciesOfAdmin(data:ConsultancyDetailsOptions){
    return this.http.get(`${this.apiUrl}/Consultancy/byUserId?UserId=${data.UserId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}`).pipe(map(res => res['data']))
  }

  updateDocument(id:number,data){
    return this.http.put(`${this.apiUrl}/DocumentType/${id}`,data)
  }

 



  //dropdown//
  submitDropdownData(dropdownData: {
    dropDownListId: number;
    dropDownListName: string;
    dropDownValues: string;
    createdBy: number;
    updatedBy: number;
  }): Observable<any> {
    const url = `${this.apiUrl}/DropDown`;
    return this.http.post(url, dropdownData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  /////////////////////////////////////// PERMISSIONS API ///////////////////////////////////////////

  // add Permissions 
  addPermissions(permissions:any){
    return this.http.post(`${this.apiUrl}/Permission/Bulk Data`,permissions)
  }
  // get Permissions
  getPermissions(params:ConsultancyDetailsOptions){
    return this.http.get(`${this.apiUrl}/Permission?RoleId=${params.roleId}&limit=${params.pageSize}&OrderBy=${params.OrderBy}&sortExpression=${params.sortExpression}&CurrentPage=${params.currentPage}&isDeleted=${params.IsDeleted}`)
  }
  // update Permission
  updatePermission(permission:any){
    return this.http.put(`${this.apiUrl}/Permission/${permission.id}`,permission)
  }
  // delete Permission
  deletePermission(id:number){
    return this.http.delete(`${this.apiUrl}/Permission/byId?Id=${id}`)
  }
  // get sub-menu
  getSubmenu(id:number){
    return this.http.get(`${this.apiUrl}/SubMenu/RoleId?RoleId=${id}`)
  }

  /////////////////////////////////////// DROPDOWN API'S ////////////////////////////////////////////////

  getDropDown(){
    return this.http.get(`${this.apiUrl}/DropDownList/all`)
  }

  addDropDownValues(data:any){
    return this.http.post(`${this.apiUrl}/DropDownListValues`,data)
  }

  getDropdownValues(params:ConsultancyDetailsOptions){
    return this.http.get(`${this.apiUrl}/DropDown?DropDownListName=${params.dropDownListName}&limit=${params.pageSize}&OrderBy=${params.OrderBy}&sortExpression=${params.sortExpression}&searchText=${params.searchText}&CurrentPage=${params.currentPage}&isDeleted=${params.IsDeleted}`)
  }

  getAllDropDownCategories(){
    return this.http.get(`${this.apiUrl}/DropDownList/all`)
  }
}


