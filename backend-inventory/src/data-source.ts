import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5050,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "Qwerty123+",
  database: process.env.DB_NAME || "Publimes",
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*.js"],
  synchronize: false,
  logging: true,
});
