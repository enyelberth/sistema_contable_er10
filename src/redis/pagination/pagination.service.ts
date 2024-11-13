import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class PaginationService {
  constructor(@Inject() private readonly redis: Redis) {}

  async getPaged(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const key = `data_page_${page}`;

    const cachedData = await this.redis.lrange(key, 0, -1);
    if (cachedData.length > 0) {
      return JSON.parse(cachedData[0]);
    }
  }
}
