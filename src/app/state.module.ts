import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginState } from 'src/app/public/login/login.state';
import { AppState } from './public/app.state';
import { ArticlesState } from './private/articles/articles.state';



@NgModule({
  declarations: [],
  providers: [
    LoginState,
    AppState,
    ArticlesState,
  ],
  imports: [
    CommonModule
  ]
})
export class StateModule { }
