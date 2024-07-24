import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { ListusersComponent } from './listusers/listusers.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { ListagentsComponent } from './listagents/listagents.component';
import { RolesComponent } from './roles/roles.component';
import { UserResolver } from './listusers/user-resolver';

const routes: Routes = [
 
  {
    path: 'adminusers',
    component: AdminusersComponent
  },
  // {
  //   path: 'listusers',
  //   component: ListusersComponent
  // },
  {
    path: 'listusers',
    component: ListusersComponent,
    resolve: {
      users: UserResolver
    }
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
