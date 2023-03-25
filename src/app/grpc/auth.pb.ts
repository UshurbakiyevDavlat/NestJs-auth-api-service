/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.pb';

export const protobufPackage = 'auth';

export interface RegisterRequest {
  email: string;
  password: string;
  roleId: number;
}

export interface User {
  id: number;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface RegisterResponse {
  status: number;
  errorMessage?: string | undefined;
  user?: User | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export interface ProfileRequest {
  email: string;
}

export interface ProfileResponse {
  email: string;
  roleId: number;
}

export interface ResetRequest {
  email: string;
  password: string;
}

export interface ResetResponse {
  message: string;
}

export interface RoleRequest {
  title: string;
}

export interface RoleResponse {
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ListRolesResponse {
  roles: RoleResponse[];
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  profile(request: Empty): Observable<ProfileResponse>;

  reset(request: ResetRequest): Observable<ResetResponse>;

  createRole(request: RoleRequest): Observable<RoleResponse>;

  listRoles(request: Empty): Observable<ListRolesResponse>;
}

export interface AuthServiceController {
  register(
    request: RegisterRequest,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(
    request: ValidateRequest,
  ):
    | Promise<ValidateResponse>
    | Observable<ValidateResponse>
    | ValidateResponse;

  profile(
    request: Empty,
  ): Promise<ProfileResponse> | Observable<ProfileResponse> | ProfileResponse;

  reset(
    request: ResetRequest,
  ): Promise<ResetResponse> | Observable<ResetResponse> | ResetResponse;

  createRole(
    request: RoleRequest,
  ): Promise<RoleResponse> | Observable<RoleResponse> | RoleResponse;

  listRoles(
    request: Empty,
  ):
    | Promise<ListRolesResponse>
    | Observable<ListRolesResponse>
    | ListRolesResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'register',
      'login',
      'validate',
      'profile',
      'reset',
      'createRole',
      'listRoles',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
