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
import { AuthGuard } from '@core/guard/auth.guard';
import { DropdownComponent } from './dropdown/dropdown.component';
import { PermissionsComponent } from './permissions/permissions.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'adminusers',
        component: AdminusersComponent,
        // canActivate: [AuthGuard],  // Apply AuthGuard
        resolve: {
          users: UserResolver
        }
      },
      {
        path: 'documenttype',
        component: DocumentTypeComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'listusers',
        component: ListusersComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'pagination',
        component: PaginationComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'sorting',
        component: SortingComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'view-users',
        component: ViewUserComponent,
        resolve: {
          user: UserResolver,
        }
        // No AuthGuard here
      },
      {
        path: 'addagents',
        component: AddAgentComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'listagents',
        component: ListagentsComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'listroles',
        component: RolesComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'listrole',
        component: ListRolesComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'consultancy',
        component: RegisterConsultancyComponent,
        // canActivate: [AuthGuard],  // Apply AuthGuard
        resolve: {
          consultancy: ConsultancyResolver,
        },
      },
      {
        path: 'consultancy-list',
        component: ConsultancyListComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path: 'view-consultancy',
        component: ViewConsultancyComponent,
        resolve: {
          consultancy: ConsultancyResolver,
        }
        // No AuthGuard here
      },
      {
        path: 'dropdown',
        component: DropdownComponent,
        // canActivate: [AuthGuard]   // Apply AuthGuard
      },
      {
        path:'permissions',
        component:PermissionsComponent
    
      }
    ]
  }
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
