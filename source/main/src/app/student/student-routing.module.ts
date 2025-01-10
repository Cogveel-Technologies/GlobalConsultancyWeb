import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ViewApplicationComponent } from './view-application/view-application.component';

const routes: Routes = [
  {
    path: 'student-profile',
    component: StudentProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'my-applications',
    component: MyApplicationsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'view-application',
    component: ViewApplicationComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
