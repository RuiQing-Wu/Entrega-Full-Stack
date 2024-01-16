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
import { CreateApoyoRegistroDto } from './dto/create-apoyo-registro.dto';
import { UpdateApoyoRegistroDto } from './dto/update-apoyo-registro.dto';
import { IApoyoRegistroService } from './interfaces/apoyo-registro.service.interface';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('apoyo-registro')
@Controller('apoyo-registro')
export class ApoyoRegistroController {
  constructor(private readonly apoyoRegistroService: IApoyoRegistroService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un registro del apoyo a la causa' })
  @ApiCreatedResponse({ description: 'Registro del apoyo a la causa' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createApoyoRegistroDto: CreateApoyoRegistroDto) {
    return this.apoyoRegistroService.create(createApoyoRegistroDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas los registros de apoyo a causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get()
  findAll() {
    return this.apoyoRegistroService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener el registro de apoyo a una causa' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyoRegistroService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar el registro de apoyo a una causa' })
  @ApiOkResponse({ description: 'Registro de apoyo a una causa actualizada' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApoyoRegistroDto: UpdateApoyoRegistroDto,
  ) {
    return this.apoyoRegistroService.update(id, updateApoyoRegistroDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar el registro de apoyo a una causa' })
  @ApiOkResponse({ description: 'Registro de apoyo a una causa eliminada' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyoRegistroService.remove(id);
  }
}
