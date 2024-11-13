import { Injectable } from "@nestjs/common";
import {
  CreateAdministrativeUnitDto,
  UpdateAdministrativeUnitDto,
} from "./dto/administrative_unit.dto";
import { ExceptionService } from "../../exceptions/exception.service";
import { InjectRepository } from "@nestjs/typeorm";
import { AdministrativeUnit } from "./entities/administrative_unit.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
@Injectable()
export class AdministrativeUnitService {
  constructor(
    @InjectRepository(AdministrativeUnit)
    private readonly administrativeUnitRepository: Repository<AdministrativeUnit>
  ) {}

  exception = new ExceptionService();
  async createUnitAdministrative(
    createAdministrativeUnitDto: CreateAdministrativeUnitDto
  ) {
    try {
      const obtainSector = await this.obtainSector(
        createAdministrativeUnitDto.sector_code
      );
      const obtainProgram = await this.obtainProgram(
        createAdministrativeUnitDto.program_code
      );
      const obtainActivity = await this.obtainActivity(
        createAdministrativeUnitDto.activity_code,
        createAdministrativeUnitDto.program_code
      );
      const codeConcat =
        createAdministrativeUnitDto.sector_code +
        createAdministrativeUnitDto.program_code +
        createAdministrativeUnitDto.activity_code;
      const findUnitAdministrative =
        await this.obtainUnitAdministrative(codeConcat);

      if (!obtainSector[0]) {
        ExceptionsMessages.notFound("EL SECTOR");
      }
      if (!obtainProgram[0]) {
        ExceptionsMessages.notFound("EL PROGRAMA");
      }
      if (!obtainActivity[0]) {
        ExceptionsMessages.notFound("LA ACTIVIDAD");
      }
      if (!!findUnitAdministrative[0]) {
        ExceptionsMessages.alreadyExists("LA UNIDAD ADMINISTRATIVA");
      }

      const newUnitAdministrative =
        await this.administrativeUnitRepository.query(
          `
            call rrhh.sp_create_administrative_unit($1,$2,$3,$4,$5,$6)
          `,
          [
            createAdministrativeUnitDto.sector_code,
            createAdministrativeUnitDto.program_code,
            createAdministrativeUnitDto.activity_code,
            createAdministrativeUnitDto.name,
            createAdministrativeUnitDto.description,
            "",
          ]
        );

      if ([null, "", 0].includes(newUnitAdministrative[0])) {
        ExceptionsMessages.errorProcess();
      }
      ExceptionsMessages.create(
        `LA UNIDAD ADMINISTRATIVA ${createAdministrativeUnitDto.name}`,
        newUnitAdministrative[0]._code
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getUnitAdministratives(
    searchOptions: string,
    limit: number,
    page: number
  ) {
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

  async getUnitAdministrative(searchOptions: string) {
    const getData = await this.administrativeUnitRepository.query(`
  select * from rrhh.vw_show_all_administrative_unit vsaau
  where vsaau.administrative_unit_code LIKE '%${searchOptions}%' or vsaau.administrative_unit_name LIKE '%${searchOptions.toUpperCase()}' limit 1
  `);
    return { getData: getData[0] };
  }

  async updateAdministrativeUnit(
    updateAdministrativeUnitDto: UpdateAdministrativeUnitDto,
    administrative_unit_code: string
  ) {
    try {
      const getData = await this.obtainUnitAdministrative(
        administrative_unit_code
      );

      if (!getData[0]) {
        ExceptionsMessages.notFound("LA UNIDAD ADMINISTRATIVA");
      }

      const getCode = getData[0].code;

      const administrativeUnitUpdate =
        await this.administrativeUnitRepository.query(
          `
        CALL rrhh.sp_update_administrative_unit($1, $2, $3)
      `,
          [
            getCode,
            updateAdministrativeUnitDto.name,
            updateAdministrativeUnitDto.description,
          ]
        );

      if ([null, "", 0].includes(administrativeUnitUpdate[0])) {
        ExceptionsMessages.errorProcess();
      }
      ExceptionsMessages.update(
        `LA UNIDAD ADMINISTRATIVA ${updateAdministrativeUnitDto.name}`
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  private async obtainUnitAdministrative(code: string) {
    return await this.administrativeUnitRepository.query(`
    select * from rrhh.administrative_unit au where au.code = '${code}'
    `);
  }

  private async getData(
    searchOptions: string,
    validatedLimit: number,
    page: number
  ) {
    return await this.administrativeUnitRepository.query(`
      select * from rrhh.vw_show_all_administrative_unit vsaau
      where vsaau.administrative_unit_code LIKE '%${searchOptions}%' or vsaau.administrative_unit_name LIKE '%${searchOptions.toUpperCase()}' limit ${validatedLimit} offset ${
        page * validatedLimit
      }
    `);
  }

  private async maxPage(searchOptions: string, validatedLimit: number) {
    return await this.administrativeUnitRepository.query(`
      select count(*) as max_page from rrhh.vw_show_all_administrative_unit vsaau
      where vsaau.administrative_unit_code LIKE '%${searchOptions}%' or vsaau.administrative_unit_name LIKE '%${searchOptions}' limit ${validatedLimit}
    `);
  }

  private async obtainSector(sector_code: string) {
    return await this.administrativeUnitRepository.query(`
    select * from rrhh.vw_show_all_sector vsas where vsas.code = '${sector_code}'
    `);
  }

  private async obtainProgram(program_code: string) {
    return await this.administrativeUnitRepository.query(`
      select code from rrhh.vw_show_all_program vsap where vsap.code = '${program_code}'
    `);
  }

  private async obtainActivity(activity_code: string, program_code: string) {
    return await this.administrativeUnitRepository.query(`
      select
        vsaa.code, vsaa.program_code
      from rrhh.vw_show_all_activity vsaa 
      where vsaa.code = '${activity_code}' and vsaa.program_code = '${program_code}'
    `);
  }
}
