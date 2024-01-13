import { Inject, Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudesRepository } from './repositories/solicitudes.repository';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { Solicitud } from './domain/solicitud.domain';

@Injectable()
export class SolicitudServiceImpl extends ISolicitudesService {
  constructor(
    @Inject(SolicitudesRepository)
    private solicitudesRepository: SolicitudesRepository,
  ) {
    super();
  }

  create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    const solicitud = new Solicitud(createSolicitudDto);
    return this.solicitudesRepository.create(solicitud);
  }

  findAll(): Promise<Solicitud[]> {
    return this.solicitudesRepository.getAll();
  }

  findOne(id: string): Promise<Solicitud> {
    return this.solicitudesRepository.get(id);
  }

  async update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
    const solicitud = await this.solicitudesRepository.get(id);

    if (solicitud) {
      const newSolicitud = new Solicitud({
        ...solicitud,
        ...updateSolicitudDto,
      });

      await this.solicitudesRepository.update(id, newSolicitud);
      return newSolicitud;
    }
  }

  remove(id: string): Promise<Solicitud> {
    return this.solicitudesRepository.delete(id);
  }

}
