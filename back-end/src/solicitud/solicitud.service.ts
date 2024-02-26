import { Inject, Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudesRepository } from './repositories/solicitudes.repository';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { Solicitud } from './domain/solicitud.domain';
import { IllegalArgumentError } from 'src/base/argumentError';

@Injectable()
export class SolicitudServiceImpl extends ISolicitudesService {
  constructor(
    @Inject(SolicitudesRepository)
    private solicitudesRepository: SolicitudesRepository,
  ) {
    super();
  }

  async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    const solicitud = new Solicitud(createSolicitudDto);
    return await this.solicitudesRepository.create(solicitud);
  }

  async findAll(): Promise<Solicitud[]> {
    return await this.solicitudesRepository.getAll();
  }

  async findOne(id: string): Promise<Solicitud> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la solicitud no puede ser vacio',
      );
    }

    return await this.solicitudesRepository.get(id);
  }

  async findByUserIdAndCommunityId(
    idUsuario: string,
    idComunidad: string,
  ): Promise<Solicitud> {
    if (idUsuario === null || idUsuario.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    if (idComunidad === null || idComunidad.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    return await this.solicitudesRepository.getByUserIdAndCommunityId(
      idUsuario,
      idComunidad,
    );
  }

  async update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la solicitud no puede ser vacio',
      );
    }

    const solicitud = await this.solicitudesRepository.get(id);

    if (solicitud) {
      const newSolicitud = new Solicitud({
        ...solicitud,
        ...updateSolicitudDto,
      });

      return await this.solicitudesRepository.update(id, newSolicitud);
    }
  }

  async remove(id: string): Promise<Solicitud> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la solicitud no puede ser vacio',
      );
    }

    return await this.solicitudesRepository.delete(id);
  }
}
