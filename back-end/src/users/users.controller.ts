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
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
  NotFoundException,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service.interface';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RepositoryError } from 'src/base/repositoryError';
import { ConflictError } from 'src/base/conflictError';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@ApiTags('usuarios')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @Public()
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Usuario creado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Ya existe un usuaurio con este nombre' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
      return await this.userService.create(createUserDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ description: 'Usuarios obtenidos' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async findAll() {
      return await this.userService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un usuario mediante id' })
  @ApiParam({ name: 'id', description: 'Id del usuario', required: true })
  @ApiOkResponse({ description: 'Usuario obtenido' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
      return await this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un usuario mediante id' })
  @ApiParam({ name: 'id', description: 'Id del usuario', required: true })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Datos a actualizar',
    required: true,
  })
  @ApiOkResponse({ description: 'Usuario actualizado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({
    description: 'Ya existe un usuario con este nombre de usuario',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return await this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un usuario mediante id' })
  @ApiParam({ name: 'id', description: 'Id del usuario', required: true })
  @ApiOkResponse({ description: 'Usuario eliminado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
      return await this.userService.remove(id);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener un usuario mediante el nombre de usuario' })
  @ApiParam({
    name: 'username',
    description: 'Nombre de usuario',
    required: true,
  })
  @ApiOkResponse({ description: 'Usuario obtenido por nombre de usuario' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('username/:username')
  @HttpCode(HttpStatus.OK)
  async getByName(@Param('username') username: string) {
      return await this.userService.getByName(username);
  }
}
