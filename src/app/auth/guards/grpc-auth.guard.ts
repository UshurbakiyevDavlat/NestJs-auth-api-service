import type { Metadata } from '@grpc/grpc-js';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GrpcUnauthenticatedException } from 'src/app/grpc/exception';
import type {
  IAuthRequest,
  IGuardHeaders,
  IUserInfo,
  IAuthUser,
} from 'src/app/grpc/interface';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  getRequest(context: ExecutionContext): IAuthRequest {
    return context.switchToRpc().getContext();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const type = context.getType();
    const prefix = 'Bearer ';

    const headers: IGuardHeaders = {
      authorization: undefined,
    };
    if (type === 'rpc') {
      const metadata = context.getArgByIndex<Metadata | undefined>(1);
      if (!metadata) {
        throw new GrpcUnauthenticatedException();
      }
      headers.authorization = metadata.get('Authorization')[0] as string;
    }

    if (!headers.authorization || !headers.authorization.includes(prefix)) {
      throw new GrpcUnauthenticatedException();
    }

    const token = headers.authorization.slice(
      headers.authorization.indexOf(' ') + 1,
    );

    try {
      const user: IUserInfo = await this.jwtService.verify(token);
      request.user = this.getAuthUser(user);
    } catch (error: unknown) {
      throw new GrpcUnauthenticatedException();
    }

    return true;
  }

  getAuthUser({ roleId, email }: IUserInfo): IAuthUser {
    return {
      roleId,
      email,
    };
  }
}
