import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiModule } from 'src/app/api/api.module';
export const SHARED_MODULES = [
  NgbModule,
  FontAwesomeModule,
  ApiModule,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    SHARED_MODULES,
  ]
})
export class SharedModule { }
