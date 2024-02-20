import { Inject, Injectable } from '@nestjs/common';
import { CreateApoyoCausaDto } from './dto/create-apoyo-causa.dto';
import { UpdateApoyoCausaDto } from './dto/update-apoyo-causa.dto';
import { IApoyoCausaService } from './interfaces/apoyo-causa.interface';
import { ApoyoCausaRepository } from './repositories/apoyo-causa.repository';
import { ApoyoCausa } from './domain/apoyo-causa.domain';
import { IllegalArgumentError } from 'src/base/argumentError';

@Injectable()
export class ApoyoCausaServiceImpl implements IApoyoCausaService {
  constructor(
    @Inject(ApoyoCausaRepository)
    private apoyoCausaRepository: ApoyoCausaRepository,
  ) {}

  async create(createApoyoCausaDto: CreateApoyoCausaDto): Promise<ApoyoCausa> {
    const apoyoCausa = new ApoyoCausa(createApoyoCausaDto);
    return await this.apoyoCausaRepository.create(apoyoCausa);
  }

  async findAll(): Promise<ApoyoCausa[]> {
    return await this.apoyoCausaRepository.getAll();
  }

  async findOne(id: string): Promise<ApoyoCausa> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del apoyo no puede ser vacio');
    }

    return await this.apoyoCausaRepository.get(id);
  }

  async findByNumApoyo(numApoyo: number): Promise<ApoyoCausa[]> {
    if (numApoyo === null || numApoyo <= 0) {
      throw new IllegalArgumentError(
        'El numero de apoyo no puede ser vacio o negativo',
      );
    }

    return await this.apoyoCausaRepository.getByNumApoyo(numApoyo);
  }

  async update(id: string, updateApoyoCausaDto: UpdateApoyoCausaDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del apoyo no puede ser vacio');
    }

    const apoyoCausa = await this.apoyoCausaRepository.get(id);

    if (apoyoCausa) {
      const newApoyoCausa = new ApoyoCausa({
        ...apoyoCausa,
        ...updateApoyoCausaDto,
      });

      await this.apoyoCausaRepository.update(id, newApoyoCausa);
      return newApoyoCausa;
    }
  }

  async remove(id: string): Promise<ApoyoCausa> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del apoyo no puede ser vacio');
    }

    return await this.apoyoCausaRepository.delete(id);
  }

  async apoyar(id: string): Promise<ApoyoCausa> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del apoyo no puede ser vacio');
    }

    const apoyoCausa = await this.apoyoCausaRepository.get(id);
    return await this.apoyoCausaRepository.apoyar(id);
  }
}
