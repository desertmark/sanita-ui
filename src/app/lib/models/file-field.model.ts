import { BaseField, BaseFieldAttr } from './base-field.model';

export interface FileFieldAttr extends BaseFieldAttr<File> {
  leftLabel?: string;
  mimeTypes?: string[];
  size?: number;
}

export class FileFieldModel extends BaseField<File> {
  leftLabel: string;
  mimeTypes: string[];
  size: number;
  constructor(attrs: FileFieldAttr) {
    super(attrs);
    this.leftLabel = attrs.leftLabel;
    this.mimeTypes = attrs.mimeTypes;
    this.size = attrs.size;
  }
}
