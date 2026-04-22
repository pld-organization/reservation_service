import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { docschedule } from './schedule.entity';
import { JitsiService } from '../services/jitsi.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, docschedule])],
  controllers: [ReservationController],
  providers: [ReservationService, JitsiService],
})
export class ReservationModule {}
