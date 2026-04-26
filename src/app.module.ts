import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import registerAs from './config/mysql.config';
import { Reservation } from './reservation/reservation.entity';
import { docschedule } from './reservation/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerAs],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('mysql.url');
        console.log('DB URL:', url);
        if (!url) throw new Error('MYSQL_PUBLIC_URL is not defined!');
        return {
          type: 'mysql',
          url,
          entities: [Reservation, docschedule],
          synchronize: true,
        };
      },
    }),
    ReservationModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
