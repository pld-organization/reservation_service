// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservation/reservation.module'; // ✅ now exists
import { ConfigModule, ConfigService } from '@nestjs/config';
import registerAs from './config/mysql.config';
import {Reservation} from './reservation/reservation.entity'; 
import {docschedule} from './reservation/schedule.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerAs],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('mysql.host'),
        port: configService.get<number>('mysql.port'),
        username: configService.get<string>('mysql.username'),
        password: configService.get<string>('mysql.password'),
        database: configService.get<string>('mysql.database'),
        entities: [Reservation, docschedule],
        synchronize: true,
      }),
    }),
    ReservationModule,
  ],
})
export class AppModule {}