import { PartialType } from '@nestjs/swagger';
import { CreateAccionDto } from './create-accione.dto';

export class UpdateAccionDto extends PartialType(CreateAccionDto) {}
