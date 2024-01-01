import { Inject, Injectable } from '@nestjs/common';
import { IAccionService } from './interfaces/accion.service.interface';
import { AccionSolidaria } from './domain/accion_solidaria.domain';
import { CreateAccionDto } from './dto/create-accione.dto';
import { UpdateAccionDto } from './dto/update-accione.dto';
import { AccionesRepository } from './repositories/acciones.repository';

@Injectable()
export class AccionesService extends IAccionService {
  constructor(
    @Inject(AccionesRepository)
    private accionesRepository: AccionesRepository,
  ) {
    super();
  }

  create(createAccionDto: CreateAccionDto): Promise<AccionSolidaria> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<AccionSolidaria[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<AccionSolidaria> {
    throw new Error('Method not implemented.');
  }
  update(id: string, updateAccionDto: UpdateAccionDto) {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<AccionSolidaria> {
    throw new Error('Method not implemented.');
  }
  
}
