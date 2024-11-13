//NODEJS process.env

declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    JWT_SECRET: string;
  }
}

