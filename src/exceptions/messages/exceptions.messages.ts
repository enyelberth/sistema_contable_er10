//NOTE: Excepciones para todos los endpoint agregar mas si se requiere
import { ExceptionService } from "../exception.service";
import { HttpException, HttpStatus } from "@nestjs/common";
const exception = new ExceptionService();

export const ExceptionsMessages = {
  //NOTE: customized messages
  create(name: string, code: string) {
    exception.setMessage = {
      state: "CREATED",
      type: "success",
      message:
        `${name} SE HA CREADO CON EXITO, CON EL CODIGO: ${code}`.toUpperCase(),
    };
    exception.createErrorSignature();
  },

  update(name: string, msg = "SE HA ACTUALIZADO CON EXITO") {
    exception.setMessage = {
      state: "OK",
      type: "success",
      message: `${name} ${msg}`.toUpperCase(),
    };
    exception.createErrorSignature();
  },

  errorProcess() {
    exception.setMessage = {
      state: "INTERNAL_SERVER_ERROR",
      type: "danger",
      message: "ERROR EN EL ENVIO DE DATOS O AL CONECTAR CON LA BASE DE DATOS",
    };
    exception.createErrorSignature();
  },

  treeOverLevel() {
    exception.setMessage = {
      state: "CONFLICT",
      type: "danger",
      message: "EL NIVEL DEL MODULO NO PUEDE SER MAYOR A 3",
    };
    exception.createErrorSignature();
  },

  alreadyExists(name: string, msg: string = "YA EXISTE") {
    exception.setMessage = {
      state: "BAD_REQUEST",
      type: "info",
      message: `${name} ${msg}`.toUpperCase(),
    };
    exception.createErrorSignature();
  },

  notFound(name: string) {
    exception.setMessage = {
      state: "NOT_FOUND",
      type: "info",
      message: `${name} NO EXISTE`.toUpperCase(),
    };
    exception.createErrorSignature();
  },

  roleOnUser() {
    exception.setMessage = {
      state: "CONFLICT",
      type: "warning",
      message:
        "NO SE PERMITE MODIFICAR EL ROL UNA VEZ ESTE RELACIONADO CON ALMENOS UN USUARIO",
    };
    exception.createErrorSignature();
  },

  jobPositionOnEmploy() {
    exception.setMessage = {
      state: "CONFLICT",
      type: "warning",
      message:
        "NO SE PERMITE MODIFICAR UN CARGO UNA VEZ ESTE RELACIONADO A UN EMPLEADO",
    };
  },

  usersCodesNoExists() {
    exception.setMessage = {
      state: "CONFLICT",
      type: "danger",
      message: `EL EMPLEADO, EL ESTATUS O ROL NO EXISTE`,
    };
    exception.createErrorSignature();
  },

  currentPasswordError() {
    exception.setMessage = {
      state: "BAD_REQUEST",
      type: "info",
      message: "LA CLAVE ACTUAL ES INVALIDA",
    };
    exception.createErrorSignature();
  },

  changePasswordSuccess() {
    exception.setMessage = {
      state: "OK",
      type: "success",
      message: "CLAVE ACTUALIZADA CON EXITO",
    };
    exception.createErrorSignature();
  },

  invalidCredentials() {
    exception.setMessage = {
      state: "UNAUTHORIZED",
      type: "warning",
      message: "CREDENCIALES INVALIDAS",
    };
    exception.createErrorSignature();
  },

  userStatusIssue() {
    exception.setMessage = {
      state: "UNAUTHORIZED",
      type: "warning",
      message:
        "EL USUARIO SE ENCUENTRA INACTIVO O BLOQUEADO, POR FAVOR COMUNIQUESE CON EL ADMINISTRADOR DEL SISTEMA",
    };
    exception.createErrorSignature();
  },

  sessionExists() {
    exception.setMessage = {
      state: "UNAUTHORIZED",
      type: "warning",
      message: "EL USUARIO YA TIENE UNA SESSION INICIADA",
    };
    exception.createErrorSignature();
  },

  schemaError(type: string, error: string) {
    const errors = JSON.parse(error).map((e: any) => {
      return {
        code: e.code,
        attr: e.path[0],
        message: e.message,
      };
    });
    throw new HttpException(
      { type, validations: errors },
      HttpStatus.BAD_REQUEST,
    );
  },

  createErrorSignature: (error: any = null) => exception.createErrorSignature(error),
};
