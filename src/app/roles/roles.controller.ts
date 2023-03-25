import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role-dto';
import { Role } from './roles.model';
import { DeleteRoleDto } from './dto/delete-role-dto';
import { UpdateRoleDto } from './dto/update-role-dto';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, ListRolesResponse } from 'src/app/grpc/auth.pb';
import { RoleDTO } from './dto/role-dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('/createRole')
  @ApiOperation({ summary: 'Создание роли' })
  @GrpcMethod(AUTH_SERVICE_NAME, 'CreateRole')
  async create(@Body() dto: CreateRoleDto, @Res() response) {
    const result = await this.rolesService.createRole(dto);
    response.status(200).json({ message: result });
  }

  @ApiOperation({ summary: 'Получение ролей' })
  @ApiResponse({ status: 200, type: [Role] })
  @GrpcMethod(AUTH_SERVICE_NAME, 'ListRoles')
  @Get('/getRoles')
  async getAllRoles(@Res() response): Promise<ListRolesResponse> {
    const roles = await this.rolesService.getRoles();
    return roles;
  }

  @ApiOperation({ summary: 'Обновление роли' })
  @ApiResponse({ status: 200 })
  @Patch('/updateRole')
  async updateRole(@Body() dto: UpdateRoleDto, @Res() response) {
    const result = await this.rolesService.updateRole(dto);
    response.status(200).json({ message: result });
  }

  @ApiOperation({ summary: 'Удаление роли' })
  @ApiResponse({ status: 200 })
  @Delete('/deleteRole')
  async deleteRole(@Body() dto: DeleteRoleDto, @Res() response) {
    const result = await this.rolesService.softDelete(dto);
    response.status(200).json({ message: result });
  }
}
