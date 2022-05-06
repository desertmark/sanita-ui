import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleDetailsModel, DiscountField, NewDiscountModel } from './article-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesState } from '../articles/articles.state';
import { SubscriptionLike } from 'rxjs';
import { ArticlesUtil } from '../articles/articles.util';
import { Discount } from 'src/app/api/articles.api';
import { TextFieldModel } from 'src/app/lib/models/text-field.model';
import { NumberFieldModel } from 'src/app/lib/models/number-field.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/lib/components/toast/toast.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  newDiscountForm = new NewDiscountModel();
  subscriptions: SubscriptionLike[] = [];
  form: ArticleDetailsModel;
  modalRef: NgbModalRef;
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
    private modalService: NgbModal,
    private toastService: ToastService,
    public articlesState: ArticlesState
  ) {
    this.articlesState.loadArticles();
  }
  get mode(): string {
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
      res => {
        this.router.navigate([`/private/articles/${res.id}`]),
        this.toastService.success({
          body: {
            leftIcon: 'plus',
            description: 'Producto creado correctamente',
          },
        });
      }
    );
    this.subscriptions.push(sub);
  }

  edit() {
    const sub = this.articlesState.editArticle(this.form.values).subscribe({
      next: () => {
        this.toastService.success({
          body: {
            leftIcon: 'edit',
            description: 'Producto editado correctamente',
          },
        });
      }
    });
    this.subscriptions.push(sub);
  }

  deleteArticle() {
    const sub = this.articlesState.deleteArticle(this.articlesState.currentArticle$.value).subscribe({
      next: () => {
        this.router.navigate(['/private/articles']);
        this.closeModal();
        this.toastService.success({
          body: {
            leftIcon: 'trashAlt',
            description: 'Producto eliminado correctamente.'
          }
        });
      },
    });
    this.subscriptions.push(sub);
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
      id: null,
      descriptionField: new TextFieldModel({defaultValue: this.newDiscountForm.descriptionField.value}),
      amountField: new NumberFieldModel({ defaultValue: this.newDiscountForm.amountField.value, leftIcon: 'percentage' })
    });
    this.newDiscountForm.reset();
  }

  openDeleteModal(template) {
    this.modalRef = this.modalService.open(template);
  }

  closeModal() {
    this.modalRef.close();
  }

}
