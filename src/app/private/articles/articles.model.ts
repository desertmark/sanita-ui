import { BaseModel } from 'src/app/lib/models/base.model';
import { TextFieldModel } from 'src/app/lib/models/text-field.model';
import { RadioToggleModel } from 'src/app/lib/models/radio-toggle.model';
import { SelectFieldModel } from 'src/app/lib/models/select-field.model';
const SEARCH_BY_CODE_LABEL = 'Buscar por codigo...';
const SEARCH_BY_DESCRIPTION_LABEL = 'Buscar por descripcion...';
const SEARCH_BY_CATEOGORY_LABEL = 'Buscar por rubro...';
export interface ArticlesValues {
  searchField: string;
  searchByField: string;
  orderByField: string;
  sortOrderField: string;
}
export class ArticlesModel extends BaseModel<ArticlesValues> {
  constructor() {
    super();
    this.init();
    const sub = this.searchByField.valueChanges$.subscribe(value => {
      switch (value) {
        case 'codeString':
          this.searchField.placeholder = SEARCH_BY_CODE_LABEL;
          break;
        case 'description':
          this.searchField.placeholder = SEARCH_BY_DESCRIPTION_LABEL;
          break;
        case 'category.description':
          this.searchField.placeholder = SEARCH_BY_CATEOGORY_LABEL;
          break;
      }
    });
    this.subscriptions.push(sub);
  }

  searchField = new TextFieldModel({
    placeholder: SEARCH_BY_CODE_LABEL,
    leftIcon: 'search'
  });

  searchByField = new RadioToggleModel<any>({
    defaultValue: 'codeString',
    options: [
      { text: 'Codigo', value: 'codeString' },
      { text: 'Descripcion', value: 'description' },
      { text: 'Rubro', value: 'category.description' }
    ],
  });

  orderByField = new SelectFieldModel<any>({
    label: 'Ordenar por',
    options: [
    ]
  });

  sortOrderField = new RadioToggleModel<any>({
    defaultValue: 'asc',
    options: [
      { text: 'Asc', value: 'asc', rightIcon: 'chevronUp' },
      { text: 'Desc', value: 'desc', rightIcon: 'chevronDown' }
    ],
  });
}
