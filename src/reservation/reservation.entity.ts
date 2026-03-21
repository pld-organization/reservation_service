import {
    Entity,
    OneToOne,
    JoinColumn,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import {Days} from './days.entity';
  import {Hours} from './hours.entity';
  @Entity('reservation')
  export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    doctorId!: string;
  
    @Column()
    patientId!: string;
  
    @Column()
    reservationDate!: Date;

    @Column()
    reservationTime!: string;

    @Column({ nullable: true })
    reason!: string;
    
    @Column()
    reservationStatus!: boolean;

    @Column()
    
    @OneToOne(() => Days, (days) => days.id)
    @JoinColumn({ name: 'dayId' })
    day!: Days;

    @OneToOne(() => Hours, (hours) => hours.id)
    @JoinColumn({ name: 'hourId' })
    hour!: Hours;

  }