import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from './base.api';
export interface LoginRequest {
  body: {
    email: string;
    password: string;
  };
}

export interface LoginResponse {
  token: string;
  claims: {
      sub: string;
      name: string;
      email: string;
  };
}
@Injectable()
export class LoginApi extends BaseApi {

  login(options: LoginRequest): Observable<LoginResponse> {
    return this.http$.post<LoginResponse>(this.url('/auth/login'), options.body);
  }

  logout() {
    return this.http$.get(this.url('/auth/logout'), {
      responseType: 'text',
    });
  }

}
