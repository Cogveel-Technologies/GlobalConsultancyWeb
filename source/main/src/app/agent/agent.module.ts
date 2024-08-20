import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { StudentDocumentComponent } from './student-document/student-document.component';
import { ComponentsModule } from '../shared/components/components.module';

// import { CustomsortpaginationModule } from 'app/customsortpagination/customsortpagination.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListstudentsComponent } from './list-students/list-students.component';
import { ViewStudentComponent } from './list-students/view-student/view-student.component';
import { SharedModule } from '@shared/shared.module';
// import { PaginationComponent } from '@shared/components/pagination/pagination.component';
// import { SortingComponent } from '@shared/components/sorting/sorting.component';


@NgModule({
  declarations: [
    StudentRegisterComponent,
    StudentApplicationComponent,
    StudentDocumentComponent,
   
    ListstudentsComponent,
    ViewStudentComponent,
    // PaginationComponent,
    // SortingComponent
  
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
