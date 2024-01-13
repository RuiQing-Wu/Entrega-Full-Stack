import { Inject, Injectable } from '@nestjs/common';
import { IAccionService } from './interfaces/accion.service.interface';
import { AccionSolidaria } from './domain/accion_solidaria.domain';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { AccionesRepository } from './repositories/acciones.repository';

@Injectable()
export class AccionesServiceImpl implements IAccionService {
  constructor(
    @Inject(AccionesRepository)
    private accionesRepository: AccionesRepository,
  ) {
  }

  create(createAccionDto: CreateAccionDto): Promise<AccionSolidaria> {
    const accion = new AccionSolidaria(createAccionDto);

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
      ...accion,
      ...updateAccionDto,
    });

    return this.accionesRepository.update(id, accionActualizada);
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idCausa: string,
  ): Promise<AccionSolidaria[]> {
    const causas = await this.accionesRepository.getByNameInsensitivePartial(
      titulo,
      idCausa,
    );
    return causas;
  }

  remove(id: string): Promise<AccionSolidaria> {
    return this.accionesRepository.delete(id);
  }
}
