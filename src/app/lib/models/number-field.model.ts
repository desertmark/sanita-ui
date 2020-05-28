import { BaseField, BaseFieldAttr } from './base-field.model';

export interface NumberFieldAttr extends BaseFieldAttr<number> {
  decimals?: number;
  leftIcon?: string;
}

export class NumberFieldModel extends BaseField<number> {
  decimals = 0;
  leftIcon: string;
  constructor(attrs: NumberFieldAttr) {
    super(attrs);
    this.decimals = attrs.decimals;
    this.leftIcon = attrs.leftIcon;
  }
}
