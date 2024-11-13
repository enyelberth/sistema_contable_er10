import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGeneratorCode1705770409666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `
        create or replace function "system".code_generator(code text) returns varchar(9)
        as $$
        declare
          aux_count integer;
          aux_acronym text;
        begin
          if code = 'role' then
            select count(*) into aux_count from "system".role;
            aux_acronym := 'RLU-';
          elsif code = 'user' then
            select count(*) into aux_count from "system".user;
            aux_acronym := 'USR-';
          elsif code = 'status' then
            select count(*) into aux_count from "system".status;
            aux_acronym := 'STS-';
          elsif code = 'module' then
            select count(*) into aux_count from "system".modules;
            aux_acronym := 'MDL-';
          end if;
          return concat(aux_acronym, substring('00000', length(aux_count::character varying)+1,4),aux_count::character varying);
        end;
        $$ language plpgsql;

        CREATE
OR REPLACE FUNCTION estate.code_generator (code text) RETURNS character varying LANGUAGE plpgsql AS $function$
        declare
          aux_count integer;
          aux_acronym text;
        begin
          if code = 'inventory' then
            select count(*) into aux_count from "estate".inventory;
            aux_acronym := 'INV-';
          elsif code = 'movement' then
            select count(*) into aux_count from "estate".movement;
            aux_acronym := 'MOV-';
          end if;
          return concat(aux_acronym, substring('00000', length(aux_count::character varying)+1,4),aux_count::character varying);
        end;
        $function$;

        create or replace function "rrhh".code_generator(code text)
        returns varchar(9)
        as $$
        declare
          aux_count integer;
          aux_acronym text;
        begin
          if code = 'datum' then
            select count(*) into aux_count from "rrhh".personal_datum;
            aux_acronym := 'PDT-';
          elsif code = 'job_position' then
            select count(*) into aux_count from "rrhh".job_position;
            aux_acronym := 'JBP-';
          elsif code = 'employed' then
            select count(*) into aux_count from "rrhh".employeed;
            aux_acronym := 'EMP-';
          end if;
          return concat(aux_acronym, substring('00000', length(aux_count::character varying)+1,4),aux_count::character varying);
        end;
        $$ language plpgsql;

        create or replace function "informatic".code_generator(code text)
        returns varchar(9)
        as $$
        declare
          aux_count integer;
          aux_acronym text;
        begin
          if code = 'rpu' then
            select count(*) into aux_count from "informatic".rpu;
            aux_acronym := 'RPU-';
          elsif code = 'physical_location' then
            select count(*) into aux_count from "informatic".physical_location;
            aux_acronym := 'PLC-';
          elsif code = 'movable_propety_per_rpu_status' then
            select count(*) into aux_count from "informatic".movable_property_per_rpu_status;
            aux_acronym := 'MPR-';
          end if;
          return concat(aux_acronym, substring('00000', length(aux_count::character varying)+1,4),aux_count::character varying);
        end;
        $$ language plpgsql;
`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
