import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get()
  async findAll() {
    return this.machinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const machine = await this.machinesService.findOne(id);
    if (!machine) throw new NotFoundException('Machine not found');
    return machine;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  async create(@Body() createMachineDto: CreateMachineDto) {
    try {
      return await this.machinesService.create(createMachineDto);
    } catch (error) {
      throw new BadRequestException('Serial number must be unique');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machinesService.update(id, updateMachineDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.machinesService.delete(id);
  }
}
