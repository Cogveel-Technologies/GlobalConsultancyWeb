
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { ListusersComponent } from './listusers/listusers.component';

import { NgModule } from '@angular/core';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { ListagentsComponent } from './listagents/listagents.component';
import { RolesComponent } from './roles/roles.component';

// import { LoginComponent } from './login/login.component';
import { ViewUserComponent } from './listusers/view-user/view-user.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ListRolesComponent } from './list-roles/list-roles.component';


@NgModule({
  declarations: [
    AdminusersComponent,
    ListusersComponent,
    AddAgentComponent,
    ListagentsComponent,
    RolesComponent,
    // LoginComponent,
    ViewUserComponent,
    DocumentTypeComponent,
    ListRolesComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDatatableModule,
    ComponentsModule,
    SharedModule
    // CustomsortpaginationModule
    
  ]
})
export class AdminModule { }
