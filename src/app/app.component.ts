import { Component } from '@angular/core';
import { LoginState } from './public/login/login.state';
import { EnvConfig, EnvService } from './env.service';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private appState: AppState, private loginState: LoginState, public envService: EnvService) {
    console.log('running config:', this.envService.envConfig);
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
