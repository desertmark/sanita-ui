import { Component, OnInit, Input } from '@angular/core';
import { PasswordFieldModel } from '../../models/password-field.model';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit {
  @Input() model: PasswordFieldModel;
  constructor() { }
  type = 'password';
  ngOnInit(): void {
  }

  show() {
    this.type = 'text';
  }

  hide() {
    this.type = 'password';
  }

  toggle() {
    if (this.type === 'password') {
      this.show();
    } else {
      this.hide();
    }
  }

}
