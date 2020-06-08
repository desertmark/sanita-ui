import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleDetailsModel, ArticlesDetailsValues } from './article-details.model';
import { Route, ActivatedRoute } from '@angular/router';
import { ArticlesState } from '../articles/articles.state';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  form: ArticleDetailsModel;
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
  private get mode(): string {
    return this.route.snapshot.data.mode;
  }

  get title(): string {
    return this.headerMap[this.mode].title;
  }

  get subtitle(): string {
    return this.headerMap[this.mode].subtitle;
  }

  get buttonText(): string {
    return this.headerMap[this.mode].buttonText;
  }

  get isEdit(): boolean {
    return this.mode === 'edit';
  }

  ngOnInit(): void {
    this.isEdit ? this.initEditMode() : this.initCreateMode();
  }

  ngOnDestroy(): void {
    if (this.form) {
      this.form.destroy();
    }
  }

  filterCategories(filter: string) {
    this.articlesState.loadCategories(filter);
  }

  create() {
    const sub = this.articlesState.createArticle(this.form.values).subscribe();
  }

  initCreateMode() {
    this.form = new ArticleDetailsModel(this.articlesState.categories$, this.articlesState.isLoadingCategories$);
  }

  initEditMode() {
    if (!this.articlesState.currentArticle) {
      const articleId = this.route.snapshot.paramMap.get('id');
      // this.articleState.loadCurrentArticle(articleId)
    }
    const article = this.articlesState.currentArticle;
    this.form = new ArticleDetailsModel(
      this.articlesState.categories$,
      this.articlesState.isLoadingCategories$,
      {
        codeStringField: article.codeString,
        descriptionField: article.description,
        priceField: article.price,
        costField: article.cost,
        dolarField: article.dolar,
        utilityField: article.utility * 100,
        listPriceField: article.listPrice,
        vatField: article.vat  * 100,
        transportField: article.transport  * 100,
        cardField: article.card  * 100,
        cardPriceField: article.cardPrice,
        categoryIdField: article.category._id,
      }
    );
  }

}
