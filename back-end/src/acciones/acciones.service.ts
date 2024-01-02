import { Inject, Injectable } from '@nestjs/common';
import { IAccionService } from './interfaces/accion.service.interface';
import { AccionSolidaria } from './domain/accion_solidaria.domain';
import { CreateAccionDto } from './dto/create-accione.dto';
import { UpdateAccionDto } from './dto/update-accione.dto';
import { AccionesRepository } from './repositories/acciones.repository';

@Injectable()
export class AccionesService extends IAccionService {
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
      listaObjetivos: [],
    });

    return this.accionesRepository.create(accion);
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
    });

    return this.accionesRepository.update(id, accionActualizada);
  }
  
  remove(id: string): Promise<AccionSolidaria> {
    throw new Error('Method not implemented.');
  }
  
}
