import { z } from "zod";

const programSchema = z.object({
  code: z
    .string({
      required_error: "CODIGO DEL PROGRAMA ES REQUERIDO",
    })
    .min(2, {
      message: "EL CODIGO TIENE COMO MINIMO 2 DIGITOS",
    })
    .max(2, {
      message: "EL CODIGO TIENE COMO MAXIMO 2 DIGITOS",
    })
    .regex(/^[0-9][0-9]*$/, {
      message: "SOLO SE PERMITEN NUMEROS",
    }),
  name: z
    .string({
      required_error: "NOMBRE DEL PROGRAMA ES REQUERIDO",
    })
    .min(5, {
      message: "EL NOMBRE DEBE TENER UN MINIMO DE 5 CARACTERES",
    })
    .max(50, {
      message: "EL NOMBRE TIENE UN MAXIMO DE 50 CARACTERES",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  description: z
    .string({
      required_error: "LA DESCRIPCION DEL PROGRAMA ES REQUERIDO",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
});

const updateProgramSchema = z.object({
  name: z
    .string({
      required_error: "NOMBRE DEL PROGRAMA ES REQUERIDO",
    })
    .min(5, {
      message: "EL NOMBRE DEBE TENER UN MINIMO DE 5 CARACTERES",
    })
    .max(50, {
      message: "EL NOMBRE TIENE UN MAXIMO DE 50 CARACTERES",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  description: z
    .string({
      required_error: "LA DESCRIPCION DEL PROGRAMA ES REQUERIDO",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
});

const validateProgramCodeParam = z.object({
  program_code: z
    .string({
      required_error: "EL CODIGO DEL PROGRAMA ES REQUERIDO",
    })
    .min(2, {
      message: "EL CODIGO DEL PROGRAMA TIENE COMO MINIMO 2 DIGITOS",
    })
    .max(2, {
      message: "EL CODIGO DEL PROGRAMA TIENE COMO MAXIMO 2 DIGITOS",
    })
    .regex(/^[0-9][0-9]*$/, {
      message: "SOLO SE PERMITEN NUMEROS",
    }),
});

export { programSchema, updateProgramSchema, validateProgramCodeParam };
