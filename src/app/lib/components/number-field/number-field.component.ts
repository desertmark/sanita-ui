import { Component, OnInit, Input } from '@angular/core';
import { NumberFieldModel } from '../../models/number-field.model';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent implements OnInit {
  @Input() model: NumberFieldModel;
  constructor() { }
  integerPattern = /[0-9]+/gm;
  decimalPattern = /[0-9]+.[0-9]+/;
  ngOnInit(): void {
  }
}
