import { Inject, Injectable } from '@nestjs/common';
import { CreateApoyoRegistroDto } from './dto/create-apoyo-registro.dto';
import { UpdateApoyoRegistroDto } from './dto/update-apoyo-registro.dto';
import { IApoyoRegistroService } from './interfaces/apoyo-registro.service.interface';
import { ApoyoRegistro } from './domain/apoyo-registro.damain';
import { ApoyoRegistroRepository } from './repositories/apoyo-registro.repository';

@Injectable()
export class ApoyoRegistroServiceImpl implements IApoyoRegistroService {
  constructor(
    @Inject(ApoyoRegistroRepository)
    private apoyoRegistroRepository: ApoyoRegistroRepository,
  ) {
  }
  
  create(CreateApoyoDto: CreateApoyoRegistroDto): Promise<ApoyoRegistro> {
    const apoyoRegistro = new ApoyoRegistro(CreateApoyoDto);
    return this.apoyoRegistroRepository.create(apoyoRegistro);
  }

  findOne(id: string): Promise<ApoyoRegistro> {
    return this.apoyoRegistroRepository.get(id);
  }

  findAll(): Promise<ApoyoRegistro[]> {
    return this.apoyoRegistroRepository.getAll();
  }

  async update(id: string, updateCausaDto: UpdateApoyoRegistroDto) {
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

  remove(id: string): Promise<ApoyoRegistro> {
    return this.apoyoRegistroRepository.delete(id);
  }

}
