import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Public } from './auth/public.decorator';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('/login')
  getPeticionLogin(@Res() response,): string {
    return response.status(201).json({
      message: 'Student has been created successfully'
    });
  }
}
