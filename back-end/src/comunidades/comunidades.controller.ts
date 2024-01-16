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
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('comunidades')
@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: IComunidadesService) {}

  @ApiOperation({ summary: 'Crear una comunidad' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiCreatedResponse({ description: 'Comunidad creada' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(@Body() createComunidadDto: CreateComunidadDto) {
    return await this.comunidadesService.create(createComunidadDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las comunidades registradas' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiOkResponse({ description: 'Comunidades obtenidas' })
  @Public()
  @Get()
  findAll() {
    return this.comunidadesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una comunidad mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada' })
  @ApiOkResponse({ description: 'Comunidad encontrada' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('Get comunidad by id: ' + id);
    return this.comunidadesService.findOne(id);
  }

  @ApiOperation({ summary: 'Obtener una comunidad mediante nombre' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada' })
  @ApiOkResponse({ description: 'Comunidad encontrada' })
  @Public()
  @Get('/name/:nombre')
  getByName(@Param('nombre') nombre: string) {
    return this.comunidadesService.getByName(nombre);
  }

  @ApiOperation({
    summary:
      'Obtener una comunidad si contiene en el nombre el valor dado, independientemente de las mayúsculas o minúsculas',
  })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada' })
  @ApiOkResponse({ description: 'Comunidad encontrada' })
  @Public()
  @Get('/nameInsensitivePartial/:nombre')
  getByNameInsensitivePartial(@Param('nombre') nombre: string) {
    return this.comunidadesService.getByNameInsensitivePartial(nombre);
  }

  @ApiOperation({ summary: 'Actualizar una comunidad mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada' })
  @ApiOkResponse({ description: 'Comunidad actualizada' })
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReunioneDto: UpdateComunidadDto,
  ) {
    return this.comunidadesService.update(id, updateReunioneDto);
  }

  @ApiOperation({
    summary: 'Añade un miembro a una comunidad dados sus respectivos ids',
  })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Comunidad o usuario no encontrados' })
  @ApiOkResponse({ description: 'Usuario añadido como miembro' })
  @ApiBearerAuth()
  @Public()
  @Patch(':idComunidad/:idUsuario')
  async addMember(
    @Param('idComunidad') idComunidad: string,
    @Param('idUsuario') idUsuario: string,
  ) {
    return this.comunidadesService.addMember(idComunidad, idUsuario);
  }

  @ApiOperation({
    summary:
      'Obtiene todas las comunidades a las que está unida un usuario, dado su id',
  })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiOkResponse({ description: 'Comunidades obtenidas' })
  @ApiBearerAuth()
  @Public()
  @Get('/user/:idUsuario')
  async getComunidadesByUser(@Param('idUsuario') idUsuario: string) {
    return this.comunidadesService.getComunidadesByUser(idUsuario);
  }

  @ApiOperation({ summary: 'Eliminar una comunidad mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Comunidad no encontrada' })
  @ApiOkResponse({ description: 'Comunidad eliminada' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadesService.remove(id);
  }
}
