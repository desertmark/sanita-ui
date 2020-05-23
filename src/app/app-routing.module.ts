import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';


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
    loadChildren: () => PrivateModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
