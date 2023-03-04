import { ApiProperty } from '@nestjs/swagger';

export class JwtResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1c2h1cmJha2lldkBnbWFpbC5jb20iLCJpYXQiOjE2NzY0NDI1ODIsImV4cCI6MTY3NjQ0MjY0Mn0.km-81zlKhBQMCLtJER1AWVoXZrnY8YGMSIdGjeQQNSw',
    description: 'access_token',
  })
  readonly access_token: string;
}
