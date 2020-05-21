import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { LibModule } from '../lib/lib.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    LibModule,
  ]
})
export class PublicModule { }
