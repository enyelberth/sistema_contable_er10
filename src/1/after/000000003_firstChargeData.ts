import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class CreatefirstChargeData1705781412729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query;
    queryRunner.query(`
      call "system".sp_create_status('ACTIVO', 'USUARIO HABILITADO PARA EL USO DEL SISTEMA',null::character varying,'');
      call "system".sp_create_status('INACTIVO', 'USUARIO INHABILITADO PARA EL USO DEL SISTEMA POR TIEMPO LIMITADO',null::character varying,'');
      call "system".sp_create_status('BLOQUEADO', 'USUARIO RESTRINGIDO PERMANENTE DEL SISTEMA',null::character varying,'');

      CALL rrhh.sp_create_job_position('root', 'encargado de administrar todo el sistema',null::character varying,'');
      
      CALL "system".sp_create_role('SYSTEM_MACHINE','USUARIO GENERADO POR EL SISTEMA',null::character varying,'');

      -- 0
      CALL "system".sp_create_module(NULL, 0, 1, 'INICIO'::varchar, '/dashboard'::varchar, 'src/icon.ico'::varchar, true, '[{"name":"MENU"}]',null::character varying,'');
      -- 1
      call "system".sp_create_module(NULL, 1, 1, 'SISTEMA'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 2
      CALL "system".sp_create_module(NULL, 2, 1, 'RRHH'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 3
      CALL "system".sp_create_module('MDL-00001'::varchar, 0, 2, 'USUARIOS'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 4
      CALL "system".sp_create_module('MDL-00001'::varchar, 1, 2, 'MODULOS'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 5
      CALL "system".sp_create_module('MDL-00001'::varchar, 2, 2, 'ROLES'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 6
      -- CALL "system".sp_create_module('MDL-00001'::varchar, 3, 2, 'PERMISOS'::varchar, '/dashboard/sistema/permisos/'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 7
      CALL "system".sp_create_module('MDL-00002'::varchar, 0, 2, 'SECTOR'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 8
      CALL "system".sp_create_module('MDL-00002'::varchar, 1, 2, 'PROGRAMA'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 9
      CALL "system".sp_create_module('MDL-00002'::varchar, 2, 2, 'ACTIVIDAD'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 10
      CALL "system".sp_create_module('MDL-00002'::varchar, 3, 2, 'UNIDAD EJECUTORA'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 11
      CALL "system".sp_create_module('MDL-00002'::varchar, 4, 2, 'CARGOS'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 12
      CALL "system".sp_create_module('MDL-00002'::varchar, 5, 2, 'EMPLEADO'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MENU"}]',null::character varying,'');
      -- 13
      CALL "system".sp_create_module('MDL-00003'::varchar, 0, 3, 'LISTAR USUARIOS'::varchar, '/dashboard/sistema/usuarios'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 14
      CALL "system".sp_create_module('MDL-00003'::varchar, 1, 3, 'CREAR USUARIO'::varchar, '/dashboard/sistema/usuarios/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00003'::varchar, 1, 3, 'ACTUALIZAR USUARIO'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 15
      CALL "system".sp_create_module('MDL-00004'::varchar, 0, 3, 'LISTAR MODULOS'::varchar, '/dashboard/sistema/modulos'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"},{"name":"PERMISOS"}]',null::character varying,'');
      -- 16
      CALL "system".sp_create_module('MDL-00004'::varchar, 1, 3, 'CREAR MODULO'::varchar, '/dashboard/sistema/modulos/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00004'::varchar, 1, 3, 'ACTUALIZAR MODULO'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 17
      CALL "system".sp_create_module('MDL-00005'::varchar, 0, 3, 'VER ROLES'::varchar, '/dashboard/sistema/roles'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"},{"name":"PERMISOS"}]',null::character varying,'');
      -- 18
      CALL "system".sp_create_module('MDL-00005'::varchar, 1, 3, 'CREAR ROL'::varchar, '/dashboard/sistema/roles/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 19
      CALL "system".sp_create_module('MDL-00005'::varchar, 1, 3, 'ACTUALIZAR ROL'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 19
      -- CALL "system".sp_create_module('MDL-00006'::varchar, 0, 3, 'VER PERMISOS'::varchar, '/dashboard/sistema/permisos'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 20
      -- CALL "system".sp_create_module('MDL-00006'::varchar, 1, 3, 'ASIGNAR PERMISOS'::varchar, '/dashboard/sistema/permisos/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00006'::varchar, 0, 3, 'LISTA SECTOR'::varchar, '/dashboard/rrhh/sector'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 20
      CALL "system".sp_create_module('MDL-00006'::varchar, 1, 3, 'CREAR SECTOR'::varchar, '/dashboard/rrhh/sector/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00006'::varchar, 1, 3, 'ACTUALIZAR SECTOR'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00007'::varchar, 0, 3, 'LISTA PROGRAMAS'::varchar, '/dashboard/rrhh/programa'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 22
      CALL "system".sp_create_module('MDL-00007'::varchar, 1, 3, 'CREAR PROGRAMA'::varchar, '/dashboard/rrhh/programa/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00007'::varchar, 1, 3, 'ACTUALIZAR PROGRAMA'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 23
      CALL "system".sp_create_module('MDL-00008'::varchar, 0, 3, 'LISTA ACTIVIDAD'::varchar, '/dashboard/rrhh/actividad'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 24
      CALL "system".sp_create_module('MDL-00008'::varchar, 1, 3, 'CREAR ACTIVIDAD'::varchar, '/dashboard/rrhh/actividad/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 25
      CALL "system".sp_create_module('MDL-00008'::varchar, 1, 3, 'ACTUALIZAR ACTIVIDAD'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 26
      CALL "system".sp_create_module('MDL-00009'::varchar, 0, 3, 'LISTA UNIDADES EJECUTORAS'::varchar, '/dashboard/rrhh/unidad_ejecutora'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 27
      CALL "system".sp_create_module('MDL-00009'::varchar, 1, 3, 'CREAR UNIDAD EJECUTORA'::varchar, '/dashboard/rrhh/unidad_ejecutora/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00009'::varchar, 1, 3, 'ACTUALIZAR UNIDAD EJECUTORA'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 28
      CALL "system".sp_create_module('MDL-00010'::varchar, 0, 3, 'LISTA CARGOS'::varchar, '/dashboard/rrhh/cargo'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 29
      CALL "system".sp_create_module('MDL-00010'::varchar, 1, 3, 'CREAR CARGO'::varchar, '/dashboard/rrhh/cargo/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00010'::varchar, 1, 3, 'ACTUALIZAR CARGO'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 30
      CALL "system".sp_create_module('MDL-00011'::varchar, 0, 3, 'LISTA EMPLEADOS'::varchar, '/dashboard/rrhh/empleado'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"AGREGAR"},{"name":"MODIFICAR"},{"name":"VER"},{"name":"REPORTE"},{"name":"IMPRIMIR"}]',null::character varying,'');
      -- 31
      CALL "system".sp_create_module('MDL-00011'::varchar, 1, 3, 'CREAR EMPLEADO'::varchar, '/dashboard/rrhh/empleado/agregar'::varchar, 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"},{"name":"AGREGAR"}]',null::character varying,'');
      -- 21
      CALL "system".sp_create_module('MDL-00011'::varchar, 1, 3, 'ACTUALIZAR EMPLEADO'::varchar, NULL, 'src/icon.ico'::varchar, true,'[{"name":"MODIFICAR"},{"name":"VER"}]',null::character varying,'');
      -- 22
      CALL "system".sp_create_module('MDL-00001'::varchar, 6, 2, 'BITACORA'::varchar, '/dashboard/sistema/bitacora', 'src/icon.ico'::varchar, true,'[{"name":"MENU"},{"name":"VER"}]',null::character varying,'');

      UPDATE "system".access_level SET status = true where role_code = 'RLU-00000';
CALL "rrhh".sp_create_sector('01','DIRECCION SUPERIOR','',NULL::varchar);
CALL "rrhh".sp_create_sector('02','SEGURIDAD Y DEFENSA','',NULL::varchar);
CALL "rrhh".sp_create_sector('05','INDUSTRIA Y COMERCIO','',NULL::varchar);
CALL "rrhh".sp_create_sector('06','TURISMO Y RECREACION','',NULL::varchar);
CALL "rrhh".sp_create_sector('07','TRANSPORTE Y COMUNICACIONES','',NULL::varchar);
CALL "rrhh".sp_create_sector('09','CULTURA Y COMUNICACION SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_sector('11','VIVIENDA,DESARROLLO URBANO Y SERVICIOS CONEXOS','',NULL::varchar);
CALL "rrhh".sp_create_sector('12','SALUD','',NULL::varchar);
CALL "rrhh".sp_create_sector('13','DESARROLLO SOCIAL Y PARTICIPACION','',NULL::varchar);
CALL "rrhh".sp_create_sector('14','SEGURIDAD SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_sector('15','GASTOS NO CLASIFICADOS SECTORIALMENTE','',NULL::varchar);

     CALL "rrhh".sp_create_program('01','01','DISCUSION DE INSTRUMENTOS JURIDICOS','',NULL::varchar);
CALL "rrhh".sp_create_program('01','02','REPRESENTACION LEGAL Y JURIDICA','',NULL::varchar);
CALL "rrhh".sp_create_program('01','03','CONTROL DE GESTION MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_program('01','04','DIRECCION Y COORDINACION SUPERIOR','',NULL::varchar);
CALL "rrhh".sp_create_program('01','05','ADMINISTRACION Y SERVICIOS CONTABLES','',NULL::varchar);
CALL "rrhh".sp_create_program('01','06','PROCESAMIENTO DE DATOS','',NULL::varchar);
CALL "rrhh".sp_create_program('01','07','ADMINISTRACION PRESUPUESTARIA','',NULL::varchar);
CALL "rrhh".sp_create_program('01','08','ADMINISTRACION DE PERSONAL','',NULL::varchar);
CALL "rrhh".sp_create_program('01','09','ADMINISTRACION FINANCIERA Y LOGISTICA','',NULL::varchar);
CALL "rrhh".sp_create_program('01','10','ADMINISTRACION PARROQUIAL','',NULL::varchar);
CALL "rrhh".sp_create_program('01','11','SERVICIO DE AUDITORIA INTERNA','',NULL::varchar);
CALL "rrhh".sp_create_program('01','12','ADMINISTRACION TRIBUTARIA','',NULL::varchar);
CALL "rrhh".sp_create_program('02','02','PROTECCION A LAS PERSONAS Y A LA PROPIEDAD FRENTE A SINIESTROS','',NULL::varchar);
CALL "rrhh".sp_create_program('02','04','SERVICIO DE SEGURIDAD Y DEFENSA MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_program('02','05','SERVICIO DE PROTECCION AL NIÑO Y AL ADOLESCENTE','',NULL::varchar);
CALL "rrhh".sp_create_program('02','06','SERVICIO MUNICIPAL DE DERECHOS DEL NIÑO Y DEL ADOLESCENTE','',NULL::varchar);
CALL "rrhh".sp_create_program('05','01','MERCADO MAYORISTA DE BARQUISIMETO','',NULL::varchar);
CALL "rrhh".sp_create_program('05','02','COMDIBAR','',NULL::varchar);
CALL "rrhh".sp_create_program('05','03','ABASTECER','',NULL::varchar);
CALL "rrhh".sp_create_program('05','04','JUNRECA','',NULL::varchar);
CALL "rrhh".sp_create_program('06','02','FOMENTO Y DESARROLLO DEL TURISMO MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_program('07','01','SERVICIO DE TRANSPORTE PUBLICO Y VIALIDAD URBANA','',NULL::varchar);
CALL "rrhh".sp_create_program('07','02','TRANSIRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_program('09','01','SERVICIO DE PROMOCION Y DESARROLLO DE LA CULTURA Y ARTE MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_program('11','01','SERVICIOS CATASTRALES','',NULL::varchar);
CALL "rrhh".sp_create_program('11','02','SERVICIO DE REGULACION DE ALQUILERES','',NULL::varchar);
CALL "rrhh".sp_create_program('11','03','PLANIFICACION Y CONTROL URBANISTICO','',NULL::varchar);
CALL "rrhh".sp_create_program('11','04','CONSTRUCCION Y MANTENIMIENTO DE LA INFRAESTRUCTURA MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_program('11','05','DESARROLLO URBANO Y HABITACIONAL DEL MUNICIPIO','',NULL::varchar);
CALL "rrhh".sp_create_program('12','01','SERVICIO DE SANEAMIENTO AMBIENTAL','',NULL::varchar);
CALL "rrhh".sp_create_program('13','01','DESARROLLO SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_program('13','02','SERVICIO DE DEPORTE MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_program('13','03','SERVICIO DE ECONOMIA SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_program('13','05','SERVICIO DE DESARROLLO SOCIAL.','',NULL::varchar);
CALL "rrhh".sp_create_program('13','06','SERVICIO MUNICIPAL DE DERECHOS DEL NIÑO Y DEL ADOLESCENTE','',NULL::varchar);
CALL "rrhh".sp_create_program('13','07','INSTITUTO MUNICIPAL PARA LA MUJER Y LA IGUALDAD DE GENERO','',NULL::varchar);
CALL "rrhh".sp_create_program('13','08','INSTITUTO MUNICIPAL PARA LA JUVENTUD','',NULL::varchar);
CALL "rrhh".sp_create_program('13','09','INSTITUTO DE SERVICIOS FUNERARIOS Y CEMENTERIOS DEL MUNICIPIO IRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_program('13','10','INSTITUTO AUTONOMO DE PROMOCION Y FORTALECIMIENTO AL PODER POPULAR DEL MUNICIPIO IRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_program('13','11','INSTITUTO AUTONOMO DE GESTION AMBIENTAL DEL MUNICIPIO IRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_program('14','01','SERVICIO DE SEGURIDAD SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_program('15','02','GASTOS NO CLASIFICADOS SECTORIALMENTE ADMINISTRADOS POR EL ALCALDE','',NULL::varchar);      

CALL "rrhh".sp_create_activity('01','01','00','DIRECCION Y COORDINACION LEGISLATIVA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','02','00','REPRESENTACION LEGAL Y JURIDICA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','03','00','CONTROL DE GESTION MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','51','DIRECCION Y COORDINACION SUPERIOR','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','52','COORDINACION POLITICA Y ADMINISTRATIVA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','53','SERVICIO DE SECRETARIA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','54','SERVICIO DE INFORMACION PROTOCOLO Y COMUNICACION','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','55','SERVICIOS JURIDICOS','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','56','OFICINA EJECUTIVA DEL DESPACHO DEL ALCALDE DEL MUNICPIO IRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','57','CONSERJERIA Y MANTENIMIENTO','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','58','REGULARIZACION DE TENENCIA DE TIERRAS URBANAS','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','59','OFICINA TECNICA DE DOCUMENTACION, ESTADISTICA Y COOPERACION INTERNACIONAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','60','OFICINA TECNICA DE CONSEJOS LOCALES DE PLANIFICACION PUBLICA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','04','61','SEGURIDAD CIUDADANA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','05','51','DIRECCION Y COORDINACION ADMINISTRATIVA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','05','52','SERVICIOS CONTABLES','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','05','53','TRAMITACION Y CONTROL DE PAGOS','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','05','54','COMPRAS Y SUMINISTROS','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','05','55','BIENES MUNICIPALES','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','06','00','PROCESAMIENTO DE DATOS','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','07','00','ADMINISTRACION PRESUPUESTARIA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','08','00','ADMINISTRACION DE PERSONAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','09','51','DIRECCION Y COORDINACION FINANCIERA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','09','52','TESORERIA MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','51','PARROQUIA AGUEDO FELIPE ALVARADO','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','52','PARROQUIA BUENA VISTA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','53','PARROQUIA CATEDRAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','54','PARROQUIA CONCEPCION','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','55','PARROQUIA  EL CUJI','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','56','PARROQUIA  JUAREZ RIO CLARO','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','57','PARROQUIA GUERRERA ANA SOTO','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','58','PARROQUIA  SANTA ROSA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','59','PARROQUIA  TAMACA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','10','60','PARROQUIA  UNION','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','11','00','SERVICIO DE AUDITORIA INTERNA','',NULL::varchar);
CALL "rrhh".sp_create_activity('01','12','00','ADMINISTRACION TRIBUTARIA','',NULL::varchar);
CALL "rrhh".sp_create_activity('02','02','00','PROTECCION A PERSONAS Y PROPIEDAD FRENTE A SINIESTROS','',NULL::varchar);
CALL "rrhh".sp_create_activity('02','04','00','SERVICIO DE SEGURIDAD Y DEFENSA MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('02','05','00','SERVICIO DE PROTECCION AL NINO Y AL ADOLESCENTE','',NULL::varchar);
CALL "rrhh".sp_create_activity('02','06','00','SERVICIO MUNICIPAL DE DERECHOS DEL NINO Y ADOLESCENTE','',NULL::varchar);
CALL "rrhh".sp_create_activity('05','01','00','MERCABAR','',NULL::varchar);
CALL "rrhh".sp_create_activity('05','02','00','COMDIBAR','',NULL::varchar);
CALL "rrhh".sp_create_activity('05','03','00','EMPRESA DE ALIMENTOS ABASTECER C.A.','',NULL::varchar);
CALL "rrhh".sp_create_activity('05','04','00','JUNRECA','',NULL::varchar);
CALL "rrhh".sp_create_activity('06','02','00','FOMENTO Y DESARROLLO DEL TURISMO MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('07','01','00','SERVICIO DE TRANSPORTE PUBLICO Y VIALIDAD URBANA','',NULL::varchar);
CALL "rrhh".sp_create_activity('07','02','00','TRANSIRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_activity('09','01','00','SERVICIO DE PROMOCION Y DESARROLLO CULTURA-ARTE MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','01','51','DIRECCION Y COORDINACION CATASTRAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','01','52','PROCESAMIENTO CATASTRAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','01','53','ACTUALIZACION CATASTRAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','01','54','ATENCION AL PUBLICO DE LOS SERVICIOS CATASTRALES','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','01','55','ADMINISTRACION  DE EJIDOS Y TERRENOS MUNICIPALES','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','02','00','SERVICIO DE REGULACION DE ALQUILERES','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','03','51','PLANIFICACION Y CONTROL URBANO','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','03','52','CONTROL URBANO','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','03','53','PLANIFICACION URBANA','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','03','54','SERVICIOS DE ASESORIA','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','03','55','SERVICIOS DE INFORMACION','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','04','00','CONSTRUCCION Y MANTENIMIENTO DE LA INFRAESTRUCTURA MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('11','05','00','DESARROLLO URBANO Y HABITACIONAL DEL MUNICIPIO','',NULL::varchar);
CALL "rrhh".sp_create_activity('12','01','00','SERVICIO DE SANEAMIENTO AMBIENTAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','01','51','DIRECCION Y COORDINACION','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','01','53','MERCADOS MUNICIPALES','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','01','54','SUMINISTRO DE AGUA','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','01','55','CEMENTERIOS MUNICIPALES','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','01','56','GOBIERNO PARROQUIAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','01','57','SERVICIOS DESCONCENTRADOS DEL NORTE','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','02','00','SERVICIO DE DEPORTE MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','03','00','SERVICIO DE ECONOMIA SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','05','00','SERVICIO DE DESARROLLO SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','06','00','FUNDACION DEL NIÑO MUNICIPAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','07','00','INSTITUTO MUNICIPAL PARA LA MUJER Y LA IGUALDAD DE GENERO','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','08','00','INSTITUTO MUNICIPAL PARA LA JUVENTUD','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','09','00','INSTITUTO DE SERVICIOS FUNERARIOS Y CEMENTERIOS DEL MUNICIPIO IRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','10','00','INSTITUTO AUTONOMO DE PROMOCION Y FORTALECIMIENTO AL PODER POPULAR DEL MUNICIPIO IRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_activity('13','11','00','INSTITUTO AUTONOMO DE GESTION AMBIENTAL DEL MUNICIPIO IRIBARREN','',NULL::varchar);
CALL "rrhh".sp_create_activity('14','01','00','SERVICIO DE SEGURIDAD SOCIAL','',NULL::varchar);
CALL "rrhh".sp_create_activity('15','02','00','GASTOS NO CLASIFICADOS SECTORIALMENTE ADMINISTRADOS POR EL ALCALDE','',NULL::varchar);

CALL "rrhh".sp_create_administrative_unit('01','01','00','CONCEJO MUNICIPAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','02','00','SINDICATURA MUNICIPAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','03','00','CONTRALORIA MUNICIPAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','51','DESPACHO DEL  ALCALDE','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','52','DIRECCION GENERAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','53','OFICINA DE ATENCION AL CIUDADANO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','54','OFICINA DE COMUNICACION Y RELACIONES INTERINSTITUCIONALES','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','55','OFICINA DE CONSULTORIA JURIDICA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','56','OFICINA EJECUTIVA DEL DESPACHO DEL ALCALDE DEL MUNICIPIO IRIBARREN','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','57','OFICINA DE SERVICIOS GENERALES','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','58','OFICINA TECNICA Y SOCIAL DE TIERRAS URBANAS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','59','OFICINA  TECNICA DE DOCUMENTACIÓN, ESTADÍSTICA  Y COOPERACIÓN INTERNACIONAL (ODECI)','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','60','OFICINA TÉCNICA DE LOS CONSEJOS LOCALES DE PLANIFICACIÓN PÚBLICA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','04','61','OFICINA DE SEGURIDAD CIUDADANA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','05','51','DIRECCION   DE   ADMINISTRACION   Y FINANZAS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','05','52','DIVISION DE CONTABILIDAD FISCAL Y ARCHIVO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','05','53','DIVISION DE TRAMITACION  Y  CONTROL DE PAGOS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','05','54','DIVISION DE COMPRAS Y SUMINISTROS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','05','55','DIVISION DE BIENES MUNICIPALES','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','06','00','OFICINA DE INFORMATICA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','07','00','OFICINA DE PLANIFICACION Y PRESUPUESTO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','08','00','OFICINA DE RECURSOS HUMANOS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','09','51','DIRECCION DE HACIENDA MUNICIPAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','09','52','DIRECCION DE TESORERIA MUNICIPAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','51','GOBIERNO PARROQUIAL DE AGUEDO FELIPE ALVARADO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','52','GOBIERNO PARROQUIAL DE BUENA VISTA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','53','GOBIERNO PARROQUIAL DE CATEDRAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','54','GOBIERNO PARROQUIAL DE LA CONCEPCION','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','55','GOBIERNO PARROQUIAL DE EL CUJI','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','56','GOBIERNO PARROQUIAL DE JUARES','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','57','GOBIERNO PARROQUIAL DE GUERRERA ANA SOTO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','58','GOBIERNO PARROQUIAL DE SANTA ROSA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','59','GOBIERNO PARROQUIAL DE TAMACA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','10','60','GOBIERNO PARROQUIAL DE UNION','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','11','00','UNIDAD DE AUDITORIA INTERNA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('01','12','00','SERVICIO MUNICIPAL  DE  ADMINISTRACION TRIBUTARIA (SEMAT)','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('02','02','00','CUERPO DE BOMBEROS MUNICIPALES','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','01','51','DIRECCION DE CATASTRO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','01','52','DIVISION DE PROCESAMIENTO CATASTRAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','01','53','DIVISION DE ACTUALIZACION CATASTRAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','01','54','DIVISION DE ATENCION AL PUBLICO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','01','55','DIVISION   DE   EJIDOS  Y  TERRENOS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','03','51','DIRECCION DE PLANIFICACIÓN  Y CONTROL URBANO (DPCU)','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','03','52','UNIDAD DE CONTROL URBANO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','03','53','UNIDAD DE PLANIFICACION URBANA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','03','54','UNIDAD DE ASESORIA LEGAL','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('11','03','55','OFICINA MUNICIPAL DE INFORMACION','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('13','01','51','DIRECCION DE  SERVICIOS COMUNITARIOS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('13','01','53','DIVISION DE MERCADOS MUNICIPALES  Y ABASTECIMIENTO','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('13','01','54','DIVISION DE SUMINISTRO DE AGUA','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('13','01','56','DIVISION DE GOBIERNOS PARROQUIALES','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('13','01','57','SERVICIOS DESCONCENTRADOS DEL NORTE','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('14','01','00','OFICINA DE RECURSOS HUMANOS','',NULL::varchar,'');
CALL "rrhh".sp_create_administrative_unit('15','02','00','DESPACHO DEL  ALCALDE','',NULL::varchar,'');
      insert into informatic.physical_location(name,code,administrative_unit_code,description) select name, code, code as code2, description  from rrhh.administrative_unit;

      CALL "rrhh".sp_create_employee('JBP-00000'::varchar, '010600'::varchar, 'SYSTEM', 'MACHINE', 'M', '00000001', '2023-12-31', 'MAQUINA', '00000000000', 'DIRECCION RAIZ DEL SISTEMA',null::character varying,'');

      CALL "system".sp_create_user('RLU-00000'::varchar, 'EMP-00000'::varchar, 'STS-00000'::varchar, 'system'::varchar, '${await bcrypt.hash(
        "1234",
        12,
      )}'::varchar,null::character varying, '');

 insert into "estate".motion_concept(code,name,type) values
(1,upper('Inventario Inicial'),'I'),
(2, upper('Incorporacion por Traspaso'),'I'),
(3,upper('Compras'),'I'),
(4,upper('Construccion de inmuebles'),'I'),
(5,upper('Adiciones y Mejoras'),'I'),
(6,upper('Produccion de elementos (Muebles)'),'I'),
(7,upper('Suministro de bienes de otras entidades'),'I'),
(8,upper('Devolucion de bienes suministrados a contratistas'),'I'),
(9,upper('Nacimiento de Semovientes'),'I'),
(10,upper('Reconstruccion de equipos'),'I'),
(11,upper('Incorporacion por donacion'),'I'),
(12,upper('Incorporacion por permuta'),'I'),
(13,upper(' Adscripcion de bienes'),'I'),
(14,upper('Omision en inventario'),'I'),
(15,null::varchar,'I'),
(16,upper('Incorporacion por cambio de sub-agrupacion'),'I'),
(17,upper('Correccion de desincorporaciones'),'I'),
(18,upper('Incorporaciones por otros conceptos'),'I'),
(19,upper('Incorporacion de Bienes procedente de los Alinacenes'),'I'),
(51,upper('desincorporacion por traspaso'),'D'),
(52,upper('Ventas'),'D'),
(53,upper('Suministro de bienes a contratistas'),'D'),
(54,upper('Suministro de bienes a otras entidades'),'D'),
(55, upper('Desarme'),'D'),
(56,upper('Inservibilidad'),'D'),
(57,upper('Deterioro'),'D'),
(58,upper('Demolicion'),'D'),
(59,upper('Muerte de Semovientes'),'D'),
(60,upper('Faltantes por Investigar'),'D'),
(61,upper('Desincorporacion por permuta'),'D'),
(62,upper('desincorporacion por donacion'),'D'),
(63,upper('desincorporacion por Adscripcion'),'D'),
(64,null::varchar,'D'),
(65,upper('Desincorporacion por cambio de sub-agrupacion'),'D'),
(66,upper('Correcion de incorporaciones'),'D'),
(67,upper('Desincorporaciones por otros conceptos'),'D');

 CALL "estate".sp_create_group('01','BIENES INMUEBLES','',NULL::varchar);
 CALL "estate".sp_create_group('02','BIENES MUEBLES','',NULL::varchar);

CALL "estate".sp_create_sub_group('01','01','EDIFICIOS PARA OFICINA','',NULL::varchar);
CALL "estate".sp_create_sub_group('01','02','EDIFICIOS E INSTALACIONES PARA ESTABLECIMIENTOS CULTURALES','',NULL::varchar);
CALL "estate".sp_create_sub_group('01','03','EDIFICIOS TERRENOS E INSTALACIONES PARA FINES ASISTENCIALES Y DE PROTECCION SOCIAL','',NULL::varchar);
CALL "estate".sp_create_sub_group('01','04','EDIFICIOS TERRENOS E INSTALACIONES PARA OBRAS PUBLICAS','',NULL::varchar);
CALL "estate".sp_create_sub_group('01','05','EDIFICIOS TERRENOS E INSTALACIONES PARA FINES AGROPECUARIOS','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','01','MAQUINAS, MUEBLESY DEMAS EQUIPO DE OFICINA','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','02','MOBILIARIO Y ENSERES DE ALOJAMIENTO','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','03','MAQUINARIA Y DEMAS EQUIPOS DE CONST., CAMPO, IND. Y TALLER','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','04','EQUIPOS DE TRANSPORTE','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','05','EQUIPOS DE TELECOMUNICACIONES','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','06','EQUIPOS MEDICO-QUIRURGICO DENTALES Y VETERINARIOS','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','07','EQUIPOS CIENTIFICOS Y DE ENSEÑANZA','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','08','COLECCIONES CULTURALES, ARTISTICAS E HISTORICAS','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','09','ARMAMENTO Y EQUIPO DE DEFENSA','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','10','INSTALACIONES PROVISIONALES','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','11','SEMOVIENTES','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','12','OTROS ELEMENTOS','',NULL::varchar);
CALL "estate".sp_create_sub_group('02','13','EQUIPOS DE COMPUTACION','',NULL::varchar);

CALL "estate".sp_create_section('01','01','00','EDIFICIOS PARA OFICINA','',NULL::varchar);
CALL "estate".sp_create_section('01','01','01','EDIFICIOS','',NULL::varchar);
CALL "estate".sp_create_section('01','02','00','EDIFICIOS E INSTALACIONES PARA ESTABLECIMIENTOS CULTURALES','',NULL::varchar);
CALL "estate".sp_create_section('01','02','01','EDIFICIOS E INSTALACIONES PARA ESTABLECIMIENTOS CULTURALES','',NULL::varchar);
CALL "estate".sp_create_section('01','02','02','EDIFICIOS E INSTALACIONES PARA ESTABLECIMIENTOS CULTURALES','',NULL::varchar);
CALL "estate".sp_create_section('01','03','00','EDIFICIOS TERRENOS E INSTALACIONES PARA FINES ASISTENCIALES Y DE PROTECCION SOCIAL','',NULL::varchar);
CALL "estate".sp_create_section('01','03','01','EDIFICIOS TERRENOS E INSTALACIONES PARA FINES ASISTENCIALES Y DE PROTECCION SOCIAL','',NULL::varchar);
CALL "estate".sp_create_section('01','04','00','EDIFICIOS TERRENOS E INSTALACIONES PARA OBRAS PUBLICAS','',NULL::varchar);
CALL "estate".sp_create_section('01','04','01','EDIFICIOS TERRENOS E INSTALACIONES PARA OBRAS PUBLICAS','',NULL::varchar);
CALL "estate".sp_create_section('01','04','02','EDIFICIOS TERRENOS E INSTALACIONES PARA OBRAS PUBLICAS','',NULL::varchar);
CALL "estate".sp_create_section('01','05','00','EDIFICIOS TERRENOS E INSTALACIONES PARA FINES AGROPECUARIOS','',NULL::varchar);
CALL "estate".sp_create_section('01','05','01','EDIFICIOS TERRENOS E INSTALACIONES PARA FINES AGROPECUARIOS','',NULL::varchar);
CALL "estate".sp_create_section('02','01','00','MáQUINAS, MUEBLES Y DEMáS EQUIPOS DE OFICINA','',NULL::varchar);
CALL "estate".sp_create_section('02','02','00','MOBILIARIO Y ENSERES DE ALOJAMIENTO','',NULL::varchar);
CALL "estate".sp_create_section('02','02','01','','',NULL::varchar);
CALL "estate".sp_create_section('02','03','00','MAQUINARIA Y DEMAS EQUIPOS DE CONST., CAMPO, IND. Y TALLER','',NULL::varchar);
CALL "estate".sp_create_section('02','03','01','EQUIPO DE TALLER Y HERRAMIENTAS DE USO GENERAL','',NULL::varchar);
CALL "estate".sp_create_section('02','03','02','MAQUINARIA Y EQUIPO DE CONSTRUCCIóN Y CONSERVACIóN','',NULL::varchar);
CALL "estate".sp_create_section('02','03','03','MAQUINARIA Y EQUIPO PARA MANTENIMIENTO DE AUTOMOTORES','',NULL::varchar);
CALL "estate".sp_create_section('02','03','04','MAQUINARIA E IMPLEMENTOS AGRíCOLAS Y PECUARIOS','',NULL::varchar);
CALL "estate".sp_create_section('02','03','05','MAQUINARIA E IMPLEMENTO DE ARTES GRáFICAS','',NULL::varchar);
CALL "estate".sp_create_section('02','03','06','MAQUINARIAS Y EQUIPOS DE ENERGIA','',NULL::varchar);
CALL "estate".sp_create_section('02','04','00','EQUIPOS DE TRANSPORTE','',NULL::varchar);
CALL "estate".sp_create_section('02','04','01','VEHíCULOS AUTOMOTORES TERRESTRES','',NULL::varchar);
CALL "estate".sp_create_section('02','04','02','OTROS VEHíCULOS TERRESTRES','',NULL::varchar);
CALL "estate".sp_create_section('02','04','03','MATERIAL RODANTE FERROVIARIO Y DE CABLES AéREOS','',NULL::varchar);
CALL "estate".sp_create_section('02','04','04','EQUIPOS AUXILIARES DE TRANSPORTE','',NULL::varchar);
CALL "estate".sp_create_section('02','04','05','EMBARCACIONES.','',NULL::varchar);
CALL "estate".sp_create_section('02','04','06','AERONAVES','',NULL::varchar);
CALL "estate".sp_create_section('02','05','00','EQUIPOS DE TELECOMUNICACIONES:','',NULL::varchar);
CALL "estate".sp_create_section('02','06','00','EQUIPOS MEDICO-QUIRURGICO DENTALES Y VETERINARIOS','',NULL::varchar);
CALL "estate".sp_create_section('02','06','01','EQUIPOS MéDICO-QUIRúRGICOS Y DE VETERINARIA.','',NULL::varchar);
CALL "estate".sp_create_section('02','06','02','EQUIPOS DENTALES.','',NULL::varchar);
CALL "estate".sp_create_section('02','07','00','EQUIPOS CIENTIFICOS Y DE ENSEÑANZA','',NULL::varchar);
CALL "estate".sp_create_section('02','07','01','EQUIPOS CIENTíFICOS Y DE LABORATORIO.','',NULL::varchar);
CALL "estate".sp_create_section('02','07','02','EQUIPOS DE ENSEñANZA, DEPORTE Y RECREACIóN.','',NULL::varchar);
CALL "estate".sp_create_section('02','07','03','ELEMENTOS DEL CULTO','',NULL::varchar);
CALL "estate".sp_create_section('02','08','00','COLECCIONES CULTURALES, ARTISTICAS E HISTORICAS','',NULL::varchar);
CALL "estate".sp_create_section('02','08','01','BIBLIOTECAS.','',NULL::varchar);
CALL "estate".sp_create_section('02','08','02','COLECCIONES CIENTíFICAS.','',NULL::varchar);
CALL "estate".sp_create_section('02','08','03','COLECCIONES ARTíSTICAS Y ORNAMENTALES','',NULL::varchar);
CALL "estate".sp_create_section('02','08','04','COLECCIONES HISTóRICAS','',NULL::varchar);
CALL "estate".sp_create_section('02','09','00','ARMAMENTO Y MATERIAL DE DEFENSA','',NULL::varchar);
CALL "estate".sp_create_section('02','10','00','INSTALACIONES PROVISIONALES:','',NULL::varchar);
CALL "estate".sp_create_section('02','11','00','SEMOVIENTES','',NULL::varchar);
CALL "estate".sp_create_section('02','12','00','OTROS ELEMENTOS:','',NULL::varchar);
CALL "estate".sp_create_section('02','13','00','EQUIPOS DE COMPUTACION','',NULL::varchar);
CALL "estate".sp_create_section('02','13','01','EQUIPO DE COMPUTACION E IMPRESORAS','',NULL::varchar);
CALL "estate".sp_create_section('02','13','02','UPS','',NULL::varchar);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
