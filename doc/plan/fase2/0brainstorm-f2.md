# Brainstorm - Fase 2: Persistencia en Base de Datos

## 📌 Contexto del Proyecto

### Antecedentes
- **Código funcional** de frontend y backend testeado localmente y en producción
  - Frontend: Desplegado en Vercel
  - Backend: Desplegado en Render
- **Fase 0**: Planificación inicial → `C:\nocountry\4\doc\plan\fase0`
- **Fase 1**: Implementación base → `C:\nocountry\4\doc\plan\fase1`

### Principio Fundamental
**NO desarrollar desde cero**. Implementar sobre el código actual utilizando:
- Metodología TDD (Test-Driven Development)
- Persistencia en base de datos PostgreSQL
- Estructura de BD definida en `C:\nocountry\4\doc\plan\fase2\db_struct.sql`

---

## 🎯 Objetivo General - Fase 2

Desarrollar y validar la funcionalidad de **persistencia en base de datos** para el endpoint `/api/generate-story`, almacenando:
- Las 4 variables de entrada (tone, format, text, image)
- Información generada (texto de la historia)
- Metadatos del sistema (id_usuario, created_at, updated_at, versión)
- Mensajes de error (si corresponde)

### Estrategia de Implementación por Subfases

#### Subfase 2.1: Desarrollo Local con PostgreSQL
**Objetivo**: Implementar y validar la persistencia en entorno local

**Actividades**:
- Instalar y configurar PostgreSQL local
- Configurar credenciales en `.env` (DATABASE_URL local)
- Implementar schema de Prisma basado en `db_struct.sql`
- Desarrollar lógica de persistencia con TDD
- Ejecutar suite completa de tests locales
- Validar operaciones CRUD en BD local

**Criterios de Salida**:
- ✅ Tests unitarios y de integración al 100%
- ✅ Cobertura de código ≥80%
- ✅ Endpoint funcional con persistencia local
- ✅ Documentación técnica completada

---

#### Subfase 2.2: Integración con NeonTech (PostgreSQL Cloud)
**Objetivo**: Migrar y validar la persistencia en base de datos en la nube

**Actividades**:
- Crear proyecto en NeonTech Console
- Obtener credenciales de conexión (DATABASE_URL cloud)
- Configurar variables de entorno para NeonTech
- Ejecutar migraciones de Prisma en BD cloud
- Probar conexión local → NeonTech
- Validar operaciones de lectura/escritura en cloud
- Ejecutar tests de integración contra NeonTech
- Verificar latencia y performance

**Criterios de Salida**:
- ✅ Conexión estable con NeonTech
- ✅ Migraciones aplicadas correctamente
- ✅ Tests de integración exitosos
- ✅ Performance aceptable (< 500ms por operación)

---

#### Subfase 2.3: Deployment en Render + Validación End-to-End
**Objetivo**: Desplegar backend en Render y validar integración completa Render ↔ NeonTech

**Actividades**:
- Actualizar configuración de Render (render.yaml)
- Configurar variables de entorno en Render Dashboard:
  - `DATABASE_URL` (NeonTech)
  - `COHERE_API_KEY`
  - `FRONTEND_URL`
  - `NODE_ENV=production`
- Desplegar nueva versión en Render
- Validar health check endpoint (debe incluir `version: "fase2"`)
- Ejecutar tests E2E contra Render + NeonTech
- Probar flujo completo: Frontend (Vercel) → Backend (Render) → BD (NeonTech)
- Validar logs y monitoreo en Render
- Verificar persistencia de datos en NeonTech Console

**Pruebas de Validación**:
1. **Health Check**: `GET https://tu-backend.onrender.com/health`
2. **Generación de Historia**: `POST https://tu-backend.onrender.com/api/generate-story`
3. **Verificación en BD**: Consultar tabla `stories` en NeonTech Console
4. **Integración Frontend**: Probar desde UI en Vercel

**Criterios de Salida**:
- ✅ Backend desplegado y operativo en Render
- ✅ Conexión estable Render → NeonTech
- ✅ Endpoint `/api/generate-story` funcional en producción
- ✅ Datos persistiendo correctamente en NeonTech
- ✅ Frontend (Vercel) integrado con backend (Render)
- ✅ Logs sin errores críticos
- ✅ Tiempo de respuesta < 3 segundos

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

#### Backend
- **Runtime**: Node.js con Express (código base existente)
- **Base de Datos**: PostgreSQL + extensión pgvector
- **ORM**: Prisma
- **Testing**: Jest/Mocha (TDD)
- **Deployment**: Render

#### Frontend
- **Core**: React v18+ con Vite
- **Estilos**: Tailwind CSS
- **Componentes UI**: Radix UI
- **Iconos**: Lucide React
- **Formularios**: React Hook Form
- **Gráficos**: Recharts
- **Notificaciones**: Sonner
- **Temas**: Next Themes
- **Deployment**: Vercel

#### Inteligencia Artificial
- **Proveedor**: Cohere API
- **Dashboard**: https://dashboard.cohere.com/playground/chat
- **Configuración**: API Key en `.env` → `COHERE_API_KEY`

---

## 📋 Especificación del Endpoint

### POST /api/generate-story

#### Input JSON
```json
{
  "tone": "INSPIRACIONAL" | "EDUCATIVO" | "TÉCNICO",
  "format": "HISTORIA" | "POST" | "REDES_SOCIALES" | "OTRO",
  "text": "string (min 20, max 1000 chars)",
  "image": "JPG | PNG | WEBP (< 10 MB)"
}
```

#### Output JSON
```json
{
  "success": "ok",
  "generatedStory": "string (historia generada)",
  "validation": {
    "tone": "ok" | "error",
    "format": "ok" | "error",
    "text": "ok" | "error",
    "image": "ok" | "error",
    "db": "ok" | "error"
  },
  "metadata": {
    "wordCount": 95,
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "generatedAt": "2025-12-09T02:13:27.227Z",
    "model": "command-r-plus"
  }
}
```

---

## 🔐 Variables de Entorno

### Archivo .env
```env
# ============================================
# SERVER CONFIGURATION
# ============================================
PORT=8000

# ============================================
# DATABASE CONFIGURATION
# ============================================
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/autostory_db?schema=public"

# ============================================
# API KEYS
# ============================================
COHERE_API_KEY="***************************"

# ============================================
# CORS - FRONTEND URLS
# ============================================
FRONTEND_URL_LOCAL="http://localhost:5173"
FRONTEND_URL="https://tu-frontend.vercel.app"

# ============================================
# ENVIRONMENT
# ============================================
NODE_ENV="development"

# ============================================
# PUERTOS - GUÍA RÁPIDA
# ============================================
# Backend API:     http://localhost:8000
# PostgreSQL:      localhost:5432
# Frontend (Vite): http://localhost:5173
# ============================================
```

---

## ✅ Validaciones y Reglas de Negocio

### Campos Requeridos
- `tone` (obligatorio)
- `format` (obligatorio)
- `text` (obligatorio)
- `image` (opcional)

### Dominios Válidos

#### Tone (Tono)
- `INSPIRACIONAL`
- `EDUCATIVO`
- `TÉCNICO`

#### Format (Formato)
- `HISTORIA`
- `POST`
- `REDES_SOCIALES`
- `OTRO`

#### Text (Texto)
- Longitud mínima: 20 caracteres
- Longitud máxima: 1000 caracteres

#### Image (Imagen)
- Formatos válidos: JPG, PNG, WEBP
- Tamaño máximo: 10 MB

### Mensajes de Error

#### Errores de Validación (Mantener de Fase 1)
- **Tono inválido**: `"Valor de tone no válido: [valor recibido]. Valores permitidos: INSPIRACIONAL, EDUCATIVO, TÉCNICO"`
- **Formato inválido**: `"Valor de format no válido: [valor recibido]. Valores permitidos: HISTORIA, POST, REDES_SOCIALES, OTRO"`
- **Texto inválido**: `"El texto debe tener entre 20 y 1000 caracteres. Recibido: [longitud]"`

#### Errores de Base de Datos (Nuevos en Fase 2)
- **Error de conexión**: `"Error de conexión con base de datos. Verifique la configuración de DATABASE_URL"`
- **Error de persistencia**: `"Error al guardar historia en base de datos. Código: [DB_ERROR_CODE]"`
- **Error de constraint**: `"Violación de restricción de base de datos: [CONSTRAINT_NAME]"`
- **Timeout de BD**: `"Tiempo de espera agotado al conectar con base de datos"`
- **Error de transacción**: `"Error al ejecutar transacción. Los cambios fueron revertidos"`

### Validación de Output
- **Longitud**: 80-120 palabras
- **Estructura**: Gancho → Desarrollo → Cierre inspirador
- **Llamado a la acción**: Incluir para formatos de redes sociales

---

## 🔧 Implementación - Pasos Clave

### 1. Configuración de Prisma
- actalizar endpoint health a parte de actuales campos añadir, version:"fase2"
- Definir schema basado en `db_struct.sql`
- Configurar conexión a PostgreSQL
- Generar cliente Prisma

### 2. Adaptación del Endpoint Actual
- Mantener validaciones existentes de Fase 1
- Agregar lógica de persistencia en tabla `stories`
- Implementar manejo de errores de BD

### 3. Datos a Persistir en Tabla "stories"
- **Variables de entrada**: tone, format, text, image
- **Texto generado**: Historia completa generada por IA
- **Metadatos del sistema**:
  - `id_usuario` (constante por ahora)
  - `created_at` (timestamp de creación)
  - `updated_at` (timestamp de actualización)
  - `version` (número de versión)
- **Mensajes de error**: Si corresponde

### 4. Testing con TDD
- Escribir tests antes del código
- Diferenciar tests de BD de tests anteriores
- Comando sugerido: `npm run test:db`

---

## 📁 Organización de Archivos

### Estructura de Directorios
```
backend/
├── tests/
│   └── db/              # Tests específicos de base de datos
├── doc/
│   └── db/              # Documentación de Fase 2
│       └── postman/     # Colección Postman para pruebas
├── prisma/
│   └── schema.prisma    # Schema de Prisma
└── README.md            # Actualizar con info de Fase 2
```

### Archivos a Crear/Modificar
- **Tests**: `backend/tests/db/` (nuevos tests de BD)
- **Documentación**: `backend/doc/db/` (docs de Fase 2)
- **Postman**: Archivo JSON para importar y probar funcionalidad de bd
- **README**: `backend/README.md` (mantener info de fases anteriores + Fase 2)

---

## 🐛 Testing y Debugging

### Testing Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 3. Configurar Prisma
npx prisma generate
npx prisma migrate dev

# 4. Ejecutar tests específicos de base de datos
npm run test:db

# 5. Ejecutar suite completa de tests
npm test

# 6. Generar reporte de cobertura de tests de BD
npm run test:coverage-db

# 7. Iniciar servidor de desarrollo
npm run dev
```

### Estrategia de Testing

#### Test Suites por Tipo dierenciados para fase 2
- **Tests Unitarios**: `npm run test:unit-db`
  - Validaciones de entrada
  - Transformaciones de datos
  - Funciones auxiliares
  
- **Tests de Integración**: `npm run test:integration-db`
  - Integración con Prisma ORM
  - Operaciones CRUD en BD
  - Transacciones y rollbacks
  
- **Tests End-to-End**: `npm run test:e2e-db`
  - Flujo completo del endpoint
  - Validación de persistencia
  - Respuestas del API

#### Tests Específicos de Base de Datos
```bash
# Ejecutar solo tests de BD
npm run test:db

# Generar reporte de cobertura
npm run test:coverage-db
```

**Cobertura Objetivo**: ≥80% en todos los módulos de persistencia

#### Configuración de Scripts en package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=tests/unit",
    "test:integration": "jest --testPathPattern=tests/integration",
    "test:e2e": "jest --testPathPattern=tests/e2e",
    "test:db": "jest --testPathPattern=tests/db",
    "test:coverage-db": "jest --testPathPattern=tests/db --coverage",
    "test:watch": "jest --watch"
  }
}
```

### Prueba Manual del Endpoint

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "text": "Joven de comunidad rural accedió a programa de becas tecnológicas. Superó barreras de conectividad y hoy trabaja como desarrollador remoto, ayudando a su familia."
  }'
```

### Checklist de Validación Manual
1. ✅ Verificar que el resultado se graba en tabla `stories` de BD
2. ✅ Confirmar que la operación de grabado fue exitosa
3. ✅ Verificar que el formato de respuesta es apropiado
4. ✅ Validar que los datos persisten correctamente

---

## ✅ Criterios de Aceptación (Definition of Done)

- [ ] Tests unitarios pasan al 100%
- [ ] Tests de BD diferenciados de tests anteriores (ej: `npm run test:db`)
- [ ] Endpoint responde correctamente y graba información en BD
- [ ] Manejo de errores implementado con mensajes claros
- [ ] Documentación API actualizada
- [ ] Código integrado con backend/frontend existente
- [ ] Variables de entorno configuradas correctamente
- [ ] Schema Prisma definido y funcional
- [ ] Estructura de BD probada y operativa
- [ ] Validaciones de input funcionando (mantienen funcionalidad de Fase 1)
- [ ] Validaciones de output implementadas
- [ ] Archivo JSON Postman creado en `./doc/db/`
- [ ] Tests ubicados en `backend/tests/db/`
- [ ] Documentación ubicada en `backend/doc/db/`
- [ ] `backend/README.md` actualizado con consideraciones de Fase 2
- [ ] Configuración Docker actualizada si corresponde:
  - `Dockerfile`
  - `render.yaml`
  - `backend/docker-compose.yml`
  - `backend/Dockerfile`

---

## 🔄 Evolución del Contrato API

### Fase 1 (Completada)
**Input**: `tone`, `format`, `text`, `image`  
**Output**: `success`, `generatedStory`, `validation`, `metadata`

### Fase 2 (Actual)
**Nuevo**: Persistencia en BD de todas las variables + metadatos  
**Output adicional**: Confirmación de grabado en `validation.db`

### Fase 3 (Futura)
**Input adicional**: `idUser`, `status` ("GENERAR" | "REGENERAR" | "EDITAR")  
**Output adicional**: `id_story` (UUID), versionado de historias

### Fase 4+ (Futura)
- RAG: Búsqueda semántica de historias similares
- Análisis de imagen con IA
- Panel de edición interactivo
- Exportación en múltiples formatos

---

## 🚀 Próximos Pasos (Post Fase 2)

Una vez validada la Fase 2, preparar para:
- **Versionado**: Implementar sistema de versiones de historias generadas
- **Gestión de usuarios**: Sistema de autenticación y autorización
- **Historial**: Consulta de historias generadas por usuario
- **Edición**: Capacidad de regenerar y editar historias existentes

---

## 📚 Recursos y Referencias

### Documentación Técnica
- [Cohere API Docs](https://docs.cohere.com/)
- [Prisma + PostgreSQL](https://www.prisma.io/docs/concepts/components/prisma-client/databases/postgresql)
- [pgvector Extension](https://github.com/pgvector/pgvector)

### Código Base y Planificación
- **Código base Fase 1**: `C:\nocountry\4\`
- **Planificación**: `C:\nocountry\4\doc\plan\`
- **Estructura de BD**: `C:\nocountry\4\doc\plan\fase2\db_struct.sql`
- **Descripción general**: `C:\nocountry\4\doc\plan\desc_gral_proy_auto_store-builder.txt`

---

## 📝 Notas de Implementación

### Principios de Desarrollo
- ✅ **TDD First**: Escribir tests antes del código
- ✅ **Código Base**: Usar código funcional existente como base
- ✅ **No modificar Frontend**: Mantener frontend sin cambios en esta fase
- ✅ **Modularidad**: Mantener funciones modulares para fácil integración
- ✅ **Documentación**: Documentar decisiones técnicas importantes
- ✅ **Commits Atómicos**: Un commit por funcionalidad
- ✅ **Consistencia**: Variables en inglés (código), español (documentación)

### Consideraciones de Deployment
- Revisar y actualizar configuración Docker si es necesario
- Validar que las variables de entorno estén correctamente configuradas en Render
- Probar conexión a base de datos en ambiente de producción (NeonTech)

---

## 🎯 Objetivo Final del Proyecto

Desarrollar **AutoStory Builder** completo según definición en `desc_gral_proy_auto_store-builder.txt`:

Sistema de IA para generar historias visuales y textuales a partir de inputs multimedia, con:
- Panel de edición interactivo
- Exportación en múltiples formatos
- RAG (Retrieval-Augmented Generation) en supabase si se ve cnveniente
- Análisis de imágenes con IA
- Gestión de versiones y historial
