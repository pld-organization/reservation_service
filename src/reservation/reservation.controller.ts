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
@UseGuards(AuthGuard('jwt'))
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

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

  @Get('doctor/:doctorId')
  @HttpCode(HttpStatus.OK)
  async getReservationsByDoctor(
    @Param('doctorId', ParseUUIDPipe) doctorId: string,
  ) {
    return this.reservationService.getReservationsByDoctor(doctorId);
  }

  @Get('patient/:patientId')
  @HttpCode(HttpStatus.OK)
  async getReservationsByPatient(
    @Param('patientId', ParseUUIDPipe) patientId: string,
  ) {
    return this.reservationService.getReservationsByPatient(patientId);
  }

  @Get('available/:doctorId')
  @HttpCode(HttpStatus.OK)
  async getAvailableHours(
    @Param('doctorId', ParseUUIDPipe) doctorId: string,
  ) {
    return this.reservationService.getAvailableHours(doctorId);
  }

  @Post('cancel/:reservationId')
  @HttpCode(HttpStatus.OK)
  async cancelReservation(
    @Param('reservationId', ParseUUIDPipe) reservationId: string,
  ) {
    await this.reservationService.cancelReservation(reservationId);
    return { message: 'Reservation cancelled successfully' };
  }

  // ─── Public endpoints (internal microservice calls, no JWT required) ──────

  @Get('upcoming/doctor/:doctorId')
  @UseGuards()
  @HttpCode(HttpStatus.OK)
  async getUpcomingMeetingsForDoctor(
    @Param('doctorId', ParseUUIDPipe) doctorId: string,
  ) {
    return this.reservationService.getUpcomingMeetings(doctorId, 'doctor');
  }

  @Get('upcoming/patient/:patientId')
  @UseGuards()
  @HttpCode(HttpStatus.OK)
  async getUpcomingMeetingsForPatient(
    @Param('patientId', ParseUUIDPipe) patientId: string,
  ) {
    return this.reservationService.getUpcomingMeetings(patientId, 'patient');
  }

  // ─────────────────────────────────────────────────────────────────────────

  @Get('meetings/doctor/:doctorId')
  @HttpCode(HttpStatus.OK)
  async getMeetingUrlsByDoctor(
    @Param('doctorId', ParseUUIDPipe) doctorId: string,
  ) {
    return this.reservationService.getMeetingUrlsByDoctor(doctorId);
  }

  @Get('meetings/patient/:patientId')
  @HttpCode(HttpStatus.OK)
  async getMeetingUrlsByPatient(
    @Param('patientId', ParseUUIDPipe) patientId: string,
  ) {
    return this.reservationService.getMeetingUrlsByPatient(patientId);
  }

  @Get(':reservationId')
  @HttpCode(HttpStatus.OK)
  async getReservation(
    @Param('reservationId', ParseUUIDPipe) reservationId: string,
  ) {
    return this.reservationService.getReservation(reservationId);
  }
}
