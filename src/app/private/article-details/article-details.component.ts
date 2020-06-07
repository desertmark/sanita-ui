import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleDetailsModel } from './article-details.model';
import { Route, ActivatedRoute } from '@angular/router';
import { ArticlesState } from '../articles/articles.state';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  form = new ArticleDetailsModel(this.articlesState.categories$, this.articlesState.isLoadingCategories$);

  headerMap = {
    create: {
      title: 'Alta',
      subtitle: 'Crea un nuevo producto en la base de datos.',
      buttonText: 'Dar de alta el producto',
    },
    edit: {
      title: 'Editar',
      subtitle: 'Edita los campos del producto y guarda los cambio en la base de datos.',
      buttonText: 'Editar producto',
    }
  };

  constructor(private route: ActivatedRoute, public articlesState: ArticlesState) {
    this.articlesState.loadArticles();
  }

  get title(): string {
    return this.headerMap[this.getHeaderMapItem()].title;
  }

  get subtitle(): string {
    return this.headerMap[this.getHeaderMapItem()].subtitle;
  }

  get buttonText(): string {
    return this.headerMap[this.getHeaderMapItem()].buttonText;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.form) {
      this.form.destroy();
    }
  }

  filterCategories(filter: string) {
    this.articlesState.loadCategories(filter);
  }

  private getHeaderMapItem(): string {
    return 'create';
  }

  create() {
    const sub = this.articlesState.createArticle(this.form.values).subscribe();
  }

}
