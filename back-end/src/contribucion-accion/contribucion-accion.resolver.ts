import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { IContribucionAccionService } from "./interfaces/contribucion-accion.service.interface";
import { ContribucionAccion } from "./domain/contribucion-accion.domain";
import { Public } from "src/decorators/public.decorator";

@Resolver((of) => ContribucionAccion)
export class ContribucionAccionResolver {
    constructor(private readonly contribucionAccionService: IContribucionAccionService) { }

    @Public()
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
    @Query((returns) => [ContribucionAccion], {name: 'listarContribuciones'})
    async listarContribuciones() {
        return await this.contribucionAccionService.listarContribuciones();
    }

    @Public()
    @Query((returns) => ContribucionAccion, {name: 'getContribucionByID'})
    async getContribucionByID(id: string) {
        return await this.contribucionAccionService.getContribucionByID(id);
    }

    @Public()
    @Query((returns) => [ContribucionAccion], {name: 'getContribucionByIDAccion'})
    async getContribucionByIDAccion(idAccion: string) {
        return await this.contribucionAccionService.getContribucionesByIDAccion(idAccion);
    }

    @Public()
    @Query((returns) => [ContribucionAccion], {name: 'getContribucionByIDUsuario'})
    async getContribucionByIDUsuario(idUsuario: string) {
        return await this.contribucionAccionService.getContribucionesByIDUsuario(idUsuario);
    }
}
