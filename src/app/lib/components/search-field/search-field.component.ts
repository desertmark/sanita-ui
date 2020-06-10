import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { SearchFieldModel } from '../../models/search-field.model';
import { Observable, Subject, SubscriptionLike } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Input() model: SearchFieldModel<any>;
  @Output() search = new EventEmitter<string>();
  private debouncer = new Subject<string>();
  private subscriptions: SubscriptionLike[] = [];
  constructor() {
  }
  searching = false;
  ngOnInit(): void {
    const sub = this.debouncer.pipe(debounceTime(this.model.searchDelay)).subscribe(
      text => this.search.emit(text),
    );
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onFocus() {
    this.searching = true;
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
    this.model.markAsTouched();
    this.model.markAsDirty();
  }

  onBlur() {
    this.model.markAsTouched();
    setTimeout(() => this.searching = false, 200);
  }

  onSearch(text) {
    this.model.reset();
    this.debouncer.next(text);
  }

}
