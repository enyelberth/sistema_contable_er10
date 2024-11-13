import { z } from "zod";

const userSchema = z.object({
  role_code: z
    .string({
      required_error: "CODIGO DEL ROL ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MINIMO 9 CARACTERES",
    })
    .max(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MAXIMO 9 CARACTERES",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS UN GUION Y 5 NUMEROS",
    }),
  employeed_code: z
    .string({
      required_error: "CODIGO DEL EMPLEADO ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MINIMO 9 CARACTERES",
    })
    .max(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MAXIMO 9 CARACTERES",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS UN GUION Y 5 NUMEROS",
    }),
  status_code: z
    .string({
      required_error: "CODIGO DEL ESTATUS ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MINIMO 9 CARACTERES",
    })
    .max(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MAXIMO 9 CARACTERES",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS UN GUION Y 5 NUMEROS",
    }),
  username: z
    .string({
      required_error: "NOMBRE DE USUARIO ES REQUERIDO",
    })
    .min(6, {
      message: "NOMBRE DE USUARIO DEBE TENER MINIMO 6 CARACTERES",
    })
    .max(50, {
      message: "NOMBRE DE USUARIO DEBE TENER MAXIMO 50 CARACTERES",
    })
    .regex(/^[a-zA-Z-0-9]*$/, {
      message: "SOLO SE PERMITEN LETRAS Y NUMEROS",
    }),
  password: z
    .string({
      required_error: "LA CLAVE ES REQUERIDA",
    })
    .min(8, {
      message: "LA CLAVE DEBE TENER MINIMO 8 CARACTERES",
    })
    .max(255, {
      message: "LA CLAVE DEBE TENER MAXIMO 255 CARACTERES",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "LA CLAVE DEBE ESTAR COMPUESTA ALMENOS CON UNA LETRA MINUSCULA, UNA MAYUSCULA, UN NUMERO Y UN CARACTEC ESPECIAL (@$!%*?&)",
      },
    ),
});

const updateUserSchema = z.object({
  role_code: z
    .string({
      required_error: "EL CODIGO DEL ROL ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MINIMO 9 CARACTERES",
    })
    .max(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MAXIMO 9 CARACTERES",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS UN GUION Y 5 NUMEROS",
    }),
  status_code: z
    .string({
      required_error: "EL CODIGO DEL ROL ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MINIMO 9 CARACTERES",
    })
    .max(9, {
      message: "EL CODIGO DEL ROL DEBE TENER MAXIMO 9 CARACTERES",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS UN GUION Y 5 NUMEROS",
    }),
  enabled: z.boolean({
    required_error: "ENABLED ES REQUERIDO",
    invalid_type_error: "ENABLED DEBE SER VERDADERO O FALSO",
  }),
});

const userCodeValidateParam = z.object({
  user_code: z
    .string({
      required_error: "EL CODIGO DEL USUARIO ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL USUARIO DEBE TENER MINIMO 9 CARACTERES",
    })
    .max(9, {
      message: "EL CODIGO DEL USUARIO DEBE TENER MAXIMO 9 CARACTERES",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS UN GUION Y 5 NUMEROS",
    }),
});

const password = z.object({
  password: z
    .string({
      required_error: "LA CLAVE ES REQUERIDA",
    })
    .min(8, {
      message: "LA CLAVE DEBE TENER MINIMO 8 CARACTERES",
    })
    .max(255, {
      message: "LA CLAVE DEBE TENER MAXIMO 255 CARACTERES",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "LA CLAVE DEBE ESTAR COMPUESTA ALMENOS CON UNA LETRA MINUSCULA, UNA MAYUSCULA, UN NUMERO Y UN CARACTEC ESPECIAL (@$!%*?&)",
      },
    ),
});

export { userSchema, updateUserSchema, userCodeValidateParam, password };
