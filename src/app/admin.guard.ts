import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginState } from './public/login/login.state';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private appState: AppState,
    private router: Router,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(subscriber => {
      this.appState.appReady$.subscribe({
        next: isAppReady => {
          if (isAppReady) {
            subscriber.next(this.appState.currentUser$.value?.role === 'ADMIN');
          }
        }
      });
    });
    this.router.navigate(['/private/']);
    return false;
  }
}
