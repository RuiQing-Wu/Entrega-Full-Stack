import { Inject, Injectable } from '@nestjs/common';
import { CreateApoyoRegistroDto } from './dto/create-apoyo-registro.dto';
import { UpdateApoyoRegistroDto } from './dto/update-apoyo-registro.dto';
import { IApoyoRegistroService } from './interfaces/apoyo-registro.service.interface';
import { ApoyoRegistro } from './domain/apoyo-registro.damain';
import { ApoyoRegistroRepository } from './repositories/apoyo-registro.reposiroty';

@Injectable()
export class ApoyoRegistroServiceImpl implements IApoyoRegistroService {
  constructor(
    @Inject(ApoyoRegistroRepository)
    private apoyoRegistroRepository: ApoyoRegistroRepository,
  ) {
  }

  create(CreateApoyoDto: CreateApoyoRegistroDto): Promise<ApoyoRegistro> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ApoyoRegistro[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<ApoyoRegistro> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateCausaDto: UpdateApoyoRegistroDto) {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<ApoyoRegistro> {
    throw new Error('Method not implemented.');
  }

}
