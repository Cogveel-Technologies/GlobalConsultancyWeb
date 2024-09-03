import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { FeatherIconsModule } from './components/feather-icons/feather-icons.module';
import { CustomValidatorDirective } from 'app/custom-validator.directive';
// import { PaginationComponent } from 'app/pagination/pagination.component';
// import { SortingComponent } from 'app/sorting/sorting.component';
@NgModule({
  declarations: [
    CustomValidatorDirective,
    // PaginationComponent,
    // SortingComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialModule, FeatherIconsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    CustomValidatorDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
