import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessLevel } from "./entities/access-level.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
@Injectable()
export class AccessLevelService {
  constructor(
    @InjectRepository(AccessLevel)
    private readonly accessLevelRepository: Repository<AccessLevel>,
  ) {}

  async findAccessLevelByUser(role_code: string) {
    let access = await this.access(role_code);
    let getAccess = access
      .map((v, i) => {
        delete access[i].role_code;
        v.children = [];
        v.children = access.filter((z) => z.pathern_code === v.module_code);
        return v;
      })
      .filter((z) => z.tree_level === 1);

    return getAccess;
  }

  async accessByModule(module_code: string, role_code: string) {
    try {
      if (module_code == null && role_code == null) {
        ExceptionsMessages.errorProcess();
      }

      let getPermision = await this.accessLevelRepository.query(
        'select al.name::varchar, al.status from "system".access_level al left join "system".modules m on m.code = al.module_code where m.code = $1 and al.role_code = $2',
        [module_code.toUpperCase(), role_code.toUpperCase()]
      );

      if (getPermision) {
        let p = [];
        getPermision.forEach((v: any) => {
          p.push(`"${v.name}": ${v.status}`);
        });
        return JSON.parse(`{${p.join(",")}}`);
      }
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  //NOTE: METODOS PRIVADOS
  private async obtainRole(code: string) {
    return await this.accessLevelRepository.query(`
    select vsar.code from "system".vw_show_all_role vsar where vsar.code = '${code}'
   `);
  }

  private async accessLevelFound(module_code: string) {
    return await this.accessLevelRepository.query(`
    select * from "system".access_level al where al.module_code = '${module_code}'
  `);
  }

  private async access(role_code: string) {
    return await this.accessLevelRepository.query(`
    SELECT * from "system"."vw_show_module_by_role" vsmbr where vsmbr.role_code = '${role_code.toUpperCase()}'
   `);
  }

  private async accessLevelByRole(role_code: string) {
    return await this.accessLevelRepository.query(`
    select m.code as module_code,
	   m.pathern_code as pathern_code,
	   m.name_module as name_module,
     m.tree_level as tree_level,
	   al."name" as name_permission,
	   al.status as permission_status,
	   al.id as permission_code
    from "system".modules m 
    inner join "system".access_level al on m.code = al.module_code
    inner join "system"."role" r on al.role_code = r.code
      where r.code = '${role_code}'
  `);
  }

  //NOTE: metodo que se encarga de generar una estructura al JSON para la manipulacion de permisos en roles basados en niveles de arbol
  private async formatSQLResult(sqlResult) {
    let modules = [];
    sqlResult.forEach((item) => {
      const {
        module_code,
        pathern_code,
        name_module,
        tree_level,
        name_permission,
        permission_status,
        permission_code,
      } = item;

      if (!modules[module_code]) {
        modules[module_code] = {
          module_code,
          name_module,
          tree_level,
          pathern_code,
          permissions: [],
          children: [],
        };
      }
      modules[module_code].permissions.push({
        name: name_permission,
        status: permission_status,
        code: permission_code,
      });
    });

    modules = Object.values(modules)
      .map((v) => {
        v.children = [];

        v.children = Object.values(modules).filter(
          (z) => z.pathern_code === v.module_code
        );
        return v;
      })
      .filter((z) => z.tree_level === 1);
    return modules;
  }

  //NOTE: METODOS PUBLICOS
  public async findAccessLevelByRole(role_code: string) {
    role_code = role_code.toUpperCase();
    let access = await this.accessLevelByRole(role_code);
    return this.formatSQLResult(access);
  }

  public async updateStatusPermission(
    access: Array<{ status: boolean; code: number }>,
    role_code: string,
    userCode: string,
  ) {
    try {
      const updateAccessStatus = await this.accessLevelRepository.query(`
    CALL "system".sp_update_access_level($1::json, $2)
    `, [JSON.stringify(access), userCode]);

      if (["", null, undefined, 0].includes(updateAccessStatus)) {
        ExceptionsMessages.errorProcess();
      } else {
        const menu = await this.findAccessLevelByUser(role_code);
        ExceptionsMessages.update(
          `LOS PERMISOS`,
          "SE HAN ACTUALIZADO CON EXITO"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
