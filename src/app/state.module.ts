import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginState } from 'src/app/public/login/login.state';



@NgModule({
  declarations: [],
  providers: [
    LoginState,
  ],
  imports: [
    CommonModule
  ]
})
export class StateModule { }
