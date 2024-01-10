import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { IAccionService } from './interfaces/accion.service.interface';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesService: IAccionService) {}

  @Public()
  @Post()
  create(@Body() createAccionDto: CreateAccionDto) {
    return this.accionesService.create(createAccionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.accionesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accionesService.findOne(id);
  }

  @Public()
  @Get('/name/:nombre')
  findByName(@Param('nombre') titulo: string) {
    return this.accionesService.getByName(titulo);
  }

  @Public()
  @Get('/causa/:causa')
  findByCausa(@Param('causa') causa: string) {
    return this.accionesService.getByCausaId(causa);
  }

  @Get(':nombre')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccioneDto: UpdateAccionDto) {
    return this.accionesService.update(id, updateAccioneDto);
  }

  @Public()
  @Get('/nameInsensitivePartial/:titulo/:idCausa')
  getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idCausa') idCausa: string,
  ) {
    return this.accionesService.getByNameInsensitivePartial(titulo, idCausa);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accionesService.remove(id);
  }
}
