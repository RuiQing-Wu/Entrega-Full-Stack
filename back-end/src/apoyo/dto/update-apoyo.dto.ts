import { PartialType } from '@nestjs/swagger';
import { CreateApoyoDto } from './create-apoyo.dto';

export class UpdateApoyoDto extends PartialType(CreateApoyoDto) {}
