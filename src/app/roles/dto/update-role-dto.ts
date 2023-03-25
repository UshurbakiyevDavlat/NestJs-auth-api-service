import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ example: '1', description: 'ID' })
  readonly id: number;
  @ApiProperty({ example: 'Admin', description: 'title' })
  readonly title: string;
}
