import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Machine, MachineStatus } from './entities/machine.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT||5050),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Machine],
  synchronize: false, 
});

async function seed() {
  await dataSource.initialize();

  const machineRepository = dataSource.getRepository(Machine);

  const machines = [
    {
      name: 'Compresor de Aire',
      model: 'Ingersoll Rand R75',
      serialNumber: 'SN-COMP001',
      location: 'Planta de Producción',
      status: MachineStatus.ACTIVE,
    },
    {
      name: 'Cortadora Láser',
      model: 'Trotec Speedy 400',
      serialNumber: 'SN-LASER002',
      location: 'Área de Ensamblaje',
      status: MachineStatus.MAINTENANCE,
    },
    {
      name: 'Generador Industrial',
      model: 'Cummins C200D6R',
      serialNumber: 'SN-GEN003',
      location: 'Subestación Eléctrica',
      status: MachineStatus.INACTIVE,
    },
  ];

  await machineRepository.insert(machines);

  console.log('Seed ejecutado con éxito');
  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('Error ejecutando seed:', error);
  process.exit(1);
});
