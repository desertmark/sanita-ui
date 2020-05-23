import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from './base.api';
import { PaginatedRequest, PaginatedResponse } from '../lib/util/pagination.util';
import { map } from 'rxjs/operators';
export interface Discount {
  _id: string;
  description: string;
  amount: number;
}

export interface Category {
  _id: string;
  description: string;
}

export interface GetArticlesRequest extends PaginatedRequest {
  query: {
    page: number;
    size: number;
    codeString?: string;
    code?: string;
    description?: string;
    category?: string;
    price?: string;
    fields?: string;
    sort?: string;
  };
}

export interface Article {
  _id: string;
  code: 85400146;
  description: string;
  price: number;
  cost: number;
  utility: number;
  listPrice: number;
  vat: number;
  dolar: number;
  transport: number;
  card: number;
  codeString: string;
  discounts: Discount[];
  cardPrice: number;
  category: Category;
}

export interface ArticleResponse {
  articles: Article[];
  totalSize: number;
}


@Injectable()
export class ArticlesApi extends BaseApi {

  getArticles(options?: GetArticlesRequest): Observable<PaginatedResponse<Article>> {
    const req = {
      params: {
        ...options.query,
        page: options.query.page.toString(),
        size: options.query.page.toString(),
      }
    };
    return this.http$.get<ArticleResponse>(this.url(`/articles/`), req).pipe(
      map(res => {
        return new PaginatedResponse<Article>({
          apiMethod: this.getArticles.bind(this),
          request: options,
          items: res.articles,
          totalSize: res.totalSize,
        });
      })
    );
  }

  getArticlesById(): Observable<ArticleResponse> {
    return this.http$.get<ArticleResponse>(this.url(`/users`));
  }

}
