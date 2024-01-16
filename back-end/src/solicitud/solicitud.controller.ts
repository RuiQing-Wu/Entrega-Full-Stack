import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('solicitudes')
@Controller('solicitud')
export class SolicitudController {
  constructor(private readonly solicitudService: ISolicitudesService) { }

  @ApiOperation({ summary: 'Crear una solicitud' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiCreatedResponse({ description: 'Petición creada' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    console.log(createSolicitudDto);
    return this.solicitudService.create(createSolicitudDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las peticiones registradas' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiOkResponse({ description: 'Peticiones obtenidas' })
  @Get()
  @Public()
  findAll() {
    return this.solicitudService.findAll();
  }
  
  @ApiOperation({ summary: 'Obtener una petición mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiNotFoundResponse({ description: 'Petición no encontrada' })
  @ApiOkResponse({ description: 'Petición encontrada' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una solicitud mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Petición no encontrada' })
  @ApiOkResponse({ description: 'Petición actualizada' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudService.update(id, updateSolicitudDto);
  }

  @ApiOperation({ summary: 'Eliminar una solicitud mediante id' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiNotFoundResponse({ description: 'Peticion no encontrada' })
  @ApiOkResponse({ description: 'Petición eliminada' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudService.remove(id);
  }
}
