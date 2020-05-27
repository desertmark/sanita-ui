import { BaseField, BaseFieldAttr } from './base-field.model';
export type TextGetter<T> = (option: T) => string;
export type valueGetter<T> = (option: T) =>  string;
export interface SelectFieldAttrs<T> extends BaseFieldAttr<T> {
  options: T[];
  textGetter?: TextGetter<T>;
  valueGetter?: valueGetter<T>;
}

const defaultTextGetter = option => (option as any)?.text;
const defaulValueGetter = option => (option as any)?.value;

export class SelectFieldModel<T> extends BaseField<T> {
  options: T[];
  textGetter: TextGetter<T>;
  valueGetter: TextGetter<T>;
  constructor(attrs: SelectFieldAttrs<T>) {
    super(attrs);
    this.options = attrs.options;
    this.textGetter = attrs.textGetter || defaultTextGetter;
    this.valueGetter = attrs.valueGetter || defaulValueGetter;
  }
}
