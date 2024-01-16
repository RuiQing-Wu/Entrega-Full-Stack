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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { ICausasService } from './interfaces/causas.service.interface';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('causas')
@Controller('causas')
export class CausasController {
  constructor(private readonly causasService: ICausasService) {}

  @ApiOperation({ summary: 'Crear una causa' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Causa creada' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createCausaDto: CreateCausaDto) {
    return this.causasService.create(createCausaDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas las causas' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get()
  findAll() {
    return this.causasService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.causasService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una causa por su titulo' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get('/name/:nombre')
  findByName(@Param('nombre') titulo: string) {
    return this.causasService.getByName(titulo);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una causa por su comunidad' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get('/comunidad/:comunidad')
  findByComunidad(@Param('comunidad') comunidad: string) {
    return this.causasService.getByComunidadId(comunidad);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una causa por su titulo y comunidad' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get('/nameInsensitivePartial/:titulo/:idComunidad')
  getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idComunidad') idComunidad: string,
  ) {
    return this.causasService.getByNameInsensitivePartial(titulo, idComunidad);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una causa' })
  @ApiOkResponse({ description: 'Causa actualizada' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCausaDto: UpdateCausaDto) {
    return this.causasService.update(id, updateCausaDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una causa' })
  @ApiOkResponse({ description: 'Causa eliminada' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.causasService.remove(id);
  }
}
