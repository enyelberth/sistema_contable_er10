import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bitacora } from "./entities/bitacora.entity";
import { Repository } from "typeorm";

@Injectable()
export class BitacoraService {
  constructor(
    @InjectRepository(Bitacora)
    private readonly bitacoraRepository: Repository<Bitacora>,
  ) {}

  async getBitacora(
    searchOptions: string,
    from: string,
    to: string,
    limit: number,
    page: number,
  ) {
    try {
      const getData = await this.getData(searchOptions, from, to, limit, page);

      const maxPage = await this.maxPage(searchOptions, from, to, limit);

      return {
        getData: getData,
        maxPage: Math.ceil(maxPage[0].max_page / limit) - 1,
        totalRows: Number(maxPage[0].max_page),
      };
    } catch (error) {}
  }

  async getDetailBitacora(id: number) {
    return await this.bitacoraRepository.query(`
      select * from "system".vw_show_bitacora vsb where vsb.id = '${id}'
    `);
  }

  private async getData(
    searchOptions: string,
    from: string,
    to: string,
    limit: number,
    page: number,
  ) {
    searchOptions.toUpperCase();
    return await this.bitacoraRepository.query(`
    select
	    vsb.id,
      vsb.origin,
	    vsb.service,
	    vsb.description,
      vsb.name_role,
	    vsb.username,
      to_char(vsb.create_at, 'DD/MM/YYYY HH12:MI:SS AM') as time
	  from "system".vw_show_bitacora vsb
      where (vsb.origin like '%${searchOptions}%'
        or vsb.service like '%${searchOptions}%'
        or vsb.description like '%${searchOptions}%'
        or vsb.username like '%${searchOptions}%'
        or vsb.name_role like '%${searchOptions}%')
        ${from ? `and (vsb.create_at between TO_TIMESTAMP('${from}', 'DD/MM/YYYY HH24:MI') and TO_TIMESTAMP('${to}', 'DD/MM/YYYY HH24:MI')) ` : ""}
    order by vsb.id DESC
    limit ${limit} offset ${page * limit}
    `);
  }

  private async maxPage(
    searchOptions: string,
    from: string,
    to: string,
    limit: number,
  ) {
    //searchOptions.toUpperCase();

    return await this.bitacoraRepository.query(`
      select count(*) as max_page from "system".vw_show_bitacora vsb
        where (vsb.origin like '%${searchOptions}%'
        or vsb.service like '%${searchOptions}%'
        or vsb.description like '%${searchOptions}%'
        or vsb.username like '%${searchOptions}%'
        or vsb.name_role like '%${searchOptions}%')
        ${from ? `and (vsb.create_at between TO_TIMESTAMP('${from}', 'DD/MM/YYYY HH24:MI') and TO_TIMESTAMP('${to}', 'DD/MM/YYYY HH24:MI')) ` : ""}
      limit ${limit}
    `);
  }
}
