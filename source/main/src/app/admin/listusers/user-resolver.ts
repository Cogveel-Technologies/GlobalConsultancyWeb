// user-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';
// import { User } from '../models/user.model';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
// export class UserResolver implements Resolve<User[]> {
//   constructor(private adminService: AdminService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    
//     return this.adminService.getUsers();
//   }
// }
export class UserResolver implements Resolve<User[]> {
  constructor(private adminService: AdminService) {}

 

  resolve(): Observable<User[]> {
    const data = this.adminService.getUsers();
    
    data.subscribe(users => {
      console.log(users, "view resolvermmmmmmmmmmmmmmmmmmmmmmmmmmm");
    });
    
    return data;
  }
}
// resolve(): Observable<User[]> {
//   return this.adminService.getUsers();
// }
// }