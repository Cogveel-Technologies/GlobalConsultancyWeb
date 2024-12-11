import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultancyListComponent } from './consultancy-list/consultancy-list.component';
import { RegisterConsultancyComponent } from './register-consultancy/register-consultancy.component';
import { InstitutionListComponent } from './institution-list/institution-list.component';
import { RegisterInstituteComponent } from './register-institute/register-institute.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { RegisterProgramComponent } from './register-program/register-program.component';
import { ConsultancyAllDetailsComponent } from './consultancy-all-details/consultancy-all-details.component';
import { InstituteAllDetailsComponent } from './institute-all-details/institute-all-details.component';
import { ProgramAllDetailsComponent } from './program-all-details/program-all-details.component';
import { IntakesListComponent } from './intakes-list/intakes-list.component';
import { RegisterIntakesComponent } from './register-intakes/register-intakes.component';
import { SessionListComponent } from './session-list/session-list.component';
import { RegisterSessionComponent } from './register-session/register-session.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { RegisterAgentComponent } from './register-agent/register-agent.component';
import { AgentAllDetailsComponent } from './agent-all-details/agent-all-details.component';
import { NoDataFoundComponent } from '@shared/components/no-data-found/no-data-found.component';

// Resolvers for routes
import { allConsultancyDetails } from './consultancy-resolvers/allDetails-consultancy.resolver';
import { allInstituteDetails } from './consultancy-resolvers/allDetails-institute.resolver';
import { allProgramDetails } from './consultancy-resolvers/allDetails-program.resolver';
import { allAgentDetails } from './consultancy-resolvers/allDetails-agent.resolver';
import { ConsultancyResolver } from './consultancy-resolvers/edit-consultancy.resolver';
import { InstituteResolver } from './consultancy-resolvers/edit-institute.resolver';
import { IntakeResolver } from './consultancy-resolvers/edit-intake.resolver';
import { SessionResolver } from './consultancy-resolvers/edit-session.resolver';
import { AgentResolver } from './consultancy-resolvers/edit-agent.resolver';

const routes: Routes = [
  // Institute Routes
  {
    path: 'institution-list',
    component: InstitutionListComponent,
  },
  {
    path: 'register-institute',
    component: RegisterInstituteComponent,
  },
  {
    path: 'edit-institute/:id',
    component: RegisterInstituteComponent,
    resolve: { editResponse: InstituteResolver },
  },
  {
    path: 'institute-details/:id',
    component: InstituteAllDetailsComponent,
    resolve: { instituteDetails: allInstituteDetails },
  },

  // Program Routes
  {
    path: 'program-list',
    component: ProgramListComponent,
  },
  {
    path: 'register-program',
    component: RegisterProgramComponent,
  },
  {
    path: 'program-details/:id',
    component: ProgramAllDetailsComponent,
    resolve: { programDetails: allProgramDetails },
  },
  {
    path: 'edit-program/:id',
    component: RegisterProgramComponent,
    resolve: { programDetails: allProgramDetails },
  },

  // Intake Routes
  {
    path: 'intake-list',
    component: IntakesListComponent,
  },
  {
    path: 'register-intake',
    component: RegisterIntakesComponent,
  },
  {
    path: 'edit-intake/:id',
    component: RegisterIntakesComponent,
    resolve: { editResponse: IntakeResolver },
  },

  // Session Routes
  {
    path: 'session-list',
    component: SessionListComponent,
  },
  {
    path: 'register-session',
    component: RegisterSessionComponent,
  },
  {
    path: 'edit-session/:id',
    component: RegisterSessionComponent,
    resolve: { editResponse: SessionResolver },
  },

  // Agent Routes
  {
    path: 'agent-list',
    component: AgentListComponent,
  },
  {
    path: 'register-agent',
    component: RegisterAgentComponent,
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

  // No Data Found Route
  {
    path: 'no-data-found',
    component: NoDataFoundComponent,
  },

  // Fallback Route (404)
  {
    path: '**',
    redirectTo: '/no-data-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultancyRoutingModule {}
