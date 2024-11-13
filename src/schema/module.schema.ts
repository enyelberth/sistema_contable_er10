import { z } from "zod";

const moduleSchema = z.object({
  name_module: z
    .string({
      required_error: "EL NOMBRE DEL MODULO ES REQUERIDO",
    })
    .min(4, {
      message: "EL MINIMO DEL NOMBRE DEL MODULO ES DE 6 CARACTERES",
    })
    .max(50, {
      message: "EL MAXIMO DEL NOMBRE DEL MODULO ES 50",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  pathern_code: z
    .string({
      required_error: "EL PATHERN CODE ES REQUERIDO",
    })
    .max(9, {
      message: "MAXIMO DE CARACTERES DEL CODIGO PADRE ES 9",
    })
    .regex(/^$|^([a-zA-Z]{3}-[0-9]{5})?$/, {
      message: "SOLO SE PERMITEN 3 LETRA UN GUION Y 5 NUMEROS O UN VALOR VACIO",
    })
    .nullable(),
  src: z
    .string({
      required_error: "LA RUTA DEL MODULO ES REQUERIDA",
    })
    .regex(/^[a-z-A-Z/]*$/, {
      message: "SOLO SE PERMITEN LETRAS Y SLASH BAR",
    })
    .nullable(),
  icon: z
    .string({
      required_error: "LA RUTA DEL ICONO ES REQUERIDA",
    })
    .regex(/^[a-z-A-Z/.]*$/, {
      message: "SOLO SE PERMITEN LETRAS, SLASH BAR Y PUNTO",
    }),
  access: z.array(
    z.object({
      name: z.string({
        required_error: "LOS PERMISOS AL MODULO SON REQUERIDOS",
      }),
    }),
  ),
});

const updateModuleSchema = z.object({
  name_module: z
    .string({
      required_error: "EL NOMBRE DEL MODULO ES REQUERIDO",
    })
    .min(4, {
      message: "EL MINIMO DEL NOMBRE DEL MODULO ES DE 6 CARACTERES",
    })
    .max(50, {
      message: "EL MAXIMO DEL NOMBRE DEL MODULO ES 50",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  pathern_code: z
    .string({
      required_error: "EL PATHERN CODE ES REQUERIDO",
    })
    .max(9, {
      message: "MAXIMO DE CARACTERES DEL CODIGO PADRE ES 9",
    })
    .regex(/^$|^([a-zA-Z]{3}-[0-9]{5})?$/, {
      message: "SOLO SE PERMITEN 3 LETRA UN GUION Y 5 NUMEROS O UN VALOR VACIO",
    })
    .nullable(),
  src: z
    .string({
      required_error: "LA RUTA DEL MODULO ES REQUERIDA",
    })
    .regex(/^[a-z-A-Z/]*$/, {
      message: "SOLO SE PERMITEN LETRAS Y SLASH BAR",
    })
    .nullable(),
  icon: z
    .string({
      required_error: "LA RUTA DEL ICONO ES REQUERIDA",
    })
    .regex(/^[a-z-A-Z/.]*$/, {
      message: "SOLO SE PERMITEN LETRAS, SLASH BAR Y PUNTO",
    }),
});

const validateModuleCodeParam = z.object({
  module_code: z
    .string({
      required_error: "EL MODULE CODE ES REQUERIDO",
    })
    .min(9, {
      message: "MINIMO DE CARACTERES DEL CODIGO PATERNO ES 9",
    })
    .max(9, {
      message: "MAXIMO DE CARACTERES DEL CODIGO PADRE ES 9",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRA UN GUION Y 5 NUMEROS",
    }),
});

export { moduleSchema, updateModuleSchema, validateModuleCodeParam };
