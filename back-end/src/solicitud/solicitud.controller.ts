import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { Public } from 'src/decorators/public.decorator';

@Controller('solicitud')
export class SolicitudController {
  constructor(private readonly solicitudService: ISolicitudesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    console.log(createSolicitudDto);
    return this.solicitudService.create(createSolicitudDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.solicitudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudService.update(id, updateSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudService.remove(id);
  }
}
