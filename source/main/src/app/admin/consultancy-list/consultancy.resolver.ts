import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../admin.service';
import { Consultancy } from './consultancy.model';  // Ensure this model is correctly defined

@Injectable({
  providedIn: 'root'
})
export class ConsultancyResolver implements Resolve<Consultancy | null> {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Consultancy | null> {
    const consultancyId = route.queryParams['id'];
    console.log(consultancyId, "resolver...");

    if (consultancyId) {
      return this.adminService.getConsultancyById(+consultancyId);
    }
    return of(null);
  }
}
