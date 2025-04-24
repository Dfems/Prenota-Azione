import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'mario.rossi@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Mario Rossi' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 's3cr3tP@ss' })
  @IsString()
  @MinLength(6)
  password!: string;
}
