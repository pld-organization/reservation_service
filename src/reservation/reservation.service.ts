import { Injectable , BadRequestException ,NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./reservation.entity";
import { docschedule } from "./schedule.entity";
import { DAY } from "src/common/days.enum";
import { TYPE } from "src/common/type.enum";
import { DailyService } from "../services/daily.service";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(docschedule)
    private readonly scheduleRepository: Repository<docschedule>,
    private readonly dailyService: DailyService,
  
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
    if (schedule.status == false) {
      throw new BadRequestException('This time slot is already taken');
    }
    schedule.status = false; 
    await this.scheduleRepository.save(schedule);
  
    // Créer une réservation temporaire pour obtenir un ID
    const reservation = this.reservationRepository.create({
      ...data,
      schedule: schedule,       
    });
    
    // Sauvegarder d'abord pour avoir un ID
    const savedReservation = await this.reservationRepository.save(reservation);

    // Créer la room Daily.co
    try {
      const { url, roomName } = await this.dailyService.createMeetingRoom(
        data.doctorId,
        data.patientId,
        savedReservation.id,
      );
      
      // Mettre à jour la réservation avec l'URL de la meeting
      savedReservation.meetingUrl = url;
      savedReservation.meetingRoomName = roomName;
      await this.reservationRepository.save(savedReservation);
      
      console.log('[Reservation Service] Meeting created:', {
        reservationId: savedReservation.id,
        meetingUrl: url,
        roomName: roomName,
      });
    } catch (error) {
      console.error('[Reservation Service] Error creating Daily meeting:', error);
      // Supprimer la réservation si la création de la meeting échoue
      await this.reservationRepository.remove(savedReservation);
      throw error;
    }

    return savedReservation;
  }


  async create_work_timeline(data:{
  doctorId: string;
  dayOfWeek: DAY;
  startTime: string;
  endTime: string;
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
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['schedule'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // Supprimer la room Daily.co
    if (reservation.meetingRoomName) {
      try {
        await this.dailyService.deleteMeetingRoom(reservation.meetingRoomName);
      } catch (error) {
        console.error('[Reservation Service] Error deleting Daily room:', error);
      }
    }

    // Mettre à jour le statut
    await this.reservationRepository.update(reservationId, { reservationStatus: false });
    
    // Rendre le créneau disponible
    if (reservation.schedule) {
      await this.scheduleRepository.update(reservation.schedule.id, { status: true });
    }
  }

  async getUpcomingMeetings(
    userId: string,
    userType: 'doctor' | 'patient',
  ): Promise<Reservation[]> {
    const query = this.reservationRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.schedule', 'schedule')
      .where('reservation.reservationStatus = :status', { status: true })
      .andWhere('reservation.meetingUrl IS NOT NULL');

    if (userType === 'doctor') {
      query.andWhere('reservation.doctorId = :userId', { userId });
    } else {
      query.andWhere('reservation.patientId = :userId', { userId });
    }

    const reservations = await query.getMany();

    // Filtrer pour les meetings dans les 15 minutes à venir
    const now = new Date();
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);

    return reservations.filter((res) => {
      if (!res.schedule) return false;
      
      // Combiner le jour et l'heure pour créer une date
      const [hours, minutes] = res.schedule.startTime.split(':');
      const meetingDate = this.getDateForDayAndTime(
        res.schedule.dayOfWeek,
        parseInt(hours),
        parseInt(minutes),
      );

      return meetingDate >= now && meetingDate <= fifteenMinutesFromNow;
    });
  }

  async getReservation(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['schedule'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  private getDateForDayAndTime(
    dayOfWeek: DAY,
    hours: number,
    minutes: number,
  ): Date {
    const now = new Date();
    const dayMap = {
      [DAY.MONDAY]: 1,
      [DAY.TUESDAY]: 2,
      [DAY.WEDNESDAY]: 3,
      [DAY.THURSDAY]: 4,
      [DAY.FRIDAY]: 5,
      [DAY.SATURDAY]: 6,
      [DAY.SUNDAY]: 0,
    };

    const targetDay = dayMap[dayOfWeek];
    const currentDay = now.getDay();
    let daysToAdd = targetDay - currentDay;

    if (daysToAdd < 0) {
      daysToAdd += 7;
    }

    const meetingDate = new Date(now);
    meetingDate.setDate(meetingDate.getDate() + daysToAdd);
    meetingDate.setHours(hours, minutes, 0, 0);

    return meetingDate;
  }
  
}   
