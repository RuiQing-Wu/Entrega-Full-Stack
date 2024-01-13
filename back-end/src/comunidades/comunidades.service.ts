import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { Comunidad } from '../comunidades/domain/comunidades.domain';
import { IComunidadesService } from './interfaces/comunidades.service.interface';
import { ComunidadesRepository } from './repositories/comunidades.repository';
@Injectable()
export class ComunidadesServiceImpl implements IComunidadesService {
  constructor(
    @Inject(ComunidadesRepository)
    private comunidadesRepository: ComunidadesRepository,
  ) {}

  async create(createComunidadDto: CreateComunidadDto) {
    // comprobamos que no exista una comunidad con el mismo nombre
    const comunidadExistente = await this.comunidadesRepository.getByName(
      createComunidadDto.nombre,
    );

    console.log(comunidadExistente);

    if (comunidadExistente) {
      throw new ConflictException('¡Existe una comunidad con ese nombre!');
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
      nombre: createComunidadDto.nombre,
      descripcion: createComunidadDto.descripcion,
      fechaInicio: createComunidadDto.fechaInicio,
      idAdministrador: createComunidadDto.idAdministrador,
      usuarios: createComunidadDto.usuarios,
    });

    return this.comunidadesRepository.create(comunidad);
  }

  async getByName(nombre: string): Promise<Comunidad> {
    const comunidad = await this.comunidadesRepository.getByName(nombre);
    return comunidad;
  }

  async getByNameInsensitivePartial(nombre: string): Promise<Comunidad[]> {
    const comunidades =
      await this.comunidadesRepository.getByNameInsensitivePartial(nombre);
    return comunidades;
  }

  findAll() {
    return this.comunidadesRepository.getAll();
  }

  findOne(id: string) {
    return this.comunidadesRepository.get(id);
  }

  async update(id: string, updateComunidadDto: UpdateComunidadDto) {
    // recupera la comunidad
    const comunidad = await this.comunidadesRepository.get(id);

    // creamos un objeto del dominio combinado con el DTO
    const comunidadActualizada = new Comunidad({
      id: comunidad.id,
      nombre: updateComunidadDto.nombre ?? comunidad.nombre,
      descripcion: updateComunidadDto.descripcion ?? comunidad.descripcion,
      fechaInicio: updateComunidadDto.fechaInicio ?? comunidad.fechaInicio,
      idAdministrador:
        updateComunidadDto.idAdministrador ?? comunidad.idAdministrador,
      usuarios: updateComunidadDto.usuarios ?? comunidad.usuarios,
    });

    return this.comunidadesRepository.update(id, comunidadActualizada);
  }

  async addMember(
    idComunidad: string,
    idUsuario: string,
    updateComunidadDto: UpdateComunidadDto,
  ) {
    const comunidad = await this.comunidadesRepository.get(idComunidad);

    const comunidadActualizada = {
      ...comunidad,
      descripcion: updateComunidadDto.descripcion,
      fechaInicio: updateComunidadDto.fechaInicio,
      idAdministrador: updateComunidadDto.idAdministrador,
      usuarios: [...comunidad.usuarios, idUsuario],
    };

    return this.comunidadesRepository.addMember(idComunidad, idUsuario);
  }

  async getComunidadesByUser(idUsuario: string) {
    return this.comunidadesRepository.getComunidadesByUser(idUsuario);
  }

  remove(id: string) {
    return this.comunidadesRepository.delete(id);
  }
}
