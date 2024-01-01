import { PartialType } from '@nestjs/swagger';
import { CreateCausaDto } from './create-causa.dto';

export class UpdateCausaDto extends PartialType(CreateCausaDto) {}
