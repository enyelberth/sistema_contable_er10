import { Injectable } from "@nestjs/common";
import { CreateEmployeedDto, UpdateEmployeDto } from "./dto/employeed.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Employeed } from "./entities/employeed.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class EmployeedService {
  constructor(
    @InjectRepository(Employeed)
    private readonly employeedRepository: Repository<Employeed>
  ) {}

  async createEmployeed(employee: CreateEmployeedDto) {
    try {
      const obtainedJobPosition = await this.obtainedJobPosition(
        employee.job_position_code
      );
      const obtainedUnitAdministrativeCode =
        await this.obtainedUnitAdministrativeCode(
          employee.unit_administrative_code
        );
      const obtainedPersonalData = await this.obtainedPersonalData(
        employee.identify_number
      );

      if (!!obtainedPersonalData[0]) {
        ExceptionsMessages.alreadyExists(
          "LA PERSONA",
          "YA ESTA REGISTRADA COMO EMPLEADO/A"
        );
      }

      if (
        [null, "", undefined, 0].includes(obtainedUnitAdministrativeCode) ||
        [null, "", undefined, 0].includes(obtainedJobPosition)
      ) {
        ExceptionsMessages.errorProcess();
      }

      const newEmployee = await this.employeedRepository.query(
        `
        CALL rrhh.sp_create_employee($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      `,
        [
          employee.job_position_code,
          employee.unit_administrative_code,
          employee.first_name,
          employee.last_name,
          employee.identify_acronym,
          employee.identify_number,
          employee.birth_date,
          employee.gender,
          employee.phone_number,
          employee.home_address,
          "",
        ]
      );

      if ([null, "", undefined, 0].includes(newEmployee[0])) {
        ExceptionsMessages.errorProcess();
      }
      ExceptionsMessages.create(
        `EL EMPLEADO ${employee.first_name} ${employee.last_name}`,
        newEmployee[0]._code
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getEmployees(searchOptions: string, limit: number, page: number) {
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

  async getEmployed(identify_number: string) {
    try {
      const getData = await this.employeedRepository.query(`
        select * from rrhh.vw_show_all_employeed vsae where vsae.identify_number like '%${identify_number}%'
      `);
      return getData;
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async updateEmployed(updateEmploye: UpdateEmployeDto, employe_code: string) {
    employe_code = employe_code.toUpperCase();

    const validatedEmploye = await this.validateEmploye(employe_code);

    if (!validatedEmploye[0]) {
      ExceptionsMessages.notFound(`EL EMPLEADO ${employe_code}`);
    }

    const updatedEmploye = await this.employeedRepository.query(
      `
      call rrhh.sp_update_employee($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `,
      [
        updateEmploye.job_position_code,
        updateEmploye.first_name.toUpperCase(),
        updateEmploye.last_name.toUpperCase(),
        updateEmploye.identify_acronym.toUpperCase(),
        updateEmploye.identify_number,
        updateEmploye.birth_date,
        updateEmploye.gender.toUpperCase(),
        updateEmploye.phone_number,
        updateEmploye.home_address.toUpperCase(),
        employe_code,
      ]
    );

    if ([null, "", 0, undefined].includes(updatedEmploye)) {
      ExceptionsMessages.errorProcess();
    }

    ExceptionsMessages.update(`EL EMPLEADO ${employe_code}`);
  }

  //NOTE: METODOS PRIVADOS
  private async obtainedJobPosition(job_position_code: string) {
    return await this.employeedRepository.query(`
    SELECT vsajp.code from rrhh.vw_show_all_job_position vsajp where vsajp.code = '${job_position_code}'
    `);
  }

  private async validateEmploye(employe_code: string) {
    return await this.employeedRepository.query(`
      select vsae.code from rrhh.vw_show_all_employeed vsae where vsae.code = '${employe_code}'
    `);
  }

  private async obtainedUnitAdministrativeCode(
    unit_administrative_code: string
  ) {
    return await this.employeedRepository.query(`
    select vsaau.administrative_unit_code from rrhh.vw_show_all_administrative_unit vsaau where vsaau.administrative_unit_code = '${unit_administrative_code}'
    `);
  }

  private async obtainedPersonalData(identify_number: string) {
    return await this.employeedRepository.query(`
    select pd.identify_number  from rrhh.personal_datum pd where pd.identify_number = '${identify_number}'
    `);
  }

  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.employeedRepository.query(
      ` select * from rrhh.vw_show_all_employeed vsae where CONCAT(vsae.identify_acronym, '-', vsae.identify_number) like '%${searchOptions.toUpperCase()}%' 
                or vsae.identify_number like '%${searchOptions}%'
                or vsae.first_name like '%${searchOptions.toUpperCase()}%'
                or vsae.last_name like '%${searchOptions.toUpperCase()}%'
                or CONCAT(vsae.first_name, ' ', vsae.last_name) like '%${searchOptions.toUpperCase()}%'
                 limit ${limit} offset ${page * limit}`
    );
  }

  private async maxPage(searchOptions: string, limit: number) {
    return await this.employeedRepository.query(`
      select count(*) as max_page from rrhh.vw_show_all_employeed vsae where vsae.identify_number like '%${searchOptions.toUpperCase()}%' or vsae.job_name like '%${searchOptions.toUpperCase()}%' limit ${limit}
    `);
  }
}
