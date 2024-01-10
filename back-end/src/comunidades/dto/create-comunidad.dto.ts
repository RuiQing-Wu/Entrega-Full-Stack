import { User } from 'src/users/domain/user.domain';

export class CreateComunidadDto {
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  idAdministrador: string;
  usuarios: string[];
}
