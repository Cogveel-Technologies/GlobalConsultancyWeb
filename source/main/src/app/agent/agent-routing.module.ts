import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { StudentDocumentComponent } from './student-document/student-document.component';
// import { ListStudentsComponent } from './list-students/list-students.component';
import { ListstudentsComponent } from './list-students/list-students.component';
import { StudentResolver } from './agent-resolvers/student-resolver';
import { ViewStudentComponent } from './list-students/view-student/view-student.component';
// import { PaginationComponent } from '@shared/components/pagination/pagination.component';
// import { SortingComponent } from '@shared/components/sorting/sorting.component';


const routes: Routes = [
  // {
  //   path: 'pagination',
  //   component: PaginationComponent,
  // },
  // {
  //   path: 'sorting',
  //   component: SortingComponent,
  // },
  
    {
      path: 'register-student',
      component: StudentRegisterComponent,
      resolve: {
        student: StudentResolver
      }
    },
    {
      path: 'list-students',
      component: ListstudentsComponent,
     
    },
    {
      path: 'student-application',
      component: StudentApplicationComponent,
    },
    {
      path: 'student-document',
      component: StudentDocumentComponent,
      resolve: {
        student: StudentResolver
      }
    },
    {
      path: 'view-student',
      component: ViewStudentComponent,
      resolve: {
        student: StudentResolver
      }
    },
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
