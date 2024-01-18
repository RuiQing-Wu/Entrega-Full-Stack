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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { ICausasService } from './interfaces/causas.service.interface';
import { Public } from 'src/decorators/public.decorator';
import { RepositoryError } from 'src/base/repositoryError';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@ApiTags('causas')
@Controller('causas')
export class CausasController {
  constructor(private readonly causasService: ICausasService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una causa' })
  @ApiBody({ type: CreateCausaDto, description: 'Datos a crear', required: true })
  @ApiCreatedResponse({ description: 'Causa creada' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  async create(@Body() createCausaDto: CreateCausaDto) {
    try {
      return await this.causasService.create(createCausaDto);
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas las causas' })
  @ApiOkResponse({ description: 'Devolver la lista de causas' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async findAll() {
    try {
      return await this.causasService.findAll();
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una causa' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'Id de la causa' })
  @ApiOkResponse({ description: 'Devolver la entidad causa' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.causasService.findOne(id);
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

  @Public()
  @ApiOperation({ summary: 'Obtener una causa por su titulo' })
  @ApiParam({ name: 'nombre', type: String, required: true, description: 'Título de la causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/name/:nombre')
  async findByName(@Param('nombre') titulo: string) {
    try {
      return await this.causasService.getByName(titulo);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una causa por su comunidad' })
  @ApiParam({ name: 'comunidad', type: String, required: true, description: 'Id Comunidad de la causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/comunidad/:comunidad')
  async findByComunidad(@Param('comunidad') comunidad: string) {
    try {
      return await this.causasService.getByComunidadId(comunidad);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una causa por su titulo y comunidad' })
  @ApiParam({ name: 'titulo', type: String, required: true, description: 'Título de la causa' })
  @ApiParam({ name: 'idComunidad', type: String, required: true, description: 'Id Comunidad de la causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/nameInsensitivePartial/:titulo/:idComunidad')
  async getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idComunidad') idComunidad: string,
  ) {
    try {
      return await this.causasService.getByNameInsensitivePartial(titulo, idComunidad);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una causa' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'Id de la causa' })
  @ApiBody({ type: UpdateCausaDto, description: 'Datos a actualizar', required: true })
  @ApiOkResponse({ description: 'Causa actualizada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCausaDto: UpdateCausaDto) {
    try {
      return await this.causasService.update(id, updateCausaDto);
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
  @ApiOperation({ summary: 'Eliminar una causa' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'Id de la causa' })
  @ApiOkResponse({ description: 'Causa eliminada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.causasService.remove(id);
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
