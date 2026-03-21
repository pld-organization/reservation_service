import {
    Entity,
    OneToMany,
    JoinColumn,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  Entity('Days');
  export class AvlDays {
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
    daystatus!: boolean;
    
    @OneToMany(() => Hours, (hours) => hours.avlDays)
    @JoinColumn({ name: 'hourId' })
    hours!: Hours[];

  }