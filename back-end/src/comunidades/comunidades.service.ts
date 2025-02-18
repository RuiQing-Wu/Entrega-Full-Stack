import { Inject, Injectable } from '@nestjs/common';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { Comunidad } from '../comunidades/domain/comunidades.domain';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
import { ComunidadesRepository } from './repositories/comunidades.repository';
import { ConflictError } from 'src/base/conflictError';
import { IllegalArgumentError } from 'src/base/argumentError';
import { EntityNotFoundError } from 'src/base/entityNotFounError';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE } from 'src/nats/nats.clients';

@Injectable()
export class ComunidadesServiceImpl implements IComunidadesService {
  constructor(
    @Inject(ComunidadesRepository)
    private comunidadesRepository: ComunidadesRepository,
    @Inject('NATS_SERVICE') private client: ClientProxy
  ) {}

  async create(createComunidadDto: CreateComunidadDto) {
    // comprobamos que no exista una comunidad con el mismo nombre
    let comunidadExistente;
    try {
      comunidadExistente = await this.comunidadesRepository.getByName(
        createComunidadDto.nombre,
      );
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        comunidadExistente = null;
      }
    }

    if (comunidadExistente) {
      throw new ConflictError('Existe ya una comunidad con este nombre');
    }

    const usuariosArray = Array.isArray(createComunidadDto.usuarios)
      ? createComunidadDto.usuarios
      : [];

    createComunidadDto.usuarios = [
      createComunidadDto.idAdministrador,
      ...usuariosArray,
    ];

    // creamos un objeto del dominio a partir del DTO
    const comunidad = new Comunidad({
      ...createComunidadDto,
      usuarios: createComunidadDto.usuarios,
    });

    const comunidadCreada = await this.comunidadesRepository.create(comunidad);
    if (comunidadCreada) {
      console.log('Emitiendo evento de comunidad creada');
      this.client.emit(SERVICE.COMUNIDAD_MODULE, comunidadCreada);
    }
    return comunidadCreada
  }

  async getByName(nombre: string): Promise<Comunidad> {
    if (nombre === null || nombre.trim() === '') {
      throw new IllegalArgumentError(
        'El nombre de la comunidad no puede ser vacio',
      );
    }

    return await this.comunidadesRepository.getByName(nombre);
  }

  async getByYear(year: number): Promise<Comunidad[]> {
    if (year === null) {
      throw new IllegalArgumentError('El año no puede ser vacio');
    }

    return await this.comunidadesRepository.getByYear(year);
  }

  async getByNameInsensitivePartial(nombre: string): Promise<Comunidad[]> {
    if (nombre === null || nombre.trim() === '') {
      throw new IllegalArgumentError(
        'El nombre de la comunidad no puede ser vacio',
      );
    }

    return await this.comunidadesRepository.getByNameInsensitivePartial(nombre);
  }

  async findAll() {
    return await this.comunidadesRepository.getAll();
  }

  async getByCategoryInsensitivePartial(categoria: string) {
    if (categoria === null || categoria.trim() === '') {
      throw new IllegalArgumentError(
        'El nombre de la comunidad no puede ser vacio',
      );
    }

    return await this.comunidadesRepository.getByCategoryInsensitivePartial(
      categoria,
    );
  }

  async findOne(id: string) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    return await this.comunidadesRepository.get(id);
  }

  async update(id: string, updateComunidadDto: UpdateComunidadDto) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    const comunidad = await this.comunidadesRepository.get(id);

    const comunidadActualizada = new Comunidad({
      ...comunidad,
      ...updateComunidadDto,
    });

    return await this.comunidadesRepository.update(id, comunidadActualizada);
  }

  async addMember(idComunidad: string, idUsuario: string) {
    if (idComunidad === null || idComunidad.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    if (idUsuario === null || idUsuario.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    const comunidad = await this.comunidadesRepository.get(idComunidad);

    if (comunidad.usuarios.includes(idUsuario)) {
      throw new IllegalArgumentError(
        'El usuario ya es miembro de la comunidad',
      );
    }

    const comunidadActualizada = {
      ...comunidad,
      usuarios: [...comunidad.usuarios, idUsuario],
    };

    return await this.comunidadesRepository.update(
      idComunidad,
      comunidadActualizada,
    );
  }

  async getComunidadesByUser(idUsuario: string) {
    if (idUsuario === null || idUsuario.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    return await this.comunidadesRepository.getComunidadesByUser(idUsuario);
  }

  async removeMember(idComunidad: string, idUsuario: string) {
    if (idComunidad === null || idComunidad.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    if (idUsuario === null || idUsuario.trim() === '') {
      throw new IllegalArgumentError('El id del usuario no puede ser vacio');
    }

    const comunidad = await this.comunidadesRepository.get(idComunidad);

    if (!comunidad.usuarios.includes(idUsuario)) {
      throw new IllegalArgumentError(
        'El usuario no es miembro de la comunidad',
      );
    }

    const comunidadActualizada = {
      ...comunidad,
      usuarios: comunidad.usuarios.filter((usuario) => usuario !== idUsuario),
    };

    return await this.comunidadesRepository.update(
      idComunidad,
      comunidadActualizada,
    );
  }

  async remove(id: string) {
    if (id === null || id.trim() === '') {
      throw new IllegalArgumentError(
        'El id de la comunidad no puede ser vacio',
      );
    }

    return await this.comunidadesRepository.delete(id);
  }
}
