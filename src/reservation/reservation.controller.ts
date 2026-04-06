// reservation.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController { // ✅ class name fixed
  constructor(private readonly reservationService: ReservationService) {} // ✅ match casing

  @Get('docschedule')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async docsched(@Body('did') doctorId: string) {
    return this.reservationService.getReservationsByDoctor(doctorId);
  }

  @Get('checkschedule')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async avbsched(@Body('did') doctorId: string) {
    return this.reservationService.getAvailableHours(doctorId);
  }
}