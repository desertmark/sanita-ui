import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesState } from './articles.state';
import { ArticlesModel } from './articles.model';
import { SubscriptionLike } from 'rxjs';
import { delay, throttle, throttleTime, debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  form = new ArticlesModel();
  subscriptions: SubscriptionLike[] = [];
  constructor(public articlesState: ArticlesState) {
    this.articlesState.loadArticles();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    if (this.form) {
      this.form.destroy();
    }
  }

  viewMore() {
    this.articlesState.loadNextArticles();
  }

  private initForm() {
    const sub = this.form.searchField.valueChanges$.pipe(
      debounceTime(500)
    ).subscribe(
      value => this.articlesState.loadArticles(this.getFilter(value))
    );
    this.subscriptions.push(sub);
  }

  private getFilter(value: string) {
    return {
      [this.form.searchByField.value]: value
    };
  }

}
