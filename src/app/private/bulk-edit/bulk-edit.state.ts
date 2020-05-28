import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingUtil } from 'src/app/lib/util/loading.util';
import { ArticlesApi, Article, GetArticlesRequest } from 'src/app/api/articles.api';
import { PaginatedResponse } from 'src/app/lib/util/pagination.util';
import { BulkEditValues } from './bulk-edit.model';

class State {
  loadingBulkEdit = new LoadingUtil();

  codeFrom: string;
  codeTo: string;

}

@Injectable()
export class BulkEditState {
  private state = new State();

  get isLoadingBulkEdit$(): Observable<boolean> {
    return this.state.loadingBulkEdit.isLoading$;
  }

  constructor(private articlesApi: ArticlesApi) {
  }


  updateArticles(values: BulkEditValues): Observable<void> {
    return new Observable(subscriber => {
      const req = {
        body: {
          from: values.codeStartField,
          to: values.codeEndField,
          fields: {
            card: values.cardField,
            transport: values.transportField,
            utility: values.utilityField,
            vat: values.vatField,
            price: {
              absolute: values.absolutePriceField,
              percentage: values.percentagePriceField,
            },
          }
        }
      };
      const sub = this.articlesApi.patchArticles(req).subscribe({
        next: res => subscriber.next(),
        error: error => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
      this.state.loadingBulkEdit.waitFor(sub);
    });
  }

}
