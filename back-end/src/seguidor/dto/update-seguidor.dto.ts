import { PartialType } from '@nestjs/swagger';
import { CreateSeguidorDto } from './create-seguidor.dto';

export class UpdateSeguidorDto extends PartialType(CreateSeguidorDto) {}
