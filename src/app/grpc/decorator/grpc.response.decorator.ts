import { HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { validationBadRequestResponse } from '../error';
import { errorResponse } from '../error/response.error';
import { ValidationException } from '../exception';
import type { IResponse } from '../interface';

export const grpcResponse = () => {
  return (
    _target: unknown,
    _propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    const originalMethod = <typeof Function>propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: unknown[]) {
      try {
        return (await originalMethod.apply(this, args)) as IResponse<unknown>;
      } catch (error) {
        if (error instanceof ValidationException) {
          return { error: validationBadRequestResponse(error.errors) };
        }
        if (error instanceof HttpException) {
          return errorResponse(error.message, error.getStatus(), error.name);
        }
        if (error instanceof RpcException) {
          throw error;
        }
        return errorResponse(
          'Internal error',
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Internal error',
        );
      }
    };
  };
};
