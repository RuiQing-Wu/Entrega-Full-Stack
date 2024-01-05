import { Inject, Injectable } from '@nestjs/common';
import { IAccionService } from './interfaces/accion.service.interface';
import { AccionSolidaria } from './domain/accion_solidaria.domain';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { AccionesRepository } from './repositories/acciones.repository';

@Injectable()
export class AccionesServiceImpl extends IAccionService {
  constructor(
    @Inject(AccionesRepository)
    private accionesRepository: AccionesRepository,
  ) {
    super();
  }

  create(createAccionDto: CreateAccionDto): Promise<AccionSolidaria> {
    const accion = new AccionSolidaria({
      titulo: createAccionDto.titulo,
      descripcion: createAccionDto.descripcion,
      listaObjetivos: createAccionDto.listaObjetivos,
      progreso: createAccionDto.progreso,
      causa: createAccionDto.causa,
    });

    return this.accionesRepository.create(accion);
  }

  getByName(nombre: string): Promise<AccionSolidaria> {
    return this.accionesRepository.getByName(nombre);
  }

  getByCausaId(causa: string): Promise<AccionSolidaria[]> {
    return this.accionesRepository.getByCausaId(causa);
  }

  findAll(): Promise<AccionSolidaria[]> {
    return this.accionesRepository.getAll();
  }

  findOne(id: string): Promise<AccionSolidaria> {
    return this.accionesRepository.get(id);
  }

  async update(id: string, updateAccionDto: UpdateAccionDto) {
    const accion = await this.accionesRepository.get(id);

    // creamos un objeto del dominio combinado con el DTO
    const accionActualizada = new AccionSolidaria({
      id: accion.id,
      titulo: updateAccionDto.titulo ?? accion.titulo,
      descripcion: updateAccionDto.descripcion ?? accion.descripcion,
      listaObjetivos: updateAccionDto.listaObjetivos ?? accion.listaObjetivos,
      progreso: updateAccionDto.progreso ?? accion.progreso,
      causa: updateAccionDto.causa ?? accion.causa,
    });

    return this.accionesRepository.update(id, accionActualizada);
  }

  remove(id: string): Promise<AccionSolidaria> {
    return this.accionesRepository.delete(id);
  }
}
