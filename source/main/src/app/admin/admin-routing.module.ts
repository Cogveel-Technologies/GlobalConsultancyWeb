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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
