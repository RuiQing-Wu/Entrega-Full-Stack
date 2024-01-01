import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { IAccionService } from './interfaces/accion.service.interface';
import { CreateAccionDto } from './dto/create-accione.dto';
import { UpdateAccionDto } from './dto/update-accione.dto';

@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesService: IAccionService) {}

  @Post()
  create(@Body() createAccionDto: CreateAccionDto) {
    return this.accionesService.create(createAccionDto);
  }

  @Get()
  findAll() {
    return this.accionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccioneDto: UpdateAccionDto) {
    return this.accionesService.update(id, updateAccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accionesService.remove(id);
  }
}
