import { Component } from '@angular/core';
import { AppState } from './public/app.state';
import { LoginState } from './public/login/login.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private appState: AppState, private loginState: LoginState) {
    this.restoreSession();
  }

  restoreSession() {
    this.loginState.restoreSession();
    const userId = this.loginState.token$.value?.claims?.sub;
    if (userId) {
      this.appState.loadCurrentUser(userId).subscribe();
    }
  }
}
