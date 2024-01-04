import { PartialType } from '@nestjs/swagger';
import { CreateAccionDto } from './create-accion.dto';

export class UpdateAccionDto extends PartialType(CreateAccionDto) {}
