import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from './base.api';
export interface LoginRequest {
  body: {
    username: string;
    password: string;
  };
}

export interface LoginResponse {
  accessToken: string;
  userInfo: any;
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
