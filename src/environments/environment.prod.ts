import { EnvConfig } from 'src/app/env.service';
import { version } from '../../package.json';

export const environment: EnvConfig = {
  version,
  name: 'prod',
  production: true,
  baseUrl: 'https://sanita-service-prod.herokuapp.com'
};
