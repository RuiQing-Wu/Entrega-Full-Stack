import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateApoyoRegistroDto } from './dto/create-apoyo-registro.dto';
import { UpdateApoyoRegistroDto } from './dto/update-apoyo-registro.dto';
import { IApoyoRegistroService } from './interfaces/apoyo-registro.service.interface';

@Controller('apoyo-registro')
export class ApoyoRegistroController {
  constructor(private readonly apoyoRegistroService: IApoyoRegistroService) {}

  @Post()
  create(@Body() createApoyoRegistroDto: CreateApoyoRegistroDto) {
    return this.apoyoRegistroService.create(createApoyoRegistroDto);
  }

  @Get()
  findAll() {
    return this.apoyoRegistroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyoRegistroService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoyoRegistroDto: UpdateApoyoRegistroDto) {
    return this.apoyoRegistroService.update(id, updateApoyoRegistroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyoRegistroService.remove(id);
  }
}
