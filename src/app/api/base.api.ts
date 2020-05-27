import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvConfig, EnvService } from '../env.service';

@Injectable()
export abstract class BaseApi {
  get baseUrl(): string {
    return this.envService.envConfig.baseUrl;
  }

  constructor(protected http$: HttpClient, private envService: EnvService) {
  }


  protected url(path: string): string {
    return this.baseUrl + path;
  }

}
