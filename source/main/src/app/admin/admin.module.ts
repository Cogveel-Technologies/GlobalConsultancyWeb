
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

// import { CustomValidatorDirective } from 'app/custom-validator.directive';

@NgModule({
  declarations: [
    AdminusersComponent,
    ListusersComponent,
    AddAgentComponent,
    ListagentsComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
     AdminRoutingModule,


    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDatatableModule,
    ComponentsModule,
    SharedModule,
    
  ]
})
export class AdminModule { }
