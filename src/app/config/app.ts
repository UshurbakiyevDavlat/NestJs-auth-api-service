import { ConnectionString } from 'connection-string';
import { Env } from 'src/core/utils/env';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from './constants';

export interface AppConfig {
  url: string;
  name: string;
  version: string;
  versionedUrl: string;
  hostname: string;
  protocol: string;
  port: number;
  env: string;
  defaultLanguage: string;
  availableLanguages: Array<string>;
  isProduction: boolean;
  isDevelopment: boolean;
  uploads: unknown;
}

export function app(): AppConfig {
  const env = Env.readString('ENVIRONMENT');
  const websiteUrl = new ConnectionString(Env.readString('WEBSITE_URL'));
  const name = Env.readString('WEBSITE_NAME');
  const url = websiteUrl.toString();
  const version = Env.readString('VERSION');

  websiteUrl.path = version.split('/').filter(Boolean);

  return {
    url,
    env,
    name,
    version,
    versionedUrl: websiteUrl.toString(),
    hostname: websiteUrl.hostname,
    protocol: websiteUrl.protocol,
    port: websiteUrl.port,
    defaultLanguage: DEFAULT_LANGUAGE,
    availableLanguages: AVAILABLE_LANGUAGES,
    isProduction: /^prod(uction)?$/i.test(env),
    isDevelopment: /^dev(elopment)|test?$/i.test(env),
    // @ref https://www.npmjs.com/package/fastify-multipart
    uploads: { limits: { files: 1 } },
  };
}
