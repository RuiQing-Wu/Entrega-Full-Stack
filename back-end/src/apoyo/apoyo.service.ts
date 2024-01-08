import { Injectable } from '@nestjs/common';
import { CreateApoyoDto } from './dto/create-apoyo.dto';
import { UpdateApoyoDto } from './dto/update-apoyo.dto';

@Injectable()
export class ApoyoService {
  create(createApoyoDto: CreateApoyoDto) {
    return 'This action adds a new apoyo';
  }

  findAll() {
    return `This action returns all apoyo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apoyo`;
  }

  update(id: number, updateApoyoDto: UpdateApoyoDto) {
    return `This action updates a #${id} apoyo`;
  }

  remove(id: number) {
    return `This action removes a #${id} apoyo`;
  }
}
