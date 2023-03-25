import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'dushurbakiev@gmail.com', description: 'Почта' })
  readonly email: string;
}
