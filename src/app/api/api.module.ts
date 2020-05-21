import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginApi } from './login.api';


@NgModule({
  declarations: [],
  providers: [
    LoginApi,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class ApiModule { }
