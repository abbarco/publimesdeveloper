import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MachineStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}

@Entity()
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  model: string;

  @Column({ unique: true })
  serialNumber: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'enum', enum: MachineStatus, default: MachineStatus.ACTIVE })
  status: MachineStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
