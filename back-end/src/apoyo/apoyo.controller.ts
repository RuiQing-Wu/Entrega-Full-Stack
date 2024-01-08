import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApoyoService } from './apoyo.service';
import { CreateApoyoDto } from './dto/create-apoyo.dto';
import { UpdateApoyoDto } from './dto/update-apoyo.dto';

@Controller('apoyo')
export class ApoyoController {
  constructor(private readonly apoyoService: ApoyoService) {}

  @Post()
  create(@Body() createApoyoDto: CreateApoyoDto) {
    return this.apoyoService.create(createApoyoDto);
  }

  @Get()
  findAll() {
    return this.apoyoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoyoDto: UpdateApoyoDto) {
    return this.apoyoService.update(+id, updateApoyoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyoService.remove(+id);
  }
}
