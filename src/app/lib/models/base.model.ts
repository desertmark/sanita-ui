import { FormGroup, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { BaseField } from './base-field.model';
import { SubscriptionLike, Observable } from 'rxjs';
export type FormControls = { [key: string]: AbstractControl };

export class BaseModel<T> {
  private group: FormGroup;
  protected subscriptions: SubscriptionLike[] = [];

  init(validator?: ValidatorFn | null, asyncValidator?: AsyncValidatorFn | null) {
    const controls = this.getControls();
    this.group = new FormGroup(controls, validator || null, asyncValidator || null);
  }

  private getControls(): FormControls {
    const controls: FormControls = {};
    Object.keys(this)
      .filter(prop => this[prop] instanceof BaseField)
      .forEach(prop => controls[prop] = this[prop]);
    return controls;
  }

  get values(): T {
    return this.group.value as T;
  }

  get valueChanges$(): Observable<T> {
    return this.group.valueChanges;
  }

  get valid(): boolean {
    return this.group?.valid;
  }

  get dirty(): boolean {
    return this.group?.dirty;
  }

  get pristine(): boolean {
    return this.group?.pristine;
  }

  get touch(): boolean {
    return this.group?.touched;
  }

  markAsDirty(opts?: {
    onlySelf?: boolean;
  }): void {
    this.group?.markAsDirty();
  }

  reset() {
    this.group.reset();
  }

  destroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
