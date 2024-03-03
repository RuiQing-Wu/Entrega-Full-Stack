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
} from '@nestjs/common';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RepositoryError } from 'src/base/repositoryError';
import { ConflictError } from 'src/base/conflictError';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@ApiTags('comunidades')
@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: IComunidadesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una comunidad' })
  @ApiBody({
    type: CreateComunidadDto,
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Comunidad creada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiConflictResponse({
    description: 'Ya existe una comunidad con este nombre',
  })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(@Body() createComunidadDto: CreateComunidadDto) {
      return await this.comunidadesService.create(createComunidadDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtiene todas las comunidades registradas' })
  @ApiOkResponse({ description: 'Comunidades obtenidas' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async findAll() {
      return await this.comunidadesService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una comunidad mediante id' })
  @ApiParam({ name: 'id', description: 'Id de la comunidad', required: true })
  @ApiOkResponse({ description: 'Comunidad encontrada por id' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
      return await this.comunidadesService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una comunidad mediante nombre' })
  @ApiParam({
    name: 'nombre',
    description: 'Nombre de la comunidad',
    required: true,
  })
  @ApiOkResponse({ description: 'Comunidad encontrada por nombre' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/name/:nombre')
  async getByName(@Param('nombre') nombre: string) {
      return await this.comunidadesService.getByName(nombre);
  }

  @Public()
  @ApiOperation({
    summary:
      'Obtener una comunidad si contiene en el nombre el valor dado, independientemente de las mayúsculas o minúsculas',
  })
  @ApiParam({
    name: 'nombre',
    description: 'Nombre de la comunidad',
    required: true,
  })
  @ApiOkResponse({ description: 'Comunidad encontrada por nombre parcial' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/nameInsensitivePartial/:nombre')
  async getByNameInsensitivePartial(@Param('nombre') nombre: string) {
      return await this.comunidadesService.getByNameInsensitivePartial(nombre);
  }

  @Public()
  @ApiOperation({
    summary:
      'Obtener una comunidad si contiene en la categoría el valor dado, independientemente de las mayúsculas o minúsculas',
  })
  @ApiParam({
    name: 'categorias',
    description: 'Categoría o categorías de la comunidad',
    required: true,
  })
  @ApiOkResponse({ description: 'Comunidad encontrada por categoría parcial' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/categoryInsensitivePartial/:categoria')
  async getByCategoryInsensitivePartial(@Param('categoria') categoria: string) {
      return await this.comunidadesService.getByCategoryInsensitivePartial(
        categoria,
      );
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas las comunidades de un año dado' })
  @ApiParam({ name: 'year', description: 'Año de inicio de la comunidad' })
  @ApiOkResponse({ description: 'Comunidades obtenidas por año' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/year/:year')
  async getByYear(@Param('year') year: number) {
      return await this.comunidadesService.getByYear(year);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una comunidad mediante id' })
  @ApiParam({ name: 'id', description: 'Id de la comunidad', required: true })
  @ApiBody({
    type: UpdateComunidadDto,
    description: 'Datos a actualizar',
    required: true,
  })
  @ApiOkResponse({ description: 'Comunidad actualizada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReunioneDto: UpdateComunidadDto,
  ) {
      return await this.comunidadesService.update(id, updateReunioneDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Añade un miembro a una comunidad dados sus respectivos ids',
  })
  @ApiParam({
    name: 'idComunidad',
    description: 'Id de la comunidad',
    required: true,
  })
  @ApiParam({
    name: 'idUsuario',
    description: 'Id del usuario',
    required: true,
  })
  @ApiOkResponse({ description: 'Miembro añadido' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':idComunidad/:idUsuario')
  async addMember(
    @Param('idComunidad') idComunidad: string,
    @Param('idUsuario') idUsuario: string,
  ) {
      return await this.comunidadesService.addMember(idComunidad, idUsuario);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar un miembro de una comunidad dados sus respectivos ids',
  })
  @ApiParam({
    name: 'idComunidad',
    description: 'Id de la comunidad',
    required: true,
  })
  @ApiParam({
    name: 'idUsuario',
    description: 'Id del usuario',
    required: true,
  })
  @ApiOkResponse({ description: 'Miembro eliminado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':idComunidad/:idUsuario')
  async removeMember(
    @Param('idComunidad') idComunidad: string,
    @Param('idUsuario') idUsuario: string,
  ) {
      return await this.comunidadesService.removeMember(idComunidad, idUsuario);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Obtiene todas las comunidades a las que está unida un usuario, dado su id',
  })
  @ApiParam({
    name: 'idUsuario',
    description: 'Id del usuario',
    required: true,
  })
  @ApiOkResponse({ description: 'Comunidades obtenidas' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/user/:idUsuario')
  async getComunidadesByUser(@Param('idUsuario') idUsuario: string) {
      return await this.comunidadesService.getComunidadesByUser(idUsuario);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una comunidad mediante id' })
  @ApiParam({ name: 'id', description: 'Id de la comunidad', required: true })
  @ApiOkResponse({ description: 'Comunidad eliminada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
      return await this.comunidadesService.remove(id);
  }
}
