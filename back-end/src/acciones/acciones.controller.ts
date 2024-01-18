import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { IAccionService } from './interfaces/accion.service.interface';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { RepositoryError } from '../base/repositoryError';
import { IllegalArgumentError } from '../base/argumentError';
import { EntityNotFoundError } from '../base/entityNotFounError';

@ApiTags('acciones')
@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesService: IAccionService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una accion solidaria' })
  @ApiBody({ type: CreateAccionDto, description: 'Datos a crear', required: true })
  @ApiCreatedResponse({ status: 201, description: 'Accion solidaria creada' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Post()
  async create(@Body() createAccionDto: CreateAccionDto) {
    try {
      return await this.accionesService.create(createAccionDto);
    }
    catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas las acciones solidarias' })
  @ApiOkResponse({ status: 200, description: 'Devolver la lista de acciones solidarias' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll() {
    try {
      return await this.accionesService.findAll();
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'Id de la accion solidaria' })
  @ApiOkResponse({ status: 200, description: 'OK' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.accionesService.findOne(id);
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
  @ApiOperation({ summary: 'Obtener una accion solidaria por nombre' })
  @ApiParam({ name: 'nombre', type: 'string', required: true, description: 'Título de la accion solidaria' })
  @ApiOkResponse({ status: 200, description: 'OK' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Get('/name/:nombre')
  async findByName(@Param('nombre') titulo: string) {
    try {
      return await this.accionesService.getByName(titulo);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener acciones solidaria por causa' })
  @ApiParam({ name: 'causa', type: 'string', required: true, description: 'Id de la causa' })
  @ApiOkResponse({ status: 200, description: 'OK' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Get('/causa/:causa')
  async findByCausa(@Param('causa') causa: string) {
    try {
      return await this.accionesService.getByCausaId(causa);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener acciones solidaria por titulo' })
  @ApiParam({ name: 'titulo', type: 'string', required: true, description: 'Título de la accion solidaria' })
  @ApiParam({ name: 'idCausa', type: 'string', required: true, description: 'Id de la causa' })
  @ApiOkResponse({ status: 200, description: 'OK' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Get('/nameInsensitivePartial/:titulo/:idCausa')
  async getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idCausa') idCausa: string,
  ) {
    try {
      return await this.accionesService.getByNameInsensitivePartial(titulo, idCausa);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una accion solidaria' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'Id de la accion solidaria' })
  @ApiBody({ type: UpdateAccionDto, description: 'Datos a actualizar', required: true })
  @ApiOkResponse({ status: 200, description: 'Accion solidaria actualizada' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccioneDto: UpdateAccionDto) {
    try {
      return await this.accionesService.update(id, updateAccioneDto);
    }
    catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una accion solidaria' })
  @ApiParam({ name: 'id', type: 'string', required: true, description: 'Id de la accion solidaria' })
  @ApiOkResponse({ status: 200, description: 'Accion solidaria eliminada' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.accionesService.remove(id);
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
