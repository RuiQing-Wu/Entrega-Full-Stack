import { PartialType } from '@nestjs/swagger';
import { CreateApoyoRegistroDto } from './create-apoyo.dto';

export class UpdateApoyoRegistroDto extends PartialType(CreateApoyoRegistroDto) {}
