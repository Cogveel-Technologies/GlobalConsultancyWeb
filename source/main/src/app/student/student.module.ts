import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';


import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDatatableModule,
    ComponentsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class StudentModule { }
