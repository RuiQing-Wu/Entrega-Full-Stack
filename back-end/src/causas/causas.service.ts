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
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<CausaSolidaria[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<CausaSolidaria> {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateCausaDto: UpdateCausaDto) {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<CausaSolidaria> {
    throw new Error('Method not implemented.');
  }
}
