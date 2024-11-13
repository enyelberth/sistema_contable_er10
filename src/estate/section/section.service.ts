import { Injectable, Module } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { RedisService } from "src/redis/redis.service";
import { AccessLevelService } from "src/system/access-level/access-level.service";

import { Repository } from "typeorm";
import { Section } from "./entities/section.entity";

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    private accessLevel: AccessLevelService,
    private cacheService: RedisService
  ) {}
  exception = ExceptionsMessages;

  async getSection(code: string) {
    const getData = await this.sectionRepository.query(`
            select * from "estate".vw_show_section vsam where vsam.code LIKE  '%${code}%' limit 1

      `);
    return { getData: getData[0] };
  }
  async getSections(searchOptions: string, limit: string, page: number) {
    const parselimit = parseInt(limit);
    const getData = await this.getData(searchOptions, parselimit, page);
    const maxPage = await this.maxPage(searchOptions, parselimit);

    return {
      getData,
      maxPage: Math.ceil(maxPage[0].max_page / parselimit) - 1,
      totalRows: Number(maxPage[0].max_page),
    };
  }

  async obtainSection(code: string) {
    return await this.sectionRepository.query(`
      select vsam.code from "estate".vw_show_section vsam where vsam.code = '${code}'
      `);
  }
  async getData(searchOptions: string, limit: number, page: number) {
    return await this.sectionRepository
      .query(`SELECT * FROM "estate".vw_show_section vsam where 
      (vsam.code LIKE '%${searchOptions.toUpperCase()}%'
      OR vsam.name LIKE '%${searchOptions.toUpperCase()}%'
      
      )
      LIMIT ${limit} OFFSET ${page * limit}`);
  }
  async maxPage(searchOptions: string, validateLimit: number) {
    return await this.sectionRepository.query(`
            select count (*) as max_page from "estate".vw_show_section vsui
                where
                 vsui.name LIKE '%${searchOptions.toUpperCase()}%'
                 or vsui.code LIKE '% ${searchOptions.toUpperCase()} %' limit '${validateLimit}'
            
            `);
  }
}
