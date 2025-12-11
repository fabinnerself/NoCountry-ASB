# 🚀 Brainstorm & Plan - Fase 1: AutoStory Builder
## Desarrollo de 4ta Variable - Procesamiento de Imágenes

---

## 📌 Contexto Inicial

### Antecedentes
- **Frontend:** Vercel (código base existente) C:\nocountry\3\frontend
- **Backend:** Render (código base existente) C:\nocountry\3\backend
- **Documentación Base:** `/plan/fase0/` y `desc_gral_proy_auto_store-builder.txt`

### Enfoque de Desarrollo
- ✅ **TDD First:** Tests antes del código
- ✅ **Código Existente:** Integración con base actual, no comenzar de cero
- ✅ **Metodología Incremental:** Una fase a la vez
- ✅ **Validación Pragmática:** Usar imagen de prueba para validar flujo completo

---

## 🎯 Objetivo General - Fase 1

Desarrollar y validar la capacidad del endpoint `/api/generate-story` para:
1. **Recibir una imagen** (formatos: JPG, PNG, WEBP)
2. **Procesar descripción de imagen** mediante IA (captions/descripciones)
3. **Integrar información de imagen** en el prompt de generación de historias
4. **Generar historias mejoradas** usando contexto visual + parámetros textuales

### Objetivo Final (Visión Completa)
Desarrollar **AutoStory Builder completo**: sistema de IA para generar historias visuales y textuales a partir de inputs multimedia, con panel de edición, exportación y RAG.

---

## 📋 Alcance de Fase 1

### Endpoint Principal: `POST /api/generate-story`

#### Input JSON
```json
{
  "tone": "INSPIRACIONAL" | "EDUCATIVO" | "TÉCNICO",
  "format": "HISTORIA" | "POST" | "REDES_SOCIALES" | "OTRO",
  "text": "string (min 20, max 1000 chars)",
  "image": "base64_encoded_image | file_upload (JPG, PNG, WEBP < 10 MB)"
}
```

#### Output JSON
```json
{
  "success": "ok",
  "generatedStory": "string (historia generada con contexto de imagen)",
  "validation": {
    "tone": "ok" | "error",
    "format": "ok" | "error",
    "text": "ok" | "error",
    "image": "ok" | "error"
  },
  "metadata": {
    "wordCount": 95,
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "imageProcessed": true,
    "imageCaptions": ["caption1", "caption2"],
    "generatedAt": "2025-12-09T02:13:27.227Z",
    "model": "command-r-plus"
  }
}
```

### Variables de Input (4 en total)

| Variable | Tipo | Validación | Descripción |
|----------|------|-----------|-------------|
| `tone` | String | Enum: INSPIRACIONAL, EDUCATIVO, TÉCNICO | Tono narrativo de la historia |
| `format` | String | Enum: HISTORIA, POST, REDES_SOCIALES, OTRO | Formato de salida |
| `text` | String | 20-1000 caracteres | Contexto/información base |
| `image` | File/Blob | JPG, PNG, WEBP, <10MB | Imagen de entrada para análisis |

---

## 🏗️ Arquitectura Técnica

### Stack Completo

#### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** PostgreSQL + pgvector (ext.)
- **ORM:** Prisma
- **Testing:** Jest + Mocha
- **Deployment:** Render

#### Frontend
- **Core:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Theme Manager:** Next Themes
- **Deployment:** Vercel

#### IA & Visión
- **LLM Principal:** Cohere (Command R Plus)
- **Visión Computadora:** Cohere API + Vision capability (o alternativa gratuita)
- **Alternativas Evaluadas:** 
  - Cohere Vision (incluida en plan)
  - Google Cloud Vision (gratuita con límites)
  - Hugging Face (modelos gratuitos)

### Variables de Entorno (.env)

```env
# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=8000
NODE_ENV=development

# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/autostory_db?schema=public"

# ============================================
# API KEYS
# ============================================
COHERE_API_KEY="your-api-key-here"

# ============================================
# FRONTEND URLs (CORS)
# ============================================
FRONTEND_URL_LOCAL="http://localhost:5173"
FRONTEND_URL="https://frontend.vercel.app"

# ============================================
# PORTS REFERENCE
# ============================================
# Backend:     http://localhost:8000
# PostgreSQL:  localhost:5432
# Frontend:    http://localhost:5173
# ============================================
```

---

## ✅ Validaciones & Reglas de Negocio

### Validaciones de Input

#### Tone
- **Valores permitidos:** INSPIRACIONAL, EDUCATIVO, TÉCNICO
- **Error:** `"Valor de tone no válido: [valor]. Permitidos: INSPIRACIONAL, EDUCATIVO, TÉCNICO"`

#### Format
- **Valores permitidos:** HISTORIA, POST, REDES_SOCIALES, OTRO
- **Error:** `"Valor de format no válido: [valor]. Permitidos: HISTORIA, POST, REDES_SOCIALES, OTRO"`

#### Text
- **Longitud:** 20-1000 caracteres (obligatorio)
- **Error:** `"El texto debe tener entre 20 y 1000 caracteres. Recibido: [n]"`

#### Image
- **Formatos permitidos:** JPG, PNG, WEBP
- **Tamaño máximo:** 10 MB
- **Procesamiento:** Extraer captions/descripciones vía IA
- **Error:** `"Imagen inválida. Formatos: JPG, PNG, WEBP. Tamaño máximo: 10 MB"`

### Validaciones de Output

- **Longitud:** 80-120 palabras
- **Estructura:** Gancho → Desarrollo → Cierre inspirador
- **Tono:** Debe reflejar el solicitado
- **Formato:** Apropiado para el tipo seleccionado
- **CTA:** Llamado a la acción (obligatorio para REDES_SOCIALES)
- **Contexto Visual:** Integración visible de elementos de la imagen

---

## 🔧 Plan de Implementación

### Pasos Técnicos (Orden de Ejecución)

#### 1. **Adaptación del Endpoint** `/api/generate-story`
- [ ] Agregar parámetro `image` al schema de validación
- [ ] Implementar carga/procesamiento de archivo
- [ ] Detectar formato y validar tamaño

#### 2. **Servicio de Análisis de Imagen**
- [ ] Crear `imageAnalyzer.service.ts`
- [ ] Integrar Cohere Vision API o alternativa
- [ ] Extraer captions y descripción textual de imagen
- [ ] Manejo de errores en análisis

#### 3. **Ajuste de Prompt**
- [ ] Modificar `promptBuilder.service.ts`
- [ ] Incorporar captions de imagen como parámetro
- [ ] Estructura: `[TEXTO BASE] + [CAPTIONS DE IMAGEN] → HISTORIA`
- [ ] Mantener validaciones de output

#### 4. **Tests Unitarios** (TDD)
- [ ] Tests para validación de imagen
- [ ] Tests para extracción de captions
- [ ] Tests para integración en prompt
- [ ] Tests de output (longitud, estructura, tono)
- [ ] Tests de manejo de errores

#### 5. **Documentación**
- [ ] Actualizar README.md con nueva funcionalidad
- [ ] Documentar API en `/backend/doc/img/`
- [ ] Crear colección Postman JSON para testing
- [ ] Generar ejemplos de uso

#### 6. **Validación E2E**
- [ ] Probar con imagen de prueba real
- [ ] Validar historias generadas
- [ ] Confirmar integración con frontend (si aplica en fase 1)
- [ ] Performance en producción

---

## 📂 Estructura de Archivos & Directorios

### Nuevos Archivos Backend

```
backend/
├── src/
│   ├── services/
│   │   ├── imageAnalyzer.service.ts          (NEW)
│   │   ├── promptBuilder.service.ts          (UPDATED)
│   │   ├── storyGenerator.service.ts         (UPDATED)
│   │   └── outputValidator.service.ts        (UPDATED)
│   ├── schemas/
│   │   ├── storyRequest.schema.ts            (UPDATED - agregar image)
│   │   └── imageValidation.schema.ts         (NEW)
│   └── controllers/
│       └── story.controller.ts               (UPDATED)
│
├── tests/
│   └── img/                                  (NEW - Fase 1)
│       ├── image-analyzer.test.ts
│       ├── prompt-builder.test.ts
│       ├── story-generator.test.ts
│       ├── validation.test.ts
│       └── e2e.test.ts
│
└── doc/
    └── img/                                  (NEW - Fase 1)
        ├── 0_API_REFERENCE.md
        ├── 1_IMPLEMENTATION_GUIDE.md
        ├── 2_IMAGE_PROCESSING.md
        ├── 3_TESTING_STRATEGY.md
        └── postman_collection.json
```

---

## ✨ Criterios de Aceptación (DoD - Definition of Done)

### Código & Testing
- [ ] Tests unitarios al 100% (all passing)
- [ ] Tests en directorio `/backend/tests/img/`
- [ ] Coverage ≥ 80%
- [ ] Código sigue ESLint/Prettier config
- [ ] Sin warnings en build

### Funcionalidad
- [ ] Endpoint recibe 4 parámetros correctamente
- [ ] Imagen se procesa y extrae captions
- [ ] Historias cumplen 80-120 palabras
- [ ] Estructura: Gancho → Desarrollo → Cierre
- [ ] Tono reflejado en output
- [ ] Manejo robusto de errores
- [ ] Mensajes de error claros y útiles

### Integración
- [ ] Código integrado con backend existente
- [ ] Variables de entorno configuradas
- [ ] Base de datos (schema Prisma) lista para fase 2
- [ ] Sin breaking changes en endpoints existentes

### Documentación
- [ ] Documentación en `/backend/doc/img/`
- [ ] /backend/README.md actualizado
- [ ] Colección Postman JSON incluida
- [ ] Ejemplos de uso claros
- [ ] Guía de troubleshooting

### Validación
- [ ] Imagen de prueba procesa correctamente
- [ ] Historias generadas incluyen contexto visual
- [ ] Validación de input funciona
- [ ] Validación de output funciona
- [ ] E2E con cliente real

---

## 🤔 Decisiones Técnicas & FAQs

### ¿Cohere puede procesar imágenes?
**Sí**, Cohere Command R Plus incluye capacidad de visión. Si no es disponible en plan actual, alternativas:
- Google Cloud Vision API (free tier: 1000 requests/mes)
- Hugging Face (modelos gratuitos sin límite)
- Local: CLIP o similar ejecutado localmente

### ¿Validar imagen o no?
**No validar a priori.** Enfoque pragmático:
1. Usar imagen de prueba
2. Si flujo completo funciona → asumir funciona con cualquier imagen
3. Validación extensiva en fase posterior

### ¿Cómo integrar captions en prompt?
**Parametrización de prompt:**
```
[ESTRUCTURA ORIGINAL] 
+ NUEVA SECCIÓN: "Contexto visual: [caption1, caption2, ...]"
→ Mejor resultado de historia
```

### ¿Tamaño máximo de imagen?
**10 MB** (razonable para web, no implica overhead excesivo)

### ¿Base de datos en Fase 1?
**No persistencia en BD.** Preparar schema Prisma para Fase 2.
Fase 1: Validar flujo funcional en memoria.

---

## 📊 Timeline Estimado

| Etapa | Duración | Hitos |
|-------|----------|-------|
| **Preparación** | 1-2 días | Setup, estudio APIs |
| **Desarrollo** | 3-4 días | Servicios, validaciones, tests |
| **Testing & QA** | 2-3 días | Tests, manual QA, documentación |
| **Documentación** | 1-2 días | Docs, ejemplos, Postman |
| **Total** | ~1-1.5 semanas | MVP funcional |

---

## 🚀 Siguiente Fase (Preparación)

### Fase 2: Persistencia en Base de Datos
- Implementar schema Prisma para historias
- Almacenar: tone, format, text, imageUrl, metadata
- CRUD endpoints básicos
- Validación de UUID en BD

### Fase 3+: Características Avanzadas
- RAG: Búsqueda semántica de historias similares
- Panel de edición interactivo
- Exportación múltiples formatos (PDF, DOCX, etc.)
- Análisis avanzado de imagen (OCR, objetos detectados)
- Historial de usuario

---

## 📚 Recursos & Referencias

### Documentación API
- [Cohere API Docs](https://docs.cohere.com/)
- [Cohere Vision](https://docs.cohere.com/docs/vision)
- [Prisma + PostgreSQL](https://www.prisma.io/docs/concepts/components/prisma-client/databases/postgresql)
- [pgvector Extension](https://github.com/pgvector/pgvector)

### Repositorio & Archivos
- **Código Base:** `C:\nocountry\3\` (frontend + backend)
- **Especificación Proyecto:** `plan/desc_gral_proy_auto_store-builder.txt`
- **Estructura BD:** `plan/db_struct.sql`
- **Fase 0:** `plan/fase0/` (planificación previa)

### Testing & Tools
- Jest: https://jestjs.io/
- Postman: https://www.postman.com/
- VS Code REST Client: https://marketplace.visualstudio.com/items?itemName=humao.rest-client

---

## 🐛 Testing Local - Guía Rápida

### Setup Inicial
```bash
# 1. Navegar a backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Configurar .env
cp .env.example .env
# Editar con credenciales reales (COHERE_API_KEY, DATABASE_URL)

# 4. Base de datos
npm run db:migrate

# 5. Ejecutar tests
npm test -- tests/img/

# 6. Iniciar servidor dev
npm run dev
```

### Probar Endpoint (con imagen)
```bash
curl -X POST http://localhost:8000/api/generate-story \
  -F "tone=INSPIRACIONAL" \
  -F "format=REDES_SOCIALES" \
  -F "text=Historia de emprendimiento en zona rural" \
  -F "image=@/path/to/test-image.jpg"
```

### Validación Manual Checklist
- [ ] Respuesta HTTP 200
- [ ] Campo `success` = "ok"
- [ ] Historia: 80-120 palabras
- [ ] Incluye contexto visual de imagen
- [ ] Estructura: Gancho → Desarrollo → Cierre
- [ ] Tono INSPIRACIONAL visible
- [ ] Metadata completa

---

## 📝 Notas Importantes

### Principios de Desarrollo
1. **TDD First:** Tests antes del código
2. **Modularidad:** Funciones pequeñas, testables
3. **Documentación:** Decisiones técnicas registradas
4. **Commits Atómicos:** Un feature = un commit
5. **Código Base:** Reutilizar, no reinventar

### Convenciones
- **Código:** Variables en inglés
- **Documentación:** Español
- **Commits:** Mensajes claros en presente
- **Estructura:** Seguir patrón existente (controllers → services → utils)

### Próximas Validaciones
- [ ] Funciona con imagen real
- [ ] Historias tienen contexto visual
- [ ] Error handling robusto
- [ ] Performance aceptable
- [ ] Pronto para frontend

---

## 🎯 Success Metrics

| Métrica | Objetivo |
|---------|----------|
| Tests Passing | 100% |
| Code Coverage | ≥80% |
| Tiempo Respuesta | <5s (sin BD) |
| Historias Relevantes | >80% con contexto visual |
| Documentación Completa | Sí |
| Imagen de Prueba | Funciona ✅ |

---

**Última actualización:** 9 de diciembre de 2025  
**Autor:** Brainstorm Fase 1 - AutoStory Builder  
**Estado:** 🔄 Planificación → Desarrollo
