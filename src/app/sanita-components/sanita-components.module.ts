import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card/article-card.component';
import { LibModule } from '../lib/lib.module';
import { ArticleListComponent } from './article-list/article-list.component';

const COMPONENTS = [
  ArticleCardComponent,
  ArticleListComponent
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
