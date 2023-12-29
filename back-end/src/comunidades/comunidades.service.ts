import { Inject, Injectable } from '@nestjs/common';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { IGenericRepository } from 'src/base/generic.repository';
import {
  Comunidad,
  CausaSolidaria,
} from '../comunidades/domain/comunidades.domain';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
import { CreateCausaDto } from './dto/create-causa.dto';

@Injectable()
export class ComunidadesServiceImpl extends IComunidadesService {
  constructor(
    @Inject(IGenericRepository<Comunidad>)
    private comunidadesRepository: IGenericRepository<Comunidad>,
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

  /*async addCausa(id: string, causa: CreateCausaDto): Promise<Comunidad> {
    const comunidad = await this.comunidadesRepository.get(id);
    comunidad.causas.push(new CausaSolidaria(causa));

    await this.comunidadesRepository.update(id, comunidad);
    return comunidad;
  }*/
}
