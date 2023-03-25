import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'dushurbakiev@gmail.com', description: 'Почта' })
  readonly email: string;
  @ApiProperty({ example: 'qwerty1234', description: 'Пароль' })
  password: string;
  @ApiProperty({ example: '1', description: 'Идентификатор роли' })
  readonly roleId: number;
}
