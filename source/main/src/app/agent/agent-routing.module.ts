import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { StudentDocumentComponent } from './student-document/student-document.component';
// import { ListStudentsComponent } from './list-students/list-students.component';
import { ListstudentsComponent } from './list-students/list-students.component';
import { StudentResolver } from './agent-resolvers/student-resolver';
import { ViewStudentComponent } from './list-students/view-student/view-student.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { AdmissionComponent } from './admission/admission.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { RegisterwizardComponent } from './registerwizard/registerwizard.component';
import { ViewAnyappComponent } from './application-list/view-anyapp/view-anyapp.component';




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
    path: '',
    canActivate: [AuthGuard], // Apply AuthGuard to all child routes
    children: [

      {
        path: 'register-student',
        component: StudentRegisterComponent,
        resolve: {
          student: StudentResolver
        },

        // canActivate:[AuthGuard]
      },
      {
        path: 'registerwizard',
        component: RegisterwizardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'list-students',
        component: ListstudentsComponent,
        // canActivate: [AuthGuard]

      },
      {
        path: 'applications',
        component: ApplicationsComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'application-list',
        component: ApplicationListComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'student-application',
        component: StudentApplicationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'viewany-application',
        component: ViewAnyappComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admission',
        component: AdmissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'student-document',
        component: StudentDocumentComponent,
        resolve: {
          student: StudentResolver
        },
        // canActivate:[AuthGuard]
      },

      {
        path: 'view-student',
        component: ViewStudentComponent,
        resolve: {
          student: StudentResolver
        }
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
