import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubGroup } from "./entities/subgroup.entity";
import { Repository } from "typeorm";
import { AccessLevel } from "../../system/access-level/entities/access-level.entity";
import { AccessLevelService } from "src/system/access-level/access-level.service";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class SubGroupService {
  constructor(
    @InjectRepository(SubGroup)
    private subGroupRepository: Repository<SubGroup>,
    private AccessLevel: AccessLevelService
  ) {}
  exception = ExceptionsMessages;

  async getSubGroup(code: string) {
    try {
      console.log(code);
      const getData = await this.subGroupRepository.query(`
      select * from "estate".vw_show_sub_group vsam where vsam.code LIKE  '%${code}%' limit 1
                `);
      return { getData: getData[0] };
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }
 
  async getSubGroups(searchOptions: string, limit: string, page: number) {
    try {
      const parset_limit = parseInt(limit);


      const getData = await this.getData(searchOptions, parset_limit, page);


      const maxPage = await this.maxPage(searchOptions,parset_limit);
      return {
        getData,
        maxPage: Math.ceil(maxPage[0].max_page / parset_limit) - 1,
        totalRows: Number(maxPage[0].max_page),
      };
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }
  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.subGroupRepository.query(
      `SELECT * FROM "estate".vw_show_sub_group vsam where 
      (vsam.code LIKE '%${searchOptions.toUpperCase()}%'
      OR vsam.name LIKE '%${searchOptions.toUpperCase()}%'
      
      )
      LIMIT ${limit} OFFSET ${page*limit}
      
      `
    );
  }
  private async obtainSubGroup(code: string) {
    return await this.subGroupRepository.query(`
               select vsam.code from "estate".vw_show_sub_group vsam where vsam.code = '${code}'
            `);
  }
  private async maxPage(searchOptions: string, validatedLimit: number) {
    return await this.subGroupRepository.query(`
      select count(*) as max_page from "estate".vw_show_sub_group vsui 
        where
         vsui.name LIKE '%${searchOptions.toUpperCase()}%'
          or vsui.code LIKE '%${searchOptions.toUpperCase()}%' limit '${validatedLimit}'

            `,);
  }
}
