import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  Entity('schedule');
  export class docschedule {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    doctorId!: string;
  
    @Column()
    dayOfWeek!: string;
  
    @Column()
    startTime!: string;
  
    @Column()
    endTime!: string;

    @Column()
    status!:boolean;
    
  }