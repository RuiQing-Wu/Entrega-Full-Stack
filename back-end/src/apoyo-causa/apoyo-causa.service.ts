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
    const apoyoCausa = new ApoyoCausa(createApoyoCausaDto);
    return this.apoyoCausaRepository.create(apoyoCausa);
  }

  findAll(): Promise<ApoyoCausa[]> {
    return this.apoyoCausaRepository.getAll();
  }

  findOne(id: string): Promise<ApoyoCausa> {
    return this.apoyoCausaRepository.get(id);
  }

  async update(id: string, updateApoyoCausaDto: UpdateApoyoCausaDto) {
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

  remove(id: string): Promise<ApoyoCausa> {
    return this.apoyoCausaRepository.delete(id);
  }

  async apoyar(id: string): Promise<ApoyoCausa> {
    const apoyoCausa = await this.apoyoCausaRepository.get(id);
    
    if (!Number.isNaN(apoyoCausa.numApoyo)) {
      console.log("Apoyar ", apoyoCausa);
      return this.apoyoCausaRepository.apoyar(id);
    }

    return null;
  }
}
