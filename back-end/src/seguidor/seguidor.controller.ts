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
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { ISeguidorService } from './interfaces/seguidor.service.interface';
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

@ApiTags('seguidores')
@Controller('seguidor')
export class SeguidorController {
  constructor(private readonly seguidorService: ISeguidorService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una relación de seguimiento' })
  @ApiBody({
    type: CreateSeguidorDto,
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Seguimiento creado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  async create(@Body() createSeguidorDto: CreateSeguidorDto) {
    try {
      return await this.seguidorService.create(createSeguidorDto);
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtiene todas las relaciones de seguimiento entre usuarios',
  })
  @ApiOkResponse({ description: 'Relaciones obtenidas' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async findAll() {
    try {
      return await this.seguidorService.findAll();
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una relación de seguimiento mediante id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id de la relación de seguimiento',
  })
  @ApiOkResponse({ description: 'Relación obtenida' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.seguidorService.findOne(id);
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
  @ApiOperation({
    summary: 'Actualizar una relación de seguimiento mediante id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id de la relación de seguimiento',
  })
  @ApiBody({
    type: UpdateSeguidorDto,
    description: 'Datos a actualizar',
    required: true,
  })
  @ApiOkResponse({ description: 'Relación actualizada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSeguidorDto: UpdateSeguidorDto,
  ) {
    try {
      return await this.seguidorService.update(id, updateSeguidorDto);
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
  @ApiOperation({ summary: 'Elimina una relación de seguimiento mediante id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id de la relación de seguimiento',
  })
  @ApiOkResponse({ description: 'Relación eliminada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.seguidorService.remove(id);
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
  @ApiOperation({
    summary: 'Establece una relación de seguimiento entre usuarios',
  })
  @ApiBody({
    examples: {
      example1: {
        value: [
          { username: 'juan', idUsuario: '65a51734fa40779cbdb63506' },

          {
            username: 'sara',
            idUsuario: '65a51734fa40779cbdb63508',
          },
        ],
      },
    },
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Relación creada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('seguir/')
  async seguir(@Body() createSeguidorOrigenDto: CreateSeguidorDto[]) {
    try {
      return await this.seguidorService.seguir(createSeguidorOrigenDto);
    } catch (error) {
      if (error instanceof IllegalArgumentError)
        throw new BadRequestException(error.message);

      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Devuelve las relaciones de seguimiento de un usuario dado su id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id del usuario',
  })
  @ApiOkResponse({ description: 'Relaciones obtenidas' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @Get('seguidos/:id')
  async getUsuariosSeguidos(@Param('id') id: string) {
    try {
      return await this.seguidorService.getUsuariosSeguidos(id);
    } catch (error) {
      if (error instanceof IllegalArgumentError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof RepositoryError) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Devuelve las relaciones que te siguen con un usuario dado su id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id del usuario',
  })
  @ApiOkResponse({ description: 'Relaciones obtenidas' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Usuario no autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Error del servidor' })
  @Get('seguidores/:id')
  async getUsuariosSeguidores(@Param('id') id: string) {
    try {
      return await this.seguidorService.getUsuariosSeguidores(id);
    } catch (error) {
      if (error instanceof IllegalArgumentError) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof RepositoryError) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
