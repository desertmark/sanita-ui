import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, SubscriptionLike } from 'rxjs';
import { LoadingUtil } from 'src/app/lib/util/loading.util';
import { ArticlesApi, Article, GetArticlesRequest } from 'src/app/api/articles.api';
import { PaginatedResponse } from 'src/app/lib/util/pagination.util';
export interface LoadArticlesFilter {
  description?: string;
  codeString?: string;
  category?: string;
  sort?: string;
}
class State {
  loadingArticles = new LoadingUtil();
  loadingNextArticles = new LoadingUtil();
  articles$ = new BehaviorSubject<Article[]>(undefined);
  articlesPagination: PaginatedResponse<Article>;

}

@Injectable()
export class ArticlesState {
  private state = new State();

  get isLoadingArticles$(): Observable<boolean> {
    return this.state.loadingArticles.isLoading$;
  }
  get isLoadingNextArticles$(): Observable<boolean> {
    return this.state.loadingNextArticles.isLoading$;
  }

  get articles$(): BehaviorSubject<Article[]> {
    return this.state.articles$;
  }

  constructor(private articlesApi: ArticlesApi) {
  }

  loadArticles(filter?: LoadArticlesFilter): void {
    const req: GetArticlesRequest = {
      query: {
        page: 0,
        size: 10,
        ...filter,
      }
    };
    const sub = this.articlesApi.getArticles(req).subscribe({
      next: res => {
        this.state.articlesPagination = res;
        this.state.articles$.next(this.state.articlesPagination.items);
      },
    });
    this.state.loadingArticles.waitFor(sub);
  }

  loadNextArticles(): void {
    const sub = this.state.articlesPagination.next().subscribe(
      res => this.state.articles$.next(res),
    );
    this.state.loadingNextArticles.waitFor(sub);
  }

}
