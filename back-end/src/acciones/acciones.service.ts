import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IAccionService } from './interfaces/accion.service.interface';
import { AccionSolidaria } from './domain/accion_solidaria.domain';
import { CreateAccionDto } from './dto/create-accion.dto';
import { UpdateAccionDto } from './dto/update-accion.dto';
import { AccionesRepository } from './repositories/acciones.repository';
import { EntityNotFoundError } from '../base/entityNotFounError';
import { IllegalArgumentError } from '../base/argumentError';
import { RepositoryError } from '../base/repositoryError';

@Injectable()
export class AccionesServiceImpl implements IAccionService {
  constructor(
    @Inject(AccionesRepository)
    private accionesRepository: AccionesRepository,
  ) {
  }

  async create(createAccionDto: CreateAccionDto): Promise<AccionSolidaria> {
    const accion = new AccionSolidaria(createAccionDto);
    return await this.accionesRepository.create(accion);
  }

  async getByName(nombre: string): Promise<AccionSolidaria> {
    if (nombre == null || nombre.trim() === '') {
      throw new IllegalArgumentError('El nombre de la accion solidaria no puede ser vacio');
    }

    const accionSolidaria = await this.accionesRepository.getByName(nombre);
    return accionSolidaria;
  }

  async getByCausaId(causa: string): Promise<AccionSolidaria[]> {
    if (causa === null || causa.trim() === '') {
      throw new IllegalArgumentError('El id de la causa no puede ser vacio');
    }

    return await this.accionesRepository.getByCausaId(causa);
  }

  async findAll(): Promise<AccionSolidaria[]> {
    return await this.accionesRepository.getAll();
  }

  async findOne(id: string): Promise<AccionSolidaria> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id de la accion solidaria no puede ser vacio');
    }

    const accion = await this.accionesRepository.get(id);
    return accion;
  }

  async update(id: string, updateAccionDto: UpdateAccionDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id de la accion solidaria no puede ser vacio');
    }

    const accion = await this.accionesRepository.get(id);

    // creamos un objeto del dominio combinado con el DTO
    const accionActualizada = new AccionSolidaria({
      ...accion,
      ...updateAccionDto,
    });

    return await this.accionesRepository.update(id, accionActualizada);
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idCausa: string,
  ): Promise<AccionSolidaria[]> {

    if (titulo === null || titulo.trim() === '') {
      throw new IllegalArgumentError('El titulo de la accion solidaria no puede ser vacio');
    }

    if (idCausa === null || idCausa.trim() === '') {
      throw new IllegalArgumentError('El id de la causa no puede ser vacio');
    }

    const acciones = await this.accionesRepository.getByNameInsensitivePartial(
      titulo,
      idCausa,
    );

    return acciones;
  }

  async remove(id: string): Promise<AccionSolidaria> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id de la accion solidaria no puede ser vacio');
    }

    const accion = await this.accionesRepository.delete(id);
    return accion;
  }
}
