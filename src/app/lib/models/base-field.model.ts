import { FormControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
export interface BaseFieldAttr<T> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: T;
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
export class BaseField<T> extends FormControl {
  label: string;
  placeholder: string;
  constructor(attrs: BaseFieldAttr<T>) {
    super({ value: attrs.defaultValue, disabled: attrs.disabled }, attrs.validatorOrOpts, attrs.asyncValidator);
    this.label = attrs.label || '';
    this.placeholder = attrs.placeholder || '';
  }

  get showError(): boolean {
    return this.invalid && (this.dirty || this.touched);
  }
}
