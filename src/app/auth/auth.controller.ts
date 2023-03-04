import {
  Body,
  Controller,
  Get,
  Head,
  Patch,
  Headers,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';
import { LoginUserDto } from '../users/dto/login-user-dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HashPasswordInterceptor } from '../interceptors/hash-password.interceptor';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  LoginResponse,
  ProfileRequest,
  ProfileResponse,
  RegisterResponse,
} from './auth.pb';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UsersService } from '../users/users.service';
import { GrpcAuthGuard } from './guards/grpc-auth.guard';
import { grpcResponse } from '../grpc/decorator';
import { response } from 'express';
import { json } from 'sequelize';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  // @ApiOperation({ summary: 'Логин юзера' })
  // @ApiResponse({ status: 201, type: JwtResponseDto })
  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  async login(@Body() userDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(userDto);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  async register(@Body() userDto: CreateUserDto): Promise<RegisterResponse> {
    let result = await this.userService.createUser(userDto);
    return {
      status: 201,
      message: [result.toString()],
    };
  }

  // @ApiOperation({ summary: 'Профайл юзера' })
  // @ApiResponse({ status: 200, type: User })
  // @ApiBearerAuth('JWT-auth')\
  @GrpcMethod(AUTH_SERVICE_NAME, 'Profile')
  @UseGuards(GrpcAuthGuard)
  @grpcResponse()
  getProfile(@Headers() headers) {
    return {
      email: headers.user.email,
      roleId: headers.user.roleId,
    };
  }

  // @ApiOperation({ summary: 'Сброс пароля' })
  // @ApiResponse({ status: 200 })
  @UseInterceptors(HashPasswordInterceptor)
  @GrpcMethod(AUTH_SERVICE_NAME, 'reset')
  async reset(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
    return { message: 'Пароль успешно изменен' };
  }
}
