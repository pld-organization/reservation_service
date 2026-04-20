import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')  
  async login(@Body() loginDto: { email: string; password: string }) {

    return { message: 'Login endpoint', ...loginDto };
  }
}
