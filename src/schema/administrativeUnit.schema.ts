import { z } from "zod";

const administrativeUnitSchema = z.object({
  name: z
    .string({
      required_error: "EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES REQUERIDO",
    })
    .min(5, {
      message:
        "EL MINIMO DE CARACTERES PARA EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES 5",
    })
    .max(50, {
      message:
        "EL MAXIMO DE CARACTERES PARA EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES 50",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  description: z
    .string({
      required_error:
        "LA DESCRIPCION DE LA UUNIDAD ADMINISTRATIVA ES REQUERIDO",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
});

const validateAdministrativeUnitCode = z.object({
  code_administrative_unit: z
  .string({
    required_error: "CODIGO DE LA UNIDAD ADMINISTRATIVA ES REQUERIDO",
  })
  .min(6, {
    message: "EL CODIGO TIENE COMO MINIMO 6 DIGITOS",
  })
  .max(6, {
    message: "EL CODIGO TIENE COMO MAXIMO 6 DIGITOS",
  })
  .regex(/^[0-9][0-9]*$/, {
    message: "SOLO SE PERMITEN NUMEROS",
  })
})

export { administrativeUnitSchema, validateAdministrativeUnitCode };
