import { Injectable } from "@nestjs/common";
import { CreateProgramDto, UpdateProgramDto } from "./dto/program.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Program } from "./entities/program.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>
  ) {}

  async createProgram(createProgramDto: CreateProgramDto) {
    try {
      const findProgram = await this.obtainProgram(createProgramDto.code);
      const getSector = await this.getSectorCode(createProgramDto.sector_code);

      if (!!findProgram[0]) {
        ExceptionsMessages.alreadyExists(
          `EL PROGRAMA ${createProgramDto.code}`
        );
      }

      if (!getSector[0]) {
        ExceptionsMessages.notFound("EL SECTOR");
      }

      const newProgram = await this.programRepository.query(
        `
        CALL rrhh.sp_create_program($1, $2, $3, $4)
      `,
        [
          createProgramDto.code,
          createProgramDto.sector_code,
          createProgramDto.name,
          createProgramDto.description,
        ]
      );

      if ([null, "", 0, undefined].includes(newProgram[0])) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.create(
        `EL PROGRAMA ${createProgramDto.name.toUpperCase()}`,
        createProgramDto.code
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getPrograms(searchOptions: string, limit: number, page: number) {
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

  async getProgram(searchOptions: string) {
    const getData = await this.programRepository.query(
      ` select vsap.code, vsap."name", vsap.description, vsap.sector_code, vsap.sector_name from rrhh.vw_show_all_program vsap where vsap.code LIKE '%${searchOptions}%' or vsap.name LIKE '%${searchOptions.toUpperCase()}%' limit 1`
    );
    return { getData: getData[0] };
  }

  async updateProgram(updateProgram: UpdateProgramDto, program_code: string) {
    try {
      const getData = await this.obtainProgram(program_code);
      if (!getData[0]) {
        ExceptionsMessages.notFound("EL PROGRAMA");
      }

      const getCode = getData[0].code;
      const programUpdate = await this.programRepository.query(
        `
        call rrhh.sp_update_program($1, $2, $3)
      `,
        [getCode, updateProgram.name, updateProgram.description]
      );

      if ([null, "", 0, undefined].includes(programUpdate)) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.update(
        `EL PROGRAMA ${updateProgram.name.toUpperCase()}`
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getProgramBySector(sector_code: string) {
    const getData = await this.programRepository.query(`
      select vsap.code, vsap."name" from rrhh.vw_show_all_program vsap inner join
        rrhh.vw_show_all_sector vsas on vsap.sector_code = vsas.code where vsap.sector_code = '${sector_code}'
    `);

    return getData;
  }

  async getProgramInfoBySector(program_code: string) {
    return await this.programRepository.query(`
    select vsas.code as sector_code,
           vsap.code as program_code,
	         vsap."name" as program_name,
	         vsap.description as program_drescription,
	         vsas."name" as sector_name from rrhh.vw_show_all_program vsap inner join
	  rrhh.vw_show_all_sector vsas on vsap.sector_code = vsas.code 
		where vsap.code = '${program_code}'
    `);
  }

  //NOTE: METODOS PRIVADOS
  private async obtainProgram(program_code: string) {
    return await this.programRepository.query(`
      select * from rrhh.vw_show_all_program vsap where vsap.code = '${program_code}'
    `);
  }

  private async getSectorCode(sector_code: string) {
    return await this.programRepository.query(`
      select code from rrhh.vw_show_all_sector vsas where vsas.code = '${sector_code}'
    `);
  }

  private async getData(
    searchOptions: string,
    validatedLimit: number,
    page: number
  ) {
    return await this.programRepository.query(`
    select p.code, p.name, p.description from rrhh."program" p where p.code LIKE '%${searchOptions}%' or p.name LIKE '%${searchOptions.toUpperCase()}%' limit ${validatedLimit} offset ${
      page * validatedLimit
    }
      `);
  }

  private async maxPage(searchOptions: string, validatedLimit: number) {
    return await this.programRepository.query(
      `select count(*) as max_page from rrhh."program" p where p.code LIKE '%${
        searchOptions.toUpperCase
      }%' or p.name LIKE '%${searchOptions.toUpperCase()}%' limit ${validatedLimit}`
    );
  }
}
