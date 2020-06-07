import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, SubscriptionLike, interval } from 'rxjs';
import { LoadingUtil } from 'src/app/lib/util/loading.util';
import { ArticlesApi, GetStatusResponse } from 'src/app/api/articles.api';
import { BulkEditValues } from './bulk-edit.model';
import { switchMap } from 'rxjs/operators';

class State {
  loadingBulkEdit = new LoadingUtil();

  codeFrom: string;
  codeTo: string;
  status = new BehaviorSubject<GetStatusResponse>(undefined);
  pollingSubscription: SubscriptionLike;
}

@Injectable()
export class BulkEditState {
  private state = new State();

  get isLoadingBulkEdit$(): Observable<boolean> {
    return this.state.loadingBulkEdit.isLoading$;
  }

  get status$(): BehaviorSubject<GetStatusResponse> {
    return this.state.status;
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

  updateArticlesByFile(file: File): Observable<void> {
    return new Observable(subscriber => {
      const req = {
        form: {
          bulk: file,
        }
      };
      const sub = this.articlesApi.patchArticlesByfile(req).subscribe({
        next: res => subscriber.next(),
        error: error => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
      this.state.loadingBulkEdit.waitFor(sub);
    });
  }

  startPollingStatus() {
    this.state.pollingSubscription = interval(3000).pipe(
      switchMap(() => this.articlesApi.getStatus()),
    ).subscribe({
      next: res => {
        this.status$.next(res);
        if (!res.inProgress) {
          this.stopPollingStatus();
        }
      },
      error: error => {
        this.stopPollingStatus(),
        this.status$.next(undefined);
      }
    });
  }

  stopPollingStatus() {
    this.state.pollingSubscription.unsubscribe();
  }

}
