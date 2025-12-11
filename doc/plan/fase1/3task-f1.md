# ✅ DOCUMENTO DE TAREAS - FASE 1
## AutoStory Builder: Descomposición de Trabajo para Implementación

**Versión:** 1.0  
**Fecha:** 9 de diciembre de 2025  
**Estado:** ✅ Listo para Implementación  
**Basado en:** 1spec-f1.md, 2plan-f1.md

---

## 📌 ESTRUCTURA DEL DOCUMENTO

Este documento descompone el proyecto Fase 1 en **tareas específicas y ejecutables** agrupadas por **fases de desarrollo**. Cada tarea incluye:
- ✅ Checkbox de estado
- 📋 Descripción clara
- 🎯 Criterios de aceptación
- 🔗 Dependencias
- ⏱️ Estimación de tiempo

---

## 🎯 FASES DE TRABAJO

### Fase A: Preparación y Setup (1-2 días)
### Fase B: Servicios Base (3-4 días)
### Fase C: Testing y Validación (2-3 días)
### Fase D: Documentación y Polish (1-2 días)

---

# 🏁 FASE A: PREPARACIÓN Y SETUP

## A.1 - Configuración del Proyecto Local

- [ ] **A.1.1** Clonar repositorio `NoCountry-ASB`
  - **Descripción:** Descargar código base del repositorio
  - **Criterios:**
    - Código base disponible en `C:\nocountry\3\`
    - Backend en `backend/`
    - Frontend en `frontend/`
  - **Tiempo:** 10 minutos

- [ ] **A.1.2** Configurar variables de entorno
  - **Descripción:** Crear archivo `.env` con credenciales
  - **Criterios:**
    - Archivo `.env` creado desde `.env.example`
    - `COHERE_API_KEY` configurada
    - `PORT=8000`
    - `NODE_ENV=development`
  - **Tiempo:** 15 minutos

- [ ] **A.1.3** Instalar dependencias de backend
  - **Descripción:** Ejecutar `npm install` en directorio backend
  - **Criterios:**
    - `npm install` completado sin errores
    - `package-lock.json` generado
    - Todas las dependencias en `node_modules/`
  - **Dependencias:** A.1.1, A.1.2
  - **Tiempo:** 5 minutos

- [ ] **A.1.4** Verificar versiones de Node.js y npm
  - **Descripción:** Validar que Node.js ≥18 y npm ≥9
  - **Criterios:**
    - `node -v` retorna ≥18.0.0
    - `npm -v` retorna ≥9.0.0
  - **Tiempo:** 5 minutos

---

## A.2 - Estructura de Directorios

- [ ] **A.2.1** Crear estructura de directorios para Fase 1
  - **Descripción:** Crear directorios para tests, docs y servicios nuevos
  - **Criterios:**
    - Directorio `tests/img/` existe
    - Subdirectorios `unit/`, `integration/`, `e2e/` existen
    - Directorio `doc/img/` existe
    - Directorio `tests/fixtures/testImages/` existe
  - **Comandos:**
    ```bash
    mkdir -p backend/tests/img/{unit,integration,e2e}
    mkdir -p backend/doc/img
    mkdir -p backend/tests/fixtures/testImages
    ```
  - **Tiempo:** 5 minutos

- [ ] **A.2.2** Crear archivos de servicios nuevos (plantillas)
  - **Descripción:** Crear archivos vacíos para nuevos servicios
  - **Criterios:**
    - `src/services/imageAnalyzer.service.ts` existe
    - `src/schemas/imageValidation.schema.ts` existe
    - `src/middleware/multer.middleware.ts` existe
    - `src/utils/imageBuffer.ts` existe
    - `src/utils/errorMessages.ts` existe
    - `src/constants/imageFormats.ts` existe
    - `src/constants/validation.ts` existe
    - `src/constants/errors.ts` existe
  - **Tiempo:** 10 minutos

---

## A.3 - Imágenes de Prueba

- [ ] **A.3.1** Obtener o crear imágenes de prueba
  - **Descripción:** Preparar 3 imágenes (JPG, PNG, WEBP) para tests
  - **Criterios:**
    - `test-image.jpg` (>1MB, <10MB)
    - `test-image.png` (>1MB, <10MB)
    - `test-image.avif` (>1MB, <10MB)
    - Ubicadas en `tests/fixtures/testImages/`
  - **Notas:** Pueden ser fotos reales o generadas
  - **Tiempo:** 15 minutos

- [ ] **A.3.2** Crear imagen para test de archivo grande
  - **Descripción:** Generar imagen >10MB para tests de validación
  - **Criterios:**
    - Archivo `test-image-large.jpg` creado (>10MB)
    - Ubicado en `tests/fixtures/testImages/`
    - Usado para validar rechazo de archivos grandes
  - **Tiempo:** 5 minutos

---

# 🔧 FASE B: SERVICIOS BASE

## B.1 - Constants y Schemas

- [ ] **B.1.1** Definir constantes de formatos de imagen
  - **Archivo:** `src/constants/imageFormats.ts`
  - **Descripción:** Definir tipos MIME válidos y extensiones
  - **Criterios:**
    - Array de MIME types: `['image/jpeg', 'image/png', 'image/webp']`
    - Mapeo de extensiones a MIME types
    - Tamaño máximo: `10485760` (10 MB)
    - Exporta constantes reutilizables
  - **Tiempo:** 15 minutos

- [ ] **B.1.2** Definir constantes de validación
  - **Archivo:** `src/constants/validation.ts`
  - **Descripción:** Validaciones de tone, format, text
  - **Criterios:**
    - `VALID_TONES = ['INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO']`
    - `VALID_FORMATS = ['HISTORIA', 'POST', 'REDES_SOCIALES', 'OTRO']`
    - `TEXT_MIN_LENGTH = 20`
    - `TEXT_MAX_LENGTH = 1000`
    - `WORD_COUNT_MIN = 80`
    - `WORD_COUNT_MAX = 120`
  - **Tiempo:** 10 minutos

- [ ] **B.1.3** Definir constantes de errores
  - **Archivo:** `src/constants/errors.ts`
  - **Descripción:** Códigos y mensajes de error
  - **Criterios:**
    - `VALIDATION_ERROR, FILE_ERROR, API_ERROR, TIMEOUT, INTERNAL_ERROR`
    - Mensajes por campo y tipo
    - HTTP status codes mapeados
  - **Tiempo:** 15 minutos

- [ ] **B.1.4** Crear schema de validación de imagen (Zod)
  - **Archivo:** `src/schemas/imageValidation.schema.ts`
  - **Descripción:** Validar archivo de imagen
  - **Criterios:**
    - Schema Zod para validar MIME type
    - Validar tamaño máximo
    - Validar que buffer existe
    - Retorna `ImageValidationResult`
  - **Dependencias:** B.1.1
  - **Tiempo:** 20 minutos

- [ ] **B.1.5** Actualizar schema de solicitud (Zod)
  - **Archivo:** `src/schemas/storyRequest.schema.ts` (UPDATED)
  - **Descripción:** Agregar parámetro `image` a validación
  - **Criterios:**
    - Schema incluye campo `image` (File/Blob)
    - Validar image con `imageValidation.schema`
    - Mantiene validaciones existentes (tone, format, text)
    - Exporta tipo `GenerateStoryRequest`
  - **Dependencias:** B.1.4
  - **Tiempo:** 15 minutos

---

## B.2 - Middleware y Utilidades

- [ ] **B.2.1** Crear middleware de Multer para upload
  - **Archivo:** `src/middleware/multer.middleware.ts`
  - **Descripción:** Configurar multer para validar y procesar archivos
  - **Criterios:**
    - Configura `multer` con límite de tamaño
    - Filtra solo MIME types válidos
    - Retorna error 400 para archivos no válidos
    - Retorna error 413 para archivos >10MB
    - Exporta middleware `uploadImage`
  - **Dependencias:** B.1.1
  - **Tiempo:** 20 minutos

- [ ] **B.2.2** Crear utilidad de conversión de imagen a Base64
  - **Archivo:** `src/utils/imageBuffer.ts`
  - **Descripción:** Funciones para convertir Buffer a Base64
  - **Criterios:**
    - Función `bufferToBase64(buffer: Buffer): string`
    - Función `base64ToBuffer(base64: string): Buffer`
    - Manejo de errores
    - Tests unitarios incluidos
  - **Tiempo:** 15 minutos

- [ ] **B.2.3** Crear utilidad de mensajes de error
  - **Archivo:** `src/utils/errorMessages.ts`
  - **Descripción:** Generar mensajes de error descriptivos
  - **Criterios:**
    - Función `getToneErrorMessage(received: string): string`
    - Función `getFormatErrorMessage(received: string): string`
    - Función `getTextErrorMessage(length: number): string`
    - Función `getImageErrorMessage(error: string): string`
  - **Dependencias:** B.1.1, B.1.3
  - **Tiempo:** 15 minutes

---

## B.3 - Servicio ImageAnalyzer (NUEVO)

- [ ] **B.3.1** Crear estructura base del servicio
  - **Archivo:** `src/services/imageAnalyzer.service.ts`
  - **Descripción:** Clase base con métodos principales
  - **Criterios:**
    - Clase `ImageAnalyzerService`
    - Constructor inicializa cliente Cohere
    - Método `analyzeImage(buffer, mimeType): Promise<string[]>`
    - Método privado `bufferToBase64(buffer): string`
    - Método privado `retryWithBackoff<T>(...): Promise<T>`
    - Exporta la clase
  - **Tiempo:** 30 minutos

- [ ] **B.3.2** Implementar lógica de análisis de imagen
  - **Archivo:** `src/services/imageAnalyzer.service.ts` (continuación)
  - **Descripción:** Integración con Cohere Vision API
  - **Criterios:**
    - Llamada a `cohere.models.getImageCaptions()`
    - Envía imagen en Base64
    - Recibe array de captions (mín. 2)
    - Manejo de errores de API
    - Timeout máximo 10 segundos
    - Retorna array de strings descriptivos
  - **Dependencias:** B.3.1, B.2.2
  - **Tiempo:** 25 minutos

- [ ] **B.3.3** Implementar reintentos con backoff exponencial
  - **Archivo:** `src/services/imageAnalyzer.service.ts` (continuación)
  - **Descripción:** Manejo robusto de fallos
  - **Criterios:**
    - Máximo 3 reintentos
    - Backoff exponencial: 1s, 2s, 4s
    - Logging de reintentos
    - Falla después de max reintentos
  - **Dependencias:** B.3.2
  - **Tiempo:** 20 minutos

---

## B.4 - Servicio PromptBuilder (ACTUALIZADO)

- [ ] **B.4.1** Actualizar método `buildPrompt()` para incluir captions
  - **Archivo:** `src/services/promptBuilder.service.ts` (UPDATED)
  - **Descripción:** Integrar contexto visual en prompt
  - **Criterios:**
    - Parámetro adicional: `imageCaptions: string[]`
    - Estructura: `[ORIGINAL] + [CONTEXTO VISUAL] → HISTORIA`
    - Incluye sección "CONTEXTO VISUAL" si hay captions
    - Mantiene tone y format en prompt
    - Incluye requisito de 80-120 palabras
    - Incluye requisito de CTA si format es REDES_SOCIALES
  - **Tiempo:** 25 minutos

- [ ] **B.4.2** Crear template mejorado de prompt
  - **Archivo:** `src/constants/prompts.ts` (UPDATED)
  - **Descripción:** Nuevos templates con captions
  - **Criterios:**
    - Template base para generación con imagen
    - Variables parametrizadas: {tone}, {format}, {imageCaptions}, {text}
    - Instrucciones claras de estructura
    - Especificaciones de longitud y CTA
  - **Dependencias:** B.4.1
  - **Tiempo:** 15 minutos

---

## B.5 - Servicio StoryGenerator (ACTUALIZADO)

- [ ] **B.5.1** Integrar ImageAnalyzer en pipeline
  - **Archivo:** `src/services/storyGenerator.service.ts` (UPDATED)
  - **Descripción:** Llamar imageAnalyzer en flujo de generación
  - **Criterios:**
    - Crear instancia de `ImageAnalyzerService`
    - Llamar `analyzeImage()` después de validar entrada
    - Pasar captions a `promptBuilder`
    - Manejo de errores en análisis
    - Logging de captions extraídas
  - **Dependencias:** B.3.3, B.4.1
  - **Tiempo:** 20 minutos

- [ ] **B.5.2** Actualizar método principal `generateStory()`
  - **Archivo:** `src/services/storyGenerator.service.ts` (UPDATED)
  - **Descripción:** Incluir nueva variable `imageBuffer` y `imageMimeType`
  - **Criterios:**
    - Firma: `generateStory(tone, format, text, imageBuffer, imageMimeType)`
    - Pipeline:
      1. Validar entrada
      2. Analizar imagen → captions
      3. Construir prompt mejorado
      4. Generar historia
      5. Validar output
    - Retorna `GenerateStoryResponse` con metadata completa
  - **Dependencias:** B.5.1
  - **Tiempo:** 20 minutos

---

## B.6 - Servicio OutputValidator (ACTUALIZADO)

- [ ] **B.6.1** Agregar validación de contexto visual
  - **Archivo:** `src/services/outputValidator.service.ts` (UPDATED)
  - **Descripción:** Verificar que historia refleja contexto de imagen
  - **Criterios:**
    - Parámetro adicional: `imageCaptions?: string[]`
    - Si hay captions, verifica que historia menciona concepto similar
    - No es match exacto, sino relevancia semántica
    - Retorna flag `hasImageContext: boolean` en resultado
  - **Tiempo:** 20 minutos

- [ ] **B.6.2** Mantener validaciones existentes
  - **Archivo:** `src/services/outputValidator.service.ts`
  - **Descripción:** No cambiar lógica existente
  - **Criterios:**
    - Validación de longitud: 80-120 palabras
    - Validación de estructura: Gancho/Dev/Cierre
    - Validación de tone: match con solicitado
    - Validación de CTA: presente si REDES_SOCIALES
    - Retorna objeto `ValidationResult` completo
  - **Dependencias:** B.6.1
  - **Tiempo:** 10 minutos

---

## B.7 - Controller StoryController (ACTUALIZADO)

- [ ] **B.7.1** Actualizar endpoint POST /api/generate-story
  - **Archivo:** `src/controllers/story.controller.ts` (UPDATED)
  - **Descripción:** Manejar nuevo parámetro `image`
  - **Criterios:**
    - Extraer `req.file` del middleware multer
    - Pasar buffer y MIME type a `storyGenerator`
    - Pasar tone, format, text desde `req.body`
    - Retorna `GenerateStoryResponse` JSON
  - **Dependencias:** B.2.1, B.5.2
  - **Tiempo:** 15 minutos

- [ ] **B.7.2** Implementar error handling en controller
  - **Archivo:** `src/controllers/story.controller.ts` (UPDATED)
  - **Descripción:** Capturar y formatear errores
  - **Criterios:**
    - Try/catch alrededor de `storyGenerator.generateStory()`
    - Diferenciar entre errores de validación y API
    - Retorna HTTP 400 para validación
    - Retorna HTTP 413 para archivo muy grande
    - Retorna HTTP 500 para errores internos
    - Logging de errores
  - **Dependencias:** B.7.1
  - **Tiempo:** 15 minutos

---

## B.8 - Configuración y Rutas

- [ ] **B.8.1** Actualizar configuración de Cohere client
  - **Archivo:** `src/config/cohere.ts` (UPDATED)
  - **Descripción:** Asegurar inicialización correcta
  - **Criterios:**
    - Cliente `CohereClient` inicializado con API key
    - Validación de que API key existe en .env
    - Exporta cliente para uso en servicios
    - Manejo de error si API key falta
  - **Tiempo:** 10 minutos

- [ ] **B.8.2** Actualizar configuración de CORS
  - **Archivo:** `src/config/cors.ts` (UPDATED)
  - **Descripción:** Permitir requests multipart desde frontend
  - **Criterios:**
    - CORS configurado para `FRONTEND_URL_LOCAL`
    - CORS configurado para `FRONTEND_URL`
    - Permite método POST
    - Permite headers multipart
  - **Tiempo:** 10 minutos

- [ ] **B.8.3** Registrar rutas actualizadas
  - **Archivo:** `src/routes/story.routes.ts` (UPDATED)
  - **Descripción:** Conectar middleware multer a ruta
  - **Criterios:**
    - Ruta `POST /api/generate-story` usa middleware `uploadImage`
    - Middleware se ejecuta antes del controller
    - Validación de Zod aplicada después
    - Controller recibe request con file
  - **Dependencias:** B.2.1
  - **Tiempo:** 10 minutos

---

# 🧪 FASE C: TESTING Y VALIDACIÓN

## C.1 - Tests Unitarios - ImageAnalyzer

- [ ] **C.1.1** Tests para `analyzeImage()` - casos exitosos
  - **Archivo:** `tests/img/unit/imageAnalyzer.test.ts`
  - **Descripción:** Validar análisis de imagen correcta
  - **Criterios:**
    - Test: Extrae captions de JPEG válido
    - Test: Extrae captions de PNG válido
    - Test: Extrae captions de WEBP válido
    - Verifica que retorna array ≥2 elementos
    - Verifica que elementos son strings no vacíos
  - **Tiempo:** 30 minutos

- [ ] **C.1.2** Tests para `analyzeImage()` - errores
  - **Archivo:** `tests/img/unit/imageAnalyzer.test.ts` (continuación)
  - **Descripción:** Validar manejo de errores
  - **Criterios:**
    - Test: Rechaza MIME type inválido
    - Test: Rechaza buffer vacío
    - Test: Maneja timeout de API (>10s)
    - Test: Maneja error de API con reintento
    - Verifica que error es descriptivo
  - **Dependencias:** C.1.1
  - **Tiempo:** 30 minutos

- [ ] **C.1.3** Tests para `retryWithBackoff()` - reintentos
  - **Archivo:** `tests/img/unit/imageAnalyzer.test.ts` (continuación)
  - **Descripción:** Validar lógica de reintentos
  - **Criterios:**
    - Test: Reintenta 3 veces máximo
    - Test: Backoff exponencial correcto
    - Test: Falla después de max reintentos
    - Test: Retorna éxito si uno de reintentos es exitoso
  - **Dependencias:** C.1.2
  - **Tiempo:** 25 minutos

---

## C.2 - Tests Unitarios - PromptBuilder

- [ ] **C.2.1** Tests para `buildPrompt()` - con captions
  - **Archivo:** `tests/img/unit/promptBuilder.test.ts`
  - **Descripción:** Verificar integración de captions
  - **Criterios:**
    - Test: Prompt incluye sección "CONTEXTO VISUAL"
    - Test: Prompt incluye todos los captions
    - Test: Prompt incluye tone
    - Test: Prompt incluye format
    - Test: Prompt incluye requisito de 80-120 palabras
  - **Tiempo:** 25 minutos

- [ ] **C.2.2** Tests para `buildPrompt()` - sin captions
  - **Archivo:** `tests/img/unit/promptBuilder.test.ts` (continuación)
  - **Descripción:** Validar que funciona sin captions
  - **Criterios:**
    - Test: Prompt válido con array vacío
    - Test: No incluye "undefined"
    - Test: Estructura se mantiene
  - **Dependencias:** C.2.1
  - **Tiempo:** 15 minutos

- [ ] **C.2.3** Tests para templates - tone y format
  - **Archivo:** `tests/img/unit/promptBuilder.test.ts` (continuación)
  - **Descripción:** Validar templates específicos
  - **Criterios:**
    - Test: Template INSPIRACIONAL tiene estructura correcta
    - Test: Template EDUCATIVO tiene estructura correcta
    - Test: Template TÉCNICO tiene estructura correcta
    - Test: REDES_SOCIALES incluye CTA
    - Test: HISTORIA tiene estructura gancho/dev/cierre
  - **Dependencias:** C.2.2
  - **Tiempo:** 20 minutos

---

## C.3 - Tests Unitarios - Validación

- [ ] **C.3.1** Tests para schemas Zod
  - **Archivo:** `tests/img/unit/validation.test.ts`
  - **Descripción:** Validar schemas de entrada
  - **Criterios:**
    - Test: Acepta tone válido
    - Test: Rechaza tone inválido con mensaje claro
    - Test: Acepta format válido
    - Test: Rechaza format inválido
    - Test: Acepta text 20-1000 caracteres
    - Test: Rechaza text <20 caracteres
    - Test: Rechaza text >1000 caracteres
  - **Tiempo:** 30 minutos

- [ ] **C.3.2** Tests para imageValidation schema
  - **Archivo:** `tests/img/unit/validation.test.ts` (continuación)
  - **Descripción:** Validar schema de imagen
  - **Criterios:**
    - Test: Acepta MIME types válidos
    - Test: Rechaza MIME types inválidos
    - Test: Valida tamaño <10MB
    - Test: Rechaza tamaño >10MB
    - Test: Requiere buffer
  - **Dependencias:** C.3.1
  - **Tiempo:** 25 minutos

---

## C.4 - Tests Unitarios - OutputValidator

- [ ] **C.4.1** Tests para validación de output
  - **Archivo:** `tests/img/unit/outputValidator.test.ts`
  - **Descripción:** Validar resultado de historia
  - **Criterios:**
    - Test: Valida longitud 80-120 palabras
    - Test: Rechaza <80 palabras
    - Test: Rechaza >120 palabras
    - Test: Valida estructura (gancho/dev/cierre)
    - Test: Valida tone match
  - **Tiempo:** 30 minutos

- [ ] **C.4.2** Tests para CTA validation
  - **Archivo:** `tests/img/unit/outputValidator.test.ts` (continuación)
  - **Descripción:** Validar CTA en redes sociales
  - **Criterios:**
    - Test: REDES_SOCIALES contiene CTA
    - Test: Otros formatos no requieren CTA
    - Test: CTA es call to action válido
  - **Dependencias:** C.4.1
  - **Tiempo:** 20 minutos

---

## C.5 - Tests de Integración

- [ ] **C.5.1** Tests de endpoint completo - exitoso
  - **Archivo:** `tests/img/integration/story.routes.test.ts`
  - **Descripción:** Flujo completo exitoso
  - **Criterios:**
    - Test: POST a `/api/generate-story` con datos válidos
    - Respuesta HTTP 200
    - Body tiene estructura correcta
    - `success: 'ok'`
    - `generatedStory` contiene 80-120 palabras
    - `metadata.imageProcessed: true`
    - `metadata.imageCaptions` es array ≥2
  - **Tiempo:** 30 minutos

- [ ] **C.5.2** Tests de validación de errores
  - **Archivo:** `tests/img/integration/story.routes.test.ts` (continuación)
  - **Descripción:** Validar manejo de errores
  - **Criterios:**
    - Test: tone inválido → 400
    - Test: format inválido → 400
    - Test: text <20 chars → 400
    - Test: text >1000 chars → 400
    - Test: sin image → 400
    - Test: image >10MB → 413
    - Test: image formato inválido → 400
  - **Dependencias:** C.5.1
  - **Tiempo:** 40 minutos

- [ ] **C.5.3** Tests de estructura de respuesta
  - **Archivo:** `tests/img/integration/story.routes.test.ts` (continuación)
  - **Descripción:** Validar formato de respuesta
  - **Criterios:**
    - Test: Response tiene todos los campos requeridos
    - Test: Metadata tiene wordCount correcto
    - Test: Metadata tiene timestamps ISO 8601
    - Test: Metadata tiene modelo usado
    - Test: Validation object tiene todos los campos
  - **Dependencias:** C.5.2
  - **Tiempo:** 25 minutos

---

## C.6 - Tests E2E

- [ ] **C.6.1** Test E2E completo con imagen real
  - **Archivo:** `tests/img/e2e/story-generation.e2e.test.ts`
  - **Descripción:** Flujo completo con servidor real
  - **Criterios:**
    - Servidor inicia en puerto 3001
    - POST request con FormData multipart
    - Incluye imagen real (test-image.jpg)
    - Incluye tone, format, text válidos
    - Respuesta 200 con historia generada
    - Historia tiene contexto visual relevante
    - Metadata completo
  - **Tiempo:** 30 minutos

- [ ] **C.6.2** Test E2E con diferentes formatos de imagen
  - **Archivo:** `tests/img/e2e/story-generation.e2e.test.ts` (continuación)
  - **Descripción:** Validar múltiples formatos
  - **Criterios:**
    - Test: Funciona con JPG
    - Test: Funciona con PNG
    - Test: Funciona con WEBP
    - Todas retornan respuesta válida
    - Todas extraen captions exitosamente
  - **Dependencias:** C.6.1
  - **Tiempo:** 20 minutos

---

## C.7 - Cobertura de Tests

- [ ] **C.7.1** Lograr coverage ≥80%
  - **Descripción:** Ejecutar tests con coverage report
  - **Criterios:**
    - `npm test -- --coverage`
    - Coverage global ≥80%
    - Services: 100%
    - Controllers: 90%
    - Schemas/Utils: 85%
    - Report guardado en `coverage/`
  - **Dependencias:** C.1.1 a C.6.2
  - **Tiempo:** 30 minutos

- [ ] **C.7.2** Documentar resultados de tests
  - **Descripción:** Crear reporte de ejecución de tests
  - **Criterios:**
    - Archivo `TEST_RESULTS.md` en `tests/img/`
    - Listar todos los tests ejecutados
    - Coverage report incluido
    - Ningún test fallando
    - Todos los casos de error cubiertos
  - **Dependencias:** C.7.1
  - **Tiempo:** 15 minutos

---

# 📚 FASE D: DOCUMENTACIÓN Y POLISH

## D.1 - Documentación API

- [ ] **D.1.1** Crear API Reference
  - **Archivo:** `backend/doc/img/0_API_REFERENCE.md`
  - **Descripción:** Documentación completa del endpoint
  - **Criterios:**
    - URL y método: `POST /api/generate-story`
    - Parámetros de entrada con tipos
    - Respuesta exitosa con ejemplo JSON
    - Errores posibles con códigos HTTP
    - Headers requeridos
    - Rate limiting info
  - **Tiempo:** 30 minutos

- [ ] **D.1.2** Crear Implementation Guide
  - **Archivo:** `backend/doc/img/1_IMPLEMENTATION_GUIDE.md`
  - **Descripción:** Guía de implementación y detalles técnicos
  - **Criterios:**
    - Explicación de cada componente
    - Flujo de datos paso a paso
    - Decisiones técnicas y trade-offs
    - Cómo extender en futuras fases
  - **Tiempo:** 30 minutos

- [ ] **D.1.3** Crear guía de Image Processing
  - **Archivo:** `backend/doc/img/2_IMAGE_PROCESSING.md`
  - **Descripción:** Detalles de procesamiento de imagen
  - **Criterios:**
    - Formatos soportados y por qué
    - Limitaciones de tamaño
    - Cómo se extraen captions
    - Cómo se integran en prompt
    - Alternativas evaluadas
  - **Tiempo:** 25 minutos

- [ ] **D.1.4** Crear Testing Strategy
  - **Archivo:** `backend/doc/img/3_TESTING_STRATEGY.md`
  - **Descripción:** Estrategia de testing completa
  - **Criterios:**
    - Pirámide de tests
    - Cobertura por componente
    - Cómo ejecutar tests
    - Cómo agregar nuevos tests
    - Casos edge cubiertos
  - **Tiempo:** 25 minutos

---

## D.2 - Colección Postman

- [ ] **D.2.1** Crear colección Postman JSON
  - **Archivo:** `backend/doc/img/postman_collection.json`
  - **Descripción:** Requests listos para copiar en Postman
  - **Criterios:**
    - Solicitud exitosa (INSPIRACIONAL + REDES_SOCIALES)
    - Solicitud exitosa (EDUCATIVO + POST)
    - Solicitud con error (tone inválido)
    - Solicitud con error (file >10MB)
    - Variables de entorno configurables
    - Ejemplos de respuesta
  - **Tiempo:** 25 minutos

- [ ] **D.2.2** Crear cURL examples
  - **Archivo:** `backend/doc/img/0_API_REFERENCE.md` (agregar)
  - **Descripción:** Ejemplos cURL para testing
  - **Criterios:**
    - Ejemplo básico exitoso
    - Ejemplo con diferentes formatos
    - Ejemplo de error
    - Comando listo para copiar/pegar
  - **Dependencias:** D.2.1
  - **Tiempo:** 15 minutos

---

## D.3 - README y Guía Rápida

- [ ] **D.3.1** Actualizar README.md principal
  - **Archivo:** `backend/README.md` (UPDATED)
  - **Descripción:** Agregar sección de Fase 1
  - **Criterios:**
    - Nuevas features documentadas
    - Quick start con imagen
    - Link a documentación técnica
    - Link a Postman collection
  - **Tiempo:** 20 minutos

- [ ] **D.3.2** Crear Quick Start Guide
  - **Archivo:** `backend/doc/img/QUICK_START.md` (NEW)
  - **Descripción:** Guía paso a paso para comenzar
  - **Criterios:**
    - Instalación de dependencias
    - Configuración de .env
    - Ejecutar tests
    - Iniciar servidor
    - Probar primer endpoint
  - **Tiempo:** 20 minutos

---

## D.4 - Validación y QA

- [ ] **D.4.1** Prueba manual del endpoint
  - **Descripción:** Testing manual con imagen real
  - **Criterios:**
    - Servidor inicia sin errores
    - Endpoint responde con HTTP 200
    - Historia generada tiene contexto visual
    - Metadata completo
    - Sin errores en logs
  - **Dependencias:** Todos B, C
  - **Tiempo:** 30 minutos

- [ ] **D.4.2** Validación de código con ESLint
  - **Descripción:** Ejecutar linter en todo código nuevo
  - **Criterios:**
    - `npm run lint` pasa sin errores
    - No hay warnings
    - Código sigue estándares del proyecto
  - **Tiempo:** 10 minutos

- [ ] **D.4.3** Aplicar Prettier formatting
  - **Descripción:** Formatear código automáticamente
  - **Criterios:**
    - `npm run format` ejecutado
    - Todos los archivos TS formateados
    - Consistencia en todo el código
  - **Dependencias:** D.4.2
  - **Tiempo:** 5 minutos

---

## D.5 - Commits y Control de Versión

- [ ] **D.5.1** Hacer commits atómicos
  - **Descripción:** Organizar cambios en commits pequeños
  - **Criterios:**
    - Un feature = un commit
    - Mensajes descriptivos en presente
    - Formato: `"feat: add image analysis to story endpoint"`
    - Historico limpio y navegable
  - **Tiempo:** 20 minutos

- [ ] **D.5.2** Push a rama de Fase 1
  - **Descripción:** Enviar código a repositorio
  - **Criterios:**
    - Crear rama `feature/phase-1-image-processing`
    - Todos los commits pusheados
    - GitHub Actions (si existen) pasa
    - PR listo para revisar
  - **Dependencias:** D.5.1
  - **Tiempo:** 10 minutos

---

## D.6 - Validación Final (DoD)

- [ ] **D.6.1** Checklist de Definition of Done
  - **Descripción:** Verificar que todo está completo
  - **Criterios - Código:**
    - ✅ 100% tests pasando
    - ✅ Coverage ≥80%
    - ✅ ESLint sin errores
    - ✅ Prettier aplicado

  - **Criterios - Funcionalidad:**
    - ✅ Endpoint recibe imagen
    - ✅ ImageAnalyzer extrae captions
    - ✅ PromptBuilder integra captions
    - ✅ Historias: 80-120 palabras
    - ✅ Validaciones funcionan
    - ✅ Error handling robusto

  - **Criterios - Integración:**
    - ✅ Sin breaking changes
    - ✅ Variables .env configuradas
    - ✅ Schema Prisma preparado
    - ✅ Tests en `/tests/img/`
    - ✅ Documentación en `/doc/img/`

  - **Criterios - Documentación:**
    - ✅ API Reference completo
    - ✅ Implementation Guide
    - ✅ Testing Strategy
    - ✅ Postman Collection JSON
    - ✅ README actualizado

  - **Tiempo:** 30 minutos

- [ ] **D.6.2** Crear Summary Report
  - **Archivo:** `backend/doc/img/PHASE1_COMPLETION_REPORT.md` (NEW)
  - **Descripción:** Resumen final de Fase 1
  - **Criterios:**
    - Features implementadas
    - Tests ejecutados y resultados
    - Coverage report
    - Documentación completada
    - Próximos pasos para Fase 2
  - **Dependencias:** D.6.1
  - **Tiempo:** 20 minutos

---

# 📊 RESUMEN ESTADÍSTICO

## Conteo de Tareas

| Fase | Cantidad | Estimado |
|------|----------|----------|
| A - Setup | 6 | 1-2 días |
| B - Servicios | 22 | 3-4 días |
| C - Testing | 15 | 2-3 días |
| D - Documentación | 15 | 1-2 días |
| **TOTAL** | **58** | **~1-1.5 semanas** |

## Horas Estimadas

| Categoría | Horas |
|-----------|-------|
| Setup y configuración | 2 |
| Desarrollo de servicios | 18 |
| Tests unitarios | 12 |
| Tests integración | 11 |
| Tests E2E | 4 |
| Documentación | 6 |
| QA y validación | 3 |
| **TOTAL** | **~56 horas** |

---

## 🎯 DEPENDENCIAS ENTRE TAREAS

```
A.1 (Setup) 
  ↓
A.2 (Directorios)
  ↓
B.1 (Constants/Schemas)
  ├→ B.2 (Middleware/Utils)
  │  ├→ B.3 (ImageAnalyzer)
  │  │  ├→ B.4 (PromptBuilder)
  │  │  │  ├→ B.5 (StoryGenerator)
  │  │  │  │  ├→ B.6 (OutputValidator)
  │  │  │  │  │  ├→ B.7 (Controller)
  │  │  │  │  │  │  ├→ B.8 (Config/Rutas)
  │  │  │  │  │  │  │  ├→ C (Tests)
  │  │  │  │  │  │  │  │  └→ D (Documentación)
```

---

## 🔄 FLUJO RECOMENDADO DE EJECUCIÓN

1. **Día 1:** Completar Fase A (Setup)
2. **Días 2-4:** Completar Fase B (Servicios en orden)
3. **Días 5-6:** Completar Fase C (Tests en paralelo con B si es posible)
4. **Día 7:** Completar Fase D (Documentación y validación)

---

## ✅ CHECKLIST FINAL

Antes de marcar todo como completo:

- [ ] Todos los tests pasan: `npm test`
- [ ] Coverage ≥80%: `npm test -- --coverage`
- [ ] Sin errores de lint: `npm run lint`
- [ ] Código formateado: `npm run format`
- [ ] Documentación completa en `/doc/img/`
- [ ] Postman collection funcional
- [ ] Prueba manual exitosa
- [ ] README actualizado
- [ ] Commits organizados y pusheados

---

## 📝 NOTAS PARA DESARROLLADOR

### Durante el Desarrollo
- Escribir tests ANTES del código (TDD)
- Hacer commits frecuentes y pequeños
- Documentar decisiones técnicas importantes
- Comunicar bloqueantes inmediatamente
- Validar con imagen real regularmente

### Cosas a Evitar
- ❌ Cambiar especificaciones sin consenso
- ❌ Saltarse tests
- ❌ Commits grandes y complejos
- ❌ Código sin documentación
- ❌ Perder de vista scope de Fase 1

### Puntos Críticos
- 🔴 ImageAnalyzer debe manejar timeouts correctamente
- 🔴 Validaciones deben ser estrictas
- 🔴 Error messages deben ser descriptivos
- 🔴 Coverage debe ser ≥80%
- 🔴 Documentación debe estar completa

---

**Documento de Tareas Completado**  
**Listo para Implementación**  
**Fecha:** 9 de diciembre de 2025

---

## 📖 Instrucciones de Uso

1. **Copiar tareas a sistema de tracking** (Jira, GitHub Issues, Trello, etc.)
2. **Marcar como "In Progress"** cada tarea que se empieza
3. **Marcar como "Done"** cada tarea completada
4. **Ejecutar tests regularmente** durante desarrollo
5. **Revisar DoD** al final de cada fase

