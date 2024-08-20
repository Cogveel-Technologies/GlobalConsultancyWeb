import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../admin.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User | null> {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | null> {
    const userId = route.queryParams['id'];
    console.log(userId, "resolver...");
    

    if (userId) {
      return this.adminService.getUserById(+userId);
    }
    return of(null);
  }
}
