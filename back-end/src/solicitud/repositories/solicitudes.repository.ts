import { IGenericRepository } from 'src/base/generic.repository';
import { Solicitud } from '../domain/solicitud.domain';

export abstract class SolicitudesRepository extends IGenericRepository<Solicitud> {
  abstract getByUserIdAndCommunityId(
    userId: string,
    communityId: string,
  ): Promise<Solicitud>;
}
