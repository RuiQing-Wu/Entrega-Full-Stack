import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const accion = new AccionSolidaria(createAccionDto);

      return this.accionesRepository.create(accion);
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear la accion solidaria');
    }

  }

  getByName(nombre: string): Promise<AccionSolidaria> {
    try{
      return this.accionesRepository.getByName(nombre);
    }
    catch(error){
      console.log(error);
      throw new Error('Error al obtener la accion solidaria');
    }
  }

  getByCausaId(causa: string): Promise<AccionSolidaria[]> {
    try{
      return this.accionesRepository.getByCausaId(causa);
    }
    catch(error){
      console.log(error);
      throw new Error('Error al obtener la accion solidaria');
    }
  }

  findAll(): Promise<AccionSolidaria[]> {
    try {
      return this.accionesRepository.getAll();
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener las acciones solidarias');
    }
  }

  findOne(id: string): Promise<AccionSolidaria> {
    try {
      return this.accionesRepository.get(id);
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener la accion solidaria');
    }
  }

  async update(id: string, updateAccionDto: UpdateAccionDto) {
    try {
      const accion = await this.accionesRepository.get(id);

      // creamos un objeto del dominio combinado con el DTO
      const accionActualizada = new AccionSolidaria({
        ...accion,
        ...updateAccionDto,
      });

      return this.accionesRepository.update(id, accionActualizada);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error al actualizar la accion solidaria');
    }
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idCausa: string,
  ): Promise<AccionSolidaria[]> {
    try{
      const causas = await this.accionesRepository.getByNameInsensitivePartial(
        titulo,
        idCausa,
      );
      return causas;
    }catch(error){
      console.log(error);
      throw new Error('Error al obtener la accion solidaria');
    }
  }

  remove(id: string): Promise<AccionSolidaria> {
    try {
      return this.accionesRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new Error('Error al eliminar la accion solidaria');
    }
  }
}
