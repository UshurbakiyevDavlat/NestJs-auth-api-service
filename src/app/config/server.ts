import { Env } from 'src/core/utils/env';
import { SERVER_PORT } from './constants';

export function server() {
  return {
    host: Env.readString('SERVER_HOST'),
    port: SERVER_PORT,
  };
}
