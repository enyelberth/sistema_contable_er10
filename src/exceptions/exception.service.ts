import { HttpException, HttpStatus } from "@nestjs/common";
import { typeConst } from "./states/states.message";

export class ExceptionService extends Error {
  constructor() {
    super();
  }

  set setMessage({
    state,
    type,
    message,
  }: {
    state: keyof typeof HttpStatus;
    type: keyof typeof typeConst;
    message: string;
  }) {
    this.message = `${state} :: ${type} :: ${message}`;
  }
  public createErrorSignature(error: any = null) {
    let name: keyof typeof HttpStatus, type, message;
    if (error?.severity === "ERROR") {
        type = "danger"
        message =
          "ERROR EN EL ENVIO DE DATOS O AL CONECTAR CON LA BASE DE DATOS";
      console.info(error);
    } else {
      const output = this.message;
      name = output.split(" :: ")[0] as keyof typeof HttpStatus;
      type = output.split(" :: ")[1];
      message = output.split(" :: ")[2];
      console.info(`${type}, ${name}: ${message}`);
    }
    if (name) {
      throw new HttpException(
        { type, message: `${name}: ${message}` },
        HttpStatus[name]
      );
    } else {
      throw new HttpException({ type, message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
