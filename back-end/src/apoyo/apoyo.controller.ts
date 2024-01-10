import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { IApoyoService } from './interfaces/apoyo.interface';
import { Public } from 'src/decorators/public.decorator';

@Controller('apoyo')
export class ApoyoController {
  constructor(private readonly apoyoService: IApoyoService) {}

  @Public()
  @Post(':idComunidad/:idCausa')
  incrementar(@Param('idComunidad') idComunidad: string, @Param('idCausa') idCausa: string) {
    return this.apoyoService.incr(idComunidad, idCausa);
  }

  @Public()
  @Get(':idComunidad/:idCausa')
  find(@Param('idComunidad') idComunidad: string, @Param('idCausa') idCausa: string) {
    return this.apoyoService.get(idComunidad, idCausa);
  }

  @Public()
  @Delete(':idComunidad/:idCausa')
  remove(@Param('idComunidad') idComunidad: string, @Param('idCausa') idCausa: string) {
    return this.apoyoService.delete(idComunidad, idCausa);
  }
}
