import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginState } from '../public/login/login.state';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private loginState: LoginState) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginState.clearSession();
          this.router.navigate(['/public/login']);
        }
        throw error;
      })
    );
  }
}
