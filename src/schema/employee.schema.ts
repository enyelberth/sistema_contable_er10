import { z } from "zod";

const employeeSchema = z.object({
  job_position_code: z
    .string({
      required_error: "EL CODIGO DEL CARGO ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL CARGO NO PUEDE SER MENOS DE 9 DIGITOS",
    })
    .max(50, {
      message: "EL CODIGO DEL CARGO NO PUEDE SER MAS DE 9 DIGITOS",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "EL CODIGO DEL CARGO DEBE TENER 3 LETRAS, 1 GUION Y 5 NUMEROS",
    }),
  unit_administrative_code: z
    .string({
      required_error: "EL CODIGO DE LA UNIDAD ADMINISTRATIVA",
    })
    .min(6, {
      message:
        "EL CODIGO DE LA UNIDAD ADMINISTRATIVA NO PUEDE SER MENOS DE 6 DIGITOS",
    })
    .max(6, {
      message:
        "EL CODIGO DE LA UNIDAD ADMINISTRATIVA NO PUEDE SER MAS DE 6 DIGITOS",
    })
    .regex(/^([0-9][0-9])*$/, {
      message: "EL CODIGO DE LA UNIDAD ADMINISTRATIVA DEBE TENER 6 NUMEROS",
    }),
  first_name: z
    .string({
      required_error: "EL NOMBRE DE LA PERSONA ES REQUERIDO",
    })
    .min(3, {
      message: "EL NOMBRE DE LA PERSONA DEBE TENER ALMENOS 3 DIGITOS",
    })
    .max(9, {
      message: "EL NOMBRE DE LA PERSONA DEBE TENER MAXIMO 50 DIGITOS",
    })
    .regex(/^([a-zA-Z\s])*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  last_name: z
    .string({
      required_error: "EL APELLIDO DE LA PERSONA ES REQUERIDO",
    })
    .min(3, {
      message: "EL APELLIDO DE LA PERSONA DEBE TENER ALMENOS 3 DIGITOS",
    })
    .max(50, {
      message: "EL APELLIDO DE LA PERSONA DEBE TENER ALMENOS 50 DIGITOS",
    })
    .regex(/^([a-zA-Z\s])*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  identify_acronym: z
    .string({
      required_error: "EL ACRONIMO DE LA IDENTIFICACION ES REQUERIDO",
    })
    .min(1, {
      message: "EL ACRONIMO DE LA IDENTIFICACION NO DEBE TENER MENOS 1 DIGITO",
    })
    .max(1, {
      message: "EL ACRONIMO DE LA IDENTIFICACION NO DEBE TENER MAS 1 DIGITO",
    })
    .regex(/^[a-zA-Z][a-zA-Z]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  identify_number: z
    .string({
      required_error: "EL NUMERO DE LA IDENTIFICACION ES REQUERIDO",
    })
    .min(7, {
      message:
        "EL NUMERO DE LA IDENTIFICACION NO DEBE TENER MENOS DE 7 DIGITOS",
    })
    .max(10, {
      message: "EL NUMERO DE IDENTIFICACION NO DEBE TENER MAS DE 8 DIGITOS",
    })
    .regex(/^[0-9][0-9]*$/, {
      message: "SOLO SE PERMITEN NUMEROS",
    }),
  birth_date: z
    .date({
      required_error: "FECHA DE NACIMIENTO REQUERIDO",
    })
    .min(new Date("1940/01/01"), {
      message: "LA PERSONA TIENE UNA EDAD, QUE NO PUEDE SER REGISTRADA",
    })
    .max(new Date(), {
      message: "LA PERSONA DEBE TENER ALMENOS 18 AÑOS DE EDAD",
    }),
  gender: z
    .string({
      required_error: "EL GENERO ES REQUERIDO",
    })
    .min(6, {
      message: "EL GENERO MINIMO DEBE TENER 6 CARACTERES",
    })
    .max(9, {
      message: "EL GENERO MAXIMO DEBE TENER 9 CARACTERES",
    }),
  phone_number: z.string().regex(/^\+58 \(414|424|416|426|412|251\)\-\d{7}$/, {
    message: `EL NUMERO DE TELEFONO ESTA COMPRENDIDO CON EL CODIGO INTERNACIONAL: +58
        ADEMAS DE EL CODIGO DE AREA EN CASO DE SER NUMERO LOCAL, SI ES TELEFONO CELULAR SE COLOCA EL CODIGO
        DE LA OPERADORA (414,424) MOVISTAR, (416,426) MOVILNET, (412) DIGITEL
        `,
  }),
  home_address: z
    .string({
      required_error: "LA DIRECCION DE RESIDENCIA ES REQUERIDO",
    })
    .regex(/^([a-zA-Z0-9\s])*$/, {
      message: "SOLO SE PERMITEN LETRAS Y NUMEROS",
    }),
});
const identifyNumberSchema = z.object({
  identify_number: z
    .string({
      required_error: "EL NUMERO DE LA IDENTIFICACION ES REQUERIDO",
    })
    .min(7, {
      message:
        "EL NUMERO DE LA IDENTIFICACION NO DEBE TENER MENOS DE 7 DIGITOS",
    })
    .max(10, {
      message: "EL NUMERO DE IDENTIFICACION NO DEBE TENER MAS DE 8 DIGITOS",
    })
    .regex(/^[0-9][0-9]*$/, {
      message: "SOLO SE PERMITEN NUMEROS",
    }),
});

const employCodeValidation = z.object({
  employ_code: z
    .string({
      required_error: "EL CODIGO DEL CARGO ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL CARGO NO PUEDE SER MENOS DE 9 DIGITOS",
    })
    .max(9, {
      message: "EL CODIGO DEL CARGO NO PUEDE SER MAS DE 9 DIGITOS",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "EL CODIGO DEL CARGO DEBE TENER 3 LETRAS, 1 GUION Y 5 NUMEROS",
    }),
});

const updateEmployeeSchema = z.object({
  job_position_code: z
    .string({
      required_error: "EL CODIGO DEL CARGO ES REQUERIDO",
    })
    .min(9, {
      message: "EL CODIGO DEL CARGO NO PUEDE SER MENOS DE 9 DIGITOS",
    })
    .max(9, {
      message: "EL CODIGO DEL CARGO NO PUEDE SER MAS DE 9 DIGITOS",
    })
    .regex(/^([a-zA-Z]{3}-[0-9]{5})*$/, {
      message: "EL CODIGO DEL CARGO DEBE TENER 3 LETRAS, 1 GUION Y 5 NUMEROS",
    }),
  first_name: z
    .string({
      required_error: "EL NOMBRE DE LA PERSONA ES REQUERIDO",
    })
    .min(3, {
      message: "EL NOMBRE DE LA PERSONA DEBE TENER ALMENOS 3 DIGITOS",
    })
    .max(50, {
      message: "EL NOMBRE DE LA PERSONA DEBE TENER MAXIMO 50 DIGITOS",
    })
    .regex(/^([a-zA-Z\s])*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  last_name: z
    .string({
      required_error: "EL APELLIDO DE LA PERSONA ES REQUERIDO",
    })
    .min(3, {
      message: "EL APELLIDO DE LA PERSONA DEBE TENER ALMENOS 3 DIGITOS",
    })
    .max(50, {
      message: "EL APELLIDO DE LA PERSONA DEBE TENER ALMENOS 50 DIGITOS",
    })
    .regex(/^([a-zA-Z\s])*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  identify_acronym: z
    .string({
      required_error: "EL ACRONIMO DE LA IDENTIFICACION ES REQUERIDO",
    })
    .min(1, {
      message: "EL ACRONIMO DE LA IDENTIFICACION NO DEBE TENER MENOS 1 DIGITO",
    })
    .max(1, {
      message: "EL ACRONIMO DE LA IDENTIFICACION NO DEBE TENER MAS 1 DIGITO",
    })
    .regex(/^[a-zA-Z][a-zA-Z]*$/, {
      message: "SOLO SE PERMITEN LETRAS",
    }),
  identify_number: z
    .string({
      required_error: "EL NUMERO DE LA IDENTIFICACION ES REQUERIDO",
    })
    .min(7, {
      message:
        "EL NUMERO DE LA IDENTIFICACION NO DEBE TENER MENOS DE 7 DIGITOS",
    })
    .max(10, {
      message: "EL NUMERO DE IDENTIFICACION NO DEBE TENER MAS DE 8 DIGITOS",
    })
    .regex(/^[0-9][0-9]*$/, {
      message: "SOLO SE PERMITEN NUMEROS",
    }),
  birth_date: z
    .date({
      required_error: "FECHA DE NACIMIENTO REQUERIDO",
    })
    .min(new Date("1940/01/01"), {
      message: "LA PERSONA TIENE UNA EDAD, QUE NO PUEDE SER REGISTRADA",
    })
    .max(new Date(), {
      message: "LA PERSONA DEBE TENER ALMENOS 18 AÑOS DE EDAD",
    }),
  gender: z
    .string({
      required_error: "EL GENERO ES REQUERIDO",
    })
    .min(6, {
      message: "EL GENERO MINIMO DEBE TENER 6 CARACTERES",
    })
    .max(9, {
      message: "EL GENERO MAXIMO DEBE TENER 9 CARACTERES",
    }),
  phone_number: z.string().regex(/^\+58 \(414|424|416|426|412|251\)\-\d{7}$/, {
    message: `EL NUMERO DE TELEFONO ESTA COMPRENDIDO CON EL CODIGO INTERNACIONAL: +58
        ADEMAS DE EL CODIGO DE AREA EN CASO DE SER NUMERO LOCAL, SI ES TELEFONO CELULAR SE COLOCA EL CODIGO
        DE LA OPERADORA (414,424) MOVISTAR, (416,426) MOVILNET, (412) DIGITEL
        `,
  }),
  home_address: z
    .string({
      required_error: "LA DIRECCION DE RESIDENCIA ES REQUERIDO",
    })
    .regex(/^([a-zA-Z0-9\s])*$/, {
      message: "SOLO SE PERMITEN LETRAS Y NUMEROS",
    }),
});

export {
  employeeSchema,
  identifyNumberSchema,
  employCodeValidation,
  updateEmployeeSchema,
};
