import { Subscription, BehaviorSubject, Observable } from 'rxjs';

export class LoadingUtil {
  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  private isLoading = new BehaviorSubject<boolean>(false);
  private waitingFor: Subscription[] = [];

  waitFor(sub: Subscription) {
    this.waitingFor.push(sub);
    this.refreshIsLoading();
    sub.add(() => this.remove(sub));
  }

  private remove(sub: Subscription) {
    this.waitingFor.splice(this.waitingFor.indexOf(sub), 1);
    this.refreshIsLoading();
  }

  private refreshIsLoading() {
    if (this.waitingFor.length) {
      this.isLoading.next(true);
    } else {
      this.isLoading.next(false);
    }
  }
}
