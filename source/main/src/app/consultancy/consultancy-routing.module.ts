import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterConsultancyComponent } from './register-consultancy/register-consultancy.component';
import { ConsultancyListComponent } from './consultancy-list/consultancy-list.component';
import { RegisterInstituteComponent } from './register-institute/register-institute.component';
import { InstitutionListComponent } from './institution-list/institution-list.component';


const routes: Routes = [
 
    {
      path: 'register-consultancy',
      component: RegisterConsultancyComponent
    },
    {
      path: 'consultancy-list',
      component: ConsultancyListComponent
    },
    {
      path: 'register-institute',
      component: RegisterInstituteComponent
    },
    {
      path: 'institution-list',
      component: InstitutionListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultancyRoutingModule { }
