import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { ICausasService } from './interfaces/causas.service.interface';
import { Public } from 'src/decorators/public.decorator';

@Controller('causas')
export class CausasController {
  constructor(private readonly causasService: ICausasService) {}

  @Post()
  create(@Body() createCausaDto: CreateCausaDto) {
    return this.causasService.create(createCausaDto);
  }

  @Get()
  findAll() {
    return this.causasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.causasService.findOne(id);
  }

  @Get('/name/:nombre')
  findByName(@Param('nombre') titulo: string) {
    return this.causasService.getByName(titulo);
  }

  @Get('/comunidad/:comunidad')
  findByComunidad(@Param('comunidad') comunidad: string) {
    return this.causasService.getByComunidadId(comunidad);
  }

  @Get('/nameInsensitivePartial/:titulo/:idComunidad')
  getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idComunidad') idComunidad: string,
  ) {
    return this.causasService.getByNameInsensitivePartial(titulo, idComunidad);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCausaDto: UpdateCausaDto) {
    return this.causasService.update(id, updateCausaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.causasService.remove(id);
  }
}
