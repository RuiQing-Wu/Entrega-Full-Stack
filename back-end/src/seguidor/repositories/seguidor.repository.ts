import { IGenericRepository } from "src/base/generic.repository"
import { UsuarioSeguimiento } from "../domain/usuario_seguimiento"

export abstract class SeguidorRepository extends IGenericRepository<UsuarioSeguimiento> {
    abstract seguir(seguidorOrigen: UsuarioSeguimiento, seguidorDestino: UsuarioSeguimiento): Promise<UsuarioSeguimiento>;
}
