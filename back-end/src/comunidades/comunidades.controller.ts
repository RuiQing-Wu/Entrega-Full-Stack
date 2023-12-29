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
//import { Public } from 'src/auth/public.decorator';
//import { Roles } from 'src/auth/roles.decorator';
//import { Role } from 'src/users/users.service';
//import { RolesGuard } from 'src/auth/roles.guard';
import { CreateCausaDto } from './dto/create-causa.dto';
import { IComunidadesService } from './interfaces/comunidades.service.interface';

/*
TODO:
- Notificación "not found"
- Control de errores del modelo
- Validación en los DTOs
*/

@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: IComunidadesService) {}

  @Post('')
  create(@Body() createComunidadDto: CreateComunidadDto) {
    return this.comunidadesService.create(createComunidadDto);
  }

  //@UseGuards(RolesGuard)
  //@Roles(Role.Admin)
  @Get()
  findAll() {
    return this.comunidadesService.findAll();
  }

  //@Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReunioneDto: UpdateComunidadDto,
  ) {
    return this.comunidadesService.update(id, updateReunioneDto);
  }

  /*

  @Post(':id/causas')
  async addCausa(@Param('id') id: string, @Body() causaDto: CreateCausaDto) {
    return await this.comunidadesService.addCausa(id, causaDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadesService.remove(id);
  }
}
