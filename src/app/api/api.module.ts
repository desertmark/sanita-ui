import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginApi } from './login.api';
import { UserApi } from './user.api';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { ArticlesApi } from './articles.api';
import { ErrorInterceptor } from '../interceptors/error.interceptor';


@NgModule({
  declarations: [],
  providers: [
    // apis
    LoginApi,
    UserApi,
    ArticlesApi,
    // interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class ApiModule { }
