import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  getPeticionLogin(@Res() response,): string {
    return response.status(201).json({
      message: 'Student has been created successfully'});
  }
}
