import { describe, expect, it, beforeEach } from "vitest";
import {
  listarTablaEgresosTool,
  registrarEgresoTool
} from "../src/agent/tools/egresos.js";
import { resetEgresosStore } from "../src/agent/store/egresosStore.js";

describe("egresos tools", () => {
  beforeEach(() => {
    resetEgresosStore();
  });

  it("registrarEgresoTool devuelve JSON con idEgreso", async () => {
    const raw = await registrarEgresoTool.invoke({
      nit: "900-1",
      valor_egreso: 100,
      razon: "Test",
      valor_egreso_letras: "CIEN PESOS",
      fecha: "2026-01-01",
      nombre_emisor: "ACME"
    });
    const parsed = JSON.parse(String(raw)) as { idEgreso: number };
    expect(parsed.idEgreso).toBe(1);
  });

  it("listarTablaEgresosTool refleja registros", async () => {
    await registrarEgresoTool.invoke({
      nit: "900-1",
      valor_egreso: 100,
      razon: "Test",
      valor_egreso_letras: "CIEN PESOS",
      fecha: "2026-01-01",
      nombre_emisor: "ACME"
    });
    const table = await listarTablaEgresosTool.invoke({});
    expect(String(table)).toContain("900-1");
  });
});
