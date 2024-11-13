import { Injectable } from "@nestjs/common";
import {
  CreateJobPositionDto,
  UpdateJobPositionDto,
} from "./dto/job-position.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobPosition } from "./entities/job-position.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class JobPositionService {
  constructor(
    @InjectRepository(JobPosition)
    private readonly jobPositionRepository: Repository<JobPosition>
  ) {}
  async createJob(job: CreateJobPositionDto) {
    try {
      const findJobPosition = await this.obtainJobPosition(job.name);

      if (!!findJobPosition[0]) {
        ExceptionsMessages.alreadyExists("EL CARGO");
      }

      const newJob = await this.jobPositionRepository.query(
        `
        CALL rrhh.sp_create_job_position($1, $2, $3) 
      `,
        [job.name, job.description, ""]
      );

      if ([null, "", 0].includes(newJob[0])) {
        ExceptionsMessages.errorProcess();
      }
      ExceptionsMessages.create(`EL CARGO ${job.name}`, newJob[0]._code);
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getJobPositions(searchOptions: string, limit: number, page: number) {
    try {
      const getData = await this.getData(searchOptions, limit, page);
      const maxPage = await this.maxPage(searchOptions, limit);

      return {
        getData: getData,
        maxPage: Math.ceil(maxPage[0].max_page / limit) - 1,
        totalRows: Number(maxPage[0].max_page),
      };
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getJobPosition(searchOptions: string) {
    const getData = await this.jobPositionRepository.query(`
      select * from rrhh.vw_show_all_job_position vsajp where vsajp.code LIKE '%${searchOptions.toUpperCase()}%' or vsajp.job_name LIKE '%${searchOptions.toUpperCase()}%'
    `);
    return { getData: getData[0] };
  }

  //NOTE: crear sp para actualizar un puesto de trabajo
  async updateJobPosition(
    updateJobPosition: UpdateJobPositionDto,
    code_job_position: string
  ) {
    try {
      const getData = await this.obtainJobPosition(code_job_position);

      if (!getData) {
        ExceptionsMessages.notFound(`EL ${code_job_position}`);
      }

      const validateJob = await this.jobPositionRepository.query(`
        select count(*) from rrhh.vw_show_all_job_position vsajp where vsajp.code = '${code_job_position}' 
      `);

      if (validateJob) {
        ExceptionsMessages.jobPositionOnEmploy();
      }

      //const getCode = getData[0].code;

      const jobPositionUpdate = await this.jobPositionRepository.query(
        `
        CALL rrhh.sp_update_job_position($1,$2,$3)
      `,
        [
          code_job_position,
          updateJobPosition.name,
          updateJobPosition.description,
        ]
      );

      if ([null, "", 0, undefined].includes(jobPositionUpdate)) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.update(
        `EL CARGO ${updateJobPosition.name.toUpperCase()}`
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  private async obtainJobPosition(name: string) {
    return await this.jobPositionRepository.query(`
      select vsajp.code from rrhh.vw_show_all_job_position vsajp where vsajp.job_name = '${name.toUpperCase()}'
    `);
  }

  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.jobPositionRepository.query(`
    select * from rrhh.vw_show_all_job_position vsajp
    where vsajp.code LIKE '%${searchOptions.toUpperCase()}%' or vsajp.job_name LIKE '%${searchOptions.toUpperCase()}%' limit ${limit} offset ${
      page * limit
    }`);
  }

  private async maxPage(searchOptions: string, limit: number) {
    return await this.jobPositionRepository.query(`
    select count(*) as max_page from rrhh.vw_show_all_job_position vsajp
    where vsajp.code LIKE '%${searchOptions}%' or vsajp.job_name like '%${searchOptions}%' limit ${limit}
    `);
  }
}
