import { IGenericRepository } from "src/base/generic.repository"
import { UsuarioSeguimiento } from "../domain/usuario_seguimiento"

export abstract class SeguidorRepository extends IGenericRepository<UsuarioSeguimiento> {
}
