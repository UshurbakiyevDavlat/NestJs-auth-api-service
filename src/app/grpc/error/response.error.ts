import { HttpStatus } from '@nestjs/common';
import type { IResponse } from '../interface';

export function errorResponse(message: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR, error = 'Internal server error'): IResponse<undefined> {
  return {
    data: undefined,
    error: { message: [message], statusCode, error },
  };
}
