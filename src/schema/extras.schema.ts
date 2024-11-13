import { z } from "zod";

const tableSchema = z.object({
  searchOptions: z
    .string()
    .regex(/^$|^[a-zA-Z0-9\s\-]*$/, {
      message: "SOLO SE PERMITEN ESPACIO, LETRAS Y NUMEROS",
    })
    .nullable(),
  limit: z
    .string({
      required_error: "EL LIMITE ES REQUERIDO",
    })
    .regex(/^(5|10|15|20)$/, {
      message: "EL LIMITE TIENE QUE SER 5, 10, 15 O 20",
    }),
  page: z.number().nonnegative({
    message: "LA PAGINA TIENE QUE SER MAYOR O IGUAL A 0",
  }),
  // page: z.number().refine((val) => val <= 1, {
  //   message: "LA PAGINA TIENE QUE SE SER MAYOR O IGUAL A 0",
  // }),
});
const searchOptionsSchema = z.object({
  searchOptions: z
    .string()
    .regex(/^$|^[a-zA-Z0-9\s\-]*$/, {
      message: "SOLO SE PERMITEN ESPACIO, LETRAS Y NUMEROS",
    })
    .nullable(),
});
export { tableSchema, searchOptionsSchema };
