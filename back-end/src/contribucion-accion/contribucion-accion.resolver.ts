import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { IContribucionAccionService } from "./interfaces/contribucion-accion.service.interface";
import { ContribucionAccion } from "./domain/contribucion-accion.domain";
import { Public } from "src/decorators/public.decorator";
import { UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateContribucionDto } from "./dto/create-contribucion.dto";

@ApiTags('contribuciones-accion')
@UseInterceptors(ClassSerializerInterceptor)
@Resolver(of => ContribucionAccion)
export class ContribucionAccionResolver {
    constructor(private readonly contribucionAccionService: IContribucionAccionService) { }

    @Public()
    @ApiOperation({ summary: 'Crear una contribución a una acción' })
    @ApiBody({
        type: CreateContribucionDto,
        description: 'Datos a crear',
        required: true,
    })
    @Mutation((returns) => ContribucionAccion)
    async crearContribucionAccion(
        @Args('idUsuario') idUsuario: string,
        @Args('idAccion') idAccion: string,
        @Args('nombre') nombre: string,
        @Args('email') email: string,
        @Args('contribucion') contribucion: number,
    ) {
        return await this.contribucionAccionService.crearContribucionAccion({ idUsuario, idAccion, nombre, email, contribucion });
    }

    @Public()
    @ApiOperation({ summary: 'Listar contribuciones' })
    @Query((returns) => [ContribucionAccion], {name: 'listarContribuciones'})
    async listarContribuciones() {
        return await this.contribucionAccionService.listarContribuciones();
    }

    @Public()
    @ApiOperation({ summary: 'Obtener contribución por id' })
    @ApiParam({ name: 'id', description: 'Identificador de la contribución', required: true })
    @Query((returns) => ContribucionAccion, {name: 'getContribucionByID'})
    async getContribucionByID(@Args('id') id: string) {
        return await this.contribucionAccionService.getContribucionByID(id);
    }

    @Public()
    @ApiOperation({ summary: 'Obtener contribuciones por id de acción' })
    @ApiParam({ name: 'idAccion', description: 'Identificador de la acción', required: true })
    @Query((returns) => [ContribucionAccion], {name: 'getContribucionByIDAccion'})
    async getContribucionByIDAccion(@Args('idAccion') idAccion: string) {
        return await this.contribucionAccionService.getContribucionesByIDAccion(idAccion);
    }

    @Public()
    @ApiOperation({ summary: 'Obtener contribuciones por id de usuario' })
    @ApiParam({ name: 'idUsuario', description: 'Identificador del usuario', required: true })
    @Query((returns) => [ContribucionAccion], {name: 'getContribucionByIDUsuario'})
    async getContribucionByIDUsuario(@Args('idUsuario') idUsuario: string) {
        return await this.contribucionAccionService.getContribucionesByIDUsuario(idUsuario);
    }
}
