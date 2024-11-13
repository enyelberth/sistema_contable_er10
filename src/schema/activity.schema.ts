import { z } from "zod";

const activitySchema = z.object({
  code: z
    .string({
      required_error: "CODIGO DE LA ACTIVIDAD ES REQUERIDO",
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
      required_error: "NOMBRE DE LA ACTIVIDAD ES REQUERIDO",
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
      required_error: "LA DESCRIPCION DE LA ACTIVIDAD ES REQUERIDO",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
});

const updateAcitivitySchema = z.object({
  name: z
    .string({
      required_error: "NOMBRE DE LA ACTIVIDAD ES REQUERIDO",
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
      required_error: "LA DESCRIPCION DE LA ACTIVIDAD ES REQUERIDO",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
});

const validateActivityCodeParam = z.object({
  activity_code: z
    .string({
      required_error: "CODIGO DE LA ACTIVIDAD ES REQUERIDO",
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
});

export { activitySchema, updateAcitivitySchema, validateActivityCodeParam };
