import { PartialType } from '@nestjs/swagger';
import { CreateContribucionDto } from './create-contribucion.dto';

export class UpdateContribucionDto extends PartialType(CreateContribucionDto) {}