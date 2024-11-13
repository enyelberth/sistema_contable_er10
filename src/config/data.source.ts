import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path = require("node:path");

dotenv.config();

//migration en localhost
const local = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [path.join(__dirname, "../migrations/after/*.ts")],
  synchronize: false,
  migrationsRun: true,
  logging: true,
});

//migration en koyeb
const koyeb = new DataSource({
  type: "postgres",
  host: "ep-red-scene-07492398.us-east-1.pg.koyeb.app",
  port: 5432,
  username: "sgbidev",
  password: "Z1pST5wsijMo",
  database: "koyebdb",
  ssl: true,
  migrations: [path.join(__dirname, "../migrations/after/*.ts")],
  synchronize: false,
  migrationsRun: true,
  logging: true,
});

const datasource = process.env.production === "true" ? koyeb : local;

export default datasource;
