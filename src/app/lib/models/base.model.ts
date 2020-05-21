import { FormGroup, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { BaseField } from './base-field.model';
export type FormControls = { [key: string]: AbstractControl };

export class BaseModel {
  private group: FormGroup;

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

  get valueChanges$() {
    return this.group.valueChanges;
  }

  get valid(): boolean {
    return this.group.valid;
  }

  get dirty(): boolean {
    return this.group.dirty;
  }

  get touch(): boolean {
    return this.group.touched;
  }

}
