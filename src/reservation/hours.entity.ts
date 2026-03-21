import {
    Entity,
    ManyToOne,
    JoinColumn,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Reservation } from './reservation.entity';
  import { Days } from './days.entity';
  Entity('hours');
  export class Hours {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    doctorId!: string;

    @Column()
    reservationId!: Reservation;
  
    @Column()
    dayOfWeek!: Days;

    @Column()
    startTime!: string;
  
    @Column()
    endTime!: string;

    @Column()
    hourstatus!: boolean;
    
    @ManyToOne(() => Days, (days) => days.hours)
    @JoinColumn({ name: 'dayId' })
    avlDays!: Days;

  }