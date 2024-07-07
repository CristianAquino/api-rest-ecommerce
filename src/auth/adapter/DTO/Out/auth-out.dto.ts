import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserResponseDTO {
  @ApiProperty({
    example: 'AXR23Z',
    description: 'Unique code for the user',
  })
  code: string;
}
