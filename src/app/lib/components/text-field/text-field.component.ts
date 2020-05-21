import { Component, OnInit, Input } from '@angular/core';
import { TextFieldModel } from '../../models/text-field.model';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent implements OnInit {
  @Input() model: TextFieldModel;
  constructor() { }

  ngOnInit(): void {
  }

}
