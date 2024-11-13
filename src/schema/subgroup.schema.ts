import { z } from "zod";

const validatesubgroupcode = z.object({
  code: z
    .string({
      required_error: "El nombre del rol es requerido",
    })
    .min(4, {
      message: "El minimo de caracteres son 4",
    })
    .max(50, {
      message: "El maximo de caracteres para el rol son 50",
    })
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/, {
      message: "Solo se permiten letras",
    }),
  name: z
    .string({
      required_error: "El nombre del subgroups es requerido",
    })
    .min(4, {
      message: "El minimo de caracteres son de 4",
    })
    .max(50, {
      message: "El maximo de caracteres es de 50",
    }),
  group_code: z
    .string({
      required_error: "El group code es requerido",
    })
    .min(5, {
      message: "El minimo de caracteres son de 4",
    })
    .max(50, {
      message: "El maximo de caracteres es de 50",
    }),
  description: z
    .string({
      required_error: "La descripcion es requerido",
    })
    .min(4, {
      message: "El minimo de caracteres son de 4",
    })
    .max(50, {
      message: "El maximo de caracteres es de 50",
    }),
});
