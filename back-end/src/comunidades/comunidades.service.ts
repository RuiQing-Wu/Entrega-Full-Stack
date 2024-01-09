import { Inject, Injectable } from '@nestjs/common';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { Comunidad } from '../comunidades/domain/comunidades.domain';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
import { ComunidadesRepository } from './repositories/comunidades.repository';
@Injectable()
export class ComunidadesServiceImpl extends IComunidadesService {
  constructor(
    @Inject(ComunidadesRepository)
    private comunidadesRepository: ComunidadesRepository,
  ) {
    super();
  }

  create(createComunidadDto: CreateComunidadDto) {
    // creamos un objeto del dominio a partir del DTO
    const comunidad = new Comunidad({
      nombre: createComunidadDto.nombre,
      descripcion: createComunidadDto.descripcion,
      fechaInicio: createComunidadDto.fechaInicio,
      causas: [],
    });

    return this.comunidadesRepository.create(comunidad);
  }

  async getByName(nombre: string): Promise<Comunidad> {
    const comunidad = await this.comunidadesRepository.getByName(nombre);
    return comunidad;
  }

  async getByNameInsensitivePartial(nombre: string): Promise<Comunidad[]> {
    const comunidades =
      await this.comunidadesRepository.getByNameInsensitivePartial(nombre);
    return comunidades;
  }

  findAll() {
    return this.comunidadesRepository.getAll();
  }

  findOne(id: string) {
    return this.comunidadesRepository.get(id);
  }

  async update(id: string, updateComunidadDto: UpdateComunidadDto) {
    // recupera la comunidad
    const comunidad = await this.comunidadesRepository.get(id);

    // creamos un objeto del dominio combinado con el DTO
    const comunidadActualizada = new Comunidad({
      id: comunidad.id,
      nombre: updateComunidadDto.nombre ?? comunidad.nombre,
      descripcion: updateComunidadDto.descripcion ?? comunidad.descripcion,
      fechaInicio: updateComunidadDto.fechaInicio ?? comunidad.fechaInicio,
      causas: updateComunidadDto.causas ?? comunidad.causas,
    });

    return this.comunidadesRepository.update(id, comunidadActualizada);
  }

  remove(id: string) {
    return this.comunidadesRepository.delete(id);
  }
}
