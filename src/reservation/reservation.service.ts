import { Injectable , BadRequestException ,NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./reservation.entity";
import { docschedule } from "./schedule.entity";
import { DAY } from "src/common/days.enum";
import { TYPE } from "src/common/type.enum";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(docschedule)
    private readonly scheduleRepository: Repository<docschedule>,
  
  ) {}

 
  async createReservation(data: {
    doctorId: string;
    patientId: string;
    reservationDay: DAY;
    reservationTime: string;
    reason: string;
    reservationStatus: boolean;
  }): Promise<Reservation> {
    const schedule = await this.scheduleRepository.findOne({ 
      where: { 
        doctorId: data.doctorId, 
        dayOfWeek: data.reservationDay,       
        startTime: data.reservationTime 
      } 
    });
  
    if (!schedule) {
      throw new NotFoundException('No schedule slot found for this doctor/day/time');
    }
    if (schedule.status == 0) {
      throw new BadRequestException('This time slot is already taken');
    }
    schedule.status = false; 
    await this.scheduleRepository.save(schedule);
  
    const reservation = this.reservationRepository.create({
      ...data,
      schedule: schedule,       
    });
  
    return this.reservationRepository.save(reservation);
  }


  async create_work_timeline(data:{
  doctorId: string;
  dayOfWeek: DAY;
  starttime: string;
  endtime: string;
  appointmenttype: TYPE;
  }): Promise<docschedule>{

    const schedule = this.scheduleRepository.create({
    ...data,
    status: true,
    });
    return this.scheduleRepository.save(schedule); 
  }

  async getReservationsByDoctor(doctorId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { doctorId , reservationStatus: true } });
  }

  async getReservationsByPatient(patientId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { patientId , reservationStatus: true} });
  }
  

  


  async getAvailableHours(doctorId: string): Promise<docschedule[]> {
    return this.scheduleRepository.find({
      where: { doctorId, status: true },
    });
  }

  async cancelReservation(reservationId: string): Promise<void> {
    await this.reservationRepository.update(reservationId, { reservationStatus: false });
  }
  
}   