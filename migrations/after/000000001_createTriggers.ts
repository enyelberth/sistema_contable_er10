import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProcedures1705770409668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
${
  // NOTE: create triggers
  ""
}

CREATE
OR REPLACE FUNCTION "rrhh".check_insert_sector() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'agrego un sector con los siguientes valores codigo: ',
    new.code,
    ' Nombre: ',
    new.name,
    ' Descripcion: ',
    new.description
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'SECTOR', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_sector BEFORE
INSERT
    ON "rrhh".sector FOR EACH ROW EXECUTE FUNCTION "rrhh".check_insert_sector();
CREATE
OR REPLACE FUNCTION "rrhh".check_update_sector() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Actualizo el sector ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.name <> old.name THEN concat(' Nombre: ', new.name)
    END,
    CASE
        WHEN new.description <> old.description THEN concat(' Descripcion: ', new.description)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'SECTOR', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_sector BEFORE
UPDATE
    ON "rrhh".sector FOR EACH ROW EXECUTE FUNCTION "rrhh".check_update_sector();
--NOTE: program
CREATE
OR REPLACE FUNCTION "rrhh".check_insert_program() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'agrego un programa con los siguientes valores codigo: ',
    new.code,
    ' Nombre: ',
    new.name,
    ' Descripcion: ',
    new.description,
    ' Sector: ',
    new.sector_code
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'PROGRAMA', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_program BEFORE
INSERT
    ON "rrhh".program FOR EACH ROW EXECUTE FUNCTION "rrhh".check_insert_program();
CREATE
OR REPLACE FUNCTION "rrhh".check_update_program() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
--NOTE: solo cambiar el ultimo nombre
_description := concat(
    'Actualizo el programa ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.name <> old.name THEN concat(' Nombre: ', new.name)
    END,
    CASE
        WHEN new.description <> old.description THEN concat(' Descripcion: ', new.description)
    END,
    CASE
        WHEN new.sector_code <> old.sector_code THEN concat(' sector: ', new.sector_code)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'PROGRAMA', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_program BEFORE
UPDATE
    ON "rrhh".program FOR EACH ROW EXECUTE FUNCTION "rrhh".check_update_program();
-- activity
CREATE
OR REPLACE FUNCTION "rrhh".check_insert_activity() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'agrego un actividad con los siguientes valores codigo: ',
    new.code,
    ' Nombre: ',
    new.name,
    ' Descripcion: ',
    new.description,
    ' Programa: ',
    new.program_code
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'ACTIVIDAD', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_activity BEFORE
INSERT
    ON "rrhh".activity FOR EACH ROW EXECUTE FUNCTION "rrhh".check_insert_activity();
CREATE
OR REPLACE FUNCTION "rrhh".check_update_activity() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
--NOTE: solo cambiar el ultimo nombre
_description := concat(
    'Actualizo la actividad ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.name <> old.name THEN concat(' Nombre: ', new.name)
    END,
    CASE
        WHEN new.description <> old.description THEN concat(' Descripcion: ', new.description)
    END,
    CASE
        WHEN new.program_code <> old.program_code THEN concat(' Programa:  ', new.program_code)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'ACTIVIDAD', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_activity BEFORE
UPDATE
    ON "rrhh".activity FOR EACH ROW EXECUTE FUNCTION "rrhh".check_update_activity();
-- Administrative unit
CREATE
OR REPLACE FUNCTION "rrhh".check_insert_administrative_unit() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Agrego una unidad administrativa con los siguientes valores codigo: ',
    new.code,
    ' Nombre: ',
    new.name,
    ' Descripcion: ',
    new.description,
    ' Sector: ',
    new.sector_code,
    ' Programa: ',
    new.program_code,
    ' Actividad: ',
    new.activity_code
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'RRHH',
        'UNIDAD ADMINISTRATIVA',
        _user,
        UPPER(_description)
    );
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_administrative_unit BEFORE
INSERT
    ON "rrhh".administrative_unit FOR EACH ROW EXECUTE FUNCTION "rrhh".check_insert_administrative_unit();
CREATE
OR REPLACE FUNCTION "rrhh".check_update_administrative_unit() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
--NOTE: solo cambiar el ultimo nombre
_description := concat(
    'Actualizo la unidad administrativa ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.name <> old.name THEN concat(' Nombre: ', new.name)
    END,
    CASE
        WHEN new.description <> old.description THEN concat(' Descripcion: ', new.description)
    END,
    CASE
        WHEN new.sector_code <> old.sector_code THEN concat(' Sector: ', new.sector_code)
    END,
    CASE
        WHEN new.program_code <> old.program_code THEN concat(' Programa: ', new.program_code)
    END,
    CASE
        WHEN new.activity_code <> old.activity_code THEN concat(' Actividad: ', new.activity_code)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'RRHH',
        'ADMINISTRATIVE_UNIT',
        _user,
        UPPER(_description)
    );
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_administrative_unit BEFORE
UPDATE
    ON "rrhh".administrative_unit FOR EACH ROW EXECUTE FUNCTION "rrhh".check_update_administrative_unit();
-- Employeed
CREATE
OR REPLACE FUNCTION "rrhh".check_insert_employeed() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Agrego un empleado con los siguientes valores codigo: ',
    new.code,
    ' data personal: ',
    new.personal_data_code,
    ' Puesto de trabajo : ',
    new.job_position_code,
    ' Unidad administrativa: ',
    new.administrative_unit_code
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'EMPLEADO', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_employeed BEFORE
INSERT
    ON "rrhh".employeed FOR EACH ROW EXECUTE FUNCTION "rrhh".check_insert_employeed();
CREATE
OR REPLACE FUNCTION "rrhh".check_update_employeed() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
--NOTE: solo cambiar el ultimo nombre
_description := concat(
    'Actualizo el empleado ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.personal_data_code <> old.personal_data_code THEN concat(' datos Personales: ', new.personal_data_code)
    END,
    CASE
        WHEN new.job_position_code <> old.job_position_code THEN concat(' Puesto de trabajo: ', new.job_position_code)
    END,
    CASE
        WHEN new.administrative_unit_code <> old.administrative_unit_code THEN concat(
            ' unidad administrativa: ',
            new.administrative_unit_code
        )
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('RRHH', 'EMPLEADO', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_employeed BEFORE
UPDATE
    ON "rrhh".employeed FOR EACH ROW EXECUTE FUNCTION "rrhh".check_update_employeed();
-- job position
CREATE
OR REPLACE FUNCTION "rrhh".check_insert_job_position() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'agrego un puesto de trabajo con los siguientes valores codigo: ',
    new.code,
    ' Nombre : ',
    new.job_name,
    ' Description : ',
    new.description
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'RRHH',
        'PUESTO DE TRABAJO',
        _user,
        UPPER(_description)
    );
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_job_position BEFORE
INSERT
    ON "rrhh".job_position FOR EACH ROW EXECUTE FUNCTION "rrhh".check_insert_job_position();
CREATE
OR REPLACE FUNCTION "rrhh".check_update_job_position() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Actualizo el puesto de trabajo ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.job_name <> old.job_name THEN concat(' Nombre: ', new.job_name)
    END,
    CASE
        WHEN new.description <> old.description THEN concat(' Descripcion: ', new.description)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'RRHH',
        'PUESTO DE TRABAJO',
        _user,
        UPPER(_description)
    );
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_job_position BEFORE
UPDATE
    ON "rrhh".job_position FOR EACH ROW EXECUTE FUNCTION "rrhh".check_update_job_position();
-- personal data
CREATE
OR REPLACE FUNCTION "rrhh".check_insert_personal_datum() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'agrego Datos Personales con los siguientes valores codigo: ',
    new.code,
    ' Primer nombre: ',
    new.first_name,
    ' Segundo nombre: ',
    new.last_name,
    ' Identificador Acronimo: ',
    new.identify_acronym,
    ' Numero de identificacion: ',
    new.identify_number,
    ' Fecha de Nacimiento: ',
    new.birth_date,
    ' Gener: ',
    new.gender,
    ' Numero de telefono: ',
    new.phone_number,
    ' Direccion: ',
    new.home_address
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'RRHH',
        'DATOS PERSONALES',
        _user,
        UPPER(_description)
    );
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_personal_datum BEFORE
UPDATE
    ON "rrhh".personal_datum FOR EACH ROW EXECUTE FUNCTION "rrhh".check_insert_personal_datum();
CREATE
OR REPLACE FUNCTION "rrhh".check_update_personal_datum() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
--NOTE: solo cambiar el ultimo nombre
_description := concat(
    'Actualizo los datos Personales ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.first_name <> old.first_name THEN concat(' Primer nombre: ', new.first_name)
    END,
    CASE
        WHEN new.last_name <> old.last_name THEN concat(' Segundo nombre: ', new.last_name)
    END,
    CASE
        WHEN new.identify_acronym <> old.identify_acronym THEN concat(
            ' Identificador Acronimo: ',
            new.identify_acronym
        )
    END,
    CASE
        WHEN new.identify_number <> old.identify_number THEN concat(
            ' Numero de identificacion: ',
            new.identify_number
        )
    END,
    CASE
        WHEN new.birth_date <> old.birth_date THEN concat(' Fecha de Nacimiento: ', new.birth_date)
    END,
    CASE
        WHEN new.gender <> old.gender THEN concat(' Gener: ', new.gender)
    END,
    CASE
        WHEN new.phone_number <> old.phone_number THEN concat(' Numero de telefono: ', new.phone_number)
    END,
    CASE
        WHEN new.home_address <> old.home_address THEN concat(' Direccion: ', new.home_address)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'RRHH',
        'DATOS PERSONALES',
        _user,
        UPPER(_description)
    );
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_personal_datum BEFORE
UPDATE
    ON "rrhh".personal_datum FOR EACH ROW EXECUTE FUNCTION "rrhh".check_update_personal_datum();
-- System
----------------------------------------
--TODO: status
CREATE
OR REPLACE FUNCTION "system".check_insert_status() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se agrego un nuevo Estatus:',
    new.code,
    ' Nombre: ',
    new.name,
    ' Description : ',
    new.description
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'ESTATUS', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_status BEFORE
INSERT
    ON "system".status FOR EACH ROW EXECUTE FUNCTION "system".check_insert_status();
CREATE
OR REPLACE FUNCTION "system".check_update_status() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se Actualizo el estatus ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.name <> old.name THEN concat(' Nombre: ', new.name)
    END,
    CASE
        WHEN new.description <> old.description THEN concat(' descripcion: ', new.description)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'ESTATUS', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_job_position BEFORE
UPDATE
    ON "system".status FOR EACH ROW EXECUTE FUNCTION "system".check_update_status();
--TODO: user
CREATE
OR REPLACE FUNCTION "system".check_insert_user() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := upper(
    concat(
        'Se agrego un nuevo Usuario:',
        new.code,
        ' Nombre de usuario: ',
        new.username,
        ' rol: ',
        new.role_code,
        ' empleado: ',
        new.employee_code,
        ' estatus: ',
        new.status_code
    )
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'USUARIO', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_user BEFORE
INSERT
    ON "system".user FOR EACH ROW EXECUTE FUNCTION "system".check_insert_user();
CREATE
OR REPLACE FUNCTION "system".check_update_user() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se Actualizo el usuario ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.username <> old.username THEN concat(' Nombre del Usuario: ', new.username)
    END,
    CASE
        WHEN new.role_code <> old.role_code THEN concat(' Rol: ', new.role_code)
    END,
    CASE
        WHEN old.employee_code <> new.employee_code THEN concat(' Empleado: ', new.employee_code)
    END,
    CASE
        WHEN old.status_code <> new.status_code THEN concat(' Estatus: ', new.status_code)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'USUARIO', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_user BEFORE
UPDATE
    ON "system".user FOR EACH ROW EXECUTE FUNCTION "system".check_update_user();
--TODO: role
CREATE
OR REPLACE FUNCTION "system".check_insert_role() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;

_description := upper(
    concat(
        'Se agrego un nuevo Rol: ',
        new.code,
        ' Nombre: ',
        new.name_role,
        ' Descripcion : ',
        new.description
    )
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'ROL', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_role BEFORE
INSERT
    ON "system".role FOR EACH ROW EXECUTE FUNCTION "system".check_insert_role();
CREATE
OR REPLACE FUNCTION "system".check_update_role() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se Actualizo el rol ',
    new.code,
    '  con los siguientes valores ',
    CASE
        WHEN new.name_role <> old.name_role THEN concat(' Nombre: ', new.name_role)
    END,
    CASE
        WHEN new.description <> old.description THEN concat(' descripcion: ', new.descripcion)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'ROL', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_role BEFORE
UPDATE
    ON "system".role FOR EACH ROW EXECUTE FUNCTION "system".check_update_role();
--TODO: module
CREATE
OR REPLACE FUNCTION "system".check_insert_module() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se agrego un nuevo modulo: ',
    new.code,
    ' codigo padre: ',
    new.pathern_code,
    ' posicion: ',
    new.place,
    ' nivel de arbol: ',
    new.tree_level,
    ' Nombre: ',
    new.name_module,
    ' direccion: ',
    new.src,
    ' icono: ',
    new.icon,
    ' activo: ',
    new.active
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'MODULO', _user, UPPER(_description));
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_insert_module BEFORE
INSERT
    ON "system".modules FOR EACH ROW EXECUTE FUNCTION "system".check_insert_module();
CREATE
OR REPLACE FUNCTION "system".check_update_module() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se Actualizo el modulo ',
    NEW.code,
    ' con los siguientes valores ',
    CASE
        WHEN old.pathern_code <> new.pathern_code THEN concat(' Codigo padre: ', NEW.pathern_code)
    END,
    CASE
        WHEN old.place <> NEW.place THEN concat(' posición: ', NEW.place)
    END,
    CASE
        WHEN old.tree_level <> NEW.tree_level THEN concat(' nivel de arbol: ', NEW.tree_level)
    END,
    CASE
        WHEN old.name_module <> NEW.name_module THEN concat(' Nombre: ', NEW.name_module)
    END,
    CASE
        WHEN old.src <> NEW.src THEN concat(' Direccion: ', NEW.src)
    END,
    CASE
        WHEN old.icon <> NEW.icon THEN concat(' Icono: ', NEW.icon)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('SYSTEM', 'MODULO', _user, UPPER(_description));
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE trigger check_update_module BEFORE
UPDATE
    ON "system".modules FOR EACH ROW EXECUTE FUNCTION "system".check_update_module();
CREATE
OR REPLACE FUNCTION "estate".check_insert_motion_concept() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description character varying;
_user varchar;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'agrego un concepto de movimiento con los siguientes valores codigo: ',
    new.code,
    ' Nombre: ',
    new.name,
    ' Descripcion: ',
    new.description,
    ' Tipo: ',
    new.type

);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'BIENES',
        'CONCEPTO DE MOVIMIENTO',
        _user,
        UPPER(_description)
    );
perform set_config('glb.user_current', '', false);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE TRIGGER check_insert_motion_concept BEFORE
INSERT
    ON "estate".motion_concept FOR EACH ROW EXECUTE FUNCTION "estate".check_insert_motion_concept();


CREATE
OR REPLACE FUNCTION "estate".check_insert_movement() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := CONCAT(
    'Se agrego un nuevo movimiento para la unidad administrativa: ',
    NEW.administrative_unit_code,
    ' Código: ',
    NEW.code,
    ' concepto de movimiento: ',
    NEW.motion_concept_code,
    ' aprovacion del responsable de bienes: ',
    NEW.responsible_sign,
    ' aprovacion del director de la unidad de trabajo: ',
    NEW.director_sign,
    ' aprovacion de bienes nacionales: ',
    NEW.estate_sign,
    ' observacion: ',
    NEW.observation
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'BIENES',
        'MOVIMIENTO',
        _user,
        UPPER(_description)
    );
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE TRIGGER check_insert_movement BEFORE
INSERT
    ON "estate".movement FOR EACH ROW EXECUTE FUNCTION "estate".check_insert_movement();

CREATE
OR REPLACE FUNCTION "estate".check_insert_inventory() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := CONCAT(
    'Se agrego un nuevo bien mueble codigo: ',
    NEW.code,
    ' grupo: ',
    NEW.group_code,
    ' sub grupo: ',
    NEW.sub_group_code,
    ' seccion: ',
    NEW.section_code,
    ' monto: ',
    NEW.amount,
    ' description: ',
    NEW.description
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'BIENES',
        'INVENTARIO',
        _user,
        UPPER(_description)
    );
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE TRIGGER check_insert_inventory BEFORE
INSERT
    ON "estate".inventory FOR EACH ROW EXECUTE FUNCTION "estate".check_insert_inventory();

CREATE
OR REPLACE FUNCTION "estate".check_update_movement() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;

_description := concat(
    'Se actualizó el movimiento numero: ',
    NEW.code,
    ', con los siguientes valores ',
    CASE
        WHEN OLD.director_firm <> NEW.director_firm THEN concat(' aprovacion del director de la unidad de trabajo: ', NEW.director_firm)
    END,
    CASE
        WHEN OLD.estate_firm <> NEW.estate_firm THEN concat(' aprovacion bienes: ', NEW.estate_firm)
    END,
    CASE
        WHEN OLD.observation <> NEW.observation THEN concat(' observacion: ', NEW.observation)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'BIENES',
        'MOVIMIENTO',
        _user,
        UPPER(_description)
    );
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE TRIGGER check_update_movement BEFORE
UPDATE
    ON "estate".movement FOR EACH ROW EXECUTE FUNCTION "estate".check_update_movement();
CREATE

OR REPLACE FUNCTION "estate".check_insert_group() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
  BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := CONCAT(
    'Se agrego un nuevo grupo para los detalles del movimiento: ',
    NEW.code,
    ' Nombre: ',
    NEW.name,
    ' Descripción: ',
    NEW.description
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('BIENES', 'GRUPO', _user, UPPER(_description));
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE TRIGGER check_insert_group BEFORE
INSERT
    ON "estate".group FOR EACH ROW EXECUTE FUNCTION "estate".check_insert_group();
CREATE
OR REPLACE FUNCTION "estate".check_update_group() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN

    BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
    END;
_description := concat(
    'Se actualizó el grupo código ',
    NEW.code,
    ', con los siguientes valores ',
    CASE
        WHEN OLD.name <> NEW.name THEN concat(' nombre: ', NEW.name)
    END,
    CASE
        WHEN OLD.description <> NEW.description THEN concat(' Descripción: ', NEW.description)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('BIENES', 'GROUP', _user, UPPER(_description));
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;

CREATE
OR REPLACE TRIGGER check_update_group BEFORE
UPDATE
    ON "estate".group FOR EACH ROW EXECUTE FUNCTION "estate".check_update_group();
CREATE
OR REPLACE FUNCTION "estate".check_insert_sub_group() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := CONCAT(
    'Se agrego un nuevo sub-grupo detalles del movimiento: ',
    NEW.code,
    ' Nombre: ',
    NEW.name,
    ' Descripción: ',
    NEW.description
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    (
        'BIENES',
        'SUB GRUPO',
        _user,
        UPPER(_description)
    );
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE TRIGGER check_insert_sub_group BEFORE
INSERT
    ON "estate".sub_group FOR EACH ROW EXECUTE FUNCTION "estate".check_insert_sub_group();
CREATE
OR REPLACE FUNCTION "estate".check_update_sub_group() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se actualizó el sub-grupo código ',
    NEW.code,
    ', con los siguientes valores ',
    CASE
        WHEN OLD.name <> NEW.name THEN concat(' nombre: ', NEW.name)
    END,
    CASE
        WHEN OLD.description <> NEW.description THEN concat(' Descripción: ', NEW.description)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('BIENES', 'GROUP', _user, UPPER(_description));
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;

CREATE
OR REPLACE TRIGGER check_update_sub_group BEFORE
UPDATE
    ON "estate".sub_group FOR EACH ROW EXECUTE FUNCTION "estate".check_update_sub_group();
CREATE
OR REPLACE FUNCTION "estate".check_insert_section() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := CONCAT(
    'Se agrego una nueva sección para los detalles del movimiento: ',
    NEW.code,
    ' Nombre: ',
    NEW.name,
    ' Descripción: ',
    NEW.description
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('BIENES', 'SECCIÓN', _user, UPPER(_description));
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;
CREATE
OR REPLACE TRIGGER check_insert_section BEFORE
INSERT
    ON "estate".section FOR EACH ROW EXECUTE FUNCTION "estate".check_insert_section();
CREATE
OR REPLACE FUNCTION "estate".check_update_section() RETURNS TRIGGER LANGUAGE PLPGSQL AS
$$
DECLARE
_description CHARACTER VARYING;
_user VARCHAR;
BEGIN
BEGIN
        _user := NULLIF(current_setting('glb.user_current', true), '');
    EXCEPTION
        WHEN undefined_object THEN
            _user := NULL; 
  END;
_description := concat(
    'Se actualizó la sección código ',
    NEW.code,
    ', con los siguientes valores ',
    CASE
        WHEN OLD.name <> NEW.name THEN concat(' nombre: ', NEW.name)
    END,
    CASE
        WHEN OLD.description <> NEW.description THEN concat(' Descripción: ', NEW.description)
    END
);
INSERT INTO
    "system".bitacora(origin, service, user_code, description)
VALUES
    ('BIENES', 'SECCIÓN', _user, UPPER(_description));
PERFORM set_config('glb.user_current', '', FALSE);
RETURN NEW;
END;
$$
;

CREATE
OR REPLACE TRIGGER check_update_section BEFORE
UPDATE
    ON "estate".section FOR EACH ROW EXECUTE FUNCTION "estate".check_update_section();

`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
drop procedure 
`);
  }
}
