import { BaseField, BaseFieldAttr } from './base-field.model';

export interface TextFieldAttr extends BaseFieldAttr<string> {
  leftIcon?: string;
}

export class TextFieldModel extends BaseField<string> {
  leftIcon: string;
  constructor(attrs: TextFieldAttr) {
    super(attrs);
    this.leftIcon = attrs.leftIcon;
  }
}
