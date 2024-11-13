import { z } from "zod";

const jobPositionSchema = z.object({
  name: z
    .string({
      required_error: "EL NOMBRE DEL CARGO ES REQUERIDO",
    })
    .min(5, {
      message: "EL NOMBRE DEL CARGO DEBE TENER MINIMO 5 CARACTERES",
    })
    .max(50, {
      message: "EL NOMBRE DEL CARGO DEBE TENER MAXIMO DE 50 CARACTERES",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  description: z
    .string({
      required_error: "LA DESCRIPCION DEL CARGO ES REQUERIDO",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
});

const validateJobPositionCodeParam = z.object({
  code: z
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

export { jobPositionSchema, validateJobPositionCodeParam };

