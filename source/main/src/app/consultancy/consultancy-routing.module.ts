import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterConsultancyComponent } from './register-consultancy/register-consultancy.component';
import { ConsultancyListComponent } from './consultancy-list/consultancy-list.component';
import { RegisterInstituteComponent } from './register-institute/register-institute.component';
import { InstitutionListComponent } from './institution-list/institution-list.component';
import { RegisterProgramComponent } from './register-program/register-program.component';
import { ProgramListComponent } from './program-list/program-list.component';

// import { ConsultancyResolver } from './consultancy-resolvers/edit-consultancy.resolver';
import { ConsultancyAllDetailsComponent } from './consultancy-all-details/consultancy-all-details.component';

import { InstituteAllDetailsComponent } from './institute-all-details/institute-all-details.component';
import { allInstituteDetails } from './consultancy-resolvers/allDetails-institute.resolver';

import { ProgramAllDetailsComponent } from './program-all-details/program-all-details.component';

import { RegisterIntakesComponent } from './register-intakes/register-intakes.component';
import { IntakesListComponent } from './intakes-list/intakes-list.component';
import { RegisterSessionComponent } from './register-session/register-session.component';
import { SessionListComponent } from './session-list/session-list.component';
import { IntakeResolver } from './consultancy-resolvers/edit-intake.resolver';
import { SessionResolver } from './consultancy-resolvers/edit-session.resolver';
import { InstituteResolver } from './consultancy-resolvers/edit-institute.resolver';
import { allConsultancyDetails } from './consultancy-resolvers/allDetails-consultancy.resolver';
import { ProgramResolver } from './consultancy-resolvers/edit-program.resolver';
import { allProgramDetails } from './consultancy-resolvers/allDetails-program.resolver';
import { ConsultancyResolver } from './consultancy-resolvers/edit-consultancy.resolver';
import { RegisterAgentComponent } from './register-agent/register-agent.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentResolver } from './consultancy-resolvers/edit-agent.resolver';
import { AgentAllDetailsComponent } from './agent-all-details/agent-all-details.component';
import { allAgentDetails } from './consultancy-resolvers/allDetails-agent.resolver';
import { AuthGuard } from '@core/guard/auth.guard';
import { NoDataFoundComponent } from '@shared/components/no-data-found/no-data-found.component';



const routes: Routes = [

  {
    path: 'register-consultancy',
    component: RegisterConsultancyComponent,
  },

  {
    path: 'edit-consultancy/:id',
    component: RegisterConsultancyComponent,
    resolve: { editResponse: ConsultancyResolver }
  },
  {
    path: 'consultancy-list',
    component: ConsultancyListComponent,

  },
  , {
    path: 'consultancy-details/:id',
    component: ConsultancyAllDetailsComponent,
    resolve: { consultancyDetails: allConsultancyDetails }
  },
  {
    path: 'register-institute',
    component: RegisterInstituteComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'edit-institute/:id',
    component: RegisterInstituteComponent,
    resolve: { editResponse: InstituteResolver },
  }, {
    path: 'institute-details/:id',
    component: InstituteAllDetailsComponent,
    resolve: { instituteDetails: allInstituteDetails },
  },
  {
    path: 'institution-list',
    component: InstitutionListComponent,
    canActivate:[AuthGuard],
  }, 
  {
    path: 'register-program',
    component: RegisterProgramComponent,
    canActivate:[AuthGuard]
  }, {
    path: 'program-details/:id',
    component: ProgramAllDetailsComponent,
    resolve: { programDetails: allProgramDetails },
  }, {
    path: 'program-list',
    component: ProgramListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-program/:id',
    component: RegisterProgramComponent,
    resolve: { programDetails: allProgramDetails },
  }, {
    path: 'register-intake',
    component: RegisterIntakesComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-intake/:id',
    component: RegisterIntakesComponent,
    resolve: { editResponse: IntakeResolver },
  },
  {
    path: 'intake-list',
    component: IntakesListComponent,
    canActivate:[AuthGuard]

  }, {
    path: 'register-session',
    component: RegisterSessionComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-session/:id',
    component: RegisterSessionComponent,
    resolve: { editResponse: SessionResolver }
  },
  {
    path: 'session-list',
    component: SessionListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'register-agent',
    component: RegisterAgentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'agent-list',
    component: AgentListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-agent/:id',
    component: RegisterAgentComponent,
    resolve: { editResponse: AgentResolver },
  },
  {
    path: 'agent-details/:id',
    component: AgentAllDetailsComponent,
    resolve: { agentDetails: allAgentDetails },
  },
  {
    path: 'no-data-found',
    component: NoDataFoundComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultancyRoutingModule { }
