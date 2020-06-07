import { BaseModel } from 'src/app/lib/models/base.model';
import { TextFieldModel } from 'src/app/lib/models/text-field.model';
import { RadioToggleModel } from 'src/app/lib/models/radio-toggle.model';
import { NumberFieldModel } from 'src/app/lib/models/number-field.model';
import { Validators } from '@angular/forms';
import { FileFieldModel } from 'src/app/lib/models/file-field.model';

export interface BulkEditValues {
  codeStartField: string;
  codeEndField: string;
  typeOfIncreaseField: string;
  percentagePriceField: number;
  absolutePriceField: number;
  vatField: number;
  transportField: number;
  cardField: number;
  utilityField: number;
}

export class BulkEditModel extends BaseModel<BulkEditValues> {

  constructor() {
    super();
    this.init();
  }

  codeStartField = new TextFieldModel({
    label: 'Codigo de inicio',
    placeholder: '00.00.00.00',
    validatorOrOpts: [Validators.required],
  });

  codeEndField = new TextFieldModel({
    label: 'Codigo de fin',
    placeholder: '00.00.00.00',
    validatorOrOpts: [Validators.required],
  });

  typeOfIncreaseField = new RadioToggleModel<any>({
    label: 'Tipo de incremento',
    defaultValue: 'percentage',
    options: [
      { text: '%', value: 'percentage' },
      { text: '$', value: 'absolute' },
    ]
  });

  percentagePriceField = new NumberFieldModel({
    leftIcon: 'percentage',
    decimals: 2,
    placeholder: 'Incrementar un procentaje',
    validatorOrOpts: [Validators.min(0)]
  });

  absolutePriceField = new NumberFieldModel({
    leftIcon: 'dollarSign',
    decimals: 2,
    placeholder: 'Incrementar un valor absoluto',
    validatorOrOpts: [Validators.min(0)]
  });

  vatField = new NumberFieldModel({
    label: 'IVA',
    leftIcon: 'percentage',
    decimals: 2,
    placeholder: '21',
    validatorOrOpts: [Validators.min(0)]
  });

  transportField = new NumberFieldModel({
    label: 'Transporte',
    leftIcon: 'percentage',
    decimals: 2,
    placeholder: '14',
    validatorOrOpts: [Validators.min(0)]
  });

  utilityField = new NumberFieldModel({
    label: 'Utilidad',
    leftIcon: 'percentage',
    decimals: 2,
    placeholder: '0',
    validatorOrOpts: [Validators.min(0)]
  });

  cardField = new NumberFieldModel({
    label: 'Recargo Tarjeta',
    leftIcon: 'percentage',
    decimals: 2,
    placeholder: '23',
    validatorOrOpts: [Validators.min(0)]
  });

  fileField = new FileFieldModel({
    label: 'Actualizcion masiva por medio de un archivo',
    leftLabel: 'Subir',
    placeholder: 'Seleccionar un archivo csv',
    mimeTypes: ['text/csv'],
    validatorOrOpts: [Validators.required]
  });
}

/*

{
    "from": "01.01.00.03",
    "fields": {
        "price": {
            "percentage": 0.05
        },
        "utility": 0.01,
        "vat": 0.01,
        "transport": 0.01,
        "card": 0.01
    },
    "to": "01.01.00.07"
}

*/


