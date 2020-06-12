import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingUtil } from 'src/app/lib/util/loading.util';
import { UserResponse, UserApi } from './api/user.api';
import { ResponseSubject } from './lib/models/response-subject.model';
import { map } from 'rxjs/operators';

export enum UserRolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ANONYMOUS = 'ANONYMOUS',
}

class State {
  loadingCurrentUser = new LoadingUtil();
  currentUser$ = new ResponseSubject<UserResponse>();
}

@Injectable()
export class AppState {
  private state = new State();

  get isLoadingCurrentUser$(): Observable<boolean> {
    return this.state.loadingCurrentUser.isLoading$;
  }

  get isAdmin$(): Observable<boolean> {
    return this.state.currentUser$.get$.pipe(
      map(user => user.role === 'ADMIN')
    );
  }

  get currentUser$(): ResponseSubject<UserResponse> {
    return this.state.currentUser$;
  }

  constructor(private userApi: UserApi) {
  }

  loadCurrentUser(userId: string): Observable<void> {
    return new Observable(subscriber => {
      const req = {
        params: {
          userId,
        },
      };
      const sub = this.userApi.getUserById(req).subscribe({
        next: res => {
          this.state.currentUser$.next(res);
          subscriber.next();
        },
        error: error => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
      this.state.loadingCurrentUser.waitFor(sub);
    });
  }

}
