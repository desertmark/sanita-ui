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
import { ToastService } from '../lib/components/toast/toast.service';
const UNEXPECTED_ERROR_MSG = 'Un error inesperado ha ocurrido. Porfavor contacta con el administrador si el problema persiste';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private loginState: LoginState,
    private toastService: ToastService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginState.clearSession();
          this.router.navigate(['/public/login']);
          this.toastService.secondary({
            body: {
              leftIcon: 'infoCircle',
              description: 'Tu sesión ha expirado, porfavor ingresa de nuevo para continuar.'
            }
          });
          throw error;
        }
        this.toastService.danger({
          body: {
            leftIcon: 'infoCircle',
            description: error?.error?.message || UNEXPECTED_ERROR_MSG,
          },
        });
        throw error;
      })
    );
  }
}
