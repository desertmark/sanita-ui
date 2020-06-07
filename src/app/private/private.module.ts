import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LibModule } from '../lib/lib.module';
import { ArticlesComponent } from './articles/articles.component';
import { SanitaComponentsModule } from '../sanita-components/sanita-components.module';
import { BulkEditComponent } from './bulk-edit/bulk-edit.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ArticlesComponent,
    BulkEditComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    LibModule,
    SanitaComponentsModule,
  ]
})
export class PrivateModule { }
