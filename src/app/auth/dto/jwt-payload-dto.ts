import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @ApiProperty({
    example: 1,
    description: 'subElement',
  })
  readonly sub: number;

  @ApiProperty({
    example: 'dushurbakiev@gmail.com',
    description: 'email',
  })
  readonly email: string;
}
