import { Inject, Injectable } from '@nestjs/common';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { ICausasService } from './interfaces/causas.service.interface';
import { CausaSolidaria } from './domain/causa_solidaria.domain';
import { CausasRepository } from './repositories/causas.repository';
import { IllegalArgumentError } from 'src/base/argumentError';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE } from 'src/nats/nats.clients';

@Injectable()
export class CausasServiceImpl implements ICausasService {
  constructor(
    @Inject(CausasRepository)
    private causasRepository: CausasRepository,
    @Inject('NATS_SERVICE') private client: ClientProxy
  ) {}

  async create(createCausaDto: CreateCausaDto): Promise<CausaSolidaria> {
    const causa = new CausaSolidaria(createCausaDto);
    const causaCreada = await this.causasRepository.create(causa);
    if (causaCreada) {
      console.log('Emitiendo evento de causa solidaria creada');
      this.client.emit(SERVICE.CAUSAS_MODULE, causaCreada);
    }
    
    return causaCreada
  }

  async findAll(): Promise<CausaSolidaria[]> {
    return await this.causasRepository.getAll();
  }

  async findOne(id: string): Promise<CausaSolidaria> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id de la causa no puede ser vacio');
    }

    return await this.causasRepository.get(id);
  }

  async getByName(titulo: string): Promise<CausaSolidaria> {
    if (titulo === null || titulo.trim() === '') {
      throw new IllegalArgumentError(
        'El titulo de la causa no puede ser vacio',
      );
    }

    return await this.causasRepository.getByName(titulo);
  }

  async getByComunidadId(comunidad: string): Promise<CausaSolidaria[]> {
    if (comunidad === null || comunidad.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    return await this.causasRepository.getByComunidadId(comunidad);
  }

  async update(id: string, updateCausaDto: UpdateCausaDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id de la causa no puede ser vacio');
    }

    const causa = await this.causasRepository.get(id);

    // creamos un objeto del dominio combinado con el DTO
    const comunidadActualizada = new CausaSolidaria({
      ...causa,
      ...updateCausaDto,
    });

    return await this.causasRepository.update(id, comunidadActualizada);
  }

  async getByNameInsensitivePartial(
    titulo: string,
    idComunidad: string,
  ): Promise<CausaSolidaria[]> {
    if (titulo === null || titulo.trim() === '') {
      throw new IllegalArgumentError(
        'El titulo de la causa no puede ser vacio',
      );
    }
    if (idComunidad === null || idComunidad.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    const causas = await this.causasRepository.getByNameInsensitivePartial(
      titulo,
      idComunidad,
    );
    return causas;
  }

  async remove(id: string): Promise<CausaSolidaria> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id de la causa no puede ser vacio');
    }

    return await this.causasRepository.delete(id);
  }
}
