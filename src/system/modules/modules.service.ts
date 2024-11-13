import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Modules } from "./entities/module.entity";
import { Repository } from "typeorm";
import { CreateModuleDto, UpdateModuleDto } from "./dto/module.dto";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { AccessLevelService } from "../access-level/access-level.service";
import { RedisService } from "src/redis/redis.service";
@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private moduleRepository: Repository<Modules>,
    private accessLevel: AccessLevelService,
    private cacheService: RedisService,
  ) {}

  exception = ExceptionsMessages;

  async createModule(
    module: CreateModuleDto,
    role_code: string,
    userCode: string,
  ) {
    let tree_level = 1;
    let place: number;
    let obtainPathern: any;

    try {
      module.name_module = module.name_module.toUpperCase();
      module.pathern_code = module.pathern_code.toUpperCase();

      if (["null", "NULL", "", "undefined"].includes(module.pathern_code))
        module.pathern_code = null;

      const moduleFound = await this.moduleFound(
        module.name_module,
        module.pathern_code,
      );

      if (!!moduleFound[0]) {
        this.exception.alreadyExists(`EL MODULO ${module.name_module}`);
      }

      if (module.pathern_code) {
        obtainPathern = await this.obtainPathern(module.pathern_code);
        tree_level = obtainPathern[0].tree_level + 1;

        if (tree_level > 3) {
          this.exception.treeOverLevel();
        }

        const lastChildren = await this.lastChildren(module.pathern_code);
        place = lastChildren ? lastChildren[0].place + 1 : 0;
      } else {
        obtainPathern = await this.lastChildren(null);
        place = obtainPathern ? obtainPathern[0].place + 1 : 0;
      }
      const newModule = await this.createNewModule(
        module,
        place,
        tree_level,
        userCode,
      );

      if ([null, " "].includes(newModule[0])) {
        this.exception.errorProcess();
      }
      const menu = await this.accessLevel.findAccessLevelByUser(role_code);
      await this.cacheService.update(role_code, menu);
      this.exception.create(module.name_module, newModule[0]._code);
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }

  //metodo para obtener los modulos registrados
  async getModules(
    searchOptions: string,
    onlyPathern: boolean,
    limit: string,
    page: number,
  ) {
    try {
      const parsed_limit = parseInt(limit);
      //const parsed_page = parseInt(page);
      const getData = await this.getData(
        searchOptions,
        onlyPathern,
        parsed_limit,
        page,
      );

      const maxPage = await this.maxPage(
        onlyPathern,
        searchOptions,
        parsed_limit,
      );

      return {
        getData: getData,
        maxPage: Math.ceil(maxPage[0].max_page / parsed_limit) - 1,
        totalRows: Number(maxPage[0].max_page),
      };
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }

  //Metodo para obtener 1 modulo especifico por codigo de modulo

  async getModule(module_code: string) {
    const getData = await this.moduleRepository.query(
      `select * from "system".vw_show_all_module vsam where vsam.code LIKE '%${module_code.toUpperCase()}%' limit 1`,
    );
    return { getData: getData[0] };
  }

  //Metodo para actualizar un modulo
  async updateModules(
    updateModuleDto: UpdateModuleDto,
    module_code: string,
    userCode: string,
    role_code: string,
  ) {
    try {
      module_code = module_code.toUpperCase();
      const getData = await this.obtainModule(module_code);
      const getCode = getData[0].code;

      if (
        ["null", "NULL", "", "undefined"].includes(updateModuleDto.pathern_code)
      )
        updateModuleDto.pathern_code = null;

      const moduleUpdate = await this.moduleRepository.query(
        `call "system".sp_update_module($1, $2, $3, $4, $5, $6, $7)`,
        [
          getCode,
          updateModuleDto.pathern_code,
          updateModuleDto.name_module,
          updateModuleDto.src,
          updateModuleDto.icon,
          updateModuleDto.active,
          userCode
        ],
      );
      const menu = await this.accessLevel.findAccessLevelByUser(role_code);
      await this.cacheService.update(role_code, menu);
      this.exception.update(updateModuleDto.name_module);
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }

  //NOTE: METODOS PRIVADOS
  private async moduleFound(name_module: string, pathern_code: string) {
    return await this.moduleRepository.query(`
    select vsam.name_module, vsam.pathern_code from "system".vw_show_all_module vsam where vsam.name_module = '${name_module}' AND ${
      pathern_code
        ? `vsam.pathern_code = '${pathern_code}'`
        : `vsam.pathern_code is null`
    }
    `);
  }

  private async obtainPathern(pathern_code: string) {
    return await this.moduleRepository.query(`
      select vsam.tree_level from "system".vw_show_all_module vsam where vsam.code = '${pathern_code}'
    `);
  }

  private async lastChildren(pathern_code: string) {
    return await this.moduleRepository.query(`
    select vsam.place from "system".vw_show_all_module vsam where ${
      pathern_code
        ? `vsam.pathern_code = '${pathern_code}'`
        : `vsam.pathern_code is null`
    } ORDER BY place DESC 
    `);
  }

  private async getData(
    searchOptions: string,
    onlyPathern: boolean,
    limit: number,
    page: number,
  ) {
    return await this.moduleRepository.query(
      `
        select * from "system".vw_show_all_module vsam 
          where
            case
              when ${onlyPathern} then vsam.tree_level in (1,2)
              else vsam.tree_level IN (1,2,3)
            end
            AND (
            vsam.code LIKE '%${searchOptions.toUpperCase()}%'
            OR vsam.pathern_code LIKE '%${searchOptions.toUpperCase()}%'
            OR vsam.name_module LIKE '%${searchOptions.toUpperCase()}%'
          )
        LIMIT ${limit} OFFSET ${page * limit}
      `,
      //`
      // select * from "system".vw_show_all_module vsam where ${
      //   onlyPathern
      //     ? "vsam.tree_level < 3"
      //     : `vsam.code LIKE '%${searchOptions.toUpperCase()}%' or vsam.pathern_code LIKE '%${searchOptions.toUpperCase()}%' or vsam.name_module LIKE '%${searchOptions.toUpperCase()}%'
      //     or vsam.pathern_code like '%${searchOptions.toUpperCase()}%' and vsam.tree_level < 2 limit ${limit} offset ${
      //       page * limit
      //     }`
      // }
      //`
    );
  }
  private async maxPage(
    onlyPathern: boolean,
    searchOptions: string,
    validatedLimit: number,
  ) {
    return await this.moduleRepository.query(
      `
        select count(*) as max_page from "system".vw_show_all_module vsam 
          where
            case 
              when ${onlyPathern} then vsam.tree_level in (1,2)
              else vsam.tree_level in (1,2,3)
            end 
            and (
            vsam.code like '%${searchOptions.toUpperCase()}%'
            OR vsam.name_module like '%${searchOptions.toUpperCase()}%
            ')
            limit '${validatedLimit}'
      `,
    );
  }

  private async obtainModule(module_code: string) {
    return await this.moduleRepository.query(`
      select vsam.code from "system".vw_show_all_module vsam where vsam.code = '${module_code}'
    `);
  }

  private normalizeModule(module: CreateModuleDto): void {
    module.name_module = module.name_module.toUpperCase();
    module.pathern_code = module.pathern_code.toUpperCase();

    if (["null", "NULL", "", "undefined"].includes(module.pathern_code)) {
      module.pathern_code = null;
    }
  }

  private async checkoutModuleExists(module: CreateModuleDto): Promise<void> {
    const moduleFound = await this.moduleFound(
      module.name_module,
      module.pathern_code,
    );

    if (module[0]) {
      this.exception.alreadyExists(`EL MODULO ${module.name_module}`);
    }
  }

  private calculateTreeLevel(obtainPathern: any): number {
    const tree_level = obtainPathern[0].tree_level + 1;

    if (tree_level > 3) {
      this.exception.treeOverLevel();
    }

    return tree_level;
  }

  private async getPlace(patherCode: string): Promise<number> {
    const lastChildren = await this.lastChildren(patherCode);
      console.log(lastChildren)
    return lastChildren.length !==0 ? lastChildren[0].place + 1 : 0;
  }

  private async createNewModule(
    module: CreateModuleDto,
    place: number,
    tree_level: number,
    userCode: string,
  ): Promise<any> {
    return await this.moduleRepository.query(
      'CALL "system".sp_create_module($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10)',
      [
        module.pathern_code,
        place,
        tree_level,
        module.name_module,
        module.src,
        module.icon,
        true,
        JSON.stringify(module.access),
        userCode,
        "",
      ],
    );
  }
}
