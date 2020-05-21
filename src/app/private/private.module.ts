import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LibModule } from '../lib/lib.module';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    LibModule,

  ]
})
export class PrivateModule { }
