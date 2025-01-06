import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs'; // Import throwError
import { Student } from './models/student.model';
import { tap, map, catchError } from 'rxjs/operators';
import { StudentDocument } from './models/studentDocument.model';
import { ApplicationModel } from './models/applicationModel';

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
  private apiUrl = 'https://consultancy.180-179-213-167.plesk.page/api';

 

  constructor(private http: HttpClient) {}

  private buildUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }
  //student application wizard
  private selectedRecord: any;
  private showOnlyApplyButton = false;
  private selectedId: any;
  studentPaginationState = new BehaviorSubject<number|null>(null)
  pagination=new BehaviorSubject<boolean|null>(false)

  //application api
  finalizeApplication(applicationData: any): Observable<any> {
    const url = `${this.apiUrl}/StudentApplication`;
  
    return this.http.post<any>(url, applicationData).pipe(
      tap((response) => {
        console.log('API Response:', response);
      }),
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }
  
  
  // getApplications(params: { 
  //   limit: number; 
  //   orderBy: string; 
  //   sortExpression: string; 
  //   currentPage: number; 
  //   searchText?: string; // Updated to match the `getStudentsList` API
  //   isDeleted?: boolean; 
  //   isAdmin: boolean; // Explicitly included as in `getStudentsList`
  // }): Observable<PaginatedResponse<ApplicationModel>> {
  //   // Construct the base URL with consistent parameter naming
  //   let url = `${this.apiUrl}/StudentApplication?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}&isAdmin=${params.isAdmin}`;
    
  //   // Append optional parameters if provided
  //   if (params.searchText) {
  //     url += `&searchText=${params.searchText}`;
  //   }
  //   if (params.isDeleted !== undefined) {
  //     url += `&isDeleted=${params.isDeleted}`;
  //   }
  
  //   return this.http.get<PaginatedResponse<ApplicationModel>>(url).pipe(
  //     // Debugging: Log the constructed URL and response
  //     tap(() => console.log('API URL:', url)),
  //     tap(response => console.log('Fetched applications:', response)),
  //     catchError(this.handleError<PaginatedResponse<ApplicationModel>>('getApplications', {
  //       data: [],
  //       pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
  //       status: 0,
  //       message: ''
  //     }))
  //   );
  // }
   // Get a list of students with pagination, sorting, and searching
   getApplications(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean, isAdmin: boolean }): Observable<PaginatedResponse<ApplicationModel>> {
  let url = `${this.apiUrl}/StudentApplication?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}&isAdmin=${params.isAdmin}`;
  if (params.searchTerm) {
      url += `&searchText=${params.searchTerm}`;
  }
  if (params.isDeleted !== undefined) {
      url += `&isDeleted=${params.isDeleted}`;
  }

  return this.http.get<PaginatedResponse<ApplicationModel>>(url).pipe(
      tap(response => console.log('Fetched Applications:', response)),  // Log the full response
      catchError(this.handleError<PaginatedResponse<ApplicationModel>>('getApplications', {
          data: [], 
          pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
          status: 0, 
          message: '' 
      }))
  );
}

  
//  delete application
  deleteApplication(id: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/StudentApplication/byId?Id=${id}`;
    return this.http.delete(apiUrl).pipe(
      tap((response) => {
        console.log('Delete API response:', response);
      })
    );
  }
  

  

  // test rralted apis
   

  addTest(testData: any): Observable<any> {
    const url = `${this.apiUrl}/Test`;
    return this.http.post<any>(url, testData);
  }
  
 
  
  
  getTestByStudentId(studentId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/Test/byId?Id=${studentId}`;
    return this.http.get<any>(apiUrl).pipe(
      tap((response) => {
        console.log('Fetched test data response:', response); // Debugging log
      })
    );
  }
  



  getAllTestByStudentId(studentId: number): Observable<any[]> {
    const apiUrl = `${this.apiUrl}/Test/studentId?studentId=${studentId}`;
    
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        // Wrap the single object in an array if needed
        return response.data   // Ensure it's an array
      }),
      tap((response) => {
        console.log('Test API response:', response); // Log the response for debugging
      })
    );
  }
  
  updateTest(updateTestId: number, updatedData: any): Observable<any>{
    const apiUrl = `${this.apiUrl}/Test/${updateTestId}`;
    return this.http.put<any>(apiUrl, updatedData).pipe(
      tap((response) => {
        console.log('Update test API response:', response);
      }),
      catchError((error) => {
        console.error('Error updating test entry:', error);
        return throwError(() => error);
      })
    );
  }

 

  deleteTestById(id: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/Test/byId?Id=${id}`;
    return this.http.delete(apiUrl).pipe(
      tap((response) => {
        console.log('Test API response:', response);
      })
    );
  }
  









  //storing particular record when pressing on apply button in admission component
  storeSelectedRecord(record: any) {
    this.selectedRecord = record;
  }

  getSelectedRecord() {
    return this.selectedRecord;
  }
  
  //when navigating from admission to list student component ....hiding the other buttons ..setting flag 
  // for that
  setShowOnlyApplyButton(value: boolean) {
    this.showOnlyApplyButton = value;
  }
  getShowOnlyApplyButton() {
    return this.showOnlyApplyButton;
  }
   //saving student id for application student wizard
   setSelectedId(id: any): void {
    this.selectedId = id;
  }

  getSelectedId(): any {
    return this.selectedId;
  }
  //adding application student education
  addEducation(data: any): Observable<any> {
    console.log(data,"education data");
    return this.http.post(`${this.apiUrl}/Education`, data);
  }

  // getEducationEntriesByStudentId(studentId: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/Eduaction?studentId=${studentId}`);
  // }

  getEducationEntryByEducationId(educationId: number,): Observable<any> {
    const apiUrl = `${this.apiUrl}/Education/byId?Id=${educationId}`;
    return this.http.get(apiUrl).pipe(
      tap((response) => {
        console.log('Education API response:', response);
      })
    );
  }
  
  
  getEducationEntriesByStudentId(studentId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/Education/studentId?studentId=${studentId}`;
    return this.http.get(apiUrl).pipe(
      // map(res => res['data']),

      tap((response) => {
        console.log('Education API response:', response);
      })
      
    );

  }
  

  
  deleteEducation(id: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/Education/byId?Id=${id}`;
    return this.http.delete(apiUrl).pipe(
      tap((response) => {
        console.log('Education API response:', response);
      })
    );
  }
  
  
  
  updateEducationEntryByEducationId(educationId: number, updatedData: any): Observable<any> {
    const apiUrl = `${this.apiUrl}/Education/${educationId}`;
    return this.http.put<any>(apiUrl, updatedData).pipe(
      tap((response) => {
        console.log('Update Education API response:', response);
      }),
      catchError((error) => {
        console.error('Error updating education entry:', error);
        return throwError(() => error);
      })
    );
  }
    
  
  
  
 //for student registration component
  submitStudentData(studentData: Student) {
    const url = this.buildUrl('Student');
    console.log(studentData, "student data");
    return this.http.post(url, studentData);
  }
 
   // Get a list of students with pagination, sorting, and searching
  //  getStudentsList(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean, }): Observable<PaginatedResponse<Student>> {
  //   let url = `${this.apiUrl}/Student?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}`;
  //   if (params.searchTerm) {
  //     url += `&searchText=${params.searchTerm}`;
  //   }
  //   if (params.isDeleted !== undefined) {
  //     url += `&isDeleted=${params.isDeleted}`;
  //   }

  //   return this.http.get<PaginatedResponse<Student>>(url).pipe(
  //     tap(response => console.log('Fetched students:', response)),  // Log the full response
  //     catchError(this.handleError<PaginatedResponse<Student>>('getStudentsList', {
  //       data: [], 
  //       pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
  //       status: 0, 
  //       message: '' 
  //     }))
  //   );
  // }





 // Get a list of students with pagination, sorting, and searching
getStudentsList(params: { limit: number, orderBy: string, sortExpression: string, currentPage: number, searchTerm?: string, isDeleted?: boolean, isAdmin: boolean }): Observable<PaginatedResponse<Student>> {
  let url = `${this.apiUrl}/Student?limit=${params.limit}&orderBy=${params.orderBy}&sortExpression=${params.sortExpression}&currentPage=${params.currentPage}&isAdmin=${params.isAdmin}`;
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

  
  //kkkkkkkkkk
 
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

  getAllStudents(){
    return this.http.get(`${this.apiUrl}/Student/all`)
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
  //methods for dropdwon menu in student register component
  getAgents(): Observable<any> {
    const url = this.buildUrl('Agent/all');
    return this.http.get(url);
  } 

  getInstitutes(): Observable<any> {
    const url = this.buildUrl('Institute/All');
    return this.http.get(url);
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

  
  getDocumentTypesByProgramId(programId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/Program/GetDocumentsByProgramId?ProgramId=${programId}`;
    return this.http.get<any>(apiUrl).pipe(
      tap((response) => {
        console.log('Documents by Program ID', response);
      }),
      catchError((error) => {
        console.error('Error fetching documents by Program ID:', error);
        return throwError(() => error);
      })
    );
  }

//   getDocumentTypesByProgramId(id:number){
//     console.log(id,"service mukhtaraa")
//     return this.http.get(`${this.apiUrl}/Program/GetDocumentsByProgramId?ProgramId=${id}`)
// }

  
  deleteStudentDocument(documentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/StudentDocument/DocumentId?id=${documentId}`);
  }
 
  
  //METHODS OF  ADD STUDENTDOCUMENT and EDIT
  // getUploadedDocuments(studentId: number): Observable<any> {
  //   const url = `${this.apiUrl}/StudentDocument/StudentId?StudentId=${studentId}`;
  //   return this.http.get<any>(url).pipe(
  //     map(response => response.data) // Extract the 'data' property from the response
  //   );
  // }
  
  getUploadedDocuments(params: { studentId: number, limit: number, orderBy: string, sortExpression: string, currentPage: number, isDeleted: boolean }): Observable<PaginatedResponse<StudentDocument>> {
    const url = `${this.apiUrl}/StudentDocument?StudentId=${params.studentId}&limit=${params.limit}&OrderBy=${params.orderBy}&sortExpression=${params.sortExpression}&CurrentPage=${params.currentPage}&isDeleted=${params.isDeleted}`;
  
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
   

getIntakeYears(): Observable<any> {
  const url = `${this.apiUrl}/Intake/All?Isdeleted=false`;
  return this.http.get<any>(url);
}

getCountries(): Observable<any> {
  const url = `${this.apiUrl}/Country/All`;
  return this.http.get<any>(url);
}

getCategory(filterBy: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/DropDown/All?DropDownListName=${filterBy}`)
    .pipe(map(response => response['data']));
}


getInstitutesByCountry(countryId: number): Observable<any[]> {
  const url = `${this.apiUrl}/Institute/All?CountryId=${countryId}&IsDeleted=false&IsAdmin=true`;
  return this.http.get<any[]>(url)
    .pipe(map(response => response['data']));
}


getProgramsByInstitute(instituteId: number): Observable<any[]> { // Add 'instituteId' parameter
  const url = `${this.apiUrl}/Program/All?InstituteId=${instituteId}&IsDeleted=false`; // Include institute ID in the URL
  return this.http.get<any[]>(url)
    .pipe(map(response => response['data'])); // Use similar response handling as above
}

// Add this method to AgentService
getSessionsByProgram(programId: number): Observable<any[]> {
  const url = `${this.apiUrl}/Program/Session?ProgramId=${programId}`;
  return this.http.get<any[]>(url)
    .pipe(map(response => response['data'])); // Adjust response handling as needed
}


getSessions(): Observable<any> {
  const url = `${this.apiUrl}/Session/All?IsDeleted=false`;
  return this.http.get<any>(url);
}


genericSearch(params: {
  CountryId?: number,
  InstituteId?: number,
  ProgramId?: number,
  SessionId?: number,
  limit: number,
  OrderBy: string,
  sortExpression: string,
  CurrentPage: number,
  isDeleted: boolean
}): Observable<PaginatedResponse<Student>> {
  const urlParams = new URLSearchParams({
    limit: params.limit.toString(),
    OrderBy: params.OrderBy,
    sortExpression: params.sortExpression,
    CurrentPage: params.CurrentPage.toString(),
    isDeleted: params.isDeleted.toString(),
  });

  if (params.CountryId) urlParams.append('CountryId', params.CountryId.toString());
  if (params.InstituteId) urlParams.append('InstituteId', params.InstituteId.toString());
  if (params.ProgramId) urlParams.append('ProgramId', params.ProgramId.toString());
  if (params.SessionId) urlParams.append('SessionId', params.SessionId.toString());

  const url = `${this.apiUrl}/GenericSearch?${urlParams.toString()}`;

  return this.http.get<PaginatedResponse<Student>>(url).pipe(
    tap(response => console.log('Fetched students from GenericSearch:', response)),
    catchError(this.handleError<PaginatedResponse<Student>>('genericSearch', {
      data: [],
      pageInfo: { currentPage: 1, totalPages: 1, totalRecords: 0 },
      status: 0,
      message: ''
    }))
  );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error for debugging
      return of(result as T); // Return a safe result
    };
  }

  getGraphDetails(){
    return this.http.get(`${this.apiUrl}/StudentApplication/ConsultancyId`)
  }
  
}