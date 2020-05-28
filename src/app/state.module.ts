import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginState } from 'src/app/public/login/login.state';
import { AppState } from './app.state';
import { ArticlesState } from './private/articles/articles.state';
import { BulkEditState } from './private/bulk-edit/bulk-edit.state';



@NgModule({
  declarations: [],
  providers: [
    LoginState,
    AppState,
    ArticlesState,
    BulkEditState,
  ],
  imports: [
    CommonModule
  ]
})
export class StateModule { }
