import { describe, expect, it, beforeEach } from "vitest";
import {
  egresosComoTablaMarkdown,
  listarEgresos,
  registrarEgreso,
  resetEgresosStore
} from "../src/agent/store/egresosStore.js";

const sample = {
  nit: "900123456-7",
  valorEgreso: 1_500_000,
  razon: "Papelería",
  valorEgresoLetras: "UN MILLÓN QUINIENTOS MIL PESOS",
  fecha: "15/04/2026",
  nombreEmisor: "Papelería Central SAS"
};

describe("egresosStore", () => {
  beforeEach(() => {
    resetEgresosStore();
  });

  it("asigna idEgreso incremental por cada registro", () => {
    const a = registrarEgreso(sample);
    const b = registrarEgreso({ ...sample, razon: "Otro" });
    expect(a.idEgreso).toBe(1);
    expect(b.idEgreso).toBe(2);
    expect(listarEgresos()).toHaveLength(2);
  });

  it("egresosComoTablaMarkdown incluye cabeceras y filas", () => {
    registrarEgreso(sample);
    const md = egresosComoTablaMarkdown();
    expect(md).toContain("ID egreso");
    expect(md).toContain("900123456-7");
    expect(md).toContain("1500000");
  });

  it("sin registros devuelve mensaje vacío", () => {
    expect(egresosComoTablaMarkdown()).toContain("No hay egresos");
  });
});
