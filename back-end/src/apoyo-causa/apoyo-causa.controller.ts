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
import { CreateApoyoCausaDto } from './dto/create-apoyo-causa.dto';
import { UpdateApoyoCausaDto } from './dto/update-apoyo-causa.dto';
import { IApoyoCausaService } from './interfaces/apoyo-causa.interface';
import { Public } from 'src/decorators/public.decorator';
import { RepositoryError } from 'src/base/repositoryError';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@ApiTags('apoyo-causa')
@Controller('apoyo-causa')
export class ApoyoCausaController {
  constructor(private readonly apoyoCausaService: IApoyoCausaService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un apoyo a una causa solidaria' })
  @ApiBody({ type: CreateApoyoCausaDto })
  @ApiCreatedResponse({ description: 'Apoyo a la causa creado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  async create(@Body() createApoyoCausaDto: CreateApoyoCausaDto) {
      return await this.apoyoCausaService.create(createApoyoCausaDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas los apoyos a causa' })
  @ApiOkResponse({ description: 'Apoyos a causas obtenidos' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async findAll() {
      return await this.apoyoCausaService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener el apoyo de una causa' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id del apoyo a la causa',
  })
  @ApiOkResponse({ description: 'Apoyo a la causa obtenido' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
      return await this.apoyoCausaService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener el apoyo de una causa por numApoyo' })
  @ApiParam({
    name: 'numApoyo',
    type: Number,
    required: true,
    description: 'Numero de apoyo a la causa',
  })
  @ApiOkResponse({ description: 'Apoyo a la causa obtenido' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('numApoyo/:numApoyo')
  async getByNumApoyo(@Param('numApoyo') numApoyo: number) {
      return await this.apoyoCausaService.findByNumApoyo(numApoyo);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un apoyo a una causa solidaria' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id del apoyo a la causa',
  })
  @ApiBody({
    type: UpdateApoyoCausaDto,
    description: 'Datos a actualizar',
    required: true,
  })
  @ApiOkResponse({ description: 'Apoyo a la causa actualizada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApoyoCausaDto: UpdateApoyoCausaDto,
  ) {
      return await this.apoyoCausaService.update(id, updateApoyoCausaDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un apoyo a una causa solidaria' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id del apoyo a la causa',
  })
  @ApiOkResponse({ description: 'Apoyo a la causa eliminada' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
      return await this.apoyoCausaService.remove(id);
  }

  @Public()
  @ApiOperation({ summary: 'Apoyar una causa solidaria' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id del apoyo a la causa',
  })
  @ApiOkResponse({ description: 'Apoyo a causa actualizado' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch('apoyar/:id')
  async apoyar(@Param('id') id: string) {
      return await this.apoyoCausaService.apoyar(id);
  }
}
