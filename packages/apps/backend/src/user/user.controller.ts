import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Recupera tutti gli utenti' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  getUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recupera un utente per ID' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuovo utente' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aggiorna un utente' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un utente' })
  @ApiResponse({ status: 204 })
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
