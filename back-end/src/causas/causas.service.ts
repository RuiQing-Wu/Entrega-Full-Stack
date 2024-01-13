import { Inject, Injectable } from '@nestjs/common';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { ICausasService } from './interfaces/causas.service.interface';
import { CausaSolidaria } from './domain/causa_solidaria.domain';
import { CausasRepository } from './repositories/causas.repository';

@Injectable()
export class CausasServiceImpl implements ICausasService {
  constructor(
    @Inject(CausasRepository)
    private causasRepository: CausasRepository,
  ) {

  }

  create(createCausaDto: CreateCausaDto): Promise<CausaSolidaria> {
    const causa = new CausaSolidaria(createCausaDto);
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
        ...causa,
        ...updateCausaDto,
      }
    );

    return this.causasRepository.update(id, comunidadActualizada);
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idComunidad: string,
  ): Promise<CausaSolidaria[]> {
    const causas = await this.causasRepository.getByNameInsensitivePartial(
      titulo,
      idComunidad,
    );
    return causas;
  }

  remove(id: string): Promise<CausaSolidaria> {
    return this.causasRepository.delete(id);
  }
}
