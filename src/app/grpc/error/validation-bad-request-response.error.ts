import type { ValidationError } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import type { Error } from '../interface';

export function validationBadRequestResponse(errors: ValidationError[]): Error {
  const message = errors.map((error: ValidationError) =>
    Object.values(error.constraints as Record<string, string>),
  );
  return {
    message: message.flat(),
    statusCode: HttpStatus.BAD_REQUEST,
    error: 'Bad Request',
  };
}
