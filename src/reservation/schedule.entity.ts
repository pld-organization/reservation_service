import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import {TYPE} from '../common/type.enum'
  import {DAY} from '../common/days.enum'
  Entity('schedule');
  export class docschedule {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    doctorId!: string;
  
    @Column()
    dayOfWeek!: DAY;
  
    @Column()
    startTime!: string;
  
    @Column()
    endTime!: string;

    @Column()
    appointmenttype: TYPE;

    @Column()
    status!:boolean;
    
    
  }