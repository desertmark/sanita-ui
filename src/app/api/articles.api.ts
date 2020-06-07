import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { BaseApi } from './base.api';
import { PaginatedRequest, PaginatedResponse } from '../lib/util/pagination.util';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Category } from './categories.api';
export interface Discount {
  _id: string;
  description: string;
  amount: number;
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
  code: number;
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

export interface PatchArticlesRequest {
  body: {
    from: string;
    to: string;
    fields: {
      price?: {
        percentage?: number;
        absolute?: number;
      },
      utility?: number;
      vat?: number;
      transport?: number;
      card?: number;
    },
  };
}

export interface PatchArticlesByFileRequest {
  form?: {
    bulk: File;
  };
}

export interface GetStatusResponse {
  inProgress: boolean;
  completed: number;
  total: number;
  processed: number;
}

export interface PostArticleRequest {
  body: {
    codeString: string;
    listPrice: number;
    categoryId: string;
    utility: number;
    dolar: number;
    description: string;
    vat?: number;
    transport?: number;
    card?: number;
    cost?: number;
    price?: number;
    cardPrice?: number;
    discounts?: Discount[];
  };
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

  patchArticles(options: PatchArticlesRequest) {
    return this.http$.patch(this.url('/articles'), options.body);
  }

  patchArticlesByfile(options: PatchArticlesByFileRequest) {
    const form = new FormData();
    form.append('bulk', options.form.bulk);
    return this.http$.patch(this.url('/articles'), form);
  }

  postArticle(options: PostArticleRequest) {
    return this.http$.post(this.url('/articles'), options.body);
  }

  getStatus(): Observable<GetStatusResponse> {
    return this.http$.get<GetStatusResponse>(this.url('/articles/status'));
  }

}
