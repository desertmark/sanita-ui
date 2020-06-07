import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from '../../models/base.model';
import { FileFieldModel } from '../../models/file-field.model';
import { fileURLToPath } from 'url';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.scss']
})
export class FileFieldComponent implements OnInit {
  @Input() model: FileFieldModel;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event) {
    const file: File = event.target.files[0];
    this.model.setValue(file);
    this.model.markAsDirty();
    this.model.markAsTouched();
    this.validateSizeAndType(file);
  }

  onBlur() {
    this.model.markAsTouched();
  }

  validateSizeAndType(value: File) {
    if (this.model.mimeTypes?.length) {
       if (!this.model.mimeTypes.includes(value.type)) {
         return this.model.setErrors({
           mimeTypes: `El tipo de archivo es incorrecto. seleccione alguno de los siguientes formatos: ${this.model.mimeTypes.join(',')}`
         }, {
           emitEvent: true,
         });
       }
    }
    if (value.size > this.model.size) {
      this.model.setErrors({
        size: `El tamaño del archivo no debe superar los ${this.model.size}`
      });
    }
  }

}
