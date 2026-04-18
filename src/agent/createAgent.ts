import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import { createModel } from "./model.js";
import {
  listarTablaEgresosTool,
  registrarEgresoTool
} from "./tools/egresos.js";
import { agentPrompt } from "./prompt.js";

export const agentTools = [registrarEgresoTool, listarTablaEgresosTool];

export async function buildAgentExecutor(verbose = true): Promise<AgentExecutor> {
  const model = createModel();

  const agent = await createToolCallingAgent({
    llm: model,
    tools: agentTools,
    prompt: agentPrompt
  });

  return new AgentExecutor({
    agent,
    tools: agentTools,
    verbose
  });
}
