import {
    Entity,
    OneToOne,
    JoinColumn,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import {docschedule} from './schedule.entity';
  
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
    
    @Column()
    reservationStatus!: boolean;

    @Column()
    schefule!: docschedule

  }