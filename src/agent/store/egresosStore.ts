export interface EgresoRow {
  idEgreso: number;
  nit: string;
  valorEgreso: number;
  razon: string;
  valorEgresoLetras: string;
  fecha: string;
  nombreEmisor: string;
}

const rows: EgresoRow[] = [];
let nextId = 1;

function sanitizeCell(value: string): string {
  return value.replace(/\|/g, "/").replace(/\r?\n/g, " ").trim();
}

export function registrarEgreso(data: Omit<EgresoRow, "idEgreso">): EgresoRow {
  const row: EgresoRow = { idEgreso: nextId++, ...data };
  rows.push(row);
  return row;
}

export function listarEgresos(): readonly EgresoRow[] {
  return [...rows];
}

/** Solo para pruebas: vacía el almacén y reinicia IDs. */
export function resetEgresosStore(): void {
  rows.length = 0;
  nextId = 1;
}

export function egresosComoTablaMarkdown(): string {
  const list = listarEgresos();
  if (list.length === 0) {
    return "No hay egresos registrados todavía.";
  }

  const header =
    "| ID egreso | NIT | Valor egreso | Razón | Valor en letras | Fecha | Emisor |";
  const sep =
    "| --- | --- | ---: | --- | --- | --- | --- |";
  const lines = list.map(
    (r) =>
      `| ${r.idEgreso} | ${sanitizeCell(r.nit)} | ${r.valorEgreso} | ${sanitizeCell(r.razon)} | ${sanitizeCell(r.valorEgresoLetras)} | ${sanitizeCell(r.fecha)} | ${sanitizeCell(r.nombreEmisor)} |`
  );
  return [header, sep, ...lines].join("\n");
}
