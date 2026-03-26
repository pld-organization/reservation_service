import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TYPE } from '../common/type.enum';
import { DAY } from '../common/days.enum';

@Entity('schedule')  // you had Entity(...) without the @
export class docschedule {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  doctorId!: string;

  @Column({ type: 'enum', enum: DAY })
  dayOfWeek!: DAY;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @Column({ type: 'enum', enum: TYPE })
  appointmenttype!: TYPE;

  @Column({ default: true })
  status!: boolean;
}