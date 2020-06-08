import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, SubscriptionLike, Subscriber } from 'rxjs';
import { LoadingUtil } from 'src/app/lib/util/loading.util';
import { ArticlesApi, Article, GetArticlesRequest } from 'src/app/api/articles.api';
import { PaginatedResponse } from 'src/app/lib/util/pagination.util';
import { CategoriesApi, Category } from 'src/app/api/categories.api';
import { ArticlesDetailsValues } from '../article-details/article-details.model';
import { ResponseSubject } from 'src/app/lib/models/response-subject.model';
import { ArticlesUtil } from './articles.util';
export interface LoadArticlesFilter {
  description?: string;
  codeString?: string;
  category?: string;
  sort?: string;
}
class State {
  loadingArticles = new LoadingUtil();
  loadingNextArticles = new LoadingUtil();
  loadingCurrentArticle = new LoadingUtil();
  loadingCategories = new LoadingUtil();
  loadingCreateArticle = new LoadingUtil();
  loadingEditArticle = new LoadingUtil();

  articles$ = new BehaviorSubject<Article[]>(undefined);
  articlesPagination: PaginatedResponse<Article>;
  categories$ = new BehaviorSubject<Category[]>(undefined);

  currentArticle$ = new ResponseSubject<Article>();
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
  get isLoadingCurrentArticle$(): Observable<boolean> {
    return this.state.loadingCurrentArticle.isLoading$;
  }
  get isLoadingCategories$(): Observable<boolean> {
    return this.state.loadingCategories.isLoading$;
  }
  get isLoadingCreateArticle$(): Observable<boolean> {
    return this.state.loadingCreateArticle.isLoading$;
  }
  get isLoadingEditArticle$(): Observable<boolean> {
    return this.state.loadingEditArticle.isLoading$;
  }

  get articles$(): BehaviorSubject<Article[]> {
    return this.state.articles$;
  }
  get categories$(): BehaviorSubject<Category[]> {
    return this.state.categories$;
  }

  get currentArticle$(): ResponseSubject<Article> {
    return this.state.currentArticle$;
  }

  constructor(private articlesApi: ArticlesApi, private categoriesApi: CategoriesApi) {
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

  loadCurrentArticle(articleId: string) {
    const req = {
      params: {
        id: articleId
      }
    };
    const sub = this.articlesApi.getArticleById(req).subscribe({
      next: res => this.state.currentArticle$.next(res),
    });
    this.state.loadingCurrentArticle.waitFor(sub);
  }

  loadCategories(filter: string) {
    const req = {
      query: {
        q: filter,
        size: 5,
        page: 0,
      },
    };
    const sub = this.categoriesApi.getCategories(req).subscribe(
      res => this.state.categories$.next(res),
    );
    this.state.loadingCategories.waitFor(sub);
  }

  createArticle(article: ArticlesDetailsValues) {
    return new Observable(subscriber => {
      const sub = this.articlesApi.postArticle({
        body: ArticlesUtil.toArticleRequestBody(article),
      }).subscribe({
        next: () => subscriber.next(),
        error: error => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
      this.state.loadingArticles.waitFor(sub);
    });
  }

  editArticle(article: ArticlesDetailsValues) {
    return new Observable(subscriber => {
      const sub = this.articlesApi.patchArticleById({
        params: {
          id: this.currentArticle$.value._id,
        },
        body: ArticlesUtil.toArticleRequestBody(article),
      }).subscribe({
        next: () => subscriber.next(),
        error: error => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
      this.state.loadingArticles.waitFor(sub);
    });
  }

}
