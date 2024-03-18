import { ContribucionAccion } from "../domain/contribucion-accion.domain";

export abstract class IContribucionAccionService {
    abstract crearContribucionAccion(data: ContribucionAccion): Promise<ContribucionAccion>;
    abstract listarContribuciones(): Promise<ContribucionAccion[]>;
    abstract getContribucionByID(id: string): Promise<ContribucionAccion>;
    abstract getContribucionesByIDAccion(idAccion: string): Promise<ContribucionAccion[]>;
    abstract getContribucionesByIDUsuario(idUsuario: string): Promise<ContribucionAccion[]>;
}