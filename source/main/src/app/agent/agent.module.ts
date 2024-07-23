import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { StudentDocumentComponent } from './student-document/student-document.component';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { ListStudentsComponent } from './list-students/list-students.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ViewStudentComponent } from './list-students/view-student/view-student.component';
// import { MatFileUploadModule } from 'mat-file-upload';

@NgModule({
  declarations: [
    StudentRegisterComponent,
    StudentApplicationComponent,
    StudentDocumentComponent,
    ListStudentsComponent,
    ViewStudentComponent,
    // MatFileUploadModule,
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDatatableModule,
    ComponentsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    // MatFileUploadModule
  ]
})
export class AgentModule { }
