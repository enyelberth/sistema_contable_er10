import { z } from "zod";

const modulesSchema = z.object({
  module_code: z
    .string({
      required_error: "EL CODIGO DEL MODULO ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL MODULO NO PUEDE SER MENOS DE 9 DIGITOS",
    })
    .max(9, {
      message: "EL CODIGO DEL MODULO NO PUEDE SER MAS DE 9 DIGITOS",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS, 1 GUION Y 5 NUMEROS",
    }),
  view: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
  print: z.boolean(),
  report: z.boolean(),
});

const accessLevelSchema = z.object({
  role_code: z
    .string({
      required_error: "EL CODIGO DEL ROL ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL ROL NO PUEDE SER MENOS DE 9 DIGITOS",
    })
    .max(9, {
      message: "EL CODIGO DEL ROL NO PUEDE SER MAS DE 9 DIGITOS",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "SOLO SE PERMITEN 3 LETRAS, 1 GUION Y 5 NUMEROS",
    }),
  modules: z.array(modulesSchema),
});

export { accessLevelSchema };

