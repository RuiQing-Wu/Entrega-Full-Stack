import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    InternalServerErrorException,
    NotFoundException,
    ClassSerializerInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { CreateContribucionDto } from './dto/create-contribucion.dto';
import { IContribucionAccionService } from './interfaces/contribucion-accion.service.interface';
import { Public } from 'src/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EntityNotFoundError } from 'src/base/entityNotFounError';

@ApiTags('contribuciones-accion')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('contribuciones-accion')
export class ContribucionAccionController{
    constructor(private readonly contribucionAccionService: IContribucionAccionService) {}

    @Public()
    @ApiOperation({ summary: 'Crear una contribución a una acción' })
    @ApiBody({
        type: CreateContribucionDto,
        description: 'Datos a crear',
        required: true,
    })
    @ApiCreatedResponse({ description: 'Contribución creada' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiConflictResponse({ description: 'Ya existe una contribución con este nombre' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @Post()
    async create(@Body() createContribucionDto: CreateContribucionDto) {
        return await this.contribucionAccionService.crearContribucionAccion(createContribucionDto);
    }

    @Public()
    @ApiOperation({ summary: 'Listar contribuciones' })
    @ApiOkResponse({ description: 'Contribuciones listadas' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @Get()
    async findAll() {
        return await this.contribucionAccionService.listarContribuciones();
    }

    @Public()
    @ApiOperation({ summary: 'Obtener contribución por id' })
    @ApiParam({ name: 'id', description: 'Identificador de la contribución', required: true })
    @ApiOkResponse({ description: 'Contribución obtenida' })
    @ApiNotFoundResponse({ description: 'Contribución no encontrada' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.contribucionAccionService.getContribucionByID(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(error.message);
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    @Public()
    @ApiOperation({ summary: 'Obtener contribuciones por id de acción' })
    @ApiParam({ name: 'idAccion', description: 'Identificador de la acción', required: true })
    @ApiOkResponse({ description: 'Contribuciones obtenidas' })
    @ApiNotFoundResponse({ description: 'Contribuciones no encontradas' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @Get('accion/:idAccion')
    async findByAccion(@Param('idAccion') idAccion: string) {
        return await this.contribucionAccionService.getContribucionesByIDAccion(idAccion);
    }

    @Public()
    @ApiOperation({ summary: 'Obtener contribuciones por id de usuario' })
    @ApiParam({ name: 'idUsuario', description: 'Identificador del usuario', required: true })
    @ApiOkResponse({ description: 'Contribuciones obtenidas' })
    @ApiNotFoundResponse({ description: 'Contribuciones no encontradas' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @Get('usuario/:idUsuario')
    async findByUsuario(@Param('idUsuario') idUsuario: string) {
        return await this.contribucionAccionService.getContribucionesByIDUsuario(idUsuario);
    }
}