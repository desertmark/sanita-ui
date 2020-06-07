import { BaseModel } from 'src/app/lib/models/base.model';
import { TextFieldModel } from 'src/app/lib/models/text-field.model';
import { Validators } from '@angular/forms';
import { NumberFieldModel } from 'src/app/lib/models/number-field.model';
import { SearchFieldModel } from 'src/app/lib/models/search-field.model';
import { Category, CategoriesApi } from 'src/app/api/categories.api';
import { Observable, merge } from 'rxjs';
import { ArticlesUtil } from '../articles/articles.util';
import { ArticlesState } from '../articles/articles.state';

export interface ArticlesDetailsValues {
  codeStringField: string;
  descriptionField: string;
  priceField: number;
  costField: number;
  utilityField: number;
  listPriceField: number;
  vatField: number;
  dolarField: number;
  transportField: number;
  cardField: number;
  cardPriceField: number;
  categoryIdField: string;
}

export class ArticleDetailsModel extends BaseModel<ArticlesDetailsValues> {
  constructor(
    private categories: Observable<Category[]>,
    private isLoadingCategories$: Observable<boolean>,
  ) {
    super();
    this.init();
    this.initFields();
  }
  codeStringField = new TextFieldModel({
    label: 'Codigo',
    placeholder: '00.00.00.00',
    validatorOrOpts: [Validators.required, Validators.pattern(/^\d{2}.\d{2}.\d{2}.\d{2}$/)],
  });
  descriptionField = new TextFieldModel({
    label: 'Descripcion',
    placeholder: 'Escriba una descripcion del articulo',
    validatorOrOpts: [Validators.required, Validators.minLength(3)],
  });
  priceField = new NumberFieldModel({
    label: 'Precio',
    disabled: true,
    placeholder: '0',
    validatorOrOpts: [Validators.required, Validators.min(0)],
    leftIcon: 'dollarSign',
  });
  costField = new NumberFieldModel({
    label: 'Costo',
    placeholder: '0',
    disabled: true,
    validatorOrOpts: [Validators.required, Validators.min(0)],
    leftIcon: 'dollarSign',
  });
  utilityField = new NumberFieldModel({
    label: 'Utilidad',
    placeholder: '0',
    defaultValue: 0,
    validatorOrOpts: [Validators.required, Validators.min(0)],
    leftIcon: 'percentage',
  });
  listPriceField = new NumberFieldModel({
    label: 'Precio de lista',
    placeholder: '0',
    validatorOrOpts: [Validators.required, Validators.min(0)],
    leftIcon: 'dollarSign',
  });
  vatField = new NumberFieldModel({
    label: 'IVA',
    placeholder: '21',
    defaultValue: 21,
    validatorOrOpts: [Validators.min(0)],
    leftIcon: 'percentage',
  });
  dolarField = new NumberFieldModel({
    label: 'Precio en U$D',
    placeholder: '0',
    validatorOrOpts: [Validators.min(0)],
    leftIcon: 'dollarSign',
  });
  transportField = new NumberFieldModel({
    label: 'Transporte',
    placeholder: '14',
    validatorOrOpts: [Validators.min(0)],
    leftIcon: 'percentage',
    defaultValue: 14,
  });
  cardField = new NumberFieldModel({
    label: 'Recargo tarjeta',
    placeholder: '23',
    defaultValue: 23,
    validatorOrOpts: [Validators.min(0)],
    leftIcon: 'percentage',
  });
  cardPriceField = new NumberFieldModel({
    label: 'Precio con tarjeta',
    placeholder: '0',
    disabled: true,
    validatorOrOpts: [Validators.min(0)],
    leftIcon: 'dollarSign',
  });
  categoryIdField = new SearchFieldModel<Category>({
    options: this.categories,
    isLoading$: this.isLoadingCategories$,
    label: 'Rubro',
    placeholder: 'Escriba para buscar',
    validatorOrOpts: [Validators.required],
    textGetter: category => category?.description,
    valueGetter: category => category?._id,
    leftIcon: 'search',
    searchDelay: 500,
  });

  initFields() {
    const sub = this.valueChanges$.subscribe(
      values => {
        const cost = ArticlesUtil.calcCost(values.listPriceField, values.vatField / 100);
        const price = ArticlesUtil.calcPrice(cost, values.utilityField / 100, values.transportField / 100);
        const cardPrice = ArticlesUtil.calcCardPrice(price, values.cardField / 100);
        this.costField.setValueNoEmit(cost);
        this.priceField.setValueNoEmit(price);
        this.cardPriceField.setValueNoEmit(cardPrice);
      }
    );
    this.subscriptions.push(sub);
  }
}
