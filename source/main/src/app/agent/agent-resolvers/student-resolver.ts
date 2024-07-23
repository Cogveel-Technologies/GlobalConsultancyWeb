import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AgentService } from '../agent.service';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<Student[]> {
  constructor(private agentService: AgentService) {}

  resolve(): Observable<Student[]> {
    const data = this.agentService.getStudents();
    
    data.subscribe(students => {
      console.log(students, "view resolver");
    });
    
    return data;
  }
}
