import {
    Controller,
    Post,
    Get,
    Body,
    Req,
    Res,
    UseGuards,
    HttpCode,
    HttpStatus,
    Query,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import type { Request, Response } from 'express';
  import { ReservationService} from './reservation.service'

  @Controller('reservation')
  export class reservation{
    constructor(private readonly reservationservice: ReservationService) {}
 
    @Get('docschedule')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    async Docsched(@Body('did') doctorId: string) {
        return this.reservationservice.getReservationsByDoctor(doctorId);
      }
    @Get('patientschedule')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    async patientsched(@Body('did') doctorId: string){
        return this.reservationservice.getReservationsByDoctor
    }


  }