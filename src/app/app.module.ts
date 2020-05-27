import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './lib/components/components.module';
import { StateModule } from './state.module';
import { LibModule } from './lib/lib.module';
import { EnvService, ENV_CONFIG_TOKEN } from './env.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // CUSTOM
    LibModule,
    StateModule,
  ],
  providers: [
    { provide: ENV_CONFIG_TOKEN, useValue: environment },
    EnvService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
