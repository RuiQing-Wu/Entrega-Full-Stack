import { Inject, Injectable } from '@nestjs/common';
import { CreateApoyoRegistroDto } from './dto/create-apoyo.dto';
import { UpdateApoyoRegistroDto } from './dto/update-apoyo.dto';
import { IApoyoRegistroService } from './interfaces/apoyo.service.interface';
import { ApoyoRegistro } from './domain/apoyo.damain';
import { ApoyoRegistroRepository } from './repositories/apoyos.reposiroty';

@Injectable()
export class RegistroApoyoServiceImpl extends IApoyoRegistroService {

  constructor(
    @Inject(ApoyoRegistroRepository)
    private apoyoRegistroRepository: ApoyoRegistroRepository,
  ) {
    super();
  }

  create(CreateApoyoDto: CreateApoyoRegistroDto): Promise<ApoyoRegistro> {
    const apoyoRegistro = new ApoyoRegistro(CreateApoyoDto);
    return this.apoyoRegistroRepository.create(apoyoRegistro);
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
