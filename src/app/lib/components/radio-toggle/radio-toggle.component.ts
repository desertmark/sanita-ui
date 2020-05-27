import { Component, OnInit, Input } from '@angular/core';
import { RadioToggleModel, RadioOption } from '../../models/radio-toggle.model';
import { BootstrapColor } from '../view-header/view-header.component';

@Component({
  selector: 'app-radio-toggle',
  templateUrl: './radio-toggle.component.html',
  styleUrls: ['./radio-toggle.component.scss']
})
export class RadioToggleComponent implements OnInit {
  @Input() model: RadioToggleModel<RadioOption>;
  @Input() color: BootstrapColor = 'primary';
  constructor() { }

  ngOnInit(): void {
  }

  resolveText(option: RadioOption): string {
    return this.model.textGetter(option);
  }
  resolveValue(option: RadioOption): string {
    return this.model.valueGetter(option);
  }

  isActive(option: RadioOption): boolean {
    return this.model.value === this.model.valueGetter(option);
  }

}
