import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleDto {
  @ApiProperty({ example: '1', description: 'ID' })
  readonly id: number;
}
