import { BaseModel } from 'src/app/lib/models/base.model';
import { TextFieldModel } from 'src/app/lib/models/text-field.model';
import { RadioToggleModel } from 'src/app/lib/models/radio-toggle.model';
const SEARCH_BY_CODE_LABEL = 'Buscar por codigo...';
const SEARCH_BY_DESCRIPTION_LABEL = 'Buscar por descripcion...';
export class ArticlesModel extends BaseModel {
  constructor() {
    super();
    this.init();
    const sub = this.searchByField.valueChanges$.subscribe(value => {
        this.searchField.placeholder = value === 'codeString' ? SEARCH_BY_CODE_LABEL : SEARCH_BY_DESCRIPTION_LABEL;
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
    ],
    textGetter: option => option.text,
  });
}
