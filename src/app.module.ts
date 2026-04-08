// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservation/reservation.module'; // ✅ now exists
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import {Reservation} from './reservation/reservation.entity'; 
import {docschedule} from './reservation/schedule.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get<string>('mysql.url'),
        entities: [Reservation, docschedule],
        synchronize: true,
      }),
    }),
    ReservationModule,
  ],
})
export class AppModule {}