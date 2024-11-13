import { Injectable } from "@nestjs/common";
import { CreateStatusDto } from "./dto/status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Status } from "./entities/status.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  exception = ExceptionsMessages;

  async createStatus(status: CreateStatusDto) {
    try {
      const statusFound = await this.statusRepository.findOne({
        where: {
          name: status.name,
        },
      });
      if (statusFound) {
        this.exception.alreadyExists(`EL STATUS ${status.name}`);
      }

      const newStatus = await this.statusRepository.query(
        `CALL "system".sp_create_status($1, $2, $3)`,
        [status.name, status.description, ""],
      );

      if (newStatus) {
        this.exception.create(status.name, newStatus[0]._code);
      } else {
        this.exception.errorProcess();
      }
    } catch (error) {
      this.exception.createErrorSignature();
    }
  }

  async findStatus(searchOptions: string, limit: number, page: number) {
    try {
      //NOTE: realizar SP de status en caso de que se requiera mas y realizar un UPPER en name
      const getData = await this.getData(searchOptions, limit, page)
      const maxPage = await this.maxPage(searchOptions, limit)

      return {
        getData: getData,
        maxPage: Math.ceil(maxPage[0].max_page / limit) - 1,
        totalRows: Number(maxPage[0].max_page),
      }
    } catch (error) {
      this.exception.createErrorSignature();
    }
  }

  private async getData(
    searchOptions: string,
    limit: number,
    page: number,){
    return await this.statusRepository.query(`
      select s.code, s."name", s.description from "system".status s where s.code LIKE '%${searchOptions.toUpperCase()}%' OR s.name LIKE '%${searchOptions.toUpperCase()}%'
        limit ${limit} offset ${
          page * limit
        }
    `)
  }

  private async maxPage(searchOptions: string, limit: number){
    return await this.statusRepository.query(`
    select count(*) as max_page from "system".status s where s.code LIKE '%${searchOptions.toUpperCase()}%' or s.name LIKE '%${searchOptions.toUpperCase()}%' limit ${limit} 
  `);
  }
}
