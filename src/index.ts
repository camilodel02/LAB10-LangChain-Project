import { runAgent } from "./agent/runAgent.js";

async function main(): Promise<void> {
  const input =
    process.argv.slice(2).join(" ").trim() ||
    "Registra un egreso: NIT 900123456-7, valor 1500000, compra de papelería, en letras UN MILLÓN QUINIENTOS MIL PESOS, fecha 15/04/2026, factura de Papelería Central SAS.";

  const output = await runAgent(input, { verbose: true });
  console.log("\nRespuesta del agente:\n");
  console.log(output);
}

main().catch((error) => {
  console.error("Error ejecutando el agente:", error);
  process.exit(1);
});
