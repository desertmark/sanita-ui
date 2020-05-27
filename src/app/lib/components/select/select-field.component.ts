import { Component, OnInit, Input } from '@angular/core';
import { SelectFieldModel } from '../../models/select-field.model';
import { BootstrapColor } from '../view-header/view-header.component';
export type SelectType = 'default' | 'dropdown';
@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
})
export class SelectComponent implements OnInit {
  @Input() model: SelectFieldModel<any>;
  @Input() type: SelectType = 'default';
  @Input() color: BootstrapColor = 'primary';
  constructor() { }

  get selected(): any {
    return this.model.options.find(option => option.value === this.model.value);
  }

  ngOnInit(): void {
  }

  resolveText(option) {
    return this.model.textGetter(option);
  }

  resolveValue(option) {
    return this.model.valueGetter(option);
  }

  onDropdownClick(option) {
    this.model.setValue(this.resolveValue(option));
  }

}
