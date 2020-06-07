import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ArticlesComponent } from './articles/articles.component';
import { BulkEditComponent } from './bulk-edit/bulk-edit.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';


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
    path: 'articles/bulk-edit',
    component: BulkEditComponent,
  },
  {
    path: 'articles/create',
    component: ArticleDetailsComponent,
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
