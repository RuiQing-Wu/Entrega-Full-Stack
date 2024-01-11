import { Neo4jService } from "nest-neo4j/";
import { UsuarioSeguimiento } from "../domain/usuario_seguimiento";
import { SeguidorRepository } from "./seguidor.repository";

export class SeguidorRepositoryNeo4j implements SeguidorRepository {
    
    constructor(
        private readonly neo4jService: Neo4jService
    ) {
    }

    create(item: UsuarioSeguimiento): Promise<UsuarioSeguimiento> {
        throw new Error("Method not implemented.");
    }

    get(id: string): Promise<UsuarioSeguimiento> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<UsuarioSeguimiento[]> {
        throw new Error("Method not implemented.");
    }

    update(id: string, item: UsuarioSeguimiento): Promise<UsuarioSeguimiento> {
        throw new Error("Method not implemented.");
    }
    
    delete(id: string): Promise<UsuarioSeguimiento> {
        throw new Error("Method not implemented.");
    }
    
}
