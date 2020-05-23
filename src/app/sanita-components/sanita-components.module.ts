import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card/article-card.component';
import { LibModule } from '../lib/lib.module';

const COMPONENTS = [
  ArticleCardComponent,
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
