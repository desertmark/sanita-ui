import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from './base.api';
export interface GetUserByIdRequest {
  params: {
    userId: string;
  };
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  nonce: string;
}
@Injectable()
export class UserApi extends BaseApi {

  getUserById(options: GetUserByIdRequest): Observable<UserResponse> {
    return this.http$.get<UserResponse>(this.url(`/users/${options.params.userId}`));
  }

  getUsers(): Observable<UserResponse> {
    return this.http$.get<UserResponse>(this.url(`/users`));
  }

}
