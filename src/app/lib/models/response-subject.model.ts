import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export class ResponseSubject<T> {
  private source = new BehaviorSubject<T>(undefined);

  next(value: T): void {
    this.source.next(value);
  }

  get get$(): Observable<T> {
    return this.source.asObservable().pipe(filter(value => value !== undefined));
  }

  clear(): void {
    this.next(undefined);
  }

  get value(): T {
    return this.source.value;
  }
}
