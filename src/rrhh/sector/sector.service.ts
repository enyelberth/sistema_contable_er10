import { Injectable } from "@nestjs/common";
import { CreateSectorDto, UpdateSectorDto } from "./dto/sector.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Sector } from "./entities/sector.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>
  ) {}

  async createSector(createSectorDto: CreateSectorDto) {
    try {
      const findSector = await this.obtainSector(createSectorDto.code);

      if (!!findSector[0]) {
        ExceptionsMessages.alreadyExists("EL SECTOR");
      }

      const newSector = await this.sectorRepository.query(
        `
        CALL rrhh.sp_create_sector($1, $2, $3)
      `,
        [
          createSectorDto.code,
          createSectorDto.name,
          createSectorDto.description,
        ]
      );

      if ([null, "", 0].includes(newSector[0])) {
        ExceptionsMessages.errorProcess();
      }
      ExceptionsMessages.create(
        `EL SECTOR ${createSectorDto.name}`,
        newSector[0]._code
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getSectors(searchOptions: string, limit: number, page: number) {
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

  async getSector(searchOptions: string) {
    const getData = await this.sectorRepository.query(
      `select * from rrhh.vw_show_all_sector vsas where vsas.code LIKE '%${searchOptions}%' or vsas.name LIKE '%${searchOptions.toUpperCase()}%' limit 1`
    );
    return { getData: getData[0] };
  }

  async updateSector(updateSector: UpdateSectorDto, sector_code: string) {
    try {
      const getData = await this.obtainSector(sector_code);

      if (!getData[0]) {
        ExceptionsMessages.notFound("EL SECTOR");
      }

      const getCode = getData[0].code;

      const sectorUpdate = await this.sectorRepository.query(
        `
        CALL rrhh.sp_update_sector($1, $2, $3)
      `,
        [getCode, updateSector.name, updateSector.description]
      );

      if ([null, "", 0].includes(sectorUpdate[0])) {
        ExceptionsMessages.errorProcess();
      }
      ExceptionsMessages.update(`EL SECTOR ${updateSector.name}`);
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  private async obtainSector(sector_code: string) {
    return await this.sectorRepository.query(`
    select * from rrhh.vw_show_all_sector vsas where vsas.code = '${sector_code}'
    `);
  }

  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.sectorRepository.query(`
      select * from rrhh.vw_show_all_sector vsas where vsas.code LIKE '%${searchOptions}%' or vsas.name LIKE '${searchOptions.toUpperCase()}' limit ${limit} offset ${
        page * limit
      }
    `);
  }

  private async maxPage(searchOptions: string, limit: number) {
    return await this.sectorRepository.query(`
      select count(*) as max_page from rrhh.vw_show_all_sector vsas where vsas.code LIKE '%${searchOptions.toUpperCase()}%' or vsas.name LIKE '%${searchOptions.toUpperCase()}%' limit ${limit}
    `);
  }
}
