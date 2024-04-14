import { Inject, Injectable } from '@nestjs/common';
import { CreateApoyoRegistroDto } from './dto/create-apoyo-registro.dto';
import { UpdateApoyoRegistroDto } from './dto/update-apoyo-registro.dto';
import { IApoyoRegistroService } from './interfaces/apoyo-registro.service.interface';
import { ApoyoRegistro } from './domain/apoyo-registro.damain';
import { ApoyoRegistroRepository } from './repositories/apoyo-registro.repository';
import { IllegalArgumentError } from 'src/base/argumentError';
import { SERVICE } from 'src/nats/nats.clients';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApoyoRegistroServiceImpl implements IApoyoRegistroService {
  constructor(
    @Inject(ApoyoRegistroRepository)
    private apoyoRegistroRepository: ApoyoRegistroRepository,
    @Inject('NATS_SERVICE') private client: ClientProxy
  ) {
  }

  async create(CreateApoyoDto: CreateApoyoRegistroDto): Promise<ApoyoRegistro> {
    const apoyoRegistro = new ApoyoRegistro(CreateApoyoDto);
    const apoyoRegistroCreado = await this.apoyoRegistroRepository.create(apoyoRegistro);
    if (apoyoRegistroCreado) {
      console.log('Emitiendo evento de apoyo al registro creado');
      this.client.emit(SERVICE.APOYO_MODULE, apoyoRegistro);
    }
    return apoyoRegistroCreado;
  }

  async findOne(id: string): Promise<ApoyoRegistro> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del apoyo al registro no puede ser vacio');
    }

    return await this.apoyoRegistroRepository.get(id);
  }

  async findAll(): Promise<ApoyoRegistro[]> {
    return await this.apoyoRegistroRepository.getAll();
  }

  async update(id: string, updateCausaDto: UpdateApoyoRegistroDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del apoyo al registro no puede ser vacio');
    }

    const apoyoRegistro = await this.apoyoRegistroRepository.get(id);

    if (apoyoRegistro) {
      const newApoyoRegistro = new ApoyoRegistro({
        ...apoyoRegistro,
        ...updateCausaDto,
      });

      await this.apoyoRegistroRepository.update(id, newApoyoRegistro);
      return newApoyoRegistro;
    }
  }

  async remove(id: string): Promise<ApoyoRegistro> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del apoyo al registro no puede ser vacio');
    }

    return await this.apoyoRegistroRepository.delete(id);
  }
}
