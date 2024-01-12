import { Inject, Injectable } from '@nestjs/common';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { ISeguidorService } from './interfaces/seguidor.service.interface';
import { UsuarioSeguimiento } from './domain/usuario_seguimiento';
import { SeguidorRepository } from './repositories/seguidor.repository';

@Injectable()
export class SeguidorServiceImpl implements ISeguidorService {
  constructor(
    @Inject(SeguidorRepository)
    private seguidorRepository: SeguidorRepository,
  ) {
  }
  
  create(createSeguidorDto: CreateSeguidorDto): Promise<UsuarioSeguimiento> {
    const seguidor = new UsuarioSeguimiento(createSeguidorDto);
    return this.seguidorRepository.create(seguidor);
  }

  findAll(): Promise<UsuarioSeguimiento[]> {
    return this.seguidorRepository.getAll();
  }

  findOne(id: string): Promise<UsuarioSeguimiento> {
    return this.seguidorRepository.get(id);
  }

  async update(id: string, updateSeguidorDto: UpdateSeguidorDto) {
    const seguidor = await this.seguidorRepository.get(id);
    
    if (seguidor) {
      const newSeguidor = new UsuarioSeguimiento({
        ...seguidor,
        ...updateSeguidorDto,
      });

      return this.seguidorRepository.update(id, newSeguidor);
    }
  }

  remove(id: string): Promise<UsuarioSeguimiento> {
    return this.seguidorRepository.delete(id);
  }

  seguir(createSeguidorDto: CreateSeguidorDto[]): Promise<UsuarioSeguimiento> {
    const seguidorOrigen = new UsuarioSeguimiento(createSeguidorDto[0]);
    const seguidorDestino = new UsuarioSeguimiento(createSeguidorDto[1]);
    return this.seguidorRepository.seguir(seguidorOrigen, seguidorDestino);
  }
}
