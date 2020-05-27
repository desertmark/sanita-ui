import { BehaviorSubject } from 'rxjs';

export class ResponseSubject<T> extends BehaviorSubject<T> {
  private initialValue: T;
  constructor(value: T) {
    super(value);
    this.initialValue = value;
  }

  clear(): void {
    this.next(this.initialValue);
  }
}
