import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card/article-card.component';
import { LibModule } from '../lib/lib.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDeleteConfirmComponent } from './article-delete-confirm/article-delete-confirm.component';

const COMPONENTS = [
  ArticleCardComponent,
  ArticleListComponent,
  ArticleDeleteConfirmComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    LibModule,
    CommonModule
  ],
  exports: [
    COMPONENTS,
  ]
})
export class SanitaComponentsModule { }
