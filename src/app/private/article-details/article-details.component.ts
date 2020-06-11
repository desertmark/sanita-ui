import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleDetailsModel, DiscountField, NewDiscountModel } from './article-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesState } from '../articles/articles.state';
import { SubscriptionLike } from 'rxjs';
import { ArticlesUtil } from '../articles/articles.util';
import { Discount } from 'src/app/api/articles.api';
import { TextFieldModel } from 'src/app/lib/models/text-field.model';
import { NumberFieldModel } from 'src/app/lib/models/number-field.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  newDiscountForm = new NewDiscountModel();
  subscriptions: SubscriptionLike[] = [];
  form: ArticleDetailsModel;
  headerMap = {
    create: {
      title: 'Alta',
      subtitle: 'Crea un nuevo producto en la base de datos.',
      buttonText: 'Dar de alta el producto',
      buttonHandler: this.create.bind(this),
    },
    edit: {
      title: 'Editar',
      subtitle: 'Edita los campos del producto y guarda los cambio en la base de datos.',
      buttonText: 'Editar producto',
      buttonHandler: this.edit.bind(this),
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public articlesState: ArticlesState
  ) {
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

  get buttonHandler()  {
    return this.headerMap[this.mode].buttonHandler;
  }

  ngOnInit(): void {
    this.isEdit ? this.initEditMode() : this.initCreateMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    if (this.form) {
      this.form.destroy();
    }
  }

  filterCategories(filter: string) {
    this.articlesState.loadCategories(filter);
  }

  create() {
    const sub = this.articlesState.createArticle(this.form.values).subscribe(
      res => this.router.navigate([`/private/articles/${res._id}`])
    );
  }

  edit() {
    const sub = this.articlesState.editArticle(this.form.values).subscribe();
  }

  deleteArticle() {
    const sub = this.articlesState.deleteArticle(this.articlesState.currentArticle$.value).subscribe({
      next: () => this.router.navigate(['/private/articles']),
    });
  }

  initCreateMode() {
    this.form = new ArticleDetailsModel(this.articlesState.categories$, this.articlesState.isLoadingCategories$);
  }

  initEditMode() {
    if (!this.articlesState.currentArticle$.value) {
      const articleId = this.route.snapshot.paramMap.get('id');
      this.articlesState.loadCurrentArticle(articleId);
    }
    const sub = this.articlesState.currentArticle$.get$.subscribe(
      article => {
        this.form = new ArticleDetailsModel(
          this.articlesState.categories$,
          this.articlesState.isLoadingCategories$,
          ArticlesUtil.toArticleDetailsValues(article),
        );
      }
    );
    this.subscriptions.push(sub);
  }

  deleteDiscount(index: number) {
    this.form.removeDiscount(index);
  }

  addDiscount() {
    this.form.addDiscount({
      _id: null,
      descriptionField: new TextFieldModel({defaultValue: this.newDiscountForm.descriptionField.value}),
      amountField: new NumberFieldModel({ defaultValue: this.newDiscountForm.amountField.value, leftIcon: 'percentage' })
    });
    this.newDiscountForm.reset();
  }

}
