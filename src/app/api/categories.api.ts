import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from './base.api';

export interface GetCategoryRequest {
  query: {
    q?: string;
    size?: number;
    page?: number;
  };
}

export interface Category {
  _id: string;
  description: string;
}

@Injectable()
export class CategoriesApi extends BaseApi {

  getCategories(options: GetCategoryRequest): Observable<Category[]> {
    const req = {
      params: {
        q: options.query.q,
        size: options.query.size.toString(),
        page: options.query.page.toString(),
      }
    };
    return this.http$.get<Category[]>(this.url(`/categories/`), req);
  }

}
