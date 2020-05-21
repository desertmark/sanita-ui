import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SHARED_MODULES } from '../shared/shared.module';
import { IconComponent } from './icon/icon.component';
import { RouterModule } from '@angular/router';
import { TextFieldComponent } from './text-field/text-field.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { SpinnerComponent } from './spinner/spinner.component';

const COMPONENTS = [
  HeaderComponent,
  IconComponent,
  TextFieldComponent,
  PasswordFieldComponent,
  FormErrorsComponent,
  SpinnerComponent,
];

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SHARED_MODULES,
  ],
  exports: [
    COMPONENTS
  ]
})
export class ComponentsModule { }
