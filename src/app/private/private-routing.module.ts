import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ArticlesComponent } from './articles/articles.component';


const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
