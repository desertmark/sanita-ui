import { Injectable, Inject, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export interface EnvConfig {
  name: string;
  production: boolean;
  baseUrl: string;
}

export const ENV_CONFIG_TOKEN = new InjectionToken<EnvConfig>('ENV_CONFIG_TOKEN');

@Injectable()
export class EnvService {
  constructor(@Inject(ENV_CONFIG_TOKEN) public envConfig: EnvConfig) {}
}
