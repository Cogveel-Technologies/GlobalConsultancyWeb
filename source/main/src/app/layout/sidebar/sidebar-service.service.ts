import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { RouteInfo } from './sidebar.metadata';
import { RouteInfo } from './sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {

  private apiUrl = 'your-backend-api-url'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}
  

  // Fetch the routes from backend
  getRoutes(): Observable<RouteInfo[]> {
    return this.http.get<RouteInfo[]>(this.apiUrl);
  }
}
