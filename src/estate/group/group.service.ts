import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { Modules } from "./entities/module.entity";
import { CreateGroupDto, UpdateGroupDto } from './tdo/group.dto';

import { CommandStartedEvent, Repository } from "typeorm";
// import { CreateModuleDto, UpdateModuleDto } from "./dto/module.dto";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { Group } from "./entities/group.entity";
// import { AccessLevelService } from "../access-level/access-level.service";
import { AccessLevel } from "../../system/access-level/entities/access-level.entity";
import { AccessLevelService } from "src/system/access-level/access-level.service";
import { GroupModule } from "./group.module";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private AccessLevel: AccessLevelService
  ) {}

  exception = ExceptionsMessages;
  async createGroup(module: CreateGroupDto) {
    try {
    } catch (error) {
      this.exception.createErrorSignature();
    }
  }
  //Metodo para obtener los grupos registrados
  async getGroups(searchOptions: string, limit: string, page: number) {
    try {
      const parselimit = parseInt(limit);
 
      const getData = await this.getData(searchOptions, parselimit, page);

      const maxPage = await this.maxPage(searchOptions,parselimit);

      return {
        getData,
        maxPage: Math.ceil(maxPage[0].max_page / parselimit) - 1,
        totalRows: Number(maxPage[0].max_page),
      };
    } catch (error) {
      this.exception.createErrorSignature();
    }
  }
  //Metodo para obtener un grupo Registrado

  // Finalizar se necesita terminar algunos de talles de este  function
  async getGroup(code: string) {
    const getData = await this.groupRepository.query(
      `
      select * from "estate".vw_show_group vsam where vsam.code LIKE  '%${code}%' limit 1`
    );
    return { getData: getData[0] };
  }
  // Finaliza metodo
  //Metodo para actualizar un grupo


  //Obtenemos un grupo ala vez mediante el codigo
  //Function functional
  private async obtainGroup(code:string){
    return await this.groupRepository.query(`
      select vsam.code from "estate".vw_show_group vsam where vsam.code = '${code}'
      `);
  }
  //
  //getData Obtememos mediante las vista todos los datos de la vista correspondiente
  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.groupRepository.query(
      `SELECT * FROM "estate".vw_show_group vsam where 
      (vsam.code LIKE '%${searchOptions}%'
      OR vsam.name LIKE '%${searchOptions.toUpperCase()}%'
      )
      LIMIT ${limit} OFFSET ${page*limit}`);
  }
  //maxPage  Cantidad de datos maxima que vamos a consultar en cada consulta
  private async maxPage(searchOptions: string, validateLimit: number) {
    return await this.groupRepository.query(`
      select count (*) as max_page from "estate".group vsui
          where
           vsui.name LIKE '%${searchOptions.toUpperCase()}%'
           or vsui.code LIKE '% ${searchOptions.toUpperCase()} %' limit '${validateLimit}'
      
      `);
  }
}
