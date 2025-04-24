import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-v4' })
  id!: string;

  @ApiProperty({ example: 'mario.rossi@example.com' })
  email!: string;

  @ApiProperty({ example: 'Mario Rossi' })
  name!: string;

  @ApiProperty({ example: '2025-04-19T13:45:00.000Z' })
  createdAt!: Date;
}
