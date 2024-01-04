import { Inject, Injectable } from '@nestjs/common';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { ICausasService } from './interfaces/causas.service.interface';
import { CausaSolidaria } from './domain/causa_solidaria.domain';
import { CausasRepository } from './repositories/causas.repository';

@Injectable()
export class CausasService extends ICausasService{
  

  constructor(
    @Inject(CausasRepository)
    private causasRepository: CausasRepository,
  ) {
    super();
  }

  create(createCausaDto: CreateCausaDto): Promise<CausaSolidaria> {
    const causa = new CausaSolidaria({
      titulo: createCausaDto.titulo,
      descripcion: createCausaDto.descripcion,
      fechaInicio: createCausaDto.fechaInicio,
      fechaFin: createCausaDto.fechaFin,
      accionSolidaria: [],
      comunidad: createCausaDto.comunidad,
      categorias: createCausaDto.categorias,
    });

    return this.causasRepository.create(causa);
  }

  findAll(): Promise<CausaSolidaria[]> {
    return this.causasRepository.getAll();
  }

  findOne(id: string): Promise<CausaSolidaria> {
    return this.causasRepository.get(id);
  }

  getByName(titulo: string): Promise<CausaSolidaria[]> {
    return this.causasRepository.getByName(titulo);
  }

  getByComunidadId(comunidad: string): Promise<CausaSolidaria[]> {
    return this.causasRepository.getByComunidadId(comunidad);
  }

  async update(id: string, updateCausaDto: UpdateCausaDto) {
    const causa = await this.causasRepository.get(id);

    // creamos un objeto del dominio combinado con el DTO
    const comunidadActualizada = new CausaSolidaria({
      id: causa.id,
      titulo: updateCausaDto.titulo ?? causa.titulo,
      descripcion: updateCausaDto.descripcion ?? causa.descripcion,
      fechaInicio: updateCausaDto.fechaInicio ?? causa.fechaInicio,
      fechaFin: updateCausaDto.fechaFin ?? causa.fechaFin,
      accionSolidaria: updateCausaDto.acciones ?? causa.acciones,
      comunidad: updateCausaDto.comunidad ?? causa.comunidad,
      categorias: updateCausaDto.categorias ?? causa.categorias,
    });

    return this.causasRepository.update(id, comunidadActualizada);
  }

  remove(id: string): Promise<CausaSolidaria> {
    throw new Error('Method not implemented.');
  }
}
