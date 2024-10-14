import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FeatherIconsModule } from './components/feather-icons/feather-icons.module';
import { CustomValidatorDirective } from 'app/custom-validator.directive';
import { DatePickerComponent } from 'app/date-picker/date-picker.component';



@NgModule({
  declarations: [
    CustomValidatorDirective,
    // Other directives or components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    DatePickerComponent
 
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    CustomValidatorDirective,
    DatePickerComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Allow custom elements
})
export class SharedModule { }
