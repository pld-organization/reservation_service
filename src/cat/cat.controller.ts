import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {

  @Get()
  findAll(): string {
    return 'This returns all cats';
  }

  @Get('hello')
  sayHello(): string {
    return 'Hello from cats controller';
  }

  @Get('luna')
  Hello(): string{
    return 'hey luna i miss you'
  }
 
}