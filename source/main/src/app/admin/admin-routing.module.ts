import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { ListusersComponent } from './listusers/listusers.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { ListagentsComponent } from './listagents/listagents.component';
import { RolesComponent } from './roles/roles.component';
import { UserResolver } from './listusers/user-resolver';
import { ViewUserComponent } from './listusers/view-user/view-user.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { SortingComponent } from '@shared/components/sorting/sorting.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { RegisterConsultancyComponent } from './register-consultancy/register-consultancy.component';
import { ConsultancyListComponent } from './consultancy-list/consultancy-list.component';
import { ConsultancyResolver } from './consultancy-list/consultancy.resolver';
import { ViewConsultancyComponent } from './consultancy-list/view-consultancy/view-consultancy.component';

const routes: Routes = [
  {
    path: 'adminusers',
    component: AdminusersComponent,
    resolve: {
      users: UserResolver
    }
  },
  {
    path: 'documenttype',
    component: DocumentTypeComponent,
  },
  {
    path: 'listusers',
    component: ListusersComponent,
  },
  {
    path: 'pagination',
    component: PaginationComponent,
  },
  {
    path: 'sorting',
    component: SortingComponent,
  },
  {
    path: 'view-users',
    component: ViewUserComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: 'addagents',
    component: AddAgentComponent
  },
  {
    path: 'listagents',
    component: ListagentsComponent
  },
  {
    path: 'listroles',
    component: RolesComponent
  },
  {
    path: 'listrole',
    component: ListRolesComponent
  },
  {
    path: 'consultancy',
    component: RegisterConsultancyComponent,
    resolve: {
      consultancy: ConsultancyResolver,
    },
  },
  {
    path: 'consultancy-list',
    component: ConsultancyListComponent
  },
  {
    path: 'view-consultancy',
    component: ViewConsultancyComponent,
    resolve: {
      consultancy: ConsultancyResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
