import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
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
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@ApiTags('solicitudes')
@Controller('solicitud')
export class SolicitudController {
  constructor(private readonly solicitudService: ISolicitudesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una solicitud' })
  @ApiBody({
    type: CreateSolicitudDto,
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Solicitud creada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  async create(@Body() createSolicitudDto: CreateSolicitudDto) {
    try {
      return await this.solicitudService.create(createSolicitudDto);
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtiene todas las solicitudes registradas' })
  @ApiOkResponse({ description: 'Solicitudes obtenidas' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async findAll() {
    try {
      return await this.solicitudService.findAll();
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una solicitud mediante id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id de la solicitud',
    required: true,
  })
  @ApiOkResponse({ description: 'Solicitud obtenida' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.solicitudService.findOne(id);
    } catch (error) {
      if (error instanceof IllegalArgumentError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof RepositoryError) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  // Recoger solicitud por idUsuario e idComunidad

  @Public()
  @ApiOperation({
    summary: 'Obtener una solicitud mediante idUsuario e idComunidad',
  })
  @ApiParam({
    name: 'idUsuario',
    type: 'string',
    description: 'Id del usuario',
    required: true,
  })
  @ApiParam({
    name: 'idComunidad',
    type: 'string',
    description: 'Id de la comunidad',
    required: true,
  })
  @ApiOkResponse({ description: 'Solicitud obtenida' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':idUsuario/:idComunidad')
  async getByUserIdAndCommunityId(
    @Param('idUsuario') idUsuario: string,
    @Param('idComunidad') idComunidad: string,
  ) {
    try {
      return await this.solicitudService.findByUserIdAndCommunityId(
        idUsuario,
        idComunidad,
      );
    } catch (error) {
      if (error instanceof IllegalArgumentError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof RepositoryError) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una solicitud mediante id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id de la solicitud',
    required: true,
  })
  @ApiBody({
    type: UpdateSolicitudDto,
    description: 'Datos a actualizar',
    required: true,
  })
  @ApiOkResponse({ description: 'Solicitud actualizada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSolicitudDto: UpdateSolicitudDto,
  ) {
    try {
      return await this.solicitudService.update(id, updateSolicitudDto);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una solicitud mediante id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id de la solicitud',
    required: true,
  })
  @ApiOkResponse({ description: 'Solicitud eliminada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.solicitudService.remove(id);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }
}
