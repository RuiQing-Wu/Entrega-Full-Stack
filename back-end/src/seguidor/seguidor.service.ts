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
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<UsuarioSeguimiento[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<UsuarioSeguimiento> {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateSeguidorDto: UpdateSeguidorDto) {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<UsuarioSeguimiento> {
    throw new Error('Method not implemented.');
  }
}
