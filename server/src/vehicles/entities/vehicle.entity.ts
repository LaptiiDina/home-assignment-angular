
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('vehicles') 
  export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    licensePlate: string;
  
    @Column()
    manufacturer: string;
  
    @Column()
    model: string;
  
    @Column({ default: 'active' })
    status: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  