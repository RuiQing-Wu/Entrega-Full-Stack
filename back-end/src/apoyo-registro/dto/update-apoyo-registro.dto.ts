import { PartialType } from '@nestjs/swagger';
import { CreateApoyoRegistroDto } from './create-apoyo-registro.dto';

export class UpdateApoyoRegistroDto extends PartialType(CreateApoyoRegistroDto) {}
