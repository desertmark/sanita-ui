import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginState } from '../public/login/login.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginState: LoginState) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;
    const token = this.loginState.token$?.value?.accessToken;
    if (token) {
      const headers = request.headers.append('Authorization', `Bearer ${token}`);
      req = request.clone({ headers });
    }
    return next.handle(req);
  }
}
