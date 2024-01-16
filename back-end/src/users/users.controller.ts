import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service.interface';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @Public()
  @ApiCreatedResponse({ description: 'Usuario creado' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiOkResponse({ description: 'Usuarios obtenidos' })
  @Public()
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiOkResponse({ description: 'Usuario encontrado' })
  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un usuario mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiOkResponse({ description: 'Usuario actualizado' })
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiOkResponse({ description: 'Usuario eliminado' })
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @ApiOperation({ summary: 'Obtener un usuario mediante el nombre de usuario' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiOkResponse({ description: 'Usuario encontrado' })
  @Public()
  @Get('username/:username')
  @HttpCode(HttpStatus.OK)
  async getByName(@Param('username') username: string) {
    return await this.userService.getByName(username);
  }
}
