import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cat/cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { reservation } from './reservation/reservation.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, reservation],
  providers: [AppService],
})
export class AppModule {}
