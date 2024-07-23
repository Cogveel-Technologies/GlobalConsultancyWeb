import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { StudentDocumentComponent } from './student-document/student-document.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { StudentResolver } from './agent-resolvers/student-resolver';
import { ViewStudentComponent } from './list-students/view-student/view-student.component';

const routes: Routes = [
  
    {
      path: 'register-student',
      component: StudentRegisterComponent,
    },
    {
      path: 'list-students',
      component: ListStudentsComponent,
      resolve: {
        students: StudentResolver
      }
    },
    {
      path: 'student-application',
      component: StudentApplicationComponent,
    },
    {
      path: 'student-document',
      component: StudentDocumentComponent,
    },
    {
      path: 'view-student',
      component: ViewStudentComponent,
    },
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
