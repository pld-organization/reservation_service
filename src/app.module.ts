// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservation/reservation.module'; // ✅ now exists

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Itachi12',
      database: 'reservation_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // ✅ must include schedule.entity.ts
      synchronize: true,
    }),
    ReservationModule, // ✅ import your module
  ],
})
export class AppModule {}