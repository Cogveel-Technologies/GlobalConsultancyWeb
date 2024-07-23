// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './listusers/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
   // Dummy data for testing
   private users: User[] = [
    { id: 1, firstName: 'Mark', middleName: 'Otto', lastName: 'Doe', password: 'Apass@123', gender: 'Male', email: 'mark@example.com', address: '123 Main St' },
    { id: 2, firstName: 'Jacob', middleName: 'Thornton', lastName: 'Smith', password: 'pass456', gender: 'Male', email: 'jacob@example.com', address: '456 Elm St' },
    { id: 3, firstName: 'Larry', middleName: 'Bird', lastName: 'Johnson', password: 'pass789', gender: 'Male', email: 'larry@example.com', address: '789 Oak St' },
    { id: 4, firstName: 'John', middleName: 'Cena', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'john@example.com', address: '124 Main St' },
    { id: 5, firstName: 'Jane', middleName: 'Doe', lastName: 'Doe', password: 'pass123', gender: 'Female', email: 'jane@example.com', address: '125 Main St' },
    { id: 6, firstName: 'Alice', middleName: 'Wonderland', lastName: 'Doe', password: 'pass123', gender: 'Female', email: 'alice@example.com', address: '126 Main St' },
    { id: 7, firstName: 'Bob', middleName: 'Builder', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'bob@example.com', address: '127 Main St' },
    { id: 8, firstName: 'Charlie', middleName: 'Chocolate', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'charlie@example.com', address: '128 Main St' },
    { id: 9, firstName: 'David', middleName: 'Bowie', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'david@example.com', address: '129 Main St' },
    { id: 10, firstName: 'Eve', middleName: 'Apple', lastName: 'Doe', password: 'pass123', gender: 'Female', email: 'eve@example.com', address: '130 Main St' },
    { id: 11, firstName: 'Frank', middleName: 'Sinatra', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'frank@example.com', address: '131 Main St' }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users); // Return the dummy data as an observable
  }

  submitUserData(userData: any): Observable<any> {
    console.log("my name is register");
    // Replace 'your-api-endpoint' with your actual API endpoint
    return this.http.post('your-api-endpoint', userData);
  }

  updateUserData(userId: string, userData: any): Observable<any> {
    console.log("my name is update");
    // Replace 'your-api-endpoint' with your actual API endpoint
    return this.http.put(`your-api-endpoint/${userId}`, userData);
  }
  
  deleteUser(userId: number): Observable<any> {
    console.log(`Delete user with id ${userId}`);
    return of(`Deleted user with id ${userId}`); // Replace with actual HTTP delete request
  }
  // getUsers(): Observable<any> {
  //   // Replace 'your-api-endpoint' with your actual API endpoint
  //   return this.http.get('your-api-endpoint/users');
  // }
  // getUsers(): Observable<User[]> {
  //    // Replace 'your-api-endpoint' with your actual API endpoint
  //   return this.http.get<User[]>('your-api-endpoint/users');
  // }
}
