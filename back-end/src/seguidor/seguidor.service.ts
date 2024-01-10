import { Injectable } from '@nestjs/common';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';

@Injectable()
export class SeguidorService {
  create(createSeguidorDto: CreateSeguidorDto) {
    return 'This action adds a new seguidor';
  }

  findAll() {
    return `This action returns all seguidor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seguidor`;
  }

  update(id: number, updateSeguidorDto: UpdateSeguidorDto) {
    return `This action updates a #${id} seguidor`;
  }

  remove(id: number) {
    return `This action removes a #${id} seguidor`;
  }
}
