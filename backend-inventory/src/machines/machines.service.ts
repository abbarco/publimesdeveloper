import { Injectable, NotFoundException, ConflictException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from './entities/machine.entity';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  async findAll(): Promise<Machine[]> {
    return this.machineRepository.find();
  }

  async findOne(id: string): Promise<Machine> {
    const machine = await this.machineRepository.findOne({ where: { id } });
    if (!machine) throw new NotFoundException('Machine not found');
    return machine;
  }

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const existingMachine = await this.machineRepository.findOne({ where: { serialNumber: createMachineDto.serialNumber } });

    if (existingMachine) {
      throw new ConflictException('Serial number must be unique');
    }

    const machine = this.machineRepository.create(createMachineDto);
    return this.machineRepository.save(machine);
  }

  async update(id: string, updateMachineDto: UpdateMachineDto): Promise<Machine> {
    await this.findOne(id);
    await this.machineRepository.update(id, updateMachineDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.machineRepository.delete(id);
  }
}
