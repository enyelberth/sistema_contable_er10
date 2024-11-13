import { Injectable } from "@nestjs/common";
import { CreateActivityDto, UpdateActivityDto } from "./dto/activity.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Activity } from "./entities/activity.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async createActivity(createActivityDto: CreateActivityDto) {
    try {
      const findProgram = await this.obtainProgram(
        createActivityDto.program_code,
      );
      const findActivity = await this.obtainActivity(
        createActivityDto.code,
        createActivityDto.program_code,
        createActivityDto.name,
      );

      if (!findProgram[0]) {
        ExceptionsMessages.notFound("EL PROGRAMA");
      }
      if (!!findActivity[0]) {
        ExceptionsMessages.alreadyExists("LA ACTIVIDAD");
      }

      const newActivity = await this.activityRepository.query(
        `
      CALL "rrhh".sp_create_activity($1, $2, $3, $4)
    `,
        [
          createActivityDto.code,
          createActivityDto.program_code,
          createActivityDto.name,
          createActivityDto.description,
        ],
      );

      if ([null, "", 0, undefined].includes(newActivity[0])) {
        ExceptionsMessages.errorProcess();
      }
      ExceptionsMessages.create(
        `LA ACTIVIDAD ${createActivityDto.name.toUpperCase()}`,
        createActivityDto.code,
      );

          } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getActivities(searchOptions: string, limit: number, page: number) {
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

  async getActivity(searchOptions: string) {
    const getData = await this.activityRepository.query(
      `select * from rrhh.vw_show_all_activity vsaa where vsaa.code LIKE '%${searchOptions}%' or vsaa.name LIKE '%${searchOptions.toUpperCase()}%' limit 1`,
    );
    return { getData: getData[0] };
  }

  async updateActivity(
    updateActivity: UpdateActivityDto,
    activity_code: string,
    program_code: string,
  ) {
    try {
      const getData = await this.obtainActivity(
        activity_code,
        program_code,
        updateActivity.name,
      );

      if (!getData[0]) {
        ExceptionsMessages.notFound("LA ACTIVIDAD");
      }

      const activityUpdate = await this.activityRepository.query(
        `
        CALL rrhh.sp_update_activity($1, $2, $3, $4)
      `,
        [
          activity_code,
          program_code,
          updateActivity.name,
          updateActivity.description,
        ],
      );

      if ([null, "", 0].includes(activityUpdate[0])) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.update(
        `LA ACTIVIDAD ${updateActivity.name.toUpperCase()}`,
      );

          } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getActivitiesByProgram(program_code: string) {
    const getData = await this.activityRepository.query(`
      select vsaa.code, vsaa."name" from rrhh.vw_show_all_activity vsaa inner join
      rrhh.vw_show_all_program vsap on vsaa.program_code = vsap.code where vsaa.program_code = '${program_code}'
    `);
    return getData;
  }

  async activityInfoByProgram(code_activity: string, program_code: string) {
    return await this.activityRepository.query(`
      select
        vsap.code as program_code,
        vsaa.code as activity_code,
        vsaa."name" as activity_name,
        vsaa.description as activity_description,
        vsap."name" as program_name
      from rrhh.vw_show_all_activity vsaa inner join
	    rrhh.vw_show_all_program vsap on vsaa.program_code = vsap.code inner join 
	    rrhh.vw_show_all_sector vsas on vsap.sector_code = vsas.code
	    where vsaa.code = '${code_activity}' and vsaa.program_code = '${program_code}'
    `);
  }
  //NOTE: METODOS PRIVADOS

  private async obtainActivity(
    activity_code: string,
    program_code: string,
    activity_name: string,
  ) {
    return await this.activityRepository.query(`
    select
      vsaa.code, vsaa.program_code
    from rrhh.vw_show_all_activity vsaa 
    where vsaa.code = '${activity_code}' and vsaa.program_code = '${program_code}'
          or vsaa."name" = '${activity_name}';
  `);
  }

  private async obtainProgram(program_code: string) {
    return await this.activityRepository.query(`
      select code from rrhh.vw_show_all_program vsap where vsap.code = '${program_code}'
    `);
  }

  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.activityRepository.query(`
      select * from rrhh.vw_show_all_activity vsaa where vsaa.code LIKE '%${searchOptions}%' or vsaa.name LIKE '%${searchOptions.toUpperCase()}%' limit ${limit} offset ${
        page * limit
      }
    `);
  }

  private async maxPage(searchOptions: string, validatedLimit: number) {
    return await this.activityRepository.query(`
      select count(*) as max_page from rrhh.vw_show_all_activity vsaa where vsaa.code LIKE '%${searchOptions}%' or vsaa.name LIKE '%${searchOptions.toUpperCase()}%' limit ${validatedLimit}
    `);
  }
}
