import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultancyRoutingModule } from './consultancy-routing.module';
// import { AddconsultancyComponent } from './addconsultancy/addconsultancy.component';

import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterConsultancyComponent } from './register-consultancy/register-consultancy.component';
import { ConsultancyListComponent } from './consultancy-list/consultancy-list.component';
import { RegisterInstituteComponent } from './register-institute/register-institute.component';
import { InstitutionListComponent } from './institution-list/institution-list.component';

@NgModule({
  declarations: [
    // AddconsultancyComponent,
    RegisterConsultancyComponent,
    ConsultancyListComponent,
    RegisterInstituteComponent,
    InstitutionListComponent
  ],
  imports: [
    CommonModule,
    ConsultancyRoutingModule,




  
   ComponentsModule,
   SharedModule,
  ]
})
export class ConsultancyModule { }
