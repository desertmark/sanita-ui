import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => PublicModule
  },
  {
    path: 'public',
    loadChildren: () => PublicModule
  },
  {
    path: 'private',
    loadChildren: () => PrivateModule,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
