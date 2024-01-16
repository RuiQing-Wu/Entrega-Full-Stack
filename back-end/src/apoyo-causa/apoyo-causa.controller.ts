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
import { CreateApoyoCausaDto } from './dto/create-apoyo-causa.dto';
import { UpdateApoyoCausaDto } from './dto/update-apoyo-causa.dto';
import { IApoyoCausaService } from './interfaces/apoyo-causa.interface';
import { Public } from 'src/decorators/public.decorator';
import { NOTFOUND } from 'dns';

@ApiTags('apoyo-causa')
@Controller('apoyo-causa')
export class ApoyoCausaController {
  constructor(private readonly apoyoCausaService: IApoyoCausaService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un apoyo a una causa solidaria' })
  @ApiCreatedResponse({ description: 'Accion solidaria creada' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createApoyoCausaDto: CreateApoyoCausaDto) {
    return this.apoyoCausaService.create(createApoyoCausaDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas los apoyos a causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get()
  findAll() {
    return this.apoyoCausaService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener el apoyo de una causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyoCausaService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un apoyo a una causa solidaria' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Apoyo a la causa actualizada' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApoyoCausaDto: UpdateApoyoCausaDto,
  ) {
    return this.apoyoCausaService.update(id, updateApoyoCausaDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un apoyo a una causa solidaria' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiOkResponse({ description: 'Apoyo a la causa eliminada' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyoCausaService.remove(id);
  }

  @Public()
  @ApiOperation({ summary: 'Apoyar una causa solidaria' })
  @ApiOkResponse({ description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch('apoyar/:id')
  apoyar(@Param('id') id: string) {
    const respuesta = this.apoyoCausaService.apoyar(id);
    if (respuesta === null) {
      return NOTFOUND;
    }
    return respuesta;
  }
}
