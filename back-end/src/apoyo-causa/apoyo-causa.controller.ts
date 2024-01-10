import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateApoyoCausaDto } from './dto/create-apoyo-causa.dto';
import { UpdateApoyoCausaDto } from './dto/update-apoyo-causa.dto';
import { IApoyoCausaService } from './interfaces/apoyo-causa.interface';

@Controller('apoyo-causa')
export class ApoyoCausaController {
  constructor(private readonly apoyoCausaService: IApoyoCausaService) {}

  @Post()
  create(@Body() createApoyoCausaDto: CreateApoyoCausaDto) {
    return this.apoyoCausaService.create(createApoyoCausaDto);
  }

  @Get()
  findAll() {
    return this.apoyoCausaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyoCausaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoyoCausaDto: UpdateApoyoCausaDto) {
    return this.apoyoCausaService.update(id, updateApoyoCausaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyoCausaService.remove(id);
  }
}
