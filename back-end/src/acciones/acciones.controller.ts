import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { IAccionService } from './interfaces/accion.service.interface';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';

@ApiTags('acciones')
@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesService: IAccionService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una accion solidaria' })
  @ApiBody({
    type: CreateAccionDto,
    description: 'Datos a crear',
    required: true,
  })
  @ApiCreatedResponse({ status: 201, description: 'Accion solidaria creada' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post()
  async create(@Body() createAccionDto: CreateAccionDto) {
    return await this.accionesService.create(createAccionDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas las acciones solidarias' })
  @ApiOkResponse({
    status: 200,
    description: 'Devolver la lista de acciones solidarias',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get()
  async findAll() {
    return await this.accionesService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id de la accion solidaria',
  })
  @ApiOkResponse({ status: 200, description: 'Accion solidaria encontrada' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.accionesService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria por nombre' })
  @ApiParam({
    name: 'nombre',
    type: 'string',
    required: true,
    description: 'Título de la accion solidaria',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Accion solidaria encontrada por nombre',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/name/:nombre')
  async findByName(@Param('nombre') titulo: string) {
    return await this.accionesService.getByName(titulo);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener acciones solidaria por causa' })
  @ApiParam({
    name: 'causa',
    type: 'string',
    required: true,
    description: 'Id de la causa',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Acciones solidarias encontradas por causa',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/causa/:causa')
  async findByCausa(@Param('causa') causa: string) {
    return await this.accionesService.getByCausaId(causa);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener acciones solidaria por titulo' })
  @ApiParam({
    name: 'titulo',
    type: 'string',
    required: true,
    description: 'Título de la accion solidaria',
  })
  @ApiParam({
    name: 'idCausa',
    type: 'string',
    required: true,
    description: 'Id de la causa',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Acciones solidarias encontradas por titulo e Id de la causa',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/nameInsensitivePartial/:titulo/:idCausa')
  async getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idCausa') idCausa: string,
  ) {
    return await this.accionesService.getByNameInsensitivePartial(
      titulo,
      idCausa,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una accion solidaria' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id de la accion solidaria',
  })
  @ApiBody({
    type: UpdateAccionDto,
    description: 'Datos a actualizar',
    required: true,
  })
  @ApiOkResponse({ status: 200, description: 'Accion solidaria actualizada' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccioneDto: UpdateAccionDto,
  ) {
    return await this.accionesService.update(id, updateAccioneDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una accion solidaria' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id de la accion solidaria',
  })
  @ApiOkResponse({ status: 200, description: 'Accion solidaria eliminada' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.accionesService.remove(id);
  }
}
