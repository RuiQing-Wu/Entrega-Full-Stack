import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { ISeguidorService } from './interfaces/seguidor.service.interface';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('seguidores')
@Public()
@Controller('seguidor')
export class SeguidorController {
  constructor(private readonly seguidorService: ISeguidorService) {}

  @ApiOperation({ summary: 'Crear una relación de seguimiento' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiCreatedResponse({ description: 'Seguimiento creado' })
  @Public()
  @Post()
  create(@Body() createSeguidorDto: CreateSeguidorDto) {
    return this.seguidorService.create(createSeguidorDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las relaciones de seguimiento entre usuarios' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiOkResponse({ description: 'Relaciones obtenidas' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.seguidorService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una relación de seguimiento mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiNotFoundResponse({ description: 'Relación no encontrada' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiOkResponse({ description: 'Relación encontrada' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguidorService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una relación de seguimiento mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Relación no encontrada' })
  @ApiOkResponse({ description: 'Relación actualizada' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeguidorDto: UpdateSeguidorDto) {
    return this.seguidorService.update(id, updateSeguidorDto);
  }

  @ApiOperation({ summary: 'Elimina una relación de seguimiento mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Ralación no encontrada' })
  @ApiOkResponse({ description: 'Relación eliminada' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguidorService.remove(id);
  }

  @ApiOperation({ summary: 'Establece una relación de seguimiento entre usuarios' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiCreatedResponse({ description: 'Relación creada' })
  @ApiBearerAuth()
  @Post('seguir/')
  seguir(@Body() createSeguidorOrigenDto: CreateSeguidorDto[]) {
    console.log('seguir');
    console.log(createSeguidorOrigenDto);
    return this.seguidorService.seguir(createSeguidorOrigenDto);
  }

  @ApiOperation({ summary: 'Devuelve las relaciones de seguimiento de un usuario dado su id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiOkResponse({ description: 'Relaciones obtenidas' })
  @ApiBearerAuth()
  @Get('seguidos/:id')
  getUsuariosSeguidos(@Param('id') id: string) {
    return this.seguidorService.getUsuariosSeguidos(id);
  }

  @ApiOperation({ summary: 'Devuelve las relaciones de seguimiento con un usuario dado su id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiOkResponse({ description: 'Relaciones obtenidas' })
  @ApiBearerAuth()
  @Get('seguidores/:id')
  getUsuariosSeguidores(@Param('id') id: string) {
    return this.seguidorService.getUsuariosSeguidores(id);
  }
}
