import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { docschedule } from './schedule.entity';

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  patientId!: string;

  @Column()
  doctorId!: string;

  @Column({ nullable: true })
  reason!: string;

  @Column({ default: false })
  reservationStatus!: boolean;

  @Column({ nullable: true })
  meetingUrl!: string;

  @Column({ nullable: true })
  meetingRoomName!: string;

  @OneToOne(() => docschedule)
  @JoinColumn()                 
  schedule!: docschedule;
}
