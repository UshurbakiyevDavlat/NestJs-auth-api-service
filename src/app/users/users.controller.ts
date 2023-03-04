import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { HashPasswordInterceptor } from '../interceptors/hash-password.interceptor';
import { DeleteUserDto } from './dto/delete-user-dto';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME } from '../auth/auth.pb';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание юзера' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(HashPasswordInterceptor)
  async create(@Body() userDto: CreateUserDto, @Res() response) {
    const result = await this.userService.createUser(userDto);
    response.status(200).json({ message: result });
  }

  @ApiOperation({ summary: 'Получение списка юзеров' })
  @ApiResponse({ status: 200, type: [User] })
  @GrpcMethod(AUTH_SERVICE_NAME, 'GetAllUsers')
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/getOne/:email')
  @ApiOperation({ summary: 'Получение юзера' })
  @GrpcMethod(AUTH_SERVICE_NAME, 'GetOneUser')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'email',
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiResponse({ status: 200, type: [User] })
  getUser(@Param('email') email: string) {
    return this.userService.getUser(email);
  }

  @Delete('/delete')
  @GrpcMethod(AUTH_SERVICE_NAME, 'deleteUser')
  async softDelete(@Body() dto: DeleteUserDto, @Res() response) {
    const result = await this.userService.softDelete(dto);
    response.status(200).json({ message: result });
  }
}
