import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  //@ApiResponseOK({ description: 'Hello world' })
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

}
