# Tasks: AutoStory Builder - Fase 0
## Story Generator Implementation Tasks

---

**Versión:** 1.0  
**Fecha:** 8 de Diciembre, 2025  
**Basado en:** 1SPEC_ASB_Fase0.md, 2Plan_asb_fase0.md  
**Metodología:** Test-Driven Development (TDD)

---

## 📊 Resumen de Progreso

**Total de Tareas:** 78  
**Completadas:** 0  
**Progreso:** 0%

---

## 🎯 Fase 0: Story Generator Core

### Sprint 1: Setup y Configuración Inicial (12 tareas)

#### 1.1 Inicialización del Proyecto

- [ ] Establecer versión inicial 0.1.0

#### 1.2 Instalación de Dependencias de Producción
- [ ] Instalar `express@^4.18.2`
- [ ] Instalar `cohere-ai@^7.3.0`
- [ ] Instalar `zod@^3.22.4`
- [ ] Instalar `dotenv@^16.3.1`
- [ ] Instalar `cors@^2.8.5`

#### 1.3 Instalación de Dependencias de Desarrollo
- [ ] Instalar TypeScript: `typescript@^5.3.2`
- [ ] Instalar tipos: `@types/express`, `@types/node`, `@types/cors`
- [ ] Instalar `ts-node-dev@^2.0.0` para hot reload
- [ ] Instalar Jest: `jest@^29.7.0`, `ts-jest@^29.1.1`, `@types/jest`
- [ ] Instalar ESLint: `eslint@^8.54.0`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- [ ] Instalar Prettier: `prettier@^3.1.0`
- [ ] Instalar Prisma: `prisma@^5.7.0`, `@prisma/client@^5.7.0`

#### 1.4 Configuración de TypeScript
- [ ] Crear archivo `tsconfig.json`
- [ ] Configurar `target: "ES2022"`
- [ ] Configurar `module: "commonjs"`
- [ ] Habilitar `strict: true`
- [ ] Configurar `outDir: "./dist"` y `rootDir: "./src"`
- [ ] Configurar opciones de resolución de módulos

#### 1.5 Configuración de Testing
- [ ] Crear archivo `jest.config.js`
- [ ] Configurar preset `ts-jest`
- [ ] Configurar `testEnvironment: "node"`
- [ ] Establecer coverage threshold al 80%
- [ ] Configurar paths de tests (`tests/**/*.test.ts`)

#### 1.6 Configuración de Linting y Formatting
- [ ] Crear archivo `.eslintrc.js`
- [ ] Configurar reglas de TypeScript
- [ ] Crear archivo `.prettierrc`
- [ ] Configurar formato de código (semi, singleQuote, etc.)
- [ ] Crear archivo `.eslintignore` y `.prettierignore`

#### 1.7 Configuración de Variables de Entorno

- [ ] Crear archivo `.env` (no versionado)
- [ ] Configurar `PORT=8000`
- [ ] Configurar `NODE_ENV=development`
- [ ] Configurar `COHERE_API_KEY` (placeholder)
- [ ] Configurar URLs de frontend (local y producción)
- [ ] Configurar parámetros de IA (model, temperature, max_tokens)
- [ ] Configurar límites de validación (text length, word count)

#### 1.8 Configuración de Scripts NPM
- [ ] Agregar script `dev`: `ts-node-dev --respawn --transpile-only src/server.ts`
- [ ] Agregar script `build`: `tsc`
- [ ] Agregar script `start`: `node dist/server.js`
- [ ] Agregar script `test`: `jest --coverage`
- [ ] Agregar script `test:watch`: `jest --watch`
- [ ] Agregar script `test:unit`: `jest --testPathPattern=tests/unit`
- [ ] Agregar script `test:integration`: `jest --testPathPattern=tests/integration`
- [ ] Agregar script `lint`: `eslint src/**/*.ts`
- [ ] Agregar script `format`: `prettier --write "src/**/*.ts"`
- [ ] Agregar script `type-check`: `tsc --noEmit`

#### 1.9 Estructura de Directorios
- [ ] Crear directorio `src/`
- [ ] Crear subdirectorios: `config/`, `controllers/`, `services/`, `schemas/`
- [ ] Crear subdirectorios: `middleware/`, `routes/`, `constants/`, `types/`, `utils/`
- [ ] Crear directorio `tests/` con subdirectorios: `unit/`, `integration/`, `fixtures/`
- [ ] Crear directorio `prisma/`

#### 1.10 Configuración de Git
- [ ] Crear archivo `.gitignore`
- [ ] Ignorar `node_modules/`, `dist/`, `.env`
- [ ] Ignorar archivos de cobertura y logs
- [ ] Realizar commit inicial: "chore: initial project setup"

---

### Sprint 2: Schemas y Validación (14 tareas)

#### 2.1 Schema de Request - Tests (TDD)
- [ ] Crear archivo `tests/unit/schemas/storyRequest.test.ts`
- [ ] Test: validar tone "INSPIRACIONAL" es válido
- [ ] Test: validar tone "EDUCATIVO" es válido
- [ ] Test: validar tone "TÉCNICO" es válido
- [ ] Test: rechazar tone inválido (ej: "EMOTIVO")
- [ ] Test: validar format "HISTORIA" es válido
- [ ] Test: validar format "POST" es válido
- [ ] Test: validar format "REDES_SOCIALES" es válido
- [ ] Test: validar format "OTRO" es válido
- [ ] Test: rechazar format inválido
- [ ] Test: validar text con 20 caracteres (mínimo)
- [ ] Test: validar text con 1000 caracteres (máximo)
- [ ] Test: rechazar text con menos de 20 caracteres
- [ ] Test: rechazar text con más de 1000 caracteres

#### 2.2 Schema de Request - Implementación
- [ ] Crear archivo `src/schemas/storyRequest.schema.ts`
- [ ] Importar Zod
- [ ] Definir `ToneEnum` con valores: INSPIRACIONAL, EDUCATIVO, TÉCNICO
- [ ] Definir `FormatEnum` con valores: HISTORIA, POST, REDES_SOCIALES, OTRO
- [ ] Crear `StoryRequestSchema` con validaciones
- [ ] Exportar tipo `StoryRequest` inferido de Zod
- [ ] Verificar que todos los tests pasen

#### 2.3 Schema de Response - Tests (TDD)
- [ ] Crear archivo `tests/unit/schemas/storyResponse.test.ts`
- [ ] Test: validar estructura completa de response
- [ ] Test: validar campo `success` es "ok"
- [ ] Test: validar campo `generatedStory` es string
- [ ] Test: validar objeto `validation` con campos tone, format, text
- [ ] Test: validar objeto `metadata` con todos los campos requeridos
- [ ] Test: validar formato ISO 8601 en `generatedAt`
- [ ] Test: rechazar response con campos faltantes

#### 2.4 Schema de Response - Implementación
- [ ] Crear archivo `src/schemas/storyResponse.schema.ts`
- [ ] Definir `ValidationStatusEnum`: "ok" | "error"
- [ ] Crear `StoryResponseSchema` con estructura completa
- [ ] Exportar tipo `StoryResponse` inferido
- [ ] Verificar que todos los tests pasen

#### 2.5 Schema de Error - Tests y Implementación
- [ ] Crear archivo `tests/unit/schemas/error.test.ts`
- [ ] Test: validar estructura de error response
- [ ] Crear archivo `src/schemas/error.schema.ts`
- [ ] Implementar `ErrorResponseSchema`
- [ ] Exportar tipo `ErrorResponse`
- [ ] Verificar que todos los tests pasen

---

### Sprint 3: Utilidades y Constantes (10 tareas)

#### 3.1 Utilidad Word Count - Tests (TDD)
- [ ] Crear archivo `tests/unit/utils/wordCount.test.ts`
- [ ] Test: contar palabras en texto simple
- [ ] Test: contar palabras con múltiples espacios
- [ ] Test: contar palabras con saltos de línea
- [ ] Test: contar palabras con emojis
- [ ] Test: manejar string vacío (retornar 0)

#### 3.2 Utilidad Word Count - Implementación
- [ ] Crear archivo `src/utils/wordCount.ts`
- [ ] Implementar función `countWords(text: string): number`
- [ ] Usar regex para dividir por espacios en blanco
- [ ] Filtrar strings vacíos
- [ ] Verificar que todos los tests pasen

#### 3.3 Constantes de Prompts
- [ ] Crear archivo `src/constants/prompts.ts`
- [ ] Definir `BASE_PROMPT` template con placeholders
- [ ] Definir objeto `TONE_GUIDELINES` con guidelines para cada tono
- [ ] Definir objeto `FORMAT_GUIDELINES` con guidelines para cada formato
- [ ] Exportar todas las constantes

#### 3.4 Logger Simple
- [ ] Crear archivo `src/utils/logger.ts`
- [ ] Implementar función `logInfo(message: string)`
- [ ] Implementar función `logError(message: string, error?: any)`
- [ ] Implementar función `logWarning(message: string)`

---

### Sprint 4: Configuración y Cliente Cohere (8 tareas)

#### 4.1 Configuración de Variables de Entorno
- [ ] Crear archivo `src/config/env.ts`
- [ ] Validar que `COHERE_API_KEY` esté definida
- [ ] Exportar configuración de servidor (PORT, NODE_ENV)
- [ ] Exportar configuración de IA (model, temperature, max_tokens)
- [ ] Exportar límites de validación
- [ ] Lanzar error si variables críticas faltan

#### 4.2 Cliente Cohere
- [ ] Crear archivo `src/config/cohere.ts`
- [ ] Importar `CohereClient` de `cohere-ai`
- [ ] Crear instancia de cliente con API key
- [ ] Exportar cliente configurado
- [ ] Agregar manejo de errores de inicialización

---

### Sprint 5: Services - Prompt Builder (8 tareas)

#### 5.1 Prompt Builder - Tests (TDD)
- [ ] Crear archivo `tests/unit/services/promptBuilder.test.ts`
- [ ] Test: construir prompt con tone INSPIRACIONAL
- [ ] Test: construir prompt con tone EDUCATIVO
- [ ] Test: construir prompt con tone TÉCNICO
- [ ] Test: incluir guidelines correctas para format HISTORIA
- [ ] Test: incluir guidelines correctas para format REDES_SOCIALES
- [ ] Test: reemplazar todos los placeholders correctamente

#### 5.2 Prompt Builder - Implementación
- [ ] Crear archivo `src/services/promptBuilder.service.ts`
- [ ] Importar constantes de prompts
- [ ] Implementar función `buildPrompt(request: StoryRequest): string`
- [ ] Reemplazar placeholders: {tone}, {toneGuidelines}, {format}, {formatGuidelines}, {text}
- [ ] Verificar que todos los tests pasen

---

### Sprint 6: Services - Output Validator (6 tareas)

#### 6.1 Output Validator - Tests (TDD)
- [ ] Crear archivo `tests/unit/services/outputValidator.test.ts`
- [ ] Test: validar historia con 80 palabras (mínimo) retorna "ok"
- [ ] Test: validar historia con 120 palabras (máximo) retorna "ok"
- [ ] Test: validar historia con 79 palabras retorna "error"
- [ ] Test: validar historia con 121 palabras retorna "error"

#### 6.2 Output Validator - Implementación
- [ ] Crear archivo `src/services/outputValidator.service.ts`
- [ ] Implementar función `validateOutput(story: string)`
- [ ] Usar `countWords` para obtener word count
- [ ] Comparar con límites de env (STORY_MIN_WORDS, STORY_MAX_WORDS)
- [ ] Retornar objeto con validation status
- [ ] Verificar que todos los tests pasen

---

### Sprint 7: Services - Story Generator (12 tareas)

#### 7.1 Story Generator - Tests Unitarios (TDD)
- [ ] Crear archivo `tests/unit/services/storyGenerator.test.ts`
- [ ] Test: rechazar tone inválido con mensaje apropiado
- [ ] Test: rechazar format inválido con mensaje apropiado
- [ ] Test: rechazar text menor a 20 caracteres
- [ ] Test: rechazar text mayor a 1000 caracteres
- [ ] Test: generar historia con parámetros válidos (mock Cohere)
- [ ] Test: incluir metadata correcta en response
- [ ] Test: incluir validation en response
- [ ] Test: manejar error de API Cohere
- [ ] Test: manejar timeout de API

#### 7.2 Story Generator - Implementación
- [ ] Crear archivo `src/services/storyGenerator.service.ts`
- [ ] Importar dependencias (Cohere, schemas, services)
- [ ] Implementar función `generateStory(request: StoryRequest): Promise<StoryResponse>`
- [ ] Paso 1: Validar input con `StoryRequestSchema.parse()`
- [ ] Paso 2: Construir prompt con `buildPrompt()`
- [ ] Paso 3: Llamar a Cohere API con configuración de env
- [ ] Paso 4: Validar output con `validateOutput()`
- [ ] Paso 5: Construir y retornar StoryResponse
- [ ] Agregar manejo de errores con try/catch
- [ ] Verificar que todos los tests pasen

---

### Sprint 8: Middleware (8 tareas)

#### 8.1 Validation Middleware - Tests (TDD)
- [ ] Crear archivo `tests/unit/middleware/validation.test.ts`
- [ ] Test: pasar request válido al siguiente middleware
- [ ] Test: rechazar request inválido con status 400
- [ ] Test: incluir mensaje de error en response

#### 8.2 Validation Middleware - Implementación
- [ ] Crear archivo `src/middleware/validation.middleware.ts`
- [ ] Implementar función `validateRequest(schema: ZodSchema)`
- [ ] Retornar middleware de Express
- [ ] Validar `req.body` con schema
- [ ] Si válido: llamar `next()`
- [ ] Si inválido: retornar 400 con mensaje de error
- [ ] Verificar que todos los tests pasen

#### 8.3 Error Handler Middleware
- [ ] Crear archivo `src/middleware/errorHandler.middleware.ts`
- [ ] Implementar middleware de manejo de errores global
- [ ] Capturar errores de Zod y formatear mensaje
- [ ] Capturar errores de Cohere API
- [ ] Retornar ErrorResponse con status apropiado
- [ ] Loggear errores con logger

---

### Sprint 9: Controllers (6 tareas)

#### 9.1 Story Controller - Tests (TDD)
- [ ] Crear archivo `tests/unit/controllers/story.test.ts`
- [ ] Test: llamar a generateStory service con request body
- [ ] Test: retornar response del service
- [ ] Test: manejar errores y pasar a next()

#### 9.2 Story Controller - Implementación
- [ ] Crear archivo `src/controllers/story.controller.ts`
- [ ] Implementar función `generateStoryHandler(req, res, next)`
- [ ] Extraer datos de `req.body`
- [ ] Llamar a `generateStory` service
- [ ] Retornar response con status 200
- [ ] Capturar errores y pasar a `next(error)`
- [ ] Verificar que todos los tests pasen

---

### Sprint 10: Routes (6 tareas)

#### 9.3 Story Routes - Implementación
- [ ] Crear archivo `src/routes/story.routes.ts`
- [ ] Importar Router de Express
- [ ] Importar controller y middleware
- [ ] Definir ruta POST `/generate-story`
- [ ] Agregar middleware de validación con StoryRequestSchema
- [ ] Agregar handler del controller
- [ ] Exportar router

#### 9.4 Routes Index
- [ ] Crear archivo `src/routes/index.ts`
- [ ] Importar story routes
- [ ] Crear router principal
- [ ] Montar story routes en `/api`
- [ ] Exportar router principal

---

### Sprint 11: Aplicación Express (8 tareas)

#### 11.1 App Configuration
- [ ] Crear archivo `src/app.ts`
- [ ] Importar Express y middleware
- [ ] Crear instancia de Express
- [ ] Configurar `express.json()` middleware
- [ ] Configurar CORS con URLs de frontend
- [ ] Montar routes principales
- [ ] Agregar middleware de error handler
- [ ] Exportar app

#### 11.2 Server Entry Point
- [ ] Crear archivo `src/server.ts`
- [ ] Importar app y configuración
- [ ] Cargar variables de entorno con dotenv
- [ ] Iniciar servidor en PORT configurado
- [ ] Loggear mensaje de servidor iniciado
- [ ] Manejar errores de inicio

---

### Sprint 12: Tests de Integración (10 tareas)

#### 12.1 Integration Tests - Story Endpoint
- [ ] Crear archivo `tests/integration/story.routes.test.ts`
- [ ] Setup: iniciar servidor de test
- [ ] Test: POST /api/generate-story con datos válidos retorna 200
- [ ] Test: response tiene estructura correcta (StoryResponse)
- [ ] Test: generatedStory es string no vacío
- [ ] Test: metadata incluye todos los campos
- [ ] Test: POST con tone inválido retorna 400
- [ ] Test: POST con format inválido retorna 400
- [ ] Test: POST con text muy corto retorna 400
- [ ] Test: POST con text muy largo retorna 400
- [ ] Test: error de Cohere API retorna 500
- [ ] Teardown: cerrar servidor de test

---


---

### Sprint 14: Documentación (8 tareas)

#### 14.1 README del Backend
- [ ] Crear archivo `backend/README.md`
- [ ] Agregar descripción del proyecto
- [ ] Documentar requisitos previos (Node.js 18+)
- [ ] Documentar instalación de dependencias
- [ ] Documentar configuración de .env
- [ ] Documentar scripts disponibles (dev, test, build, start)
- [ ] Agregar ejemplos de uso del API
- [ ] Documentar estructura del proyecto

#### 14.2 Documentación de API
- [ ] Documentar endpoint POST /api/generate-story
- [ ] Incluir ejemplo de request con curl
- [ ] Incluir ejemplo de response exitoso
- [ ] Incluir ejemplos de errores (400, 500)
- [ ] Documentar todos los campos de request y response

---

### Sprint 15: Validación Final y Deployment (10 tareas)

#### 15.1 Validación de Calidad
- [ ] Ejecutar `npm run type-check` sin errores
- [ ] Ejecutar `npm run lint` sin errores
- [ ] Ejecutar `npm run format` para formatear código
- [ ] Ejecutar `npm test` - todos los tests pasan
- [ ] Verificar cobertura de tests ≥ 80%
- [ ] Verificar que no hay console.logs en producción

#### 15.2 Testing Manual
- [ ] Iniciar servidor con `npm run dev`
- [ ] Probar endpoint con tone INSPIRACIONAL + format REDES_SOCIALES
- [ ] Probar endpoint con tone EDUCATIVO + format POST
- [ ] Probar endpoint con tone TÉCNICO + format HISTORIA
- [ ] Verificar que errores de validación retornan mensajes claros
- [ ] Verificar que historias generadas tienen 80-120 palabras

#### 15.3 Preparación para Deployment
- [ ] Crear archivo `render.yaml` para Render
- [ ] Configurar build command: `npm install && npm run build`
- [ ] Configurar start command: `npm start`
- [ ] Documentar variables de entorno necesarias en Render
- [ ] Crear archivo `.env.production.example`

#### 15.4 Git y Versionado
- [ ] Revisar que .gitignore está completo
- [ ] Commit final: "feat: complete Phase 0 - Story Generator"
- [ ] Crear tag: `v0.1.0`
- [ ] Push a repositorio remoto

---

## 📊 Métricas de Éxito

### Criterios de Completitud

- [ ] **Tests:** 100% de tests pasan
- [ ] **Cobertura:** ≥ 80% en branches, functions, lines, statements
- [ ] **Linting:** 0 errores de ESLint
- [ ] **Type Check:** 0 errores de TypeScript
- [ ] **Funcionalidad:** Endpoint genera historias correctamente
- [ ] **Validación:** Todas las validaciones funcionan
- [ ] **Documentación:** README completo y actualizado

---

## 🔄 Notas de Implementación

### Orden de Ejecución
Las tareas DEBEN ejecutarse en el orden presentado, ya que hay dependencias entre sprints.

### Metodología TDD
Para cada componente con lógica de negocio:
1. ✍️ Escribir tests PRIMERO
2. ❌ Verificar que tests fallan (Red)
3. ✅ Implementar código mínimo para pasar tests (Green)
4. 🔧 Refactorizar manteniendo tests verdes (Refactor)

### Commits
Realizar commits atómicos después de completar cada sprint:
- Sprint 1: `chore: setup project configuration`
- Sprint 2: `feat: add request/response schemas with validation`
- Sprint 3: `feat: add utilities and constants`
- Sprint 4: `feat: configure environment and Cohere client`
- Sprint 5: `feat: implement prompt builder service`
- Sprint 6: `feat: implement output validator service`
- Sprint 7: `feat: implement story generator service`
- Sprint 8: `feat: add validation and error handling middleware`
- Sprint 9: `feat: add story controller`
- Sprint 10: `feat: add API routes`
- Sprint 11: `feat: configure Express application`
- Sprint 12: `test: add integration tests`
- Sprint 13: `chore: prepare database schema for Phase 1`
- Sprint 14: `docs: add comprehensive documentation`
- Sprint 15: `chore: final validation and deployment preparation`

---

## 📝 Tracking

### Por Sprint

| Sprint | Tareas | Completadas | Progreso |
|--------|--------|-------------|----------|
| 1. Setup | 12 | 0 | 0% |
| 2. Schemas | 14 | 0 | 0% |
| 3. Utilidades | 10 | 0 | 0% |
| 4. Config | 8 | 0 | 0% |
| 5. Prompt Builder | 8 | 0 | 0% |
| 6. Output Validator | 6 | 0 | 0% |
| 7. Story Generator | 12 | 0 | 0% |
| 8. Middleware | 8 | 0 | 0% |
| 9. Controllers | 6 | 0 | 0% |
| 10. Routes | 6 | 0 | 0% |
| 11. Express App | 8 | 0 | 0% |
| 12. Integration Tests | 10 | 0 | 0% |
| 13. Database Prep | 4 | 0 | 0% |
| 14. Documentación | 8 | 0 | 0% |
| 15. Validación Final | 10 | 0 | 0% |
| **TOTAL** | **130** | **0** | **0%** |

---

**Fin del Documento de Tareas - Fase 0**
