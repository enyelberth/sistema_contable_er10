import { Injectable } from "@nestjs/common";
import { CreateRoleDto, UpdateRoleDto } from "./dto/role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  exception = ExceptionsMessages;

  async createRole(role: CreateRoleDto, userCode: string) {
    try {
      const roleFound = this.obtainRole(role.name_role);

      if (roleFound[0]) {
        this.exception.alreadyExists(`EL ROL ${role.name_role}`);
      }

      const newRole = await this.roleRepository.query(
        `
      CALL "system".sp_create_role($1, $2, $3, $4)
    `,
        [role.name_role, role.description, userCode, ""]
      );

      if ([null, ""].includes(newRole[0])) {
        this.exception.errorProcess();
      }

      this.exception.create(role.name_role, newRole[0]._code);
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }

  async getRoles(searchOptions: string, limit: number, page: number) {
    try {
      const getData = await this.getData(searchOptions, limit, page);

      const maxPage = await this.maxPage(searchOptions, limit);

      return {
        getData: getData,
        maxPage: Math.ceil(maxPage[0].max_page / limit) - 1,
        totalRows: Number(maxPage[0].max_page),
      };
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }

  async getRole(role_code: string) {
    try {
      const getData = await this.roleRepository.query(`
        select * from "system".vw_show_all_role vsar where vsar.code LIKE '%${role_code.toUpperCase()}%'
      `);

      return {
        getData: getData[0],
      };
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }

  async updateRole(updateRole: UpdateRoleDto, role_code: string) {
    try {
      role_code = role_code.toUpperCase();

      const getData = await this.obtainRoleCode(role_code);
      if (!getData[0]) {
        this.exception.notFound(`EL ROL ${updateRole.name_role}`);
      }

      const validateRoleOnUser = await this.validateRoleOnUser(role_code);

      if (!!validateRoleOnUser[0]) {
        this.exception.roleOnUser();
      }

      const getCode = getData[0].code;
      const roleUpdate = await this.roleRepository.query(
        `
        call "system".sp_update_role($1, $2, $3)`,
        [getCode, updateRole.name_role, updateRole.description]
      );

      if ([null, "", 0].includes(roleUpdate[0])) {
        this.exception.errorProcess();
      } else {
        this.exception.update(roleUpdate.name_role);
      }
    } catch (error) {
      this.exception.createErrorSignature(error);
    }
  }

  //NOTE: METODOS PRIVADOS
  private async obtainRoleCode(code: string) {
    return await this.roleRepository.query(`
    select vsar.code from "system".vw_show_all_role vsar where vsar.code = '${code}'
    `);
  }

  // private validatedLimit(limit: number) {
  //   if (typeof limit === "string") {
  //     limit = parseInt(limit);
  //   }
  //
  //   const allowedLimits = [5, 10, 15, 20];
  //   if (!allowedLimits.includes(limit)) {
  //     this.exception.setMessage = {
  //       state: "CONFLICT",
  //       type: "warning",
  //       message:
  //         "El límite de datos a mostrar por página debe ser 5, 10, 15 o 20",
  //     };
  //     this.exception.createErrorSignature();
  //   }
  //
  //   return limit;
  // }

  private async obtainRole(name_role: string) {
    return await this.roleRepository.query(`
    select * from "system".vw_show_all_role vsar where vsar.name_role = '${name_role.toUpperCase}' 
    `)[0];
  }

  private async getData(
    searchOptions: string,
    validatedLimit: number,
    page: number
  ) {
    return await this.roleRepository.query(`
        select * from "system".vw_show_all_role vsar where vsar.code LIKE '%${searchOptions.toUpperCase()}%' or vsar.name_role LIKE '%${searchOptions.toUpperCase()}%' limit ${validatedLimit} offset ${
          page * validatedLimit
        }
      `);
  }

  private async maxPage(searchOptions: string, validatedLimit: number) {
    return await this.roleRepository.query(`
        select count(*) as max_page from "system".vw_show_all_role vsar where vsar.code LIKE '%${
          searchOptions.toUpperCase
        }%' or vsar.name_role LIKE '%${searchOptions.toUpperCase()}%' limit ${validatedLimit}
      `);
  }
  private async validateRoleOnUser(role_code: string) {
    return await this.roleRepository.query(`
    select u.role_code from "system"."role" r inner join
	    "system"."user" u on r.code = u.role_code 
	    where r.code = '${role_code}'
    `);
  }
}
