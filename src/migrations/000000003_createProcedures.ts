import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProcedures1705770409667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
${
  // NOTE: create procedures
  ""
}
create or replace procedure "system".sp_create_role( _name character varying, _description character varying, _user_code character varying, out _code character varying)
  language plpgsql as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "system".role(name_role, description) values (upper(_name), upper(_description)) returning code into _code;
    insert into "system".access_level(role_code,module_code,name) (select _code, module_code,name from "system".access_level where role_code = 'RLU-00000');
  end
  $$;

  create or replace procedure "system".sp_create_bitacora_conexion(in _user_code character VARYING, in _description text)
    LANGUAGE plpgsql as $$
    BEGIN
      insert into "system".bitacora(origin,service,user_code,description) values ('SYSTEM','CONEXION',_user_code,UPPER(_description));
    end;
    $$;

CREATE OR REPLACE PROCEDURE "system".sp_create_access_level(IN _role_code character varying, in _permissions jsonb, _user_code character varying)
 LANGUAGE plpgsql
AS $procedure$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "system".access_level(id, "status") 
   	select id,
   	(p->>'id')::bigint,
   	(p->>'status')::bool
  	from jsonb_array_elements(_permissions::jsonb) as p on conflict do nothing;
  end
  $procedure$;

create or replace procedure "system".sp_create_status(_name character varying, _description character varying , _user_code character varying, out _code character varying)
  language plpgsql as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    INSERT INTO "system".status("name", description) values (upper(_name), upper(_description)) returning code into _code;
  end
  $$;

CREATE OR REPLACE PROCEDURE rrhh.sp_create_datum(IN _first_name character varying, IN _last_name character varying, IN _identify_acronym character varying, IN _identify_number character varying, IN _birth_date date, IN _gender character varying, IN _phone_number character varying, IN _home_address character varying, _user_code character varying, out _code character varying)
  LANGUAGE plpgsql
  AS $procedure$
  begin
    perform set_config('glb.user_current',_user_code,false);
    INSERT INTO "rrhh".personal_datum(first_name, last_name, identify_acronym, identify_number, birth_date, gender, phone_number, home_address) VALUES (UPPER(_first_name), UPPER(_last_name), UPPER(_identify_acronym), _identify_number, _birth_date, UPPER(_gender), _phone_number, UPPER(_home_address) ) returning code into _code;
  end
  $procedure$;

create or replace procedure rrhh.sp_create_job_position(_name character varying, _description character varying, _user_code character varying, out _code character varying)
  language plpgsql as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into rrhh.job_position(job_name, description) values (upper(_name), upper(_description)) returning code into _code;
  end
  $$;


CREATE OR REPLACE PROCEDURE rrhh.sp_create_employee(IN _job_position_code character varying, IN _administrative_unit_code character varying, IN _first_name character varying, IN _last_name character varying, IN _identify_acronym character varying, IN _identify_number character varying, IN _birth_date date, IN _gender character varying, IN _phone_number character varying, IN _home_address character varying, _user_code character varying, OUT _code character varying)

 LANGUAGE plpgsql
AS $procedure$
  declare 
    _personal_data_code varchar(9);
  begin
    perform set_config('glb.user_current',_user_code,false);

    INSERT INTO "rrhh".personal_datum(first_name, last_name, identify_acronym, identify_number, birth_date, gender, phone_number, home_address) VALUES (UPPER(_first_name), UPPER(_last_name), UPPER(_identify_acronym), _identify_number, _birth_date, UPPER(_gender), _phone_number, UPPER(_home_address) ) returning code into _personal_data_code;

    insert into rrhh.employeed(personal_data_code, job_position_code, administrative_unit_code) values (_personal_data_code, _job_position_code, _administrative_unit_code) returning code into _code;
   	
   	insert into informatic.physical_location_employed(employeed_code,physical_location_code) values (_code, _administrative_unit_code);
   
   	end
  $procedure$
;

create or replace procedure "system".sp_create_user(_role_code character varying, _employee_code character varying, _status_code character varying, _username character varying, _password character varying, _user_code character varying, out _code character varying)
  language plpgsql as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    INSERT INTO "system"."user" (role_code, employee_code, status_code, username, "password") VALUES (_role_code, _employee_code, _status_code, _username, _password) returning code into _code;
  end
  $$;
    
CREATE OR REPLACE PROCEDURE "system".sp_create_module(IN _pathern_code character varying, IN _place integer, IN _tree_level integer, IN _name_module character varying, IN _src character varying, IN _icon character varying, _active boolean, IN _permissions jsonb, _user_code character varying, out _code character varying)
  LANGUAGE plpgsql
  AS $procedure$
  declare 
    aux_code varchar;
    permissions_count bigInt;
  begin
    perform set_config('glb.user_current',_user_code,false);
    INSERT INTO "system".modules(pathern_code, name_module, place, tree_level, src, icon, active) VALUES (_pathern_code, UPPER(_name_module),  _place, _tree_level, _src, _icon,_active) returning code into aux_code;
    select count(*) into permissions_count from jsonb_array_elements(_permissions::jsonb);
   if permissions_count > 0 then
      insert into "system".access_level(role_code,module_code,name)
      select  r.code as role_code,
        aux_code as module_code,
        (p ->> 'name')::varchar as permission_name
        from
        "system"."role" r, jsonb_array_elements(_permissions::jsonb) as p;
    end if;
    _code := aux_code;
  end
  $procedure$;

create
or replace procedure "estate".sp_create_movement (
  _administrative_unit_code character varying,
  _motion_concept_code character varying,
  _details jsonb,
  _user_code character varying,
  out _code character varying
) language plpgsql as $$
declare
    details_count bigInt;
		inventory_record RECORD;  -- Declare a record variable for the loop
    _inventory_code CHARACTER VARYING;
  begin
    perform set_config('glb.user_current',_user_code,false);
    
    insert into "estate".movement(administrative_unit_code,motion_concept_code,observation) 
    values (_administrative_unit_code,_motion_concept_code,'') returning code into _code;
    
  	select count(*) into details_count from jsonb_array_elements(_details::jsonb);
  
   if details_count > 0 and _motion_concept_code = '02' then
   
   FOR inventory_record IN 
            SELECT 
                (d ->> 'groupCode')::VARCHAR AS group_code,
                (d ->> 'subGroupCode')::VARCHAR AS sub_group_code,
                (d ->> 'sectionCode')::VARCHAR AS section_code,
                (d ->> 'description')::VARCHAR AS description,
                (d ->> 'amount')::FLOAT AS amount
            FROM jsonb_array_elements(_details::jsonb) AS d 
        LOOP
            INSERT INTO "estate".inventory (group_code, sub_group_code, section_code, description, amount)
            VALUES (inventory_record.group_code, inventory_record.sub_group_code, 
                    inventory_record.section_code, inventory_record.description, 
                    inventory_record.amount)
            RETURNING code INTO _inventory_code;
            if _inventory_code is not null then
              INSERT INTO "estate".movement_details(movement_code, inventory_code, description, amount)
              VALUES (_code, _inventory_code, inventory_record.description, inventory_record.amount);
            else 
            RAISE WARNING 'Failed to insert inventory for %', _inventory_code;
            end if;
        END LOOP;
    end if;
  end
  $$;

create or replace procedure "estate".sp_create_movable_propety_type(_name character varying,_description character varying, _user_code character varying, out _code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".movable_propety_type(name,description) values (upper(_name),upper(_description)) returning code into _code;
  end
  $$;

create or replace procedure "estate".sp_create_movable_propety_status(_name character varying, _description character varying, _user_code character varying, out _code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".movable_propety_status(name,descriptions) values (upper(_name),upper(_description)) returning code into _code;
  end 
  $$;

create or replace procedure "estate".sp_create_movable_propety_in_administrative_status(_name character varying, _description character varying, _user_code character varying, out _code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".movable_propety_in_administrative_status(name,descriptions) values (upper(_name),upper(_description)) returning code into _code;
  end 
  $$;

create or replace procedure "estate".sp_create_movable_propety_in_administrative_unit(_movable_propety_code character varying, _status_code character varying, _administrative_unit_code character varying, _user_code character varying, out _code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".movable_propety_in_administrative_unit(movable_propety_code, status_code, administrative_code) values (movable_propety_code, status_code, administrative_code) returning code into _code;
  end
  $$;

create or replace procedure "estate".sp_create_movable_propety(_type_code character varying, _serial character varying, _color character varying, _material character varying, _description character varying, _mark character varying, _model character varying, _cost_iva float, _cost_no_iva float, _invoice_num character varying, _status_code character varying, _user_code character varying, out _code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".movable_propety(type_code, status_code, serial, color, material, description, mark, model, cost_iva, cost_no_iva, invoice_num) 
    values (_type_code, _status_code, _serial, upper(_color), upper(_material), upper(_description), upper(_mark), upper(_model), _cost_iva, _cost_no_iva, _invoice_num) returning code into _code;
  end 
  $$;

create or replace procedure "estate".sp_create_group(_code varchar(2), _name varchar(150), _description text, _user_code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".group(code,name,description) 
    values (_code,_name,_description);
  end 
  $$;

create or replace procedure "estate".sp_create_sub_group(_group_code varchar(2), _code varchar(2), _name varchar(150), _description text, _user_code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".sub_group(group_code,code,name,description) 
    values (_group_code,_code,_name,_description);
  end 
  $$;

create or replace procedure "estate".sp_create_section(_group_code varchar(2), _sub_group_code varchar(2), _code varchar(2), _name varchar(150), _description text, _user_code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "estate".section(group_code,sub_group_code,code,name,description) 
    values (_group_code,_sub_group_code,_code,_name,_description);
  end 
  $$;

create or replace procedure "rrhh".sp_create_sector(inout _code varchar(1), _name varchar,_description text, _user_code character varying)
  language plpgsql 
  as $$
  begin 
    perform set_config('glb.user_current',_user_code,false);
    insert into "rrhh".sector(code,name,description) values (_code,upper(_name),upper(_description)) returning code into _code;
  end
  $$;

create or replace procedure "rrhh".sp_create_program( _sector_code varchar(2), inout _code varchar(2), _name varchar, _description text,  _user_code character varying)
  language plpgsql 
  as $$
  begin 
    perform set_config('glb.user_current',_user_code,false);
    insert into "rrhh".program(code,sector_code,name,description) values (_code, _sector_code,upper(_name), upper(_description)) returning code into _code;
  end
  $$;

create or replace procedure "rrhh".sp_create_activity(_sector_code varchar(2),_program_code varchar(2), inout _code varchar(2), _name varchar,_description text, _user_code character varying) language plpgsql as $$
  begin 
    perform set_config('glb.user_current',_user_code,false);
    insert into "rrhh".activity(code, program_code,sector_code,name,description) values (_code, _program_code,_sector_code,upper(_name), upper(_description)) returning code into _code;
  end
  $$;

create or replace procedure "rrhh".sp_create_administrative_unit(_sector_code varchar(2), _program_code varchar(2), _activity_code varchar(2),_name varchar, _description text, _user_code character varying, out _code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    insert into "rrhh".administrative_unit(code, sector_code, program_code, activity_code, name, description) values (concat(_sector_code,_program_code,_activity_code), _sector_code, _program_code, _activity_code, upper(_name), upper(_description)) returning code into _code;
  end
  $$;

${
  // NOTE: update procedures
  ""
}

CREATE OR REPLACE PROCEDURE rrhh.sp_update_employee(IN _job_position_code character varying, IN _first_name character varying, IN _last_name character varying, IN _identify_acronym character varying, IN _identify_number character varying, IN _birth_date date, IN _gender character varying, IN _phone_number character varying, IN _home_address character varying , _user_code character varying,in _code character varying)
  LANGUAGE plpgsql
  AS $procedure$
  declare 
    _personal_data_code varchar(9);
  begin
    perform set_config('glb.user_current',_user_code,false);
    update rrhh.employeed set job_position_code = _job_position_code where code = _code returning personal_data_code into _personal_data_code;

    update "rrhh".personal_datum set first_name = _first_name, last_name = _last_name , identify_acronym = _identify_acronym, identify_number = _identify_number, birth_date = _birth_date, gender = _gender, phone_number = _phone_number, home_address = _home_address where code = _personal_data_code;
  end
  $procedure$;

CREATE OR REPLACE PROCEDURE rrhh.sp_update_job_position(IN _code character varying, In _name character varying, In _description text, _user_code character varying)
  LANGUAGE plpgsql
  AS $procedure$
  begin
    perform set_config('glb.user_current',_user_code,false);
    update "rrhh".job_position set description = upper(_description), job_name = upper(_name) where code = _code;
  end
  $procedure$;


CREATE
OR REPLACE PROCEDURE "system".sp_update_access_level(IN _permissions jsonb, _user_code character varying) LANGUAGE plpgsql AS
$$
BEGIN
    perform set_config('glb.user_current',_user_code,false);
UPDATE
    "system".access_level
SET
    STATUS = permissions.status
FROM
    (
        SELECT
            (p ->> 'code') :: bigint AS code,
            (p ->> 'status') :: bool AS STATUS
        FROM
            jsonb_array_elements(_permissions :: jsonb) AS p
    ) AS permissions
WHERE
    id = permissions.code;

UPDATE
    "system".access_level
SET
    STATUS = pemissions.status
FROM
    (
        SELECT
            p.code AS code,
            false AS STATUS
        FROM
            (
                SELECT
                    (per ->> 'code') :: bigint AS code,
                    (per ->> 'status') :: bool AS STATUS
                FROM
                    jsonb_array_elements(_permissions :: jsonb) AS per
            ) AS p
            INNER JOIN "system".access_level a ON a.id = p.code
            INNER JOIN "system".modules m ON a.module_code = m.code
        WHERE
            m.pathern_code IN (
                SELECT
                    m.code
                FROM
                    (
                        SELECT
                            (per ->> 'code') :: bigint AS code,
                            (per ->> 'status') :: bool AS STATUS
                        FROM
                            jsonb_array_elements(_permissions :: jsonb) AS per
                    ) AS p
                    INNER JOIN "system".access_level a ON a.id = p.code
                    INNER JOIN "system".modules m ON a.module_code = m.code
                WHERE
                    p.status = false
                    AND a.name = 'MENU'
                    AND tree_level <= 2
                GROUP BY
                    m.code
            )
    ) AS pemissions
WHERE
    id = pemissions.code;
END
$$
;

CREATE OR REPLACE procedure "system".sp_update_module(_code character varying, _pathern_code character varying, _name_module character varying, _src character varying, _icon character varying, _active boolean, _user_code character varying)
  LANGUAGE plpgsql
  AS $$
  begin
    perform set_config('glb.user_current',_user_code,false);
      update "system".modules set (name_module,src,icon,active,pathern_code,update_at) = (UPPER(_name_module), _src, _icon, _active , _pathern_code, now())
      where code = _code;
  end;
  $$;

create or replace procedure "system".sp_update_role(_code character varying, _name_role character varying, _description character varying, _user_code character varying)
    language plpgsql
    as $$
    begin
    perform set_config('glb.user_current',_user_code,false);
        update "system".role set (name_role,description, update_at) = (UPPER(_name_role),UPPER(_description),now()) 
        where code = _code;
    end
    $$;

create or replace procedure "estate".sp_update_movable_propety(_code character varying, _type_code character varying, _serial character varying, _color character varying, _material character varying, _description character varying, _mark character varying, _model character varying, _cost_iva float, _cost_no_iva float, _invoice_num character varying, _status_code character varying, _user_code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    update "estate".movable_propety set (type_code, status_code, serial, color, material, description, mark, model, cost_iva, cost_no_iva, invoice_num,update_at) 
    = (_type_code, _status_code, _serial, upper(_color), upper(_material), upper(_description), upper(_mark), upper(_model), _cost_iva, _cost_no_iva, _invoice_num, now())
    where code = _code;
  end 
  $$;

create or replace procedure "rrhh".sp_update_sector(_code varchar(2), _name varchar,_description text, _user_code character varying)
  language plpgsql 
  as $$
  begin 
    perform set_config('glb.user_current',_user_code,false);
    update "rrhh".sector set (name,description,update_at) = (upper(_name),upper(_description),now()) where code = _code;
  end
  $$;

create or replace procedure "rrhh".sp_update_program(_code varchar(2), _name varchar,_description text, _user_code character varying)
  language plpgsql 
  as $$
  begin 
    perform set_config('glb.user_current',_user_code,false);
    update "rrhh".program set (name,description,update_at) = (upper(_name),upper(_description),now()) where code = _code;
  end
  $$;

create or replace procedure "rrhh".sp_update_activity(_code varchar(2), _program_code varchar(2), _name varchar,_description text, _user_code character varying)
  language plpgsql 
  as $$
  begin 
    perform set_config('glb.user_current',_user_code,false);
    update "rrhh".activity set (name,description,update_at) = (upper(_name),upper(_description),now()) where code = _code and program_code = _program_code;
  end
  $$;

create or replace procedure "rrhh".sp_update_administrative_unit(_code varchar(6),_name varchar, _description text, _user_code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    update "rrhh".administrative_unit set (name, description,update_at) = (upper(_name), upper(_description),now()) where code = _code;
  end
  $$;

create or replace procedure "system".sp_update_user(_code varchar(6), _role_code varchar, _status_code varchar, _password varchar, _enabled bool, _user_code character varying )
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    update "system".user set (role_code, status_code, password, enabled) = (_role_code,_status_code,_password,_enabled) where code = _code;
  end
  $$;

create or replace procedure "system".sp_update_user_password(_code varchar(6), _password varchar, _user_code character varying)
  language plpgsql
  as $$
  begin
    perform set_config('glb.user_current',_user_code,false);
    update "system".user set password = _password where code = _code;
  end
  $$;
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
drop procedure 
`);
  }
}
