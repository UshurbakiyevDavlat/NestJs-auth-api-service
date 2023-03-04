import type { ValidationError } from '@nestjs/common';

export class ValidationException extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super('Validation error');
  }
}
