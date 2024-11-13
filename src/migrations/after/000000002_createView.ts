import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViews1705771177510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `
      create or replace view "system".vw_show_all_role as
        select r.code, r.name_role, r.description from "system"."role" r order by r.code asc;

      create or replace view "rrhh".vw_show_all_job_position as
        select jp.code, jp.job_name, jp.description from "rrhh"."job_position" jp order by jp.code asc;

      create or replace view "system".vw_show_all_module as
        select m.code, m.tree_level, m.place, m.pathern_code, p.name_module  as pathern_name, m.name_module, m.src, m.icon, m.active 
        from "system"."modules" m
        left join "system".modules p on p.code = m.pathern_code
        order by m.code asc;

      create or replace view "informatic".vw_show_all_physical_location as select * from informatic.physical_location pl where code <> pl.administrative_unit_code;

      create or replace view "rrhh".vw_show_all_sector as select s.code,s.name, s.description from "rrhh".sector s order by s.code asc;

      CREATE OR REPLACE VIEW rrhh.vw_show_all_program
      AS SELECT p.code,
          p.name,
          p.description,
          s.name  as sector_name,
          s.code as sector_code
        FROM rrhh.program p
        inner join rrhh.sector s on s.code = p.sector_code
        ORDER BY code;

      CREATE OR REPLACE VIEW rrhh.vw_show_all_activity
      AS SELECT a.code,
          a.name,
          a.description,
        p.name as program_name,
        p.code as program_code
        FROM rrhh.activity a
        inner join rrhh.program p on p.code = a.program_code
        ORDER BY a.code;

      create or replace view "rrhh".vw_show_all_administrative_unit as select au.code as "administrative_unit_code",au.sector_code,au.program_code,au.activity_code, au.name as "administrative_unit_name", au.description as "administrative_unit_description", s.name as "sector_name", p.name as "program_name", a.name as "activity_name" from rrhh.administrative_unit au 
      inner join rrhh.activity a on a.code = au.activity_code
      inner join rrhh."program" p on p.code = a.program_code and p.code = au.program_code
      inner join rrhh.sector s on s.code = p.sector_code and s.code = au.sector_code
      order by au.code asc;

      create or replace view "rrhh".vw_show_all_employeed as SELECT e.code,
    e.personal_data_code,
    e.job_position_code,
    e.administrative_unit_code,
    pd.first_name,
    pd.last_name,
    pd.identify_acronym,
    pd.identify_number,
    pd.birth_date,
    pd.gender,
    pd.phone_number,
    pd.home_address,
    jp.job_name,
    au.name AS administrative_unit_name,
    au.code AS administrative_code,
    s.name AS sector_name,
    s.code AS sector_code,
    p.name AS program_name,
    p.code AS program_code,
    a.name AS activity_name,
    a.code AS activity_code
   FROM rrhh.employeed e
     LEFT JOIN rrhh.personal_datum pd ON e.personal_data_code::text = pd.code::text
     LEFT JOIN rrhh.job_position jp ON e.job_position_code::text = jp.code::text
     LEFT JOIN rrhh.administrative_unit au ON au.code::text = e.administrative_unit_code::text
     inner JOIN rrhh.activity a ON a.code::text = au.activity_code::text
     inner JOIN rrhh.program p ON p.code::text = a.program_code::text AND p.code::text = au.program_code::text
     inner JOIN rrhh.sector s ON s.code::text = p.sector_code::text AND s.code::text = au.sector_code::text;;

      create or replace view "system"."vw_show_module_by_role" as select m.code as module_code,
        m.pathern_code,
        al.role_code,
        m.name_module,
        m.place,
        m.tree_level,
        m.src,
        m.icon
        from "system".access_level al
        join "system".modules m on m.code = al.module_code
        where m.active = true and al.name = 'MENU' and al.status = true order by m.code asc;

      CREATE OR REPLACE VIEW "system".vw_show_user_info
      AS SELECT u.code,
    u.username AS "user",
    u.enabled,
    u.role_code,
    u.status_code,
    u.password,
    r.name_role AS rol,
    st.name AS status,
    e.code AS employee_code,
    e.personal_data_code,
    e.job_position_code,
    e.administrative_unit_code,
    pd.first_name,
    pd.last_name,
    pd.identify_acronym,
    pd.identify_number,
    pd.birth_date,
    pd.gender,
    pd.phone_number,
    pd.home_address,
    jp.job_name AS job_tittle,
    au.name AS administrative_unit_name,
    au.code AS administrative_code,
    s.name AS sector_name,
    s.code AS sector_code,
    p.name AS program_name,
    p.code AS program_code,
    a.name AS activity_name,
    a.code AS activity_code
   FROM system."user" u
     inner JOIN "system".status st ON st.code::text = u.status_code::text
     inner JOIN "system".role r ON r.code::text = u.role_code::text
     inner JOIN rrhh.employeed e ON e.code::text = u.employee_code::text
     inner JOIN rrhh.personal_datum pd ON e.personal_data_code::text = pd.code::text
     inner JOIN rrhh.job_position jp ON e.job_position_code::text = jp.code::text
     inner JOIN rrhh.administrative_unit au ON au.code::text = e.administrative_unit_code::text
     inner JOIN rrhh.activity a ON a.code::text = au.activity_code::text
     inner JOIN rrhh.program p ON p.code::text = a.program_code::text AND p.code::text = au.program_code::text
     inner JOIN rrhh.sector s ON s.code::text = p.sector_code::text AND s.code::text = au.sector_code::text
  ORDER BY u.code;

create or replace view "system".vw_show_bitacora as SELECT
    b.id,
    b.origin,
    b.service,
    b.description,
    COALESCE(u.username, 'SYSTEM') AS username,
    COALESCE(u.enabled, true) AS enabled,
    COALESCE(s.name, 'SYSTEM') AS name_status,
    COALESCE(r.name_role, 'SYSTEM') AS name_role,
    COALESCE(au.name, 'SYSTEM') AS name_administrative_unit,
    COALESCE(pd.first_name, 'SYSTEM') AS first_name,
    COALESCE(pd.last_name, 'SYSTEM') AS last_name,
    b.create_at
FROM
    "system".bitacora b
    LEFT JOIN "system".user u ON b.user_code = u.code
    LEFT JOIN "system".status s ON u.status_code = s.code
    LEFT JOIN "system".role r ON u.role_code = r.code
    LEFT JOIN "rrhh".employeed e ON u.employee_code = e.code
    LEFT JOIN "rrhh".administrative_unit au ON e.administrative_unit_code = au.code
    LEFT JOIN "rrhh".personal_datum pd ON e.personal_data_code = pd.code;

create or replace view "estate".vw_show_group as SELECT
    g.code,
    g.name
    FROM
    "estate".group g;

create or replace view "estate".vw_show_sub_group as SELECT
    sg.code,
    sg.name,
    sg.group_code
    FROM
    "estate".sub_group sg;

create or replace view "estate".vw_show_section as SELECT
    s.code,
    s.name,
    s.group_code,
    s.sub_group_code
    FROM
    "estate".section s;





























`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
