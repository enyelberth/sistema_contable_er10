import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      // host: "redis-18550.c91.us-east-1-3.ec2.redns.redis-cloud.com",
      // username: "sgbiredis",
      // password: "Azul.91*",
      // port: 18550,
      host: "localhost",
      port: 6379,
    });
  }

  async set(key: string, value: any) {
    await this.client.set(key, JSON.stringify(value));
    await this.client.expire(key, 3600);
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async update(key: string, newData: any) {
    await this.client.set(key, JSON.stringify(newData));
    await this.client.expire(key, 3600);
  }

  async delete(key: string) {
    await this.client.del(key);
  }

  async getDataCache(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }
}
