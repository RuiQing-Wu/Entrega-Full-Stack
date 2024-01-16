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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { IAccionService } from './interfaces/accion.service.interface';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';

@ApiTags('acciones')
@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesService: IAccionService) {}

  @ApiOperation({ summary: 'Crear una accion solidaria' })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Accion solidaria creada' })
  @Post()
  create(@Body() createAccionDto: CreateAccionDto) {
    return this.accionesService.create(createAccionDto);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas las acciones solidarias' })
  @Get()
  findAll() {
    return this.accionesService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accionesService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria por nombre' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida',
  })
  @Get('/name/:nombre')
  findByName(@Param('nombre') titulo: string) {
    return this.accionesService.getByName(titulo);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria por causa' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida',
  })
  @Get('/causa/:causa')
  findByCausa(@Param('causa') causa: string) {
    return this.accionesService.getByCausaId(causa);
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria por titulo' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida por titulo',
  })
  @Get('/nameInsensitivePartial/:titulo/:idCausa')
  getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idCausa') idCausa: string,
  ) {
    return this.accionesService.getByNameInsensitivePartial(titulo, idCausa);
  }

  @ApiOperation({ summary: 'Actualizar una accion solidaria' })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Accion solidaria actualizada' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccioneDto: UpdateAccionDto) {
    return this.accionesService.update(id, updateAccioneDto);
  }

  @ApiOperation({ summary: 'Eliminar una accion solidaria' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Accion solidaria eliminada' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accionesService.remove(id);
  }
}
