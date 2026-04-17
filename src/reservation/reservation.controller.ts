// reservation.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReservationService } from './reservation.service';
import { DAY } from 'src/common/days.enum';
import { TYPE } from 'src/common/type.enum';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Create a new reservation (patient books an appointment)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)

  async createReservation(
    @Body('doctorId') doctorId: string,
    @Body('patientId') patientId: string,
    @Body('reservationDay') reservationDay: DAY,
    @Body('reservationTime') reservationTime: string,
    @Body('reason') reason: string,
  ) {
    return this.reservationService.createReservation({
      doctorId,
      patientId,
      reservationDay,
      reservationTime,
      reason,
      reservationStatus: true,
    });
  }

  // Create doctor's work schedule/timeline
  @Post('create-schedule')
  @HttpCode(HttpStatus.CREATED)
  async createWorkTimeline(
    @Body('doctorId') doctorId: string,
    @Body('dayOfWeek') dayOfWeek: DAY,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
    @Body('appointmenttype') appointmenttype: TYPE,
  ) {
    return this.reservationService.create_work_timeline({
      doctorId,
      dayOfWeek,
      startTime,
      endTime,
      appointmenttype,
    });
  }

  // Get all reservations for a specific doctor
  @Get('doctor/:doctorId')
  @HttpCode(HttpStatus.OK)

  async getReservationsByDoctor(
    @Param('doctorId') doctorId: string,
  ) {
    return this.reservationService.getReservationsByDoctor(doctorId);
  }

  // Get all reservations for a specific patient
  @Get('patient/:patientId')
  @HttpCode(HttpStatus.OK)

  async getReservationsByPatient(
    @Param('patientId') patientId: string,
  ) {
    return this.reservationService.getReservationsByPatient(patientId);
  }

  // Get available time slots for a doctor
  @Get('available/:doctorId')
  @HttpCode(HttpStatus.OK)

  async getAvailableHours(
    @Param('doctorId') doctorId: string,
  ) {
    return this.reservationService.getAvailableHours(doctorId);
  }

  // Cancel a reservation
  @Post('cancel/:reservationId')
  @HttpCode(HttpStatus.OK)

  async cancelReservation(
    @Param('reservationId') reservationId: string,
  ) {
    await this.reservationService.cancelReservation(reservationId);
    return { message: 'Reservation cancelled successfully' };
  }
}