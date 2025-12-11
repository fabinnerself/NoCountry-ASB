# Plan Técnico: AutoStory Builder - Fase 0
## Story Generator Implementation Plan

---

**Versión:** 1.0  
**Fecha:** 8 de Diciembre, 2025  
**Basado en:** SPEC_ASB_Fase0.md  
**Tipo:** Plan de Implementación Técnica

---

## 📑 Índice

1. [Stack Tecnológico](#1-stack-tecnológico)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Contratos de Datos](#3-contratos-de-datos)
4. [Estructura del Proyecto](#4-estructura-del-proyecto)
5. [Dependencias y Librerías](#5-dependencias-y-librerías)
6. [Configuración del Entorno](#6-configuración-del-entorno)
7. [Implementación TDD](#7-implementación-tdd)
8. [Componentes Principales](#8-componentes-principales)
9. [Guía de Inicio Rápido](#9-guía-de-inicio-rápido)
10. [Restricciones Técnicas](#10-restricciones-técnicas)

---

## 1. Stack Tecnológico

### 1.1 Backend

| Componente | Tecnología | Versión | Justificación |
|------------|------------|---------|---------------|
| Runtime | Node.js | 18+ | LTS, soporte async/await nativo |
| Framework | Express.js | 4.18+ | Ligero, amplia adopción, middleware robusto |
| Lenguaje | JavaScript/TypeScript | ES2022+ | Tipado opcional, mejor DX |
| Testing | Jest | 29+ | Framework completo, mocking integrado |
| Validación | Zod | 3.22+ | Type-safe schema validation |
| IA API | Cohere SDK | 7.3+ | Cliente oficial, soporte TypeScript |
| Linter | ESLint | 8+ | Estándares de código |
| Formatter | Prettier | 3+ | Formato consistente |

### 1.2 Base de Datos (Preparación Futura)

| Componente | Tecnología | Versión | Justificación |
|------------|------------|---------|---------------|
| Database | PostgreSQL | 15+ | Robustez, extensiones (pgvector) |
| ORM | Prisma | 5+ | Type-safe, migraciones, generación de tipos |
| Vector Search | pgvector | 0.5+ | Búsqueda semántica (Fase 2+) |

**Nota:** En Fase 0 NO se implementa persistencia, solo se prepara el schema.

### 1.3 DevOps

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| Control de Versiones | Git | Estándar de la industria |
| CI/CD | GitHub Actions | Integración nativa, gratuito |
| Deployment | Render | Fácil setup, PostgreSQL incluido |
| Monitoreo | Console logs | Suficiente para Fase 0 |

---

## 2. Arquitectura del Sistema

### 2.1 Patrón de Arquitectura

**Arquitectura en Capas (Layered Architecture)**

```
┌─────────────────────────────────────┐
│         API Layer (Routes)          │  ← Express routes
├─────────────────────────────────────┤
│      Controller Layer (Logic)       │  ← Request handling
├─────────────────────────────────────┤
│     Service Layer (Business)        │  ← Story generation logic
├─────────────────────────────────────┤
│    Validation Layer (Schemas)       │  ← Zod schemas
├─────────────────────────────────────┤
│   External API Layer (Cohere)       │  ← AI integration
└─────────────────────────────────────┘
```

### 2.2 Flujo de Datos

```
Client Request
    ↓
Express Route (/api/generate-story)
    ↓
Validation Middleware (Zod)
    ↓
Story Controller
    ↓
Story Service
    ↓
Prompt Builder
    ↓
Cohere API Client
    ↓
Response Formatter
    ↓
Client Response
```

---

## 3. Contratos de Datos

### 3.1 Request Schema

```typescript
// schemas/storyRequest.schema.ts
import { z } from 'zod';

export const ToneEnum = z.enum(['INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO']);
export const FormatEnum = z.enum(['HISTORIA', 'POST', 'REDES_SOCIALES', 'OTRO']);

export const StoryRequestSchema = z.object({
  tone: ToneEnum,
  format: FormatEnum,
  text: z.string().min(20).max(1000)
});

export type StoryRequest = z.infer<typeof StoryRequestSchema>;
```

### 3.2 Response Schema

```typescript
// schemas/storyResponse.schema.ts
import { z } from 'zod';

export const ValidationStatusEnum = z.enum(['ok', 'error']);

export const StoryResponseSchema = z.object({
  success: z.literal('ok'),
  generatedStory: z.string(),
  validation: z.object({
    tone: ValidationStatusEnum,
    format: ValidationStatusEnum,
    text: ValidationStatusEnum
  }),
  metadata: z.object({
    wordCount: z.number(),
    tone: z.string(),
    format: z.string(),
    generatedAt: z.string().datetime(),
    model: z.string()
  })
});

export type StoryResponse = z.infer<typeof StoryResponseSchema>;
```

### 3.3 Error Schema

```typescript
// schemas/error.schema.ts
import { z } from 'zod';

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string()
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
```

---

## 4. Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts                 # Configuración de variables de entorno
│   │   └── cohere.ts              # Cliente Cohere configurado
│   ├── controllers/
│   │   └── story.controller.ts    # Controlador de historias
│   ├── services/
│   │   ├── storyGenerator.service.ts    # Lógica de generación
│   │   ├── promptBuilder.service.ts     # Construcción de prompts
│   │   └── outputValidator.service.ts   # Validación de output
│   ├── schemas/
│   │   ├── storyRequest.schema.ts
│   │   ├── storyResponse.schema.ts
│   │   └── error.schema.ts
│   ├── middleware/
│   │   ├── validation.middleware.ts     # Validación con Zod
│   │   └── errorHandler.middleware.ts   # Manejo de errores
│   ├── routes/
│   │   ├── index.ts               # Agregador de rutas
│   │   └── story.routes.ts        # Rutas de historias
│   ├── constants/
│   │   ├── prompts.ts             # Templates de prompts
│   │   └── toneGuidelines.ts      # Guidelines por tono/formato
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript compartidos
│   ├── utils/
│   │   ├── wordCount.ts           # Utilidad para contar palabras
│   │   └── logger.ts              # Logger simple
│   └── app.ts                     # Configuración de Express
│   └── server.ts                  # Entry point
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   │   ├── storyGenerator.test.ts
│   │   │   ├── promptBuilder.test.ts
│   │   │   └── outputValidator.test.ts
│   │   └── utils/
│   │       └── wordCount.test.ts
│   ├── integration/
│   │   └── story.routes.test.ts
│   └── fixtures/
│       └── testData.ts            # Datos de prueba
├── prisma/
│   └── schema.prisma              # Schema (preparación, no usado en Fase 0)
├── .env.example
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
├── .prettierrc
└── README.md
```

---

## 5. Dependencias y Librerías

### 5.1 package.json

```json
{
  "name": "autostory-backend",
  "version": "0.1.0",
  "description": "AutoStory Builder - Story Generator API",
  "main": "dist/server.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "test:unit": "jest --testPathPattern=tests/unit",
    "test:integration": "jest --testPathPattern=tests/integration",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cohere-ai": "^7.3.0",
    "zod": "^3.22.4",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "@types/cors": "^2.8.17",
    "@types/jest": "^29.5.10",
    "typescript": "^5.3.2",
    "ts-node-dev": "^2.0.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "eslint": "^8.54.0",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "prettier": "^3.1.0",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0"
  }
}
```

### 5.2 Justificación de Dependencias

**Producción:**
- `express`: Framework web minimalista y flexible
- `cohere-ai`: SDK oficial para integración con Cohere
- `zod`: Validación de schemas con inferencia de tipos
- `dotenv`: Gestión de variables de entorno
- `cors`: Manejo de CORS para frontend

**Desarrollo:**
- `typescript`: Tipado estático, mejor DX
- `ts-node-dev`: Hot reload para desarrollo
- `jest`: Framework de testing completo
- `eslint/prettier`: Calidad y formato de código
- `prisma`: ORM para preparación de BD (Fase 1)

---

## 6. Configuración del Entorno

### 6.1 Variables de Entorno (.env)

```bash
# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=8000
NODE_ENV=development

# ============================================
# DATABASE CONFIGURATION (Preparación Fase 1)
# ============================================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/autostory_db?schema=public"

# ============================================
# API KEYS
# ============================================
COHERE_API_KEY="your_cohere_api_key_here"

# ============================================
# CORS - FRONTEND URLS
# ============================================
FRONTEND_URL_LOCAL="http://localhost:5173"
FRONTEND_URL="https://your-frontend.vercel.app"

# ============================================
# AI CONFIGURATION
# ============================================
COHERE_MODEL="command-r-plus"
COHERE_TEMPERATURE=0.7
COHERE_MAX_TOKENS=500

# ============================================
# VALIDATION LIMITS
# ============================================
TEXT_MIN_LENGTH=20
TEXT_MAX_LENGTH=1000
STORY_MIN_WORDS=80
STORY_MAX_WORDS=120
```

### 6.2 Configuración TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 6.3 Configuración Jest (jest.config.js)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/types/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
```

---

## 7. Implementación TDD

### 7.1 Principios TDD

**Restricción OBLIGATORIA:** Los tests DEBEN escribirse ANTES que el código de implementación.

**Ciclo Red-Green-Refactor:**
1. 🔴 **Red:** Escribir test que falla
2. 🟢 **Green:** Escribir código mínimo para pasar el test
3. 🔵 **Refactor:** Mejorar código manteniendo tests verdes

### 7.2 Orden de Implementación

```
1. Tests de Validación de Input
   ├── test: validar tone válido
   ├── test: rechazar tone inválido
   ├── test: validar format válido
   ├── test: rechazar format inválido
   ├── test: validar text longitud mínima
   └── test: validar text longitud máxima

2. Tests de Construcción de Prompts
   ├── test: construir prompt con tone INSPIRACIONAL
   ├── test: construir prompt con tone EDUCATIVO
   ├── test: construir prompt con tone TÉCNICO
   └── test: incluir guidelines correctas por formato

3. Tests de Generación de Historias
   ├── test: generar historia con parámetros válidos
   ├── test: manejar error de API Cohere
   ├── test: timeout en llamada API
   └── test: respuesta con estructura correcta

4. Tests de Validación de Output
   ├── test: validar longitud 80-120 palabras
   ├── test: marcar como error si fuera de rango
   └── test: incluir metadata correcta

5. Tests de Integración
   ├── test: endpoint POST /api/generate-story exitoso
   ├── test: endpoint rechaza parámetros inválidos
   ├── test: endpoint maneja errores de API
   └── test: endpoint devuelve estructura correcta
```

### 7.3 Ejemplo de Test (TDD)

```typescript
// tests/unit/services/storyGenerator.test.ts
import { generateStory } from '@/services/storyGenerator.service';
import { StoryRequest } from '@/schemas/storyRequest.schema';

describe('Story Generator Service', () => {
  describe('Input Validation', () => {
    it('should reject invalid tone', async () => {
      const invalidRequest = {
        tone: 'INVALID',
        format: 'POST',
        text: 'Valid text with more than 20 characters'
      } as any;

      await expect(generateStory(invalidRequest)).rejects.toThrow(
        'Valor de tone no válido'
      );
    });

    it('should reject text shorter than 20 characters', async () => {
      const invalidRequest: StoryRequest = {
        tone: 'INSPIRACIONAL',
        format: 'POST',
        text: 'Short text'
      };

      await expect(generateStory(invalidRequest)).rejects.toThrow(
        'El texto debe tener entre 20 y 1000 caracteres'
      );
    });
  });

  describe('Story Generation', () => {
    it('should generate story with valid parameters', async () => {
      const validRequest: StoryRequest = {
        tone: 'INSPIRACIONAL',
        format: 'REDES_SOCIALES',
        text: 'María completó nuestro programa de emprendimiento y ahora tiene su propia panadería.'
      };

      const result = await generateStory(validRequest);

      expect(result.success).toBe('ok');
      expect(result.generatedStory).toBeDefined();
      expect(result.metadata.tone).toBe('INSPIRACIONAL');
      expect(result.metadata.format).toBe('REDES_SOCIALES');
    });
  });
});
```

---

## 8. Componentes Principales

### 8.1 Story Generator Service

```typescript
// src/services/storyGenerator.service.ts
import { CohereClient } from 'cohere-ai';
import { StoryRequest, StoryRequestSchema } from '@/schemas/storyRequest.schema';
import { StoryResponse } from '@/schemas/storyResponse.schema';
import { buildPrompt } from './promptBuilder.service';
import { validateOutput } from './outputValidator.service';
import { countWords } from '@/utils/wordCount';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY!,
});

export async function generateStory(request: StoryRequest): Promise<StoryResponse> {
  // 1. Validar input con Zod
  const validatedRequest = StoryRequestSchema.parse(request);

  // 2. Construir prompt
  const prompt = buildPrompt(validatedRequest);

  // 3. Llamar a Cohere API
  const response = await cohere.chat({
    message: prompt,
    model: process.env.COHERE_MODEL || 'command-r-plus',
    temperature: parseFloat(process.env.COHERE_TEMPERATURE || '0.7'),
  });

  const generatedStory = response.text;

  // 4. Validar output
  const validation = validateOutput(generatedStory);

  // 5. Construir respuesta
  return {
    success: 'ok',
    generatedStory,
    validation,
    metadata: {
      wordCount: countWords(generatedStory),
      tone: validatedRequest.tone,
      format: validatedRequest.format,
      generatedAt: new Date().toISOString(),
      model: process.env.COHERE_MODEL || 'command-r-plus',
    },
  };
}
```

### 8.2 Prompt Builder Service

```typescript
// src/services/promptBuilder.service.ts
import { StoryRequest } from '@/schemas/storyRequest.schema';
import { TONE_GUIDELINES, FORMAT_GUIDELINES, BASE_PROMPT } from '@/constants/prompts';

export function buildPrompt(request: StoryRequest): string {
  const toneGuideline = TONE_GUIDELINES[request.tone];
  const formatGuideline = FORMAT_GUIDELINES[request.format];

  return BASE_PROMPT
    .replace('{tone}', request.tone)
    .replace('{toneGuidelines}', toneGuideline)
    .replace('{format}', request.format)
    .replace('{formatGuidelines}', formatGuideline)
    .replace('{text}', request.text);
}
```

### 8.3 Output Validator Service

```typescript
// src/services/outputValidator.service.ts
import { countWords } from '@/utils/wordCount';

export function validateOutput(story: string) {
  const wordCount = countWords(story);
  const minWords = parseInt(process.env.STORY_MIN_WORDS || '80');
  const maxWords = parseInt(process.env.STORY_MAX_WORDS || '120');

  return {
    tone: 'ok' as const,
    format: 'ok' as const,
    text: (wordCount >= minWords && wordCount <= maxWords) ? 'ok' as const : 'error' as const,
  };
}
```

### 8.4 Story Routes

```typescript
// src/routes/story.routes.ts
import { Router } from 'express';
import { generateStoryHandler } from '@/controllers/story.controller';
import { validateRequest } from '@/middleware/validation.middleware';
import { StoryRequestSchema } from '@/schemas/storyRequest.schema';

const router = Router();

router.post(
  '/generate-story',
  validateRequest(StoryRequestSchema),
  generateStoryHandler
);

export default router;
```

---

## 9. Guía de Inicio Rápido

### 9.1 Setup Inicial

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu COHERE_API_KEY

# 4. Verificar configuración
npm run type-check
```

### 9.2 Desarrollo con TDD

```bash
# 1. Iniciar tests en modo watch
npm run test:watch

# 2. Escribir test que falla (Red)
# Editar: tests/unit/services/storyGenerator.test.ts

# 3. Escribir código mínimo para pasar test (Green)
# Editar: src/services/storyGenerator.service.ts

# 4. Refactorizar manteniendo tests verdes (Refactor)

# 5. Verificar cobertura
npm test
```

### 9.3 Ejecutar Servidor

```bash
# Desarrollo (hot reload)
npm run dev

# Producción
npm run build
npm start
```

### 9.4 Probar Endpoint

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "text": "María completó nuestro programa de emprendimiento y ahora tiene su propia panadería."
  }'
```

---

## 10. Restricciones Técnicas

### 10.1 Restricciones Obligatorias

1. **TDD Estricto:** Tests ANTES que código de implementación
2. **Cobertura Mínima:** 80% en branches, functions, lines, statements
3. **TypeScript:** Modo strict habilitado, sin `any` explícitos
4. **Validación:** Usar Zod para todos los inputs/outputs
5. **Sin Persistencia:** NO implementar base de datos en Fase 0
6. **Timeout API:** Máximo 10 segundos para llamadas a Cohere
7. **Límites de Texto:** 20-1000 caracteres (input), 80-120 palabras (output)

### 10.2 Restricciones de Calidad

1. **Linting:** Código debe pasar ESLint sin errores
2. **Formatting:** Código debe estar formateado con Prettier
3. **Type Safety:** Sin errores de TypeScript en `npm run type-check`
4. **Tests:** Todos los tests deben pasar antes de commit
5. **Commits:** Commits atómicos por funcionalidad

### 10.3 Restricciones de API

1. **Modelo Cohere:** `command-r-plus` (configurable vía env)
2. **Temperature:** 0.7 (balance creatividad/consistencia)
3. **Max Tokens:** 500 (suficiente para 80-120 palabras)
4. **Rate Limiting:** Considerar límites de Cohere API
5. **Error Handling:** Manejar todos los errores de API

---

## 11. Metadatos de Herramientas

### 11.1 Cohere API

**Documentación:** https://docs.cohere.com/  
**Modelo:** command-r-plus  
**Características:**
- Soporte multilingüe (español nativo)
- Contexto largo (128k tokens)
- Optimizado para chat y generación

**Límites (Free Tier):**
- 100 requests/minuto
- 10,000 requests/mes

**Mejores Prácticas:**
- Usar temperature 0.7 para balance
- Incluir instrucciones claras en prompts
- Manejar errores de rate limit

### 11.2 Zod

**Documentación:** https://zod.dev/  
**Versión:** 3.22+

**Ventajas:**
- Type inference automática
- Mensajes de error personalizables
- Validación runtime + compile time
- Composición de schemas

**Ejemplo de Uso:**
```typescript
const schema = z.object({
  name: z.string().min(1),
  age: z.number().positive()
});

type User = z.infer<typeof schema>; // { name: string; age: number }
```

### 11.3 Jest

**Documentación:** https://jestjs.io/  
**Versión:** 29+

**Configuración Recomendada:**
- Preset: ts-jest
- Coverage threshold: 80%
- Test environment: node

**Comandos Útiles:**
```bash
npm test                    # Ejecutar todos los tests
npm run test:watch          # Modo watch
npm run test:unit           # Solo tests unitarios
npm run test:integration    # Solo tests de integración
npm test -- --coverage      # Con reporte de cobertura
```

---

## 12. Checklist de Implementación

### Fase 0 - Sprint 1: Setup y Validaciones

- [ ] Setup proyecto TypeScript + Express
- [ ] Configurar Jest + ESLint + Prettier
- [ ] Implementar schemas Zod (TDD)
- [ ] Implementar validación de input (TDD)
- [ ] Tests de validación al 100%

### Fase 0 - Sprint 2: Generación de Historias

- [ ] Implementar Prompt Builder (TDD)
- [ ] Implementar integración Cohere (TDD)
- [ ] Implementar Story Generator Service (TDD)
- [ ] Implementar validación de output (TDD)
- [ ] Tests de generación al 100%

### Fase 0 - Sprint 3: API y Documentación

- [ ] Implementar routes y controllers (TDD)
- [ ] Implementar middleware de errores
- [ ] Tests de integración al 100%
- [ ] Documentar API
- [ ] Preparar deployment en Render

### Fase 0 - Validación Final

- [ ] Cobertura de tests ≥ 80%
- [ ] Todos los tests pasan
- [ ] Linting sin errores
- [ ] Type-check sin errores
- [ ] Documentación completa
- [ ] README actualizado

---

**Fin del Plan Técnico - Fase 0**
