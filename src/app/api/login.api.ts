import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export class LoginApi {
  private baseUrl = 'https://qa-artic-manager.herokuapp.com';

  constructor(private http$: HttpClient) {
  }


  private url(path: string): string {
    return this.baseUrl + path;
  }

  login(options: LoginRequest): Observable<LoginResponse> {
    return this.http$.post<LoginResponse>(this.url('/auth/login'), options.body);
  }

}
