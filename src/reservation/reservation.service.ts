import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./reservation.entity";
import { docschedule } from "./schedule.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(docschedule)
    private readonly scheduleRepository: Repository<docschedule>,
  
  ) {}

  async createReservation(data:{   
    doctorId: string;
    patientId: string;
    reservationDate: Date;
    reservationTime: string;
    reason: string;
    reservationStatus: boolean;
  }): Promise<Reservation> {
    const reservation = this.reservationRepository.create(data);
    return this.reservationRepository.save(reservation);
  }


  async create_work_timeline(data:{
  doctorId: string;
  dayOfWeek: string;
  starttime: string;
  endtime: string;

  }): Promise<docschedule>{
    const schedule = this.scheduleRepository.create(data);
    return this.scheduleRepository.save(schedule); 
  }

  async getReservationsByDoctor(doctorId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { doctorId , reservationStatus: true } });
  }

  async getReservationsByPatient(patientId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { patientId , reservationStatus: true} });
  }
  async 

  


  async getAvailableHours(doctorId: string): Promise<docschedule[]> {
    return this.scheduleRepository.find({
      where: { doctorId, status: true },
    });
  }
}   