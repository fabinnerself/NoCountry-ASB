# 🔧 PLAN TÉCNICO - FASE 1
## AutoStory Builder: Especificaciones Técnicas e Implementación

**Versión:** 1.0  
**Fecha:** 9 de diciembre de 2025  
**Estado:** ✅ Listo para Desarrollo  
**Basado en:** 1spec-f1.md

---

## 📌 INTRODUCCIÓN

Este documento detalla los requisitos técnicos, herramientas, frameworks, restricciones arquitectónicas y guías de implementación para la Fase 1 de AutoStory Builder. Define la hoja de ruta técnica para transformar especificaciones funcionales en código producción-ready.

### Principio Fundamental
**TDD First:** Todo código será desarrollado con tests escritos antes de la implementación.

---

## 🛠️ STACK TECNOLÓGICO

### Backend - Node.js/Express

#### Requisitos Base
- **Node.js:** ≥18.0.0 (LTS)
- **npm:** ≥9.0.0
- **TypeScript:** ^5.0.0 (obligatorio)

#### Dependencias Principales

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "cohere-ai": "^7.0.0",
    "zod": "^3.22.0",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "winston": "^3.11.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "@types/jest": "^29.5.8",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "@testing-library/jest-dom": "^6.1.5",
    "supertest": "^6.3.3",
    "typescript": "^5.3.3",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "prettier": "^3.1.1",
    "ts-node": "^10.9.2"
  }
}
```

### Frontend - React/Vite (Integración Fase 2)

**Nota:** Fase 1 se enfoca en backend. Frontend integración en Fase 2.

- React 18+
- Vite
- TypeScript
- Tailwind CSS
- React Hook Form

### IA & Visión

#### Cohere AI (Principal)
- **API:** https://api.cohere.com/v2/
- **Modelos Disponibles:**
  - `command-r-plus`: LLM principal (generación de historias)
  - `command-r-vision`: Vision API (análisis de imágenes)
- **Documentación:** https://docs.cohere.com/
- **Alternativas si no disponible:**
  - Google Cloud Vision API (free tier: 1000 requests/mes)
  - Hugging Face Inference API (modelos gratuitos)

### Base de Datos (Fase 2 Ready)

#### PostgreSQL + Prisma ORM
- **PostgreSQL:** ≥12.0
- **Prisma:** ^5.0.0
- **pgvector:** Extension para búsqueda semántica (Fase 3+)

**Nota Fase 1:** No persistencia, preparar schema para Fase 2.

---

## 📂 ARQUITECTURA DE COMPONENTES

### Estructura de Directorios (Backend)

```
backend/
├── src/
│   ├── app.ts                          # Express app setup
│   ├── server.ts                       # Server entry point
│   │
│   ├── config/
│   │   ├── env.ts                      # Environment variables
│   │   ├── cohere.ts                   # Cohere client config (UPDATED)
│   │   └── cors.ts                     # CORS configuration
│   │
│   ├── controllers/
│   │   └── story.controller.ts         # Request handlers (UPDATED)
│   │
│   ├── services/
│   │   ├── storyGenerator.service.ts   # Main orchestration (UPDATED)
│   │   ├── promptBuilder.service.ts    # Prompt construction (UPDATED)
│   │   ├── imageAnalyzer.service.ts    # NEW - Image processing
│   │   ├── outputValidator.service.ts  # Output validation (UPDATED)
│   │   └── errorHandler.service.ts     # Error handling (UPDATED)
│   │
│   ├── schemas/
│   │   ├── storyRequest.schema.ts      # Input validation (UPDATED)
│   │   ├── imageValidation.schema.ts   # NEW - Image validation
│   │   ├── storyResponse.schema.ts     # Response structure (UPDATED)
│   │   └── error.schema.ts             # Error responses (UPDATED)
│   │
│   ├── middleware/
│   │   ├── validation.middleware.ts    # Request validation (UPDATED)
│   │   ├── errorHandler.middleware.ts  # Global error handler (UPDATED)
│   │   └── multer.middleware.ts        # File upload handling (NEW)
│   │
│   ├── routes/
│   │   ├── index.ts                    # Route aggregator
│   │   └── story.routes.ts             # Story endpoints (UPDATED)
│   │
│   ├── utils/
│   │   ├── logger.ts                   # Logging utility (UPDATED)
│   │   ├── wordCount.ts                # Word counting utility
│   │   ├── imageBuffer.ts              # NEW - Image buffer handling
│   │   └── errorMessages.ts            # NEW - Error message constants
│   │
│   └── constants/
│       ├── prompts.ts                  # Prompt templates (UPDATED)
│       ├── validation.ts               # NEW - Validation rules
│       ├── imageFormats.ts             # NEW - Image format constants
│       └── errors.ts                   # NEW - Error codes
│
├── tests/
│   ├── img/                            # NEW - Fase 1 tests
│   │   ├── unit/
│   │   │   ├── imageAnalyzer.test.ts
│   │   │   ├── promptBuilder.test.ts
│   │   │   ├── storyGenerator.test.ts
│   │   │   ├── outputValidator.test.ts
│   │   │   └── validation.test.ts
│   │   ├── integration/
│   │   │   └── story.routes.test.ts
│   │   └── e2e/
│   │       └── story-generation.e2e.test.ts
│   │
│   └── fixtures/
│       ├── testData.ts                 # Test data (UPDATED)
│       └── testImages/                 # NEW - Test image files
│           ├── test-image.jpg
│           ├── test-image.png
│           └── test-image.webp
│
├── doc/
│   └── img/                            # NEW - Fase 1 documentation
│       ├── 0_API_REFERENCE.md
│       ├── 1_IMPLEMENTATION_GUIDE.md
│       ├── 2_IMAGE_PROCESSING.md
│       ├── 3_TESTING_STRATEGY.md
│       └── postman_collection.json
│
├── prisma/
│   └── schema.prisma                   # DB schema (PREPARED FOR PHASE 2)
│
├── .env.example                        # Environment template
├── .env                                # Local environment (git ignored)
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.json
├── .prettierrc.json
├── Dockerfile
├── docker-compose.yml
└── README.md                           # UPDATED - Fase 1 features
```

---

## 🔌 CONTRATOS DE DATOS

### Request Contract (DetailedInputTypes)

```typescript
// POST /api/generate-story
// Content-Type: multipart/form-data

interface GenerateStoryRequest {
  // Campos requeridos
  tone: 'INSPIRACIONAL' | 'EDUCATIVO' | 'TÉCNICO';
  format: 'HISTORIA' | 'POST' | 'REDES_SOCIALES' | 'OTRO';
  text: string; // Minlength: 20, Maxlength: 1000
  image: File; // multipart file - JPG|PNG|WEBP, <10MB
}

// Validaciones
const ValidationRules = {
  tone: {
    enum: ['INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO'],
    required: true,
    message: 'Tone must be one of: INSPIRACIONAL, EDUCATIVO, TÉCNICO'
  },
  format: {
    enum: ['HISTORIA', 'POST', 'REDES_SOCIALES', 'OTRO'],
    required: true,
    message: 'Format must be one of: HISTORIA, POST, REDES_SOCIALES, OTRO'
  },
  text: {
    minLength: 20,
    maxLength: 1000,
    required: true,
    message: 'Text must be between 20 and 1000 characters'
  },
  image: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 10485760, // 10 MB in bytes
    required: true,
    message: 'Image must be JPG, PNG or WEBP and less than 10MB'
  }
};
```

### Response Contract (SuccessResponse)

```typescript
interface GenerateStoryResponse {
  success: 'ok';
  generatedStory: string; // 80-120 palabras
  validation: {
    tone: 'ok' | 'error';
    format: 'ok' | 'error';
    text: 'ok' | 'error';
    image: 'ok' | 'error';
  };
  metadata: {
    wordCount: number;
    tone: 'INSPIRACIONAL' | 'EDUCATIVO' | 'TÉCNICO';
    format: 'HISTORIA' | 'POST' | 'REDES_SOCIALES' | 'OTRO';
    imageProcessed: boolean;
    imageCaptions: string[]; // Array de descripciones
    generatedAt: string; // ISO 8601 timestamp
    model: 'command-r-plus' | string; // Modelo usado
    processingTimeMs?: number; // Opcional: tiempo de procesamiento
  };
}

// Ejemplo de respuesta exitosa
{
  "success": "ok",
  "generatedStory": "En una comunidad rural, una joven emprendedora transformó su pasión por la artesanía en oportunidad global. Superando barreras de conectividad, hoy sus productos llegan a cinco continentes. Su historia inspira a otros a creer que los límites son solo el comienzo. Únete a esta revolución digital: tu historia es la próxima.",
  "validation": {
    "tone": "ok",
    "format": "ok",
    "text": "ok",
    "image": "ok"
  },
  "metadata": {
    "wordCount": 95,
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "imageProcessed": true,
    "imageCaptions": [
      "Mujer joven emprendedora con laptop en entorno rural",
      "Productos artesanales sobre mesa de madera"
    ],
    "generatedAt": "2025-12-09T14:30:22.000Z",
    "model": "command-r-plus",
    "processingTimeMs": 3847
  }
}
```

### Error Response Contract

```typescript
interface ErrorResponse {
  success: 'error';
  error: {
    code: 'VALIDATION_ERROR' | 'FILE_ERROR' | 'API_ERROR' | 'TIMEOUT' | 'INTERNAL_ERROR';
    message: string;
    details?: {
      field?: string;
      received?: string;
      expected?: string;
    };
    timestamp: string; // ISO 8601
  };
}

// Ejemplos de errores

// 400 - Validación de tone
{
  "success": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Valor de tone no válido: INVALIDO. Permitidos: INSPIRACIONAL, EDUCATIVO, TÉCNICO",
    "details": { "field": "tone", "received": "INVALIDO" },
    "timestamp": "2025-12-09T14:30:22.000Z"
  }
}

// 413 - Archivo demasiado grande
{
  "success": "error",
  "error": {
    "code": "FILE_ERROR",
    "message": "Archivo excede tamaño máximo de 10 MB. Recibido: 15.2 MB",
    "details": { "field": "image", "received": "15.2 MB", "expected": "<10 MB" },
    "timestamp": "2025-12-09T14:30:22.000Z"
  }
}

// 500 - Error interno
{
  "success": "error",
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Error procesando solicitud. Por favor reintenta.",
    "timestamp": "2025-12-09T14:30:22.000Z"
  }
}
```

---

## 📐 COMPONENTES TÉCNICOS

### 1. ImageAnalyzer Service

**Archivo:** `src/services/imageAnalyzer.service.ts`

**Responsabilidad:** Procesar imagen y extraer captions

**Métodos Principales:**

```typescript
class ImageAnalyzerService {
  /**
   * Analiza imagen y extrae captions descriptivos
   * @param imageBuffer - Buffer de imagen
   * @param mimeType - Tipo MIME (image/jpeg, etc)
   * @returns Array de captions descriptivos
   */
  async analyzeImage(
    imageBuffer: Buffer,
    mimeType: string
  ): Promise<string[]>

  /**
   * Convierte buffer a base64 para API
   * @param buffer - Buffer de imagen
   * @returns String base64
   */
  private bufferToBase64(buffer: Buffer): string

  /**
   * Maneja errores de timeout con reintentos
   * @param fn - Función a ejecutar
   * @param maxRetries - Máximo número de reintentos
   * @returns Resultado o error
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T>
}
```

**Integración Cohere:**
```typescript
// Usar Cohere Vision API
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

const response = await cohere.models.getImageCaptions({
  image: base64Image,
  modelId: 'command-r-vision'
});
```

---

### 2. PromptBuilder Service (UPDATED)

**Archivo:** `src/services/promptBuilder.service.ts`

**Cambios en Fase 1:**
- Incorporar captions de imagen como parámetro
- Estructura: [TEXTO BASE] + [CONTEXTO VISUAL] → HISTORIA

**Método Actualizado:**

```typescript
class PromptBuilderService {
  /**
   * Construye prompt parametrizado con contexto visual
   * @param tone - Tono narrativo
   * @param format - Formato de salida
   * @param text - Texto base
   * @param imageCaptions - Array de captions de imagen
   * @returns Prompt para LLM
   */
  buildPrompt(
    tone: 'INSPIRACIONAL' | 'EDUCATIVO' | 'TÉCNICO',
    format: 'HISTORIA' | 'POST' | 'REDES_SOCIALES' | 'OTRO',
    text: string,
    imageCaptions: string[]
  ): string
}
```

**Estructura de Prompt Mejorada:**
```
Eres un escritor de historias inspiradoras. Genera una historia de 80-120 palabras.

CONTEXTO VISUAL (de la imagen):
- {caption1}
- {caption2}
- {caption3}

INFORMACIÓN BASE:
{text}

REQUISITOS:
- Tono: {tone}
- Formato: {format}
- Estructura: Gancho → Desarrollo → Cierre
- Incluir CTA (si formato es REDES_SOCIALES)
- Sin errores gramaticales

Genera la historia:
```

---

### 3. StoryGenerator Service (UPDATED)

**Archivo:** `src/services/storyGenerator.service.ts`

**Cambios en Fase 1:**
- Integrar imageAnalyzer en pipeline
- Pasar captions a promptBuilder

**Método Principal:**

```typescript
class StoryGeneratorService {
  /**
   * Pipeline completo de generación
   * 1. Validar entrada
   * 2. Analizar imagen
   * 3. Construir prompt mejorado
   * 4. Generar historia
   * 5. Validar output
   * @param request - Solicitud del usuario
   * @returns Historia generada con metadata
   */
  async generateStory(
    tone: string,
    format: string,
    text: string,
    imageBuffer: Buffer,
    imageMimeType: string
  ): Promise<GenerateStoryResponse>
}
```

---

### 4. OutputValidator Service (UPDATED)

**Archivo:** `src/services/outputValidator.service.ts`

**Cambios en Fase 1:**
- Validar que historia incluya contexto visual
- Mantener validaciones existentes

**Método Actualizado:**

```typescript
class OutputValidatorService {
  /**
   * Valida que historia cumpla requisitos
   * @param story - Historia generada
   * @param tone - Tono solicitado
   * @param format - Formato solicitado
   * @param imageCaptions - Captions para verificar contexto
   * @returns Validación detallada
   */
  validate(
    story: string,
    tone: string,
    format: string,
    imageCaptions?: string[]
  ): ValidationResult
}
```

---

### 5. StoryController (UPDATED)

**Archivo:** `src/controllers/story.controller.ts`

**Cambios en Fase 1:**
- Integrar manejo de upload de imagen
- Pasar imagen a services

**Endpoint Actualizado:**

```typescript
class StoryController {
  /**
   * POST /api/generate-story
   * Genera historia con procesamiento de imagen
   * 
   * @param req - Express request (multipart/form-data)
   * @param res - Express response
   */
  async generateStory(
    req: express.Request,
    res: express.Response
  ): Promise<void>
}
```

---

## 🧪 ESTRATEGIA DE TESTING (TDD)

### Filosofía
**Tests First:** Escribir test antes de implementar.

### Frameworks
- **Jest:** Framework principal
- **SuperTest:** Testing HTTP requests
- **@testing-library:** Utilidades de testing

### Cobertura Objetivo
- **Global:** ≥80%
- **Servicios:** 100%
- **Controllers:** 90%
- **Schemas/Utils:** 85%

### Test Pyramid

```
          △ E2E (Few)
         △ △ Integration (Medium)
        △ △ △ Unit (Many)
```

### Estructura de Tests

#### 1. Unit Tests

**Archivo:** `tests/img/unit/imageAnalyzer.test.ts`

```typescript
describe('ImageAnalyzerService', () => {
  let service: ImageAnalyzerService;

  beforeEach(() => {
    service = new ImageAnalyzerService();
  });

  describe('analyzeImage', () => {
    it('should extract captions from valid JPEG', async () => {
      // Arrange
      const imageBuffer = readTestImage('test-image.jpg');
      
      // Act
      const captions = await service.analyzeImage(imageBuffer, 'image/jpeg');
      
      // Assert
      expect(captions).toBeInstanceOf(Array);
      expect(captions.length).toBeGreaterThanOrEqual(2);
      expect(captions[0]).toMatch(/\w+/);
    });

    it('should reject invalid image format', async () => {
      // Arrange
      const buffer = Buffer.from('not an image');
      
      // Act & Assert
      await expect(
        service.analyzeImage(buffer, 'image/invalid')
      ).rejects.toThrow('Formato de imagen no válido');
    });

    it('should handle Cohere API timeout', async () => {
      // Arrange
      jest.spyOn(cohere, 'models.getImageCaptions')
        .mockImplementationOnce(() => 
          new Promise(resolve => 
            setTimeout(() => resolve(null), 15000)
          )
        );
      
      // Act & Assert
      await expect(
        service.analyzeImage(buffer, 'image/jpeg')
      ).rejects.toThrow('Timeout procesando imagen');
    });
  });
});
```

**Archivo:** `tests/img/unit/promptBuilder.test.ts`

```typescript
describe('PromptBuilderService - Image Integration', () => {
  let service: PromptBuilderService;

  beforeEach(() => {
    service = new PromptBuilderService();
  });

  describe('buildPrompt with image captions', () => {
    it('should include image captions in prompt', () => {
      // Arrange
      const captions = [
        'Mujer emprendedora con laptop',
        'Entorno rural montañoso'
      ];
      
      // Act
      const prompt = service.buildPrompt(
        'INSPIRACIONAL',
        'REDES_SOCIALES',
        'Joven de comunidad rural con éxito tecnológico',
        captions
      );
      
      // Assert
      expect(prompt).toContain('CONTEXTO VISUAL');
      expect(prompt).toContain('Mujer emprendedora');
      expect(prompt).toContain('Entorno rural');
    });

    it('should maintain structure without captions', () => {
      // Arrange
      const captions: string[] = [];
      
      // Act
      const prompt = service.buildPrompt(
        'EDUCATIVO',
        'HISTORIA',
        'Aprende sobre emprendimiento',
        captions
      );
      
      // Assert
      expect(prompt).toContain('Eres un escritor');
      expect(prompt).not.toContain('undefined');
    });
  });
});
```

#### 2. Integration Tests

**Archivo:** `tests/img/integration/story.routes.test.ts`

```typescript
describe('POST /api/generate-story - Integration', () => {
  let app: Express;
  let request: SuperTest;

  beforeAll(() => {
    app = createApp();
    request = supertest(app);
  });

  describe('with valid image and parameters', () => {
    it('should generate story successfully', async () => {
      // Arrange
      const imageBuffer = readTestImage('test-image.jpg');
      
      // Act
      const response = await request
        .post('/api/generate-story')
        .field('tone', 'INSPIRACIONAL')
        .field('format', 'REDES_SOCIALES')
        .field('text', 'Historia de emprendimiento exitoso')
        .attach('image', imageBuffer, 'test.jpg');
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe('ok');
      expect(response.body.generatedStory).toBeDefined();
      expect(response.body.metadata.imageProcessed).toBe(true);
      expect(response.body.metadata.imageCaptions.length).toBeGreaterThan(0);
    });

    it('should validate response structure', async () => {
      // Act
      const response = await request
        .post('/api/generate-story')
        .field('tone', 'EDUCATIVO')
        .field('format', 'POST')
        .field('text', 'Aprende sobre IA')
        .attach('image', readTestImage('test-image.png'), 'test.png');
      
      // Assert
      expect(response.body).toMatchObject({
        success: 'ok',
        generatedStory: expect.any(String),
        validation: {
          tone: 'ok',
          format: 'ok',
          text: 'ok',
          image: 'ok'
        },
        metadata: {
          wordCount: expect.any(Number),
          imageProcessed: true,
          imageCaptions: expect.any(Array)
        }
      });
    });
  });

  describe('validation errors', () => {
    it('should reject invalid tone', async () => {
      // Act
      const response = await request
        .post('/api/generate-story')
        .field('tone', 'INVALIDO')
        .field('format', 'HISTORIA')
        .field('text', 'Test text')
        .attach('image', readTestImage('test-image.jpg'), 'test.jpg');
      
      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('tone');
    });

    it('should reject oversized image', async () => {
      // Arrange
      const largeBuffer = Buffer.alloc(11 * 1024 * 1024); // 11 MB
      
      // Act
      const response = await request
        .post('/api/generate-story')
        .field('tone', 'INSPIRACIONAL')
        .field('format', 'HISTORIA')
        .field('text', 'Test')
        .attach('image', largeBuffer, 'test.jpg');
      
      // Assert
      expect(response.status).toBe(413);
      expect(response.body.error.code).toBe('FILE_ERROR');
    });
  });
});
```

#### 3. E2E Tests

**Archivo:** `tests/img/e2e/story-generation.e2e.test.ts`

```typescript
describe('E2E: Story Generation with Image', () => {
  it('should generate complete story workflow', async () => {
    // Setup
    const server = app.listen(3001);
    const client = axios.create({ baseURL: 'http://localhost:3001' });

    try {
      // Act - Genera historia
      const formData = new FormData();
      formData.append('tone', 'INSPIRACIONAL');
      formData.append('format', 'REDES_SOCIALES');
      formData.append('text', 'Joven emprendedor superó obstáculos');
      formData.append('image', fs.createReadStream('tests/fixtures/testImages/test-image.jpg'));

      const response = await client.post('/api/generate-story', formData, {
        headers: formData.getHeaders()
      });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.success).toBe('ok');
      
      // Valida estructura
      const { generatedStory, metadata } = response.data;
      const wordCount = generatedStory.split(/\s+/).length;
      
      expect(wordCount).toBeGreaterThanOrEqual(80);
      expect(wordCount).toBeLessThanOrEqual(120);
      expect(metadata.imageCaptions.length).toBeGreaterThan(0);
      expect(generatedStory).toContain('emprend');
    } finally {
      server.close();
    }
  });
});
```

---

## 📋 VALIDACIONES Y RESTRICCIONES

### Validaciones de Input

**Archivo:** `src/schemas/storyRequest.schema.ts` (Usando Zod)

```typescript
import { z } from 'zod';

const VALID_TONES = ['INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO'] as const;
const VALID_FORMATS = ['HISTORIA', 'POST', 'REDES_SOCIALES', 'OTRO'] as const;
const VALID_IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

export const GenerateStoryRequestSchema = z.object({
  tone: z.enum(VALID_TONES)
    .describe('Tone of the narrative')
    .refine(
      (val) => val !== null,
      { message: 'tone is required' }
    ),
  
  format: z.enum(VALID_FORMATS)
    .describe('Output format')
    .refine(
      (val) => val !== null,
      { message: 'format is required' }
    ),
  
  text: z.string()
    .min(20, 'Text must be at least 20 characters')
    .max(1000, 'Text must not exceed 1000 characters')
    .describe('Base context for the story'),
  
  image: z.object({
    buffer: z.instanceof(Buffer),
    mimetype: z.enum(VALID_IMAGE_MIMES as [string, ...string[]]),
    size: z.number()
      .max(10485760, 'File must not exceed 10 MB'),
  }).describe('Image file for context')
});

export type GenerateStoryRequest = z.infer<typeof GenerateStoryRequestSchema>;
```

---

## 🚀 QUICK START GUIDE

### Instalación Local

```bash
# 1. Clonar repositorio
git clone https://github.com/fabinnerself/NoCountry-ASB.git
cd NoCountry-ASB/backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con:
# - COHERE_API_KEY=tu-api-key
# - PORT=8000
# - NODE_ENV=development

# 4. Ejecutar tests
npm test -- tests/img/

# 5. Iniciar servidor
npm run dev

# 6. Probar endpoint
curl -X POST http://localhost:8000/api/generate-story \
  -F "tone=INSPIRACIONAL" \
  -F "format=REDES_SOCIALES" \
  -F "text=Historia de éxito empresarial" \
  -F "image=@tests/fixtures/testImages/test-image.jpg"
```

### Configuración .env

```env
# Server
PORT=8000
NODE_ENV=development

# Database (Fase 2)
DATABASE_URL="postgresql://user:password@localhost:5432/autostory_db"

# Cohere AI
COHERE_API_KEY=your-cohere-api-key

# Frontend URLs (CORS)
FRONTEND_URL_LOCAL=http://localhost:5173
FRONTEND_URL=https://frontend.vercel.app

# Logging
LOG_LEVEL=info

# File Upload
MAX_FILE_SIZE=10485760  # 10 MB in bytes
UPLOAD_TEMP_DIR=/tmp/autostory
```

---

## 🔍 METADATOS DE HERRAMIENTAS Y FRAMEWORKS

### Cohere AI API

**Documentación:** https://docs.cohere.com/  
**Endpoints Clave:**
- `POST /v2/chat` - Generación de texto (Command R Plus)
- `POST /v2/models/image-caption` - Análisis de imágenes

**Rate Limits:**
- Plan Gratuito: 100 req/min
- Production: Según plan

**Latencia Esperada:**
- Vision API: 1-3 segundos
- LLM: 1-2 segundos
- Total: 3-5 segundos

**Alternativas:**
- Google Cloud Vision: 1-2 segundos, 1000 req/mes gratuito
- Hugging Face: <1 segundo, sin límites

### Express.js

**Versión:** ^4.18.2  
**Middleware Principales:**
- `multer`: File upload handling
- `helmet`: Security headers
- `cors`: Cross-origin requests
- `zod`: Input validation

### Jest Testing Framework

**Configuración:** `jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

---

## 📊 FLUJO DE DATOS

```
┌──────────────────────────────────────────────────────────────┐
│                    API REQUEST                               │
│  POST /api/generate-story (multipart/form-data)              │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│           MIDDLEWARE: Multer File Upload                      │
│  - Validar tipo MIME                                          │
│  - Validar tamaño (<10 MB)                                    │
│  - Convertir a Buffer                                         │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│         MIDDLEWARE: Input Validation (Zod)                    │
│  - Validar tone, format, text                                 │
│  - Validar estructura de imagen                               │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│              StoryController.generateStory()                  │
└────────────┬─────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│        StoryGeneratorService.generateStory()                  │
│                    ORCHESTRATOR                               │
└────────────┬─────────────────────────────────────────────────┘
             │
        ┌────┴────────┬──────────────┬──────────────┐
        │             │              │              │
        ▼             ▼              ▼              ▼
    ┌───────┐  ┌──────────┐  ┌─────────────┐  ┌──────────────┐
    │ Image │  │ Prompt   │  │ Story       │  │ Output       │
    │ Anal. │  │ Builder  │  │ Generator   │  │ Validator    │
    └───┬───┘  └────┬─────┘  └──────┬──────┘  └──────┬───────┘
        │           │               │                │
        ▼           ▼               ▼                ▼
   ┌────────────────────────────────────────────────────┐
   │  Cohere API                                        │
   │  - Vision API (image captions)                     │
   │  - Command R Plus (story generation)               │
   └────────┬───────────────────────────────────────────┘
            │
            ▼
   ┌────────────────────────────────────────────────────┐
   │  API RESPONSE (JSON)                               │
   │  - success: 'ok'                                   │
   │  - generatedStory                                  │
   │  - validation                                      │
   │  - metadata (captions, wordCount, etc)             │
   └────────────────────────────────────────────────────┘
```

---

## 🛡️ RESTRICCIONES Y LIMITACIONES

### Restricciones de Arquitectura

1. **TDD Obligatorio**
   - 100% de tests antes de código
   - Coverage mínimo 80%

2. **Stateless Design**
   - Sin estado en servidor
   - Escalable horizontalmente

3. **Modularidad**
   - Servicios independientes
   - Bajo acoplamiento
   - Fácil de testear

4. **Sin Persistencia Fase 1**
   - Flujo en memoria
   - Schema Prisma preparado para Fase 2

5. **Validación Estricta**
   - Zod schemas obligatorios
   - Mensajes de error descriptivos

### Limitaciones de Performance

- Timeout global: 30 segundos
- Timeout Cohere API: 10 segundos
- Timeout imagen: 3 segundos
- Max historias concurrentes: Según plan Cohere

---

## ✅ DEFINICIÓN DE DONE (DoD) - Fase 1

### Código
- [ ] 100% de tests pasando (`npm test`)
- [ ] Coverage ≥80% en todos los servicios
- [ ] Sin warnings ESLint
- [ ] Prettier aplicado
- [ ] Commits pequeños y atómicos

### Funcionalidad
- [ ] Endpoint `/api/generate-story` recibe imagen
- [ ] ImageAnalyzer extrae captions
- [ ] PromptBuilder integra captions
- [ ] Historias generadas: 80-120 palabras
- [ ] Validaciones de input/output funcionan
- [ ] Error handling robusto

### Integración
- [ ] Sin breaking changes
- [ ] Variables de entorno configuradas
- [ ] Schema Prisma preparado
- [ ] Tests en `/tests/img/`
- [ ] Documentación en `/doc/img/`

### Documentación
- [ ] API Reference completo
- [ ] Implementation Guide
- [ ] Postman Collection JSON
- [ ] README.md actualizado
- [ ] Ejemplos de uso claros

---

## 📚 REFERENCIAS TÉCNICAS

### Documentación Oficial
- [Cohere API Docs](https://docs.cohere.com/)
- [Express.js Guide](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Validation](https://zod.dev/)

### Herramientas Recomendadas
- **Postman:** Testing API (`postman_collection.json` incluida)
- **VS Code REST Client:** Testing rápido en editor
- **Thunder Client:** Alternativa ligera a Postman

### Recursos Locales
- `/plan/0brainstorm-f1.md` - Brainstorm inicial
- `/plan/1spec-f1.md` - Especificaciones de producto
- `/backend/tests/img/` - Suite de tests
- `/backend/doc/img/` - Documentación técnica

---

## 🔄 PRÓXIMOS PASOS (Fase 2)

1. **Persistencia en BD**
   - Migrar schema Prisma
   - Implementar CRUD endpoints
   - Autenticación de usuarios

2. **Frontend Integration**
   - Formulario de carga de imagen
   - Visualización de historias
   - Integración con backend

3. **Características Avanzadas**
   - Historial de usuario
   - Regeneración de historias
   - Panel de edición básico

---

**Plan Técnico Completado**  
**Listo para Implementación (3task-f1.md)**  
**Fecha:** 9 de diciembre de 2025
