import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { ISeguidorService } from './interfaces/seguidor.service.interface';

@Controller('seguidor')
export class SeguidorController {
  constructor(private readonly seguidorService: ISeguidorService) {}

  @Post()
  create(@Body() createSeguidorDto: CreateSeguidorDto) {
    return this.seguidorService.create(createSeguidorDto);
  }

  @Get()
  findAll() {
    return this.seguidorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguidorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeguidorDto: UpdateSeguidorDto) {
    return this.seguidorService.update(id, updateSeguidorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguidorService.remove(id);
  }
}
