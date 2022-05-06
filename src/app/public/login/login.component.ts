import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginModel } from './login.model';
import { LoginState } from './login.state';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form =  new LoginModel();
  constructor(
    public loginState: LoginState,
    public appState: AppState,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.loginState.isLogged$.value) {
      this.next();
    }
  }

  login() {
    if (this.form.valid) {
      this.loginState.username = this.form.username.value;
      this.loginState.password = this.form.password.value;
      this.loginState.login()
      .pipe(switchMap(() => this.appState.loadCurrentUser(this.loginState.token$?.value?.userInfo)))
      .subscribe(
        () => this.next(),
      );
    }
  }

  next() {
    this.router.navigate(['/private']);
  }


}
