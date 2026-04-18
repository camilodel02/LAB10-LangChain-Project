# Architecture

This project implements an agent with LangChain tools using a modular structure designed for clarity, testability, and incremental extension. The current domain is **registro de egresos** for contaduría workflows.

## End-to-end flow

1. The CLI receives user `input` in `src/index.ts`.
2. `runAgent` in `src/agent/runAgent.ts` creates or receives an `AgentExecutor`.
3. `buildAgentExecutor` in `src/agent/createAgent.ts` composes model, prompt, and tools.
4. The agent selects and executes the appropriate tool based on the prompt:
   - `registrar_egreso` — append a row with auto-increment `idEgreso`.
   - `listar_tabla_egresos` — return the full table as Markdown.
5. `AgentExecutor` returns the final `output` to the caller.

## Module responsibilities

- `src/config/env.ts`
  - Loads `env.local`.
  - Validates environment variables with `zod`.
- `src/agent/model.ts`
  - Creates the `ChatOpenAI` model configured against OpenRouter.
- `src/agent/prompt.ts`
  - Defines the agent behavior (contaduría) and tool-usage instructions.
- `src/agent/tools/*`
  - Implements domain tools (`egresos.ts`).
- `src/agent/store/egresosStore.ts`
  - In-memory table of egreso rows and Markdown formatting.
- `src/agent/createAgent.ts`
  - Assembles model, tools, and prompt into the executable agent.
- `src/agent/runAgent.ts`
  - Exposes a focused execution interface for CLI and tests.

## Design decisions

- TypeScript ESM for alignment with the modern Node.js ecosystem.
- Centralized environment validation to fail fast on invalid configuration.
- OpenRouter is integrated through the OpenAI-compatible API surface with provider-specific headers.
- Injectable executor support in `runAgent` for isolated and fast unit tests.
- Egreso data is held in process memory for simplicity; persistence can be added behind the same tool/store interface.

## Recommended evolution

- Persist egresos (JSON file or database) if durability is required.
- Add validation layers on tool inputs (length limits, numeric ranges) for production.
- Add structured logging when deeper runtime diagnostics are required.
