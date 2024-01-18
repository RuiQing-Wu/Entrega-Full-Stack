import { Inject, Injectable } from '@nestjs/common';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { ISeguidorService } from './interfaces/seguidor.service.interface';
import { UsuarioSeguimiento } from './domain/usuario_seguimiento';
import { SeguidorRepository } from './repositories/seguidor.repository';
import { IllegalArgumentError } from 'src/base/argumentError';

@Injectable()
export class SeguidorServiceImpl implements ISeguidorService {
  constructor(
    @Inject(SeguidorRepository)
    private seguidorRepository: SeguidorRepository,
  ) { }

  async create(createSeguidorDto: CreateSeguidorDto): Promise<UsuarioSeguimiento> {
    const seguidor = new UsuarioSeguimiento(createSeguidorDto);
    return await this.seguidorRepository.create(seguidor);
  }

  async findAll(): Promise<UsuarioSeguimiento[]> {
    return await this.seguidorRepository.getAll();
  }

  async findOne(id: string): Promise<UsuarioSeguimiento> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    return await this.seguidorRepository.get(id);
  }

  async update(id: string, updateSeguidorDto: UpdateSeguidorDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    const seguidor = await this.seguidorRepository.get(id);

    if (seguidor) {
      const newSeguidor = new UsuarioSeguimiento({
        ...seguidor,
        ...updateSeguidorDto,
      });

      return await this.seguidorRepository.update(id, newSeguidor);
    }
  }

  async remove(id: string): Promise<UsuarioSeguimiento> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    return await this.seguidorRepository.delete(id);
  }

  async seguir(createSeguidorDto: CreateSeguidorDto[]): Promise<UsuarioSeguimiento> {
    if (createSeguidorDto.length !== 2) {
      throw new IllegalArgumentError('La lista de usuarios debe tener dos elementos');
    }

    const seguidorOrigen = new UsuarioSeguimiento(createSeguidorDto[0]);
    const seguidorDestino = new UsuarioSeguimiento(createSeguidorDto[1]);

    return await this.seguidorRepository.seguir(seguidorOrigen, seguidorDestino);
  }

  async getUsuariosSeguidos(id: string): Promise<UsuarioSeguimiento[]> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    return await this.seguidorRepository.getUsuariosSeguidos(id);
  }

  async getUsuariosSeguidores(id: string): Promise<UsuarioSeguimiento[]> {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    return await this.seguidorRepository.getUsuariosSeguidores(id);
  }
}
