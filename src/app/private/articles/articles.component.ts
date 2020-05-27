import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesState, LoadArticlesFilter } from './articles.state';
import { ArticlesModel, ArticlesValues } from './articles.model';
import { SubscriptionLike } from 'rxjs';
import { delay, throttle, throttleTime, debounce, debounceTime } from 'rxjs/operators';
import { LoginState } from 'src/app/public/login/login.state';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  form = new ArticlesModel();
  subscriptions: SubscriptionLike[] = [];
  constructor(public articlesState: ArticlesState, public loginState: LoginState) {
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
    const sub = this.form.valueChanges$.pipe(debounceTime(500)).subscribe(
      values => {
        this.articlesState.loadArticles(this.getFilter(values));
      }
    );
    this.subscriptions.push(sub);

    this.loginState.isLogged$.subscribe(isLogged => {
      let orderOptions = [
        { text: 'Codigo', value: 'codeString' },
        { text: 'Descripcion', value: 'description' },
        { text: 'Rubro', value: 'category.description' },
      ];
      if (isLogged) {
        orderOptions = orderOptions.concat([
          { text: 'Precio', value: 'price' },
          { text: 'Precio Tarjeta', value: 'cardPrie' },
        ]);
      }
      this.form.orderByField.options = orderOptions;
    });
  }

  private getFilter(values: ArticlesValues): LoadArticlesFilter {
    const filter: LoadArticlesFilter = {};
    if (values.searchByField && values.searchField) {
      filter[values.searchByField] = values.searchField;
    }
    if (values.orderByField) {
      filter.sort = `${values.orderByField},${values.sortOrderField}`;
    }
    return filter;
  }

}
