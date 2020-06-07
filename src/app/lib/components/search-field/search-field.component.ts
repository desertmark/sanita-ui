import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SearchFieldModel } from '../../models/search-field.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  @Input() model: SearchFieldModel<any>;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  constructor() { }
  searching = false;
  ngOnInit(): void {
  }

  onFocus() {
    this.searching = true;
    this.searchInput.nativeElement.focus();
    this.searchInput.nativeElement.click();
  }

  get isSyncOptions(): boolean {
    return Array.isArray(this.model.options);
  }

  get asyncOptions(): Observable<any[]> {
    return this.model.options as Observable<any[]>;
  }

  resolveText(option) {
    return this.model.textGetter(option);
  }

  resolveValue(option) {
    return this.model.valueGetter(option);
  }

  setValue(option) {
    this.model.setValue(this.resolveValue(option));
    this.model.selectedOption = option;
    console.log(option);
  }

  onBlur() {
    setTimeout(() => this.searching = false, 200);
  }

}
