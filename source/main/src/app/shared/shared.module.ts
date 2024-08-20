import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { FeatherIconsModule } from './components/feather-icons/feather-icons.module';
import { CustomValidatorDirective } from 'app/custom-validator.directive';
@NgModule({
  declarations: [ CustomValidatorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    CustomValidatorDirective
  ]
})
export class SharedModule {}
