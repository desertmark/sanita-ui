import { Validators } from '@angular/forms';
import { TextFieldModel } from '../../lib/models/text-field.model';
import { PasswordFieldModel } from '../../lib/models/password-field.model';
import { BaseModel } from 'src/app/lib/models/base.model';
export interface LoginValues {
  username: string;
  password: string;
}
export class LoginModel extends BaseModel<LoginValues> {
  constructor() {
    super();
    this.init();
  }
  username = new TextFieldModel({
    placeholder: 'Usuario',
    validatorOrOpts: [Validators.required],
  });

  password = new PasswordFieldModel({
    placeholder: 'Contraseña',
    validatorOrOpts: [Validators.required],
  });

}
