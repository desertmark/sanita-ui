import { Component, OnInit, Input } from '@angular/core';
import { RadioToggleModel } from '../../models/radio-toggle.model';

@Component({
  selector: 'app-radio-toggle',
  templateUrl: './radio-toggle.component.html',
  styleUrls: ['./radio-toggle.component.scss']
})
export class RadioToggleComponent implements OnInit {
  @Input() model: RadioToggleModel<any>;
  constructor() { }

  ngOnInit(): void {
  }

  resolveText(option: any): string {
    return this.model.textGetter(option);
  }
  resolveValue(option: any): string {
    return this.model.valueGetter(option);
  }

  isActive(option): boolean {
    return this.model.value === this.model.valueGetter(option);
  }

}
