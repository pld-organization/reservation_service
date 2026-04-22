import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './reservation.entity';
import { docschedule } from './schedule.entity';
import { DailyService } from '../services/jitsi.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, docschedule])],
  controllers: [ReservationController],
  providers: [ReservationService, JitsiService],
  exports: [ReservationService, DailyService],
})
export class ReservationModule {}
