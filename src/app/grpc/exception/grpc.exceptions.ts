import { Metadata, status } from '@grpc/grpc-js';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class GrpcException extends RpcException {
  public constructor(code: number, message: string | object, httpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    const metadata = new Metadata();
    metadata.add('http-status', `${httpStatus}`);
    super({
      code,
      details: message.toString(),
      metadata: metadata,
    });
  }
}

export class GrpcCanceledException extends GrpcException {
  public constructor(error: string | object) {
    super(status.CANCELLED, error);
  }
}

export class GrpcUnkownException extends GrpcException {
  public constructor(error: string | object) {
    super(status.UNKNOWN, error);
  }
}

export class GrpcInvalidArgumentException extends GrpcException {
  public constructor(error: string | object) {
    super(status.INVALID_ARGUMENT, error, HttpStatus.BAD_REQUEST);
  }
}

export class GrpcDeadlineExceededException extends GrpcException {
  public constructor(error: string | object) {
    super(status.DEADLINE_EXCEEDED, error);
  }
}

export class GrpcNotFoundException extends GrpcException {
  public constructor(error: string | object) {
    super(status.NOT_FOUND, error, HttpStatus.NOT_FOUND);
  }
}

export class GrpcAlreadyExistException extends GrpcException {
  public constructor(error: string | object) {
    super(status.ALREADY_EXISTS, error, HttpStatus.CONFLICT);
  }
}

export class GrpcPermissionDeniedException extends GrpcException {
  public constructor(error: string | object) {
    super(status.PERMISSION_DENIED, error, HttpStatus.FORBIDDEN);
  }
}

export class GrpcUnauthenticatedException extends GrpcException {
  public constructor(error?: string | object) {
    super(status.UNAUTHENTICATED, error || 'Unauthenticated', HttpStatus.UNAUTHORIZED);
  }
}

export class GrpcRessourceExhaustedException extends GrpcException {
  public constructor(error: string | object) {
    super(status.RESOURCE_EXHAUSTED, error, HttpStatus.TOO_MANY_REQUESTS);
  }
}

export class GrpcFailedPreconditionException extends GrpcException {
  public constructor(error: string | object) {
    super(status.FAILED_PRECONDITION, error);
  }
}

export class GrpcAbortedException extends GrpcException {
  public constructor(error: string | object) {
    super(status.ABORTED, error);
  }
}

export class GrpcOutOfRangeException extends GrpcException {
  public constructor(error: string | object) {
    super(status.OUT_OF_RANGE, error);
  }
}

export class GrpcUnimplementedException extends GrpcException {
  public constructor(error: string | object) {
    super(status.UNIMPLEMENTED, error);
  }
}

export class GrpcInternalException extends GrpcException {
  public constructor(error: string | object) {
    super(status.CANCELLED, error);
  }
}

export class GrpcUnavailableException extends GrpcException {
  public constructor(error: string | object) {
    super(status.UNAVAILABLE, error, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class GrpcDataLossException extends GrpcException {
  public constructor(error: string | object) {
    super(status.DATA_LOSS, error);
  }
}
