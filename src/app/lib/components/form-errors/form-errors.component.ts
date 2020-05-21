import { Component, OnInit, Input } from '@angular/core';
import { BaseField } from '../../models/base-field.model';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {
  @Input() model: BaseField<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
