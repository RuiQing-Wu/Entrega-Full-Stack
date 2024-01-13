import { UsuarioSeguimiento } from '../domain/usuario_seguimiento';
import { CreateSeguidorDto } from '../dto/create-seguidor.dto';
import { UpdateSeguidorDto } from '../dto/update-seguidor.dto';

export abstract class ISeguidorService {
  abstract create(
    createSeguidorDto: CreateSeguidorDto,
  ): Promise<UsuarioSeguimiento>;
  abstract findAll(): Promise<UsuarioSeguimiento[]>;
  abstract findOne(id: string): Promise<UsuarioSeguimiento>;
  abstract update(id: string, updateSeguidorDto: UpdateSeguidorDto);
  abstract remove(id: string): Promise<UsuarioSeguimiento>;
  abstract seguir(
    createSeguidorDto: CreateSeguidorDto[],
  ): Promise<UsuarioSeguimiento>;
  abstract getUsuariosSeguidos(id: string): Promise<UsuarioSeguimiento[]>;
  abstract getUsuariosSeguidores(id: string): Promise<UsuarioSeguimiento[]>;
}
