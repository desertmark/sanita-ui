import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export abstract class BaseApi {
  private baseUrl = 'https://qa-artic-manager.herokuapp.com';

  constructor(protected http$: HttpClient) {
  }


  protected url(path: string): string {
    return this.baseUrl + path;
  }

}
