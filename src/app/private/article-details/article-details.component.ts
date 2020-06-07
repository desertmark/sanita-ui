import { Component, OnInit } from '@angular/core';
import { ArticleDetailsModel } from './article-details.model';
import { Route, ActivatedRoute } from '@angular/router';
import { ArticlesState } from '../articles/articles.state';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  form = new ArticleDetailsModel(this.articlesState.categories$, this.articlesState.isLoadingCategories$);

  headerMap = {
    create: {
      title: 'Alta',
      subtitle: 'Crea un nuevo producto en la base de datos.'
    },
    edit: {
      title: 'Editar',
      subtitle: 'Edita los campos del producto y guarda los cambio en la base de datos.'
    }
  };

  constructor(private route: ActivatedRoute, public articlesState: ArticlesState) {
    this.articlesState.loadArticles();
  }

  get title(): string {
    return this.headerMap[this.getHeaderMapItem()].title;
  }

  get subtitle(): string {
    return this.headerMap.create.subtitle;
  }

  ngOnInit(): void {
    // const sub = this.articlesState.categories$.subscribe(
    //   res => this.form.categoryIdField.options = res,
    // );
  }

  filterCategories(filter: string) {
    this.articlesState.loadCategories(filter);
  }

  private getHeaderMapItem(): string {
    // console.log(this.route.url);
    return 'create';
  }

}
