import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonalDatum } from "./entities/personal-datum.entity";
import { Repository } from "typeorm";
import { ExceptionService } from "../../exceptions/exception.service";

@Injectable()
export class PersonalDataService {
  constructor(
    @InjectRepository(PersonalDatum)
    private readonly personalDataRepository: Repository<PersonalDatum>,
  ) {}

  exception = new ExceptionService();

  //  async getPerson(searchOptions: string, limit: number, page: number) {
  //    const getData = await this.personalDataRepository
  //      .createQueryBuilder("PersonalDatum")
  //      .select([
  //        "PersonalDatum.code",
  //        "PersonalDatum.first_name",
  //        "PersonalDatum.last_name",
  //        "PersonalDatum.identify_acronym",
  //        "PersonalDatum.identify_number",
  //        "PersonalDatum.birth_date",
  //        "PersonalDatum.gender",
  //        "PersonalDatum.phone_number",
  //        "PersonalDatum.home_address",
  //      ])
  //      .where(
  //        `PersonalDatum.identify_number LIKE '%${searchOptions}%' limit :limit offset ${
  //          page * limit
  //        }`,
  //        { limit: limit },
  //      )
  //      .getMany();
  //
  //    const maxPage = await this.personalDataRepository
  //      .createQueryBuilder("PersonalDatum")
  //      .where(`PersonalDatum.identify_number LIKE '%${searchOptions}%' `)
  //      .getCount();
  //
  //    return { getData, maxPage: Math.round(maxPage / limit) - 1 };
  //
  // }

  private async getPerson(searchOptions: string, limit: number, page: number) {
    return await this.personalDataRepository.query(`
     select pd.code, 
            pd.first_name, 
            pd.last_name, 
            pd.identify_acronym, 
            pd.identify_number, 
            pd.birth_date, 
            pd.gender, 
            pd.phone_number, 
            pd.home_address from rrhh.personal_datum pd 
    `);
  }
}
