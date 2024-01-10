import { PartialType } from '@nestjs/swagger';
import { CreateApoyoCausaDto } from './create-apoyo-causa.dto';

export class UpdateApoyoCausaDto extends PartialType(CreateApoyoCausaDto) {}
