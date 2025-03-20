import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno desde .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5050),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }), InventoryModule, MachinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
