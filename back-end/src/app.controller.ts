import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

}
