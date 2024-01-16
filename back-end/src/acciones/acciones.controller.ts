import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { IAccionService } from './interfaces/accion.service.interface';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';

@ApiTags('acciones')
@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesService: IAccionService) {}

  @ApiOperation({ summary: 'Crear una accion solidaria' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Accion solidaria creada' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(@Body() createAccionDto: CreateAccionDto) {
    try
    {
      return this.accionesService.create(createAccionDto);  
    }
    catch(error)
    {
      console.log(error);
      throw new InternalServerErrorException('Error al crear la accion solidaria');
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener todas las acciones solidarias' })
  @Get()
  findAll() {
    try{
      return this.accionesService.findAll();
    }catch(error){
      console.log(error);
      throw new NotFoundException('Error al obtener las acciones solidarias');
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try{
      return this.accionesService.findOne(id);
    }catch(error){
      console.log(error);
      throw new NotFoundException('Error al obtener la accion solidaria');
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria por nombre' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida',
  })
  @Get('/name/:nombre')
  findByName(@Param('nombre') titulo: string) {
    try{
      return this.accionesService.getByName(titulo);
    }catch(error){
      console.log(error);
      throw new NotFoundException('Error al obtener la accion solidaria');
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria por causa' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida',
  })
  @Get('/causa/:causa')
  findByCausa(@Param('causa') causa: string) {
    try{
      return this.accionesService.getByCausaId(causa);
    }catch(error){
      console.log(error);
      throw new NotFoundException('Error al obtener la accion solidaria');
    }
  }

  @Public()
  @ApiOperation({ summary: 'Obtener una accion solidaria por titulo' })
  @ApiResponse({
    status: 200,
    description: 'Accion solidaria obtenida por titulo',
  })
  @Get('/nameInsensitivePartial/:titulo/:idCausa')
  getByNameInsensitivePartial(
    @Param('titulo') titulo: string,
    @Param('idCausa') idCausa: string,
  ) {
    try{
      return this.accionesService.getByNameInsensitivePartial(titulo, idCausa);
    }catch(error){
      console.log(error);
      throw new NotFoundException('Error al obtener la accion solidaria');
    }
  }

  @ApiOperation({ summary: 'Actualizar una accion solidaria' })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Accion solidaria actualizada' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccioneDto: UpdateAccionDto) {
    try
    {
      return this.accionesService.update(id, updateAccioneDto);
    }
    catch(error)
    {
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar la accion solidaria');
    }
  }

  @ApiOperation({ summary: 'Eliminar una accion solidaria' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Accion solidaria eliminada' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.accionesService.remove(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar la accion solidaria');
    }
  }
}
