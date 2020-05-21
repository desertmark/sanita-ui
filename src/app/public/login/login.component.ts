import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginModel } from './login.model';
import { LoginState } from './login.state';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form =  new LoginModel();
  constructor(public loginState: LoginState) {
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.valid) {
      this.loginState.username = this.form.username.value;
      this.loginState.password = this.form.password.value;
      this.loginState.login();
    }
  }


}
