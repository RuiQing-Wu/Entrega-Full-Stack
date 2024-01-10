import { Inject, Injectable } from '@nestjs/common';
import { CreateApoyoCausaDto } from './dto/create-apoyo-causa.dto';
import { UpdateApoyoCausaDto } from './dto/update-apoyo-causa.dto';
import { IApoyoCausaService } from './interfaces/apoyo-causa.interface';
import { ApoyoCausaRepository } from './repositories/apoyo-causa.repository';
import { ApoyoCausa } from './domain/apoyo-causa.domain';

@Injectable()
export class ApoyoCausaServiceImpl implements IApoyoCausaService {
  constructor(
    @Inject(ApoyoCausaRepository)
    private apoyoCausaRepository: ApoyoCausaRepository,
  ) { }
  
  create(createApoyoCausaDto: CreateApoyoCausaDto) : Promise<ApoyoCausa>{
    // this.apoyoCausaRepository.create(createApoyoCausaDto);
    return null;
  }

  findAll() {
    return null;
  }

  findOne(id: string) {
    return null;
  }

  update(id: string, updateApoyoCausaDto: UpdateApoyoCausaDto) {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<ApoyoCausa> {
    throw new Error('Method not implemented.');
  }

  get(prefix: string, key: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  incr(prefix: string, key: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  delete(prefix: string, key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
