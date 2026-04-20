import { Controller, Get, Post, Body } from '@nestjs/common';
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

    if (loginDto.email === 'Sara.Mansouri@test.com' && loginDto.password === 'password123') {
      return {
        success: true,
        message: 'Connexion réussie',
        token: 'fake-jwt-token',
        user: {
          email: loginDto.email,
          name: 'Sara Mansouri'
        }
      };
    }
    
    return {
      success: false,
      message: 'Email ou mot de passe incorrect'
    };
  }
}
