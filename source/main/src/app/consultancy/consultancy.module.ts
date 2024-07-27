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
import { ConsultancyAllDetailsComponent } from './consultancy-all-details/consultancy-all-details.component';
import { InstituteAllDetailsComponent } from './institute-all-details/institute-all-details.component';
import { IntakesListComponent } from './intakes-list/intakes-list.component';
import { ProgramAllDetailsComponent } from './program-all-details/program-all-details.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { RegisterIntakesComponent } from './register-intakes/register-intakes.component';
import { RegisterProgramComponent } from './register-program/register-program.component';
import { RegisterSessionComponent } from './register-session/register-session.component';
import { SessionListComponent } from './session-list/session-list.component';

@NgModule({
  declarations: [
    // AddconsultancyComponent,
    RegisterConsultancyComponent,
    ConsultancyListComponent,
    RegisterInstituteComponent,
    InstitutionListComponent,
    ConsultancyAllDetailsComponent,
    InstituteAllDetailsComponent,
    IntakesListComponent,
    ProgramAllDetailsComponent,
    ProgramListComponent,
    RegisterIntakesComponent,
    RegisterProgramComponent,
    RegisterSessionComponent,
    SessionListComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ConsultancyRoutingModule,
    ComponentsModule,
  ]
})
export class ConsultancyModule { }
