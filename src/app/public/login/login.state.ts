import { Injectable } from '@angular/core';
import { LoginApi, LoginResponse } from 'src/app/api/login.api';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingUtil } from 'src/app/lib/util/loading.util';

class State {
  loadingLogin = new LoadingUtil();
  token = new BehaviorSubject<LoginResponse>(undefined);
  username: string;
  password: string;
}

@Injectable()
export class LoginState {
  private state = new State();

  constructor(private loginApi: LoginApi) {}

  get isLoadingLogin$(): Observable<boolean> {
    return this.state.loadingLogin.isLoading$;
  }

  get token$(): Observable<LoginResponse> {
    return this.state.token.asObservable();
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

  login() {
    const req = {
      body: {
        email: this.state.username,
        password: this.state.password,
      }
    };
    const sub = this.loginApi.login(req).subscribe(
      res => this.state.token.next(res),
    );
    this.state.loadingLogin.waitFor(sub);
  }
}
