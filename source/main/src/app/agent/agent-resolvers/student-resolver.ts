import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AgentService } from '../agent.service';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<Student> {
  constructor(private agentService: AgentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student> {
    const studentId = route.queryParams['id'];
    console.log(studentId,"resolver...........")
    if (studentId) {
      return this.agentService.getStudentById(+studentId);
    }
    return null;
  }
}
