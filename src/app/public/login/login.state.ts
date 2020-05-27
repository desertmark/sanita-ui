import { Injectable } from '@angular/core';
import { LoginApi, LoginResponse } from 'src/app/api/login.api';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { LoadingUtil } from 'src/app/lib/util/loading.util';

class State {
  loadingLogin = new LoadingUtil();
  loadingLogout = new LoadingUtil();
  token$ = new BehaviorSubject<LoginResponse>(undefined);
  username: string;
  password: string;
  isLogged$ = new BehaviorSubject<boolean>(false);
}

@Injectable()
export class LoginState {
  private state = new State();

  constructor(private loginApi: LoginApi) {
  }

  get isLoadingLogin$(): Observable<boolean> {
    return this.state.loadingLogin.isLoading$;
  }
  get isLoadingLogout$(): Observable<boolean> {
    return this.state.loadingLogout.isLoading$;
  }

  get token$(): BehaviorSubject<LoginResponse> {
    return this.state.token$;
  }

  get username(): string {
    return this.state.username;
  }
  set username(val: string) {
    this.state.username = val;
  }

  get password(): string {
    return this.state.password;
  }
  set password(val: string) {
    this.state.password = val;
  }

  get isLogged$(): BehaviorSubject<boolean> {
    return this.state.isLogged$;
  }

  login(): Observable<void> {
    return new Observable(subscriber => {
      const req = {
        body: {
          email: this.state.username,
          password: this.state.password,
        }
      };
      const sub = this.loginApi.login(req).subscribe({
        next: res => {
          this.state.token$.next(res);
          this.state.isLogged$.next(true);
          this.storeSession(res);
          subscriber.next();
        },
        error: error => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
      this.state.loadingLogin.waitFor(sub);
    });
  }

  logout(): Observable<void> {
    return new Observable<void>(subscriber => {
      const sub = this.loginApi.logout().subscribe({
        next: res => {
          this.clearSession();
          subscriber.next();
        },
        error: error => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
      this.state.loadingLogout.waitFor(sub);
    });
  }

  restoreSession() {
    const session = this.getSession();
    if (session) {
      this.state.token$.next(session);
      this.state.isLogged$.next(true);
    } else {
      this.state.isLogged$.next(false);
    }
  }

  clearSession() {
    localStorage.removeItem('session');
    this.state.token$.next(undefined);
    this.state.isLogged$.next(false);
  }

  storeSession(session: LoginResponse) {
    const serialized = JSON.stringify(session);
    localStorage.setItem('session', serialized);
  }

  getSession(): LoginResponse {
    try {
      return JSON.parse(localStorage.getItem('session'));
    } catch (e) {
      return;
    }
  }
}
