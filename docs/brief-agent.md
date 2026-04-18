# Brief del agente de contaduría (egresos)

## 1. Título de la tarea

Fortalecer y documentar un agente en español orientado a **contaduría** que, a partir de mensajes en texto (estilo chat), **registre egresos** en una tabla con campos estándar y un **ID de egreso** por fila, y permita **listar** lo registrado.

---

## 2. Contexto

El proyecto recibe mensajes desde consola, el modelo extrae o solicita los datos necesarios, invoca herramientas cuando corresponde y responde al usuario en español.

El valor principal es educativo y operativo: mostrar cómo un agente estructura información contable repetible (NIT, montos, razón, letras, fecha, emisor) sin depender de una UI gráfica en esta fase.

Puntos a cuidar:

- Los datos viven **en memoria** mientras corre el proceso; no hay persistencia en disco en el diseño actual.
- La configuración depende de variables de entorno correctas; si faltan, la ejecución falla de forma controlada.
- El proyecto está preparado para nuevas herramientas o almacenamiento persistente manteniendo capas claras.

El objetivo de este brief es alinear al equipo en propósito (registro de egresos), límites (volatilidad de datos) y criterios de calidad (pruebas, documentación).

---

## 3. Requerimientos del proyecto

### Lenguaje y stack

- TypeScript sobre Node.js moderno.
- LangChain para componer el agente y orquestar herramientas.
- OpenRouter para el modelo de lenguaje.
- Validación de configuración antes de ejecutar.
- Pruebas automatizadas y validaciones de calidad.

### Arquitectura y enfoque

- Capa de entrada: mensaje del usuario (CLI).
- Capa de ejecución: `runAgent`.
- Capa de composición: modelo, prompt, herramientas.
- Capa de capacidades: herramientas de egresos y almacén en memoria.
- Capa de configuración: variables de entorno validadas.

### Input esperado

Texto libre en el que el usuario describe un egreso (o pide ver la tabla).

Campos por registro:

- NIT  
- Valor del egreso a reportar (número)  
- Razón  
- Valor del egreso en letras  
- Fecha  
- Nombre de la empresa o persona que emite la factura  

Resultado esperado:

- Respuesta en español, clara y profesional.
- Cada registro almacenado recibe un `idEgreso` único.
- Listado en tabla Markdown cuando el usuario lo solicita.

---

## 4. Restricciones

- Mantener el enfoque pedagógico y la claridad del flujo.
- No inflar el alcance con UI web ni persistencia hasta que se decida explícitamente.
- Documentar cambios en comportamiento, configuración y límites.

---

## 5. Definition of Done (DoD)

- El brief refleja el estado actual del proyecto (egresos, almacén en memoria).
- La documentación del repositorio está alineada con el código.
- Queda claro cómo ejecutar el CLI y qué datos se registran por fila.
