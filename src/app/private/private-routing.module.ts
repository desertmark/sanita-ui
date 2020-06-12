import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ArticlesComponent } from './articles/articles.component';
import { BulkEditComponent } from './bulk-edit/bulk-edit.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { AdminGuard } from '../admin.guard';


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
    canActivate: [AdminGuard]
  },
  {
    path: 'articles/create',
    component: ArticleDetailsComponent,
    canActivate: [AdminGuard],
    data: {
      mode: 'create',
    }
  },
  {
    path: 'articles/:id',
    component: ArticleDetailsComponent,
    canActivate: [AdminGuard],
    data: {
      mode: 'edit',
    }
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
