import { tool } from "@langchain/core/tools";
import { z } from "zod";
import {
  egresosComoTablaMarkdown,
  registrarEgreso
} from "../store/egresosStore.js";

export const registrarEgresoTool = tool(
  async ({
    nit,
    valor_egreso,
    razon,
    valor_egreso_letras,
    fecha,
    nombre_emisor
  }) => {
    const row = registrarEgreso({
      nit: nit.trim(),
      valorEgreso: valor_egreso,
      razon: razon.trim(),
      valorEgresoLetras: valor_egreso_letras.trim(),
      fecha: fecha.trim(),
      nombreEmisor: nombre_emisor.trim()
    });
    return JSON.stringify(
      {
        idEgreso: row.idEgreso,
        mensaje: `Egreso registrado con ID ${row.idEgreso}.`
      },
      null,
      0
    );
  },
  {
    name: "registrar_egreso",
    description:
      "Registra un egreso en la tabla interna. Asigna automáticamente un ID de egreso único por fila. Úsalo cuando el usuario haya dado (o hayas inferido de forma clara) todos los datos: NIT, valor numérico del egreso, razón, valor en letras, fecha y nombre de quien emite la factura.",
    schema: z.object({
      nit: z.string().describe("NIT del beneficiario o sujeto del egreso."),
      valor_egreso: z
        .number()
        .describe("Valor del egreso a reportar (número, sin formato de moneda)."),
      razon: z.string().describe("Razón o concepto del egreso."),
      valor_egreso_letras: z
        .string()
        .describe("Valor del egreso expresado en letras (completo)."),
      fecha: z.string().describe("Fecha del egreso (como la indique el usuario)."),
      nombre_emisor: z
        .string()
        .describe("Nombre de la empresa o persona que emite la factura.")
    })
  }
);

export const listarTablaEgresosTool = tool(
  async () => {
    return egresosComoTablaMarkdown();
  },
  {
    name: "listar_tabla_egresos",
    description:
      "Devuelve la tabla completa de egresos registrados en formato Markdown (una fila por ID de egreso).",
    schema: z.object({})
  }
);
