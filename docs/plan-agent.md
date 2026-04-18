# Plan detallado para construir y fortalecer la aplicación del agente

## 1. Objetivo del plan

Consolidar una aplicación de agente en español, basada en TypeScript + Node.js + LangChain + OpenRouter, que:

- reciba datos de egresos en lenguaje natural por consola,
- use las herramientas `registrar_egreso` y `listar_tabla_egresos` cuando corresponda,
- mantenga una arquitectura entendible y extensible,
- y preserve calidad mediante pruebas, validación de entorno y documentación.

Este plan traduce el brief en pasos ejecutables para que cualquier integrante del equipo pueda continuar el trabajo de forma consistente.

---

## 2. Principios de ejecución

1. **Enfoque pedagógico primero:** priorizar claridad del flujo sobre complejidad técnica.
2. **Cambios pequeños y verificables:** cada avance debe poder ejecutarse, probarse y explicarse.
3. **Consistencia arquitectónica:** respetar separación de responsabilidades por capas.
4. **Documentar cada decisión relevante:** cambios en comportamiento, límites y configuración deben quedar explícitos.
5. **Evolución segura:** no romper ejecución por consola ni pruebas existentes.

---

## 3. Alcance funcional

### Incluye (MVP fortalecido)

- Entrada de mensajes en lenguaje natural desde consola.
- Respuestas en español, claras y profesionales.
- Registro de egresos con ID automático por fila.
- Listado de la tabla de egresos en Markdown.
- Validación estricta de configuración antes de ejecutar.

### No incluye (por ahora)

- Persistencia en disco o base de datos (los datos son volátiles en memoria).
- Interfaz web.
- Orquestación multiagente.

---

## 4. Plan por fases

## Fase 0: Alineación y línea base

**Objetivo:** asegurar que todo el equipo comparta contexto, límites y criterios de éxito.

**Actividades:**

- Revisar `docs/brief-agent.md` y confirmar entendimiento común.
- Levantar estado actual: qué ya funciona, qué es frágil y qué falta documentar.
- Definir escenarios de uso prioritarios (registro completo, registro con datos faltantes, listado).

**Entregables:**

- Resumen de estado actual (fortalezas, límites, deuda inmediata).
- Lista de escenarios prioritarios para validar cambios.

**Criterio de salida:**

- El equipo entiende el mismo objetivo y evita cambios fuera de alcance.

---

## Fase 1: Consolidación de arquitectura y responsabilidades

**Objetivo:** mantener una estructura clara por capas para facilitar mantenimiento y extensión.

**Actividades:**

- Verificar que cada capa tenga una responsabilidad concreta:
  - entrada,
  - ejecución,
  - composición del agente,
  - herramientas y almacén,
  - configuración.
- Reducir acoplamientos innecesarios entre módulos.
- Establecer reglas de extensión para nuevas herramientas.

**Entregables:**

- Arquitectura confirmada y coherente con el brief.
- Guía breve de cómo extender el agente sin romper el flujo.

**Criterio de salida:**

- Cualquier persona puede ubicar rápidamente dónde modificar cada tipo de cambio.

---

## Fase 2: Robustez funcional del agente

**Objetivo:** asegurar respuestas útiles, en español, con uso de herramientas solo cuando corresponde.

**Actividades:**

- Revisar el comportamiento del prompt y la decisión de cuándo registrar vs. pedir datos faltantes.
- Validar escenarios: egreso completo, datos incompletos, petición de tabla vacía o con datos.
- Definir mensajes de salida consistentes.

**Entregables:**

- Comportamiento estable en los escenarios principales.
- Respuestas con tono y formato consistentes en español.

**Criterio de salida:**

- El agente registra y lista correctamente según lo esperado y explica de forma breve qué hizo.

---

## Fase 3: Gestión de configuración y fallos esperados

**Objetivo:** garantizar arranque seguro y mensajes claros ante configuración incompleta.

**Actividades:**

- Confirmar validación temprana de variables de entorno.
- Mejorar claridad de errores cuando falte configuración crítica.
- Documentar checklist mínimo de entorno para ejecutar localmente.

**Entregables:**

- Flujo de arranque con validaciones claras.
- Documentación de configuración mínima y fallos comunes.

**Criterio de salida:**

- Si falta configuración, el sistema falla de forma controlada y entendible.

---

## Fase 4: Pruebas y calidad operativa

**Objetivo:** proteger estabilidad del comportamiento actual y facilitar cambios futuros con confianza.

**Actividades:**

- Verificar cobertura de pruebas clave del flujo principal.
- Asegurar pruebas para almacén de egresos, herramientas y ejecución del agente.
- Ejecutar validaciones de calidad (lint y pruebas) en cada cambio relevante.

**Entregables:**

- Suite de pruebas estable para casos prioritarios.
- Rutina mínima de calidad antes de aceptar cambios.

**Criterio de salida:**

- Los cambios se aceptan solo si mantienen ejecución correcta y pruebas en verde.

---

## Fase 5: Documentación final y handoff

**Objetivo:** dejar el proyecto listo para continuidad por cualquier miembro del equipo.

**Actividades:**

- Actualizar README con guía de uso real y límites actuales (memoria volátil).
- Sincronizar documentación técnica y funcional (brief + plan + notas operativas).
- Definir próximos pasos priorizados sin inflar alcance.

**Entregables:**

- Documentación coherente con lo implementado.
- Hoja de ruta de mejoras incrementales.

**Criterio de salida:**

- Una persona nueva puede ejecutar, entender y extender el agente en poco tiempo.

---

## 5. Cronograma sugerido (iterativo)

- **Semana 1:** Fase 0 + Fase 1
- **Semana 2:** Fase 2
- **Semana 3:** Fase 3 + Fase 4
- **Semana 4:** Fase 5 + cierre de pendientes

> Si el equipo tiene menos disponibilidad, se puede ejecutar por bloques quincenales manteniendo el orden de dependencias.

---

## 6. Criterios de aceptación globales (Definition of Done operativa)

Se considera completado cuando:

- El comportamiento del agente coincide con el propósito de registro de egresos y responde en español con claridad.
- Los casos prioritarios (registro, listado, datos incompletos) funcionan de forma estable.
- La configuración mínima está validada y bien documentada.
- Las pruebas y validaciones de calidad se ejecutan sin regresiones en el alcance trabajado.
- La documentación refleja con precisión el estado real del proyecto y cómo continuar.

---

## 7. Riesgos y mitigaciones

- **Riesgo:** crecimiento desordenado por agregar capacidades sin criterio.
  - **Mitigación:** aplicar reglas de extensión por capas y validar alcance antes de implementar.

- **Riesgo:** pérdida de datos al cerrar el proceso (solo memoria).
  - **Mitigación:** documentar el límite; planear persistencia cuando el negocio lo requiera.

- **Riesgo:** fallas por configuración incompleta en entornos nuevos.
  - **Mitigación:** validación temprana + checklist de arranque + mensajes de error accionables.

- **Riesgo:** regresiones al introducir cambios funcionales.
  - **Mitigación:** cambios incrementales y ejecución obligatoria de pruebas/lint antes de cerrar.

---

## 8. Próximos pasos recomendados tras este plan

1. Ejecutar Fase 0 en una sesión corta de alineación de equipo.
2. Priorizar una mejora puntual por fase para avanzar en iteraciones pequeñas.
3. Al cierre de cada fase, validar: funcionamiento, pruebas y documentación.
4. Registrar decisiones importantes para mantener trazabilidad de por qué se cambió cada parte.
