import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateApoyoCausaDto } from './dto/create-apoyo-causa.dto';
import { UpdateApoyoCausaDto } from './dto/update-apoyo-causa.dto';
import { IApoyoCausaService } from './interfaces/apoyo-causa.interface';
import { Public } from 'src/decorators/public.decorator';
import { NOTFOUND } from 'dns';

@Public()
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
  update(
    @Param('id') id: string,
    @Body() updateApoyoCausaDto: UpdateApoyoCausaDto,
  ) {
    return this.apoyoCausaService.update(id, updateApoyoCausaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyoCausaService.remove(id);
  }

  @Patch('apoyar/:id')
  //@HttpCode(HttpStatus.NOT_FOUND)
  apoyar(@Param('id') id: string) {
    const respuesta = this.apoyoCausaService.apoyar(id);
    if (respuesta === null) {
      return NOTFOUND;
    }
    return respuesta;
  }
}
