import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginatedRequest {
  query: {
    page: number;
    size: number;
  };
}

export interface PaginationConfig<T> {
  apiMethod: (req: PaginatedRequest) => Observable<PaginatedResponse<T>>;
  request: PaginatedRequest;
  total: number;
  items: T[];
}

export class PaginatedResponse<T> {
  constructor(private config: PaginationConfig<T>) {
  }

  get items(): T[] {
    return this.config.items;
  }

  get total(): number {
    return this.config.total;
  }

  next(): Observable<T[]> {
    this.config.request.query.page++;
    return this.config.apiMethod(this.config.request).pipe(
      map(res => this.items.concat(res.items))
    );
  }


}
