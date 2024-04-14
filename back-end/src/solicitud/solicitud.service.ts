import { Inject, Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud-estado.dto';
import { SolicitudesRepository } from './repositories/solicitudes.repository';
import { ISolicitudesService } from './interfaces/solicitudes.service.interface';
import { Solicitud } from './domain/solicitud.domain';
import { IllegalArgumentError } from 'src/base/argumentError';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE } from 'src/nats/nats.clients';

@Injectable()
export class SolicitudServiceImpl extends ISolicitudesService {
  constructor(
    @Inject(SolicitudesRepository)
    private solicitudesRepository: SolicitudesRepository,
    @Inject('NATS_SERVICE') private client: ClientProxy
  ) {
    super();
  }

  async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    const solicitud = new Solicitud(createSolicitudDto);
    const solicitudCreada = await this.solicitudesRepository.create(solicitud);
    if (solicitudCreada) {
      console.log('Emitiendo evento de solicitud creada');
      this.client.emit(SERVICE.SOLICITUD_MODULE, solicitudCreada);
    }

    return solicitudCreada;
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

  @Cron(CronExpression.EVERY_10_MINUTES)
  async revisarSolicitudesVencidas() {
    const solicitudes = await this.findAll();
    const fechaActual = new Date();
    const limiteTiempo = 7 * 24 * 60 * 60 * 1000;

    for (const solicitud of solicitudes) {
      const fechaSolicitud = new Date(solicitud.fechaSolicitud);
      const fechaLimite = new Date(fechaSolicitud.getTime() + limiteTiempo);

      if (fechaActual > fechaLimite && solicitud.estado === 'pendiente') {
        const solicitudUpdateDto = new UpdateSolicitudDto('rechazada');

        try {
          await this.update(solicitud.id, solicitudUpdateDto);
        } catch (error) {
          throw new Error('Error al actualizar la solicitud');
        }
      }
    }
  }
}
