import { PartialType } from '@nestjs/swagger';
import { CreateComunidadDto } from './create-comunidad.dto';

export class UpdateComunidadDto extends PartialType(CreateComunidadDto) {}
