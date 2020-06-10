import { BaseField, BaseFieldAttr } from './base-field.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
export type TextGetter<T> = (option: T) => string;
export type valueGetter<T> = (option: T) =>  string;
export interface SearchFieldAttrs<T> extends BaseFieldAttr<string> {
  leftIcon?: string;
  options: Observable<T[]>| T[];
  isLoading$: Observable<boolean>;
  textGetter?: TextGetter<T>;
  valueGetter?: valueGetter<T>;
  searchDelay?: number;
  selectedOption?: T;
}

const defaultTextGetter = option => (option as any)?.text;
const defaulValueGetter = option => (option as any)?.value;

export class SearchFieldModel<T> extends BaseField<string> {
  leftIcon: string;
  options: Observable<T[]>| T[];
  isLoading$: Observable<boolean>;
  searchDelay: number;
  textGetter: TextGetter<T>;
  valueGetter: TextGetter<T>;
  selectedOption: T;
  constructor(attrs: SearchFieldAttrs<T>) {
    super(attrs);
    this.options = attrs.options;
    this.leftIcon = attrs.leftIcon;
    this.searchDelay = attrs.searchDelay;
    this.isLoading$ = attrs.isLoading$;
    this.textGetter = attrs.textGetter || defaultTextGetter;
    this.valueGetter = attrs.valueGetter || defaulValueGetter;
    this.setSelectedOption(attrs.selectedOption);
  }

  get selectedOption$(): Observable<T> {
    if (this.isSyncOptions) {
      const value = (this.options as T[]).find(item => this.valueGetter(item) === this.value);
      return of(value);
    }
    return (this.options as Observable<T[]>).pipe(
      map(items => items.find(item => this.valueGetter(item) === this.value))
    );
  }

  get isSyncOptions() {
    return Array.isArray(this.options);
  }

  private setSelectedOption(option: T) {
    this.setValue(this.valueGetter(option));
    this.selectedOption = option;
  }
}
