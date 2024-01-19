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
import { CreateApoyoRegistroDto } from './dto/create-apoyo-registro.dto';
import { UpdateApoyoRegistroDto } from './dto/update-apoyo-registro.dto';
import { IApoyoRegistroService } from './interfaces/apoyo-registro.service.interface';
import { Public } from 'src/decorators/public.decorator';
import { RepositoryError } from 'src/base/repositoryError';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@ApiTags('apoyo-registro')
@Controller('apoyo-registro')
export class ApoyoRegistroController {
  constructor(private readonly apoyoRegistroService: IApoyoRegistroService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un registro del apoyo a la causa' })
  @ApiBody({
    type: CreateApoyoRegistroDto,
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ description: 'Registro del apoyo a la causa' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createApoyoRegistroDto: CreateApoyoRegistroDto) {
    try {
      return this.apoyoRegistroService.create(createApoyoRegistroDto);
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas los registros de apoyo a causa' })
  @ApiOkResponse({ description: 'Registros de apoyo a causas obtenidos' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    try {
      return this.apoyoRegistroService.findAll();
    } catch (error) {
      if (error instanceof RepositoryError)
        throw new InternalServerErrorException(error.message);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener el registro de apoyo a una causa' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id del registro de apoyo a la causa',
  })
  @ApiOkResponse({ description: 'Registro de apoyo a una causa obtenido' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.apoyoRegistroService.findOne(id);
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
  @ApiOperation({ summary: 'Actualizar el registro de apoyo a una causa' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id del registro de apoyo a la causa',
  })
  @ApiBody({
    type: UpdateApoyoRegistroDto,
    description: 'Datos a actualizar',
    required: true,
  })
  @ApiOkResponse({ description: 'Registro de apoyo a una causa actualizada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApoyoRegistroDto: UpdateApoyoRegistroDto,
  ) {
    try {
      return await this.apoyoRegistroService.update(id, updateApoyoRegistroDto);
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
  @ApiOperation({ summary: 'Eliminar el registro de apoyo a una causa' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id del registro de apoyo a la causa',
  })
  @ApiOkResponse({ description: 'Registro de apoyo a una causa eliminada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.apoyoRegistroService.remove(id);
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
