import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
import { Public } from 'src/decorators/public.decorator';

/*
TODO:
- Notificación "not found"
- Control de errores del modelo
- Validación en los DTOs
*/

@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: IComunidadesService) { }

  @Public()
  @Post('')
  create(@Body() createComunidadDto: CreateComunidadDto) {
    return this.comunidadesService.create(createComunidadDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.comunidadesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadesService.findOne(id);
  }

  @Public()
  @Get('/name/:nombre')
  getByName(@Param('nombre') nombre: string) {
    return this.comunidadesService.getByName(nombre);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReunioneDto: UpdateComunidadDto,) {
    return this.comunidadesService.update(id, updateReunioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadesService.remove(id);
  }
}
