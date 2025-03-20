import { IsString, IsEnum, IsOptional, MaxLength, IsUUID } from 'class-validator';
import { MachineStatus } from '../entities/machine.entity';

export class CreateMachineDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(50)
  model: string;

  @IsString()
  @MaxLength(50)
  serialNumber: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsEnum(MachineStatus)
  status: MachineStatus;
}
