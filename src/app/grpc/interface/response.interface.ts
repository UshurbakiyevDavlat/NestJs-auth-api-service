import type { Error } from './error';

export interface IResponse<T> {
  data: T | undefined;
  error: Error | undefined;
}
