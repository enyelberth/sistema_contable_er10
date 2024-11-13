import { z } from "zod";

const roleSchema = z.object({
  name_role: z
    .string({
      required_error: "EL NOMBRE DEL ROL ES REQUERIDO",
    })
    .min(4, {
      message: "EL MINIMO DE CARACTERES PARA EL ROL SON 4",
    })
    .max(50, {
      message: "EL MAXIMO DE CARATERES PARA EL ROL SON 50",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  description: z
    .string({
      required_error: "LA DESCRIPCION DEL ROL ES REQUERDIA",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
});

const validateRoleCodeParam = z.object({
  role_code: z
    .string({
      required_error: "CODIGO DE ROL ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DE ROL DEBE TENER MINIMO 9 CARACTERES",
    })
    .max(9, {
      message: "EL CODIGO DE ROL DEBE TENER MAXIMO 9 CARACTERES",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/),
});

const validateEquals = z
  .object({
    role_code: z
      .string({
        required_error: "CODIGO DE ROL ES REQUERIDO",
      })
      .min(9, {
        message: "EL CODIGO DE ROL DEBE TENER MINIMO 9 CARACTERES",
      })
      .max(9, {
        message: "EL CODIGO DE ROL DEBE TENER MAXIMO 9 CARACTERES",
      })
      .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/),
    role_jwt: z
      .string({
        required_error: "CODIGO DE ROL ES REQUERIDO",
      })
      .min(9, {
        message: "EL CODIGO DE ROL DEBE TENER MINIMO 9 CARACTERES",
      })
      .max(9, {
        message: "EL CODIGO DE ROL DEBE TENER MAXIMO 9 CARACTERES",
      })
      .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/),
  })
  .refine((data) => data.role_code !== data.role_jwt, {
    message: "NO SE PUEDE MODIFICAR SU PROPIO ROL",
  });

export { roleSchema, validateRoleCodeParam, validateEquals };
