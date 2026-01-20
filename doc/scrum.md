# 👩‍🚀 AutoStory Builder - Product Backlog Scrum

**Proyecto:** AutoStory Builder - AI Story Generator  
**Equipo:** S11-25-Equipo 06-AI Agent  
**Última actualización:** Diciembre 2024  
**Estado actual:** Fase 2 - Persistencia Completa

---

## 📋 Tabla de Contenidos

1. [Visión del Producto](#visión-del-producto)
2. [Épicas Principales](#épicas-principales)
3. [Historias de Usuario por Fase](#historias-de-usuario-por-fase)
4. [Roadmap de Implementación](#roadmap-de-implementación)
5. [Criterios de Aceptación](#criterios-de-aceptación)
6. [Definición de Done](#definición-de-done)

---

## 🎯 Visión del Producto

AutoStory Builder es una plataforma de inteligencia artificial que genera historias visuales y textuales a partir de inputs multimedia (imágenes, texto, testimonios). El sistema produce contenido narrativo personalizable en múltiples formatos, facilitando la creación de contenido para redes sociales, comunicación institucional y storytelling de impacto.

### Propuesta de Valor
- Automatización de creación de contenido narrativo
- Generación de historias con tonos configurables (inspiracional, educativo, técnico)
- Procesamiento inteligente de imágenes y texto
- Persistencia y gestión de historias generadas
- Escalabilidad para futuras funcionalidades (RAG, autenticación, versionado)

---

## 📚 Épicas Principales

### Epic 1: Generación Multimedia de Historias 🎨
**Objetivo:** Habilitar la generación de historias desde inputs de texto e imagen usando IA  
**Estado:** ✅ Completado (Fase 1)  
**Prioridad:** Alta  
**Valor de Negocio:** Funcionalidad core del producto

**User Stories:**
- [x] US-101: Como creador de contenido, quiero subir una imagen y proporcionar contexto textual para que el sistema genere una historia relevante
- [x] US-102: Como usuario, quiero seleccionar el tono de la historia (inspiracional, educativo, técnico) para personalizar el contenido generado
- [x] US-103: Como usuario, quiero elegir el formato de salida (historia, post de redes sociales, artículo, otro) para adaptar el contenido a diferentes plataformas
- [x] US-104: Como sistema, quiero procesar imágenes usando IA vision para extraer captions y enriquecer el contexto de la historia

**Criterios de Aceptación:**
- ✅ API acepta imagen (opcional) + texto + tono + formato
- ✅ Integración con Cohere API funcionando
- ✅ Procesamiento de imagen con análisis de contenido
- ✅ Generación de historia coherente según parámetros
- ✅ Tiempo de respuesta < 5 segundos

---

### Epic 2: Persistencia en Base de Datos 💾
**Objetivo:** Almacenar todas las historias generadas con metadata completa  
**Estado:** ✅ Completado (Fase 2)  
**Prioridad:** Alta  
**Valor de Negocio:** Fundamento para futuras funcionalidades

**User Stories:**
- [x] US-201: Como desarrollador, quiero configurar Prisma ORM con PostgreSQL para gestionar operaciones de base de datos con type-safety
- [x] US-202: Como sistema, quiero persistir historias generadas con todos los parámetros de entrada y metadata
- [x] US-203: Como desarrollador, quiero manejo robusto de errores de BD con degradación elegante
- [x] US-204: Como operador, quiero health checks que incluyan el estado de conexión a BD
- [x] US-205: Como desarrollador, quiero migraciones de base de datos versionadas y reproducibles

**Criterios de Aceptación:**
- ✅ Schema de Prisma definido y documentado
- ✅ Modelo `Story` con todos los campos requeridos
- ✅ Migraciones funcionando en dev y producción
- ✅ Operaciones CRUD completas
- ✅ Manejo de errores con fallback
- ✅ Health endpoint reporta estado de BD
- ✅ Logs estructurados de operaciones BD

**Modelo de Datos:**
```typescript
Story {
  id: UUID
  tone: String
  format: String
  text: String
  image?: String
  generatedStory: String
  idUsuario?: String
  version: String
  errorMessage?: String
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

### Epic 3: Interfaz de Usuario Frontend 🖥️
**Objetivo:** Proporcionar una interfaz intuitiva para interactuar con el generador  
**Estado:** ✅ Completado (Fase 1)  
**Prioridad:** Alta  
**Valor de Negocio:** Experiencia de usuario

**User Stories:**
- [x] US-301: Como usuario, quiero una landing page atractiva que explique el producto
- [x] US-302: Como usuario, quiero un formulario intuitivo para ingresar texto y subir imágenes
- [x] US-303: Como usuario, quiero seleccionar tono y formato desde el formulario
- [x] US-304: Como usuario, quiero ver la historia generada inmediatamente después del envío
- [x] US-305: Como usuario, quiero feedback visual durante la generación (loading state)
- [x] US-306: Como usuario, quiero manejo de errores claro y útil

**Criterios de Aceptación:**
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Validación de formulario
- ✅ Upload de imágenes con preview
- ✅ Estados de loading y error
- ✅ Integración con API backend
- ✅ UI/UX según diseño de Figma

---

### Epic 4: API REST Backend 🔌
**Objetivo:** Proporcionar endpoints para la generación y gestión de historias  
**Estado:** ✅ Completado (Fases 1 y 2)  
**Prioridad:** Alta  
**Valor de Negocio:** Core técnico del producto

**User Stories:**
- [x] US-401: Como desarrollador, quiero un endpoint POST /api/generate-story que acepte parámetros multipart
- [x] US-402: Como desarrollador, quiero respuestas JSON estandarizadas con metadata
- [x] US-403: Como sistema, quiero validación de inputs en el backend
- [x] US-404: Como sistema, quiero logging estructurado de todas las operaciones
- [x] US-405: Como operador, quiero health checks completos del sistema

**Endpoints Implementados:**

| Método | Endpoint | Descripción | Estado |
|--------|----------|-------------|--------|
| GET | `/health` | Health check con estado de BD | ✅ |
| POST | `/api/generate-story` | Generar historia desde inputs | ✅ |

**Criterios de Aceptación:**
- ✅ Documentación en Postman
- ✅ CORS configurado
- ✅ Rate limiting (futuro)
- ✅ Manejo de errores HTTP estándar
- ✅ Validación de tipos con TypeScript

---

## 🚀 Historias de Usuario por Fase

### ✅ Fase 0: Prototipo Inicial
**Objetivo:** Validar concepto y arquitectura  
**Duración:** 1 semana  
**Sprint:** Sprint 0

- [x] US-001: Definir arquitectura técnica del sistema
- [x] US-002: Crear diseño de UI en Figma
- [x] US-003: Investigar APIs de IA disponibles (Cohere, OpenAI, etc.)
- [x] US-004: Definir modelo de datos inicial
- [x] US-005: Documentar requisitos funcionales y no funcionales

---

### ✅ Fase 1: MVP Funcional
**Objetivo:** Sistema funcionando sin persistencia  
**Duración:** 2 semanas  
**Sprint:** Sprint 1-2

#### a) Landing Page con Formulario
- [x] US-101: Crear landing page con diseño atractivo
- [x] US-102: Implementar formulario de generación
- [x] US-103: Integrar upload de imágenes
- [x] US-104: Conectar formulario con API backend
- [x] US-105: Implementar visualización de historia generada

**Tecnologías:**
- React 18 + TypeScript
- Vite
- TailwindCSS
- React Hook Form
- Radix UI

#### b) API Básica
- [x] US-201: Configurar proyecto Node.js + Express + TypeScript
- [x] US-202: Implementar endpoint POST /api/generate-story
- [x] US-203: Integrar Cohere API para generación de texto
- [x] US-204: Implementar procesamiento de imágenes con Multer
- [x] US-205: Configurar CORS y middleware de seguridad
- [x] US-206: Deploy en Render

**Tecnologías:**
- Node.js + Express
- TypeScript
- Multer
- Cohere API
- Winston (logging)

---

### ✅ Fase 2: Persistencia Completa (ACTUAL)
**Objetivo:** Almacenar todas las historias generadas  
**Duración:** 1 semana  
**Sprint:** Sprint 3

#### c) Integración de Prisma ORM
- [x] US-301: Instalar y configurar Prisma
- [x] US-302: Definir schema de base de datos
- [x] US-303: Configurar conexión con PostgreSQL
- [x] US-304: Generar cliente Prisma tipado
- [x] US-305: Documentar guía de uso de Prisma

**Archivos clave:**
```
backend/
├── prisma/
│   └── schema.prisma
├── src/config/
│   └── database.ts
└── doc/db/
    ├── SETUP.md
    ├── PRISMA_GUIDE.md
    └── TROUBLESHOOTING.md
```

#### d) Persistencia de Historias
- [x] US-401: Implementar repositorio de historias (story.repository.ts)
- [x] US-402: Persistir historia en BD después de generación
- [x] US-403: Manejar errores de BD con degradación elegante
- [x] US-404: Actualizar respuesta API con estado de persistencia
- [x] US-405: Implementar logging de operaciones BD

**Funcionalidad:**
```typescript
// Cada historia generada se guarda automáticamente
{
  "success": true,
  "story": "...",
  "validation": {
    "input": "ok",
    "generation": "ok",
    "db": "ok" // o "degraded" si falla BD
  }
}
```

#### e) Health Checks y Monitoreo
- [x] US-501: Implementar health check de base de datos
- [x] US-502: Agregar métricas de sistema al health endpoint
- [x] US-503: Configurar logging estructurado
- [x] US-504: Documentar troubleshooting de BD

**Health Endpoint:**
```json
{
  "status": "ok",
  "version": "fase2",
  "database": "connected",
  "services": {
    "api": "ok",
    "cohere": "configured"
  }
}
```

---

### 🔄 Fase 3: RAG y Búsqueda (PLANEADA)
**Objetivo:** Mejorar generación con contexto de historias previas  
**Duración:** 2 semanas  
**Sprint:** Sprint 4-5  
**Estado:** 📋 Por implementar

#### f) Retrieval-Augmented Generation
- [ ] US-601: Investigar e implementar pgvector en PostgreSQL
- [ ] US-602: Generar embeddings de historias existentes
- [ ] US-603: Implementar búsqueda por similitud semántica
- [ ] US-604: Integrar contexto RAG en generación de historias
- [ ] US-605: Optimizar rendimiento de queries vectoriales

**Tecnologías propuestas:**
- pgvector extension
- OpenAI embeddings o Cohere embeddings
- Supabase (alternativa evaluada)

**Criterios de Aceptación:**
- [ ] Embeddings generados para todas las historias
- [ ] Búsqueda semántica funcional
- [ ] Integración RAG mejora calidad de historias
- [ ] Tiempo de respuesta < 7 segundos con RAG

---

### 🔄 Fase 4: Autenticación y Gestión de Usuarios (PLANEADA)
**Objetivo:** Permitir que usuarios gestionen sus historias  
**Duración:** 2 semanas  
**Sprint:** Sprint 6-7  
**Estado:** 📋 Por implementar

#### g) Sistema de Login
- [ ] US-701: Implementar autenticación con JWT
- [ ] US-702: Crear endpoints de registro/login/logout
- [ ] US-703: Integrar middleware de autenticación
- [ ] US-704: Implementar refresh tokens
- [ ] US-705: Agregar autorización basada en roles (futuro)

**Tecnologías propuestas:**
- JWT (jsonwebtoken)
- bcrypt para hashing de passwords
- Passport.js (opcional)

#### h) Gestión de Historias por Usuario
- [ ] US-801: Almacenar relación usuario-historia en BD
- [ ] US-802: Implementar endpoint GET /api/my-stories
- [ ] US-803: Implementar endpoint GET /api/stories/:id
- [ ] US-804: Implementar endpoint DELETE /api/stories/:id
- [ ] US-805: Agregar paginación y filtros
- [ ] US-806: Crear panel de usuario en frontend

**Modelo actualizado:**
```typescript
User {
  id: UUID
  email: String @unique
  password: String // hashed
  name?: String
  stories: Story[]
  createdAt: DateTime
}

Story {
  id: UUID
  userId: UUID
  user: User @relation
  // ... campos existentes
}
```

---

### 🔄 Fase 5: Versionado y Edición (PLANEADA)
**Objetivo:** Permitir iteración sobre historias  
**Duración:** 1 semana  
**Sprint:** Sprint 8  
**Estado:** 📋 Por implementar

#### i) Versionado de Historias
- [ ] US-901: Implementar modelo de versiones en BD
- [ ] US-902: Crear endpoint POST /api/stories/:id/versions
- [ ] US-903: Implementar historial de versiones
- [ ] US-904: Permitir comparación entre versiones
- [ ] US-905: Implementar rollback a versión anterior

---

### 🔄 Fase 6: Generación de Imágenes (PLANEADA)
**Objetivo:** Generar imágenes complementarias para historias  
**Duración:** 2 semanas  
**Sprint:** Sprint 9-10  
**Estado:** 📋 Por implementar

#### j) Generación de Imágenes con IA
- [ ] US-1001: Integrar DALL-E, Stable Diffusion o similar
- [ ] US-1002: Generar prompts de imagen desde historia
- [ ] US-1003: Almacenar imágenes generadas en storage cloud
- [ ] US-1004: Implementar endpoint de generación de imagen
- [ ] US-1005: Agregar opción en frontend

**Tecnologías propuestas:**
- DALL-E API
- Stable Diffusion
- AWS S3 / Cloudinary para storage

---

## 📊 Roadmap de Implementación

```
┌─────────────────────────────────────────────────────────────┐
│                    ROADMAP AUTOSTORY BUILDER                │
└─────────────────────────────────────────────────────────────┘

Sprint 0 (1 semana) - ✅ COMPLETADO
├── Diseño de arquitectura
├── Prototipo en Figma
└── Definición de requisitos

Sprint 1-2 (2 semanas) - ✅ COMPLETADO - FASE 1
├── Frontend React + TypeScript
├── Backend Express + Cohere
├── Generación básica de historias
└── Deploy en Vercel + Render

Sprint 3 (1 semana) - ✅ COMPLETADO - FASE 2
├── Prisma ORM + PostgreSQL
├── Persistencia completa
├── Health checks con BD
└── Documentación técnica

Sprint 4-5 (2 semanas) - 📋 PLANEADO - FASE 3
├── RAG con pgvector
├── Búsqueda semántica
└── Mejora de generación

Sprint 6-7 (2 semanas) - 📋 PLANEADO - FASE 4
├── Autenticación JWT
├── Gestión de usuarios
└── Panel de usuario

Sprint 8 (1 semana) - 📋 PLANEADO - FASE 5
├── Versionado de historias
└── Historial y comparación

Sprint 9-10 (2 semanas) - 📋 PLANEADO - FASE 6
├── Generación de imágenes
└── Storage cloud
```

---

## ✅ Criterios de Aceptación Generales

### Para todas las User Stories:

**Técnicos:**
- [ ] Código cumple con estándares TypeScript strict
- [ ] Tests unitarios escritos y pasando
- [ ] Sin errores de TypeScript en compilación
- [ ] Documentación actualizada
- [ ] Code review completado

**Funcionales:**
- [ ] Funcionalidad probada en dev y staging
- [ ] Manejo de errores implementado
- [ ] Logging apropiado agregado
- [ ] Performance aceptable (< 5s respuesta)
- [ ] Accesibilidad (WCAG 2.1 AA para frontend)

**Deploy:**
- [ ] Deploy exitoso en producción
- [ ] Health checks pasando
- [ ] Rollback plan documentado
- [ ] Monitoreo configurado

---

## 📋 Definición de Done (DoD)

Una historia de usuario se considera **DONE** cuando:

### 1. Desarrollo ✅
- [ ] Código implementado según especificación
- [ ] Code review aprobado por al menos 1 peer
- [ ] Sin deuda técnica crítica introducida
- [ ] Refactoring completado si es necesario

### 2. Testing ✅
- [ ] Tests unitarios escritos (coverage > 70%)
- [ ] Tests de integración para endpoints API
- [ ] Tests manuales en dev environment
- [ ] Sin bugs críticos o blockers

### 3. Documentación ✅
- [ ] README actualizado si aplica
- [ ] Comentarios en código complejo
- [ ] API documentada en Postman
- [ ] Changelog actualizado

### 4. Deploy ✅
- [ ] Deploy en staging exitoso
- [ ] Verificación en staging
- [ ] Deploy en producción exitoso
- [ ] Smoke tests en producción pasando

### 5. Cierre ✅
- [ ] Demo al equipo completada
- [ ] Feedback del PO recibido
- [ ] Historia marcada como Done en backlog
- [ ] Métricas de uso iniciales (si aplica)

---

## 📈 Métricas y KPIs

### Métricas Técnicas
- **Tiempo de respuesta API:** < 5 segundos (generación sin RAG)
- **Uptime:** > 99% mensual
- **Error rate:** < 1% de requests
- **Test coverage:** > 70%

### Métricas de Negocio (Futuro)
- Historias generadas por día
- Usuarios activos mensuales
- Tasa de retención
- NPS (Net Promoter Score)

---

## 🔗 Enlaces Importantes

- **Frontend Live:** https://asb-delta.vercel.app/
- **Backend API:** https://nocountry-asb.onrender.com
- **Health Check:** https://nocountry-asb.onrender.com/health
- **API Docs (Postman):** https://documenter.getpostman.com/view/22674808/2sB3dSQUdM
- **Showcase NoCountry:** https://nocountry.tech/simulacion-laboral-noviembre-2025/cmhow54x70027m001tb14gy2k
- **Video Demo:** https://youtu.be/SE1MXLYM3hc
- **Figma Design:** https://www.figma.com/design/rzP9Zo2JxkZAshv80Vm6Rd/Auto-story

---

## 📞 Contacto del Equipo

**Favian Medina** (Bolivia) - Full Stack Developer
- 📧 favian.medina.gemio@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/favian-medina-gemio)
- 🌐 [Portfolio](https://favian-medina-cv.vercel.app)
- 📱 [WhatsApp](https://wa.me/59167023053)

---

**Última revisión:** Diciembre 2024  
**Versión del documento:** 1.0  
**Estado del proyecto:** Fase 2 Completada ✅

---

© 2025 NoCountry - S11-25-Equipo 06