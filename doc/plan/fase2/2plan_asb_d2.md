# Plan Técnico - Fase 2: Persistencia en Base de Datos

## 1. Overview

Este plan técnico detalla la implementación de persistencia en base de datos para AutoStory Builder Fase 2. El objetivo es extender el endpoint existente `/api/generate-story` para almacenar todas las historias generadas en PostgreSQL, manteniendo compatibilidad total con la Fase 1 y preparando el sistema para futuras funcionalidades de historial, versionado y análisis.

**Principios de Diseño:**
- Extensión no invasiva del código existente
- Degradación elegante ante fallos de BD
- Compatibilidad 100% con Fase 1
- Testing exhaustivo con TDD
- Deployment progresivo (local → cloud → producción)

## 2. Stack Tecnológico

### 2.1 Base de Datos

**PostgreSQL 15+**
- Motor de base de datos relacional
- Soporte nativo para UUID
- Transacciones ACID
- Excelente rendimiento para operaciones de escritura

**Proveedor Cloud: NeonTech**
- PostgreSQL serverless
- Escalado automático
- Backup automático
- Free tier disponible para desarrollo
- URL de conexión: `postgresql://[user]:[password]@[host]/[database]?sslmode=require`

### 2.2 ORM y Herramientas

**Prisma ORM 5.x**
- Type-safe database client para TypeScript
- Migraciones automáticas
- Query builder intuitivo
- Introspección de schema
- Prisma Studio para administración visual

**Dependencias:**
```json
{
  "dependencies": {
    "@prisma/client": "^5.7.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0"
  }
}
```

### 2.3 Testing

**Jest 29.x** (ya existente)
- Framework de testing principal
- Soporte para mocks y spies
- Coverage reporting

**Supertest 6.x** (ya existente)
- Testing de endpoints HTTP
- Integración con Express

**@faker-js/faker 8.x** (nuevo)
- Generación de datos de prueba
- Datos realistas para tests

## 3. Arquitectura de Persistencia

### 3.1 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                    Express App                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Story Controller                           │
│  - Recibe request                                       │
│  - Valida inputs                                        │
│  - Orquesta servicios                                   │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
┌──────────────────────┐      ┌──────────────────────┐
│  Story Generator     │      │  Story Repository    │
│  Service             │      │  (Nuevo)             │
│  - Genera historia   │      │  - CRUD operations   │
│  - Llama Cohere API  │      │  - Prisma client     │
└──────────────────────┘      └──────────────────────┘
                                        │
                                        ▼
                              ┌──────────────────────┐
                              │   Prisma Client      │
                              │   - Type-safe ORM    │
                              └──────────────────────┘
                                        │
                                        ▼
                              ┌──────────────────────┐
                              │   PostgreSQL DB      │
                              │   - stories table    │
                              └──────────────────────┘
```

### 3.2 Flujo de Datos

**Flujo Exitoso:**
```
1. Request → Controller
2. Controller → Validación de inputs
3. Controller → StoryGeneratorService.generate()
4. StoryGeneratorService → Cohere API
5. Cohere API → Historia generada
6. Controller → StoryRepository.create()
7. StoryRepository → Prisma Client
8. Prisma Client → PostgreSQL
9. PostgreSQL → Registro insertado
10. Controller → Response con validation.db: "ok"
```

**Flujo con Error de BD:**
```
1-5. [Igual que flujo exitoso]
6. Controller → StoryRepository.create()
7. StoryRepository → Error de conexión/inserción
8. Controller → Log error
9. Controller → Response con validation.db: "error" + mensaje
10. Usuario recibe historia pero con advertencia de BD
```

## 4. Schema de Base de Datos

### 4.1 Prisma Schema

**Ubicación:** `backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Story {
  id             String   @id @default(uuid()) @db.Uuid
  tone           String   @db.VarChar(50)
  format         String   @db.VarChar(50)
  text           String?  @db.Text
  image          String?  @db.Text
  generatedStory String   @db.Text
  id_usuario     String?  @db.VarChar(100)
  created_at     DateTime @default(now()) @db.Timestamptz
  updated_at     DateTime @updatedAt @db.Timestamptz
  version        String   @default("fase2") @db.VarChar(20)
  error_message  String?  @db.Text

  @@map("stories")
  @@index([created_at])
  @@index([id_usuario])
}
```

### 4.2 Tipos de Datos

| Campo | Tipo PostgreSQL | Tipo TypeScript | Descripción |
|-------|----------------|-----------------|-------------|
| id | UUID | string | Identificador único |
| tone | VARCHAR(50) | string | Tono de la historia |
| format | VARCHAR(50) | string | Formato de la historia |
| text | TEXT | string \| null | Texto de entrada del usuario |
| image | TEXT | string \| null | Metadata/referencia de imagen |
| generatedStory | TEXT | string | Historia generada por IA |
| id_usuario | VARCHAR(100) | string \| null | ID del usuario (futuro) |
| created_at | TIMESTAMPTZ | Date | Timestamp de creación |
| updated_at | TIMESTAMPTZ | Date | Timestamp de última actualización |
| version | VARCHAR(20) | string | Versión de la fase |
| error_message | TEXT | string \| null | Mensaje de error si aplica |

### 4.3 Índices

- **Primary Key:** `id` (UUID)
- **Index:** `created_at` - Para consultas ordenadas por fecha
- **Index:** `id_usuario` - Para futuras consultas por usuario

## 5. Componentes de Código

### 5.1 Story Repository

**Ubicación:** `backend/src/repositories/story.repository.ts`

**Responsabilidades:**
- Encapsular todas las operaciones de BD
- Manejar errores de Prisma
- Proporcionar interfaz type-safe

**Métodos:**
```typescript
interface IStoryRepository {
  create(data: CreateStoryDTO): Promise<Story>;
  findById(id: string): Promise<Story | null>;
  findAll(options?: FindOptions): Promise<Story[]>;
  update(id: string, data: UpdateStoryDTO): Promise<Story>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
```

**DTOs:**
```typescript
interface CreateStoryDTO {
  tone: string;
  format: string;
  text?: string;
  image?: string;
  generatedStory: string;
  id_usuario?: string;
  error_message?: string;
}

interface UpdateStoryDTO {
  generatedStory?: string;
  error_message?: string;
}

interface FindOptions {
  skip?: number;
  take?: number;
  orderBy?: 'created_at' | 'updated_at';
  order?: 'asc' | 'desc';
}
```

### 5.2 Prisma Client Singleton

**Ubicación:** `backend/src/config/database.ts`

```typescript
import { PrismaClient } from '@prisma/client';

class DatabaseClient {
  private static instance: PrismaClient;
  
  private constructor() {}
  
  public static getInstance(): PrismaClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' 
          ? ['query', 'error', 'warn'] 
          : ['error'],
      });
    }
    return DatabaseClient.instance;
  }
  
  public static async disconnect(): Promise<void> {
    if (DatabaseClient.instance) {
      await DatabaseClient.instance.$disconnect();
    }
  }
  
  public static async healthCheck(): Promise<boolean> {
    try {
      await DatabaseClient.getInstance().$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default DatabaseClient;
```

### 5.3 Actualización del Controller

**Ubicación:** `backend/src/controllers/story.controller.ts`

**Cambios necesarios:**
```typescript
// Agregar import
import { StoryRepository } from '../repositories/story.repository';

// En el método generateStory:
export const generateStory = async (req: Request, res: Response) => {
  try {
    // ... código existente de validación y generación ...
    
    const generatedStory = await storyGeneratorService.generate(/* ... */);
    
    // NUEVO: Intentar persistir en BD
    let dbValidation = { db: 'ok', message: '' };
    try {
      const storyRepository = new StoryRepository();
      await storyRepository.create({
        tone: req.body.tone,
        format: req.body.format,
        text: req.body.text,
        image: req.file ? req.file.filename : undefined,
        generatedStory: generatedStory,
        id_usuario: req.body.id_usuario,
      });
    } catch (dbError) {
      logger.error('Database persistence error:', dbError);
      dbValidation = {
        db: 'error',
        message: 'Error al guardar historia en base de datos'
      };
    }
    
    // Respuesta con campo adicional
    res.json({
      success: true,
      story: generatedStory,
      validation: {
        ...existingValidation,
        ...dbValidation
      }
    });
    
  } catch (error) {
    // ... manejo de errores existente ...
  }
};
```

### 5.4 Health Check Actualizado

**Ubicación:** `backend/src/routes/health.routes.ts`

```typescript
import DatabaseClient from '../config/database';

router.get('/health', async (req: Request, res: Response) => {
  const dbConnected = await DatabaseClient.healthCheck();
  
  res.json({
    status: 'ok',
    version: 'fase2',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'disconnected',
    services: {
      cohere: 'ok', // Verificar si es necesario
      storage: 'ok'
    }
  });
});
```

## 6. Configuración de Entornos

### 6.1 Variables de Entorno

**Archivo:** `backend/.env`

```bash
# Existentes de Fase 1
NODE_ENV=development
PORT=8000
COHERE_API_KEY=your_cohere_api_key
FRONTEND_URL=http://localhost:3000

# NUEVAS para Fase 2
DATABASE_URL="postgresql://user:password@localhost:5432/autostory?schema=public"

# Para NeonTech (cloud)
# DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/autostory?sslmode=require"
```

**Archivo:** `backend/.env.example`

```bash
NODE_ENV=development
PORT=3000
COHERE_API_KEY=
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/autostory?schema=public
```

### 6.2 Configuración por Ambiente

| Ambiente | DATABASE_URL | Descripción |
|----------|-------------|-------------|
| Local | `postgresql://postgres:postgres@localhost:5432/autostory` | PostgreSQL local |
| Cloud Dev | `postgresql://[user]:[pass]@[neon-host]/autostory?sslmode=require` | NeonTech development |
| Producción | Variable de entorno en Render | NeonTech production |

## 7. Comandos de Prisma

### 7.1 Setup Inicial

```bash
# Instalar Prisma
npm install prisma --save-dev
npm install @prisma/client

# Inicializar Prisma
npx prisma init

# Generar cliente Prisma
npx prisma generate
```

### 7.2 Migraciones

```bash
# Crear migración en desarrollo
npx prisma migrate dev --name init_stories_table

# Aplicar migraciones en producción
npx prisma migrate deploy

# Reset de base de datos (solo desarrollo)
npx prisma migrate reset

# Ver estado de migraciones
npx prisma migrate status
```

### 7.3 Utilidades

```bash
# Abrir Prisma Studio (GUI)
npx prisma studio

# Validar schema
npx prisma validate

# Formatear schema
npx prisma format

# Introspección de BD existente
npx prisma db pull
```

## 8. Estrategia de Testing

### 8.1 Estructura de Tests

```
backend/tests/
├── unit/
│   ├── repositories/
│   │   └── story.repository.test.ts
│   └── services/
│       └── storyGenerator.test.ts (existente)
├── integration/
│   ├── database/
│   │   └── story.crud.test.ts
│   └── api/
│       └── story.routes.test.ts (actualizar)
└── e2e/
    └── story-generation-with-db.e2e.test.ts
```

### 8.2 Test Database Setup

**Archivo:** `backend/prisma/schema.test.prisma`

```prisma
// Mismo schema pero apuntando a BD de test
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_TEST_URL")
}
```

**Setup en tests:**
```typescript
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_TEST_URL
      }
    }
  });
  
  // Limpiar BD de test
  await prisma.story.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.story.deleteMany();
});
```

### 8.3 Scripts de Testing

**Actualizar:** `backend/package.json`

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:db": "jest --testPathPattern=database",
    "test:coverage-db": "jest --coverage --testPathPattern=database",
    "test:e2e": "jest --testPathPattern=e2e",
    "test:integration": "jest --testPathPattern=integration"
  }
}
```

### 8.4 Cobertura de Tests

**Objetivos mínimos:**
- Unit tests: 90% coverage
- Integration tests: 80% coverage
- E2E tests: Flujos críticos completos

**Escenarios a testear:**
1. ✅ Inserción exitosa de historia
2. ✅ Inserción con error de BD
3. ✅ Consulta por ID
4. ✅ Consulta de todas las historias
5. ✅ Paginación
6. ✅ Actualización de historia
7. ✅ Eliminación de historia
8. ✅ Manejo de conexión perdida
9. ✅ Timeout de conexión
10. ✅ Violación de constraints

## 9. Manejo de Errores

### 9.1 Tipos de Errores de BD

```typescript
enum DatabaseErrorType {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  QUERY_ERROR = 'QUERY_ERROR',
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

interface DatabaseError {
  type: DatabaseErrorType;
  message: string;
  code?: string;
  meta?: any;
}
```

### 9.2 Error Handler

**Ubicación:** `backend/src/utils/databaseErrorHandler.ts`

```typescript
import { Prisma } from '@prisma/client';

export class DatabaseErrorHandler {
  static handle(error: unknown): DatabaseError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handleKnownError(error);
    }
    
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return {
        type: DatabaseErrorType.UNKNOWN_ERROR,
        message: 'Error desconocido en base de datos'
      };
    }
    
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return {
        type: DatabaseErrorType.CONNECTION_ERROR,
        message: 'Error de conexión con base de datos'
      };
    }
    
    return {
      type: DatabaseErrorType.UNKNOWN_ERROR,
      message: 'Error inesperado'
    };
  }
  
  private static handleKnownError(
    error: Prisma.PrismaClientKnownRequestError
  ): DatabaseError {
    switch (error.code) {
      case 'P2002':
        return {
          type: DatabaseErrorType.CONSTRAINT_VIOLATION,
          message: 'Violación de restricción única',
          code: error.code,
          meta: error.meta
        };
      case 'P2025':
        return {
          type: DatabaseErrorType.QUERY_ERROR,
          message: 'Registro no encontrado',
          code: error.code
        };
      // ... más casos
      default:
        return {
          type: DatabaseErrorType.QUERY_ERROR,
          message: error.message,
          code: error.code
        };
    }
  }
}
```

### 9.3 Mensajes de Error Estandarizados

```typescript
export const DB_ERROR_MESSAGES = {
  CONNECTION_FAILED: 'Error de conexión con base de datos. Verifique la configuración de DATABASE_URL',
  TIMEOUT: 'Tiempo de espera agotado al conectar con base de datos',
  SAVE_FAILED: 'Error al guardar historia en base de datos',
  CONSTRAINT_VIOLATION: 'Violación de restricción de base de datos',
  TRANSACTION_FAILED: 'Error al ejecutar transacción. Los cambios fueron revertidos',
  NOT_FOUND: 'Registro no encontrado en base de datos'
};
```

## 10. Deployment

### 10.1 Checklist de Deployment

**Pre-deployment:**
- [ ] Tests pasando al 100%
- [ ] Migraciones creadas y validadas
- [ ] Variables de entorno configuradas
- [ ] Documentación actualizada
- [ ] Postman collection actualizada

**Deployment Local:**
1. Instalar PostgreSQL local
2. Crear base de datos `autostory`
3. Configurar DATABASE_URL en `.env`
4. Ejecutar `npx prisma migrate dev`
5. Ejecutar `npm run test:db`
6. Iniciar servidor y probar endpoint

**Deployment Cloud (NeonTech):**
1. Crear proyecto en NeonTech
2. Copiar DATABASE_URL
3. Configurar en `.env`
4. Ejecutar `npx prisma migrate deploy`
5. Verificar tablas en Prisma Studio
6. Ejecutar tests de integración

**Deployment Producción (Render):**
1. Configurar DATABASE_URL en Render Dashboard
2. Agregar build command: `npm install && npx prisma generate && npx prisma migrate deploy`
3. Deploy automático desde GitHub
4. Verificar health check
5. Probar endpoint con Postman

### 10.2 Scripts de Deployment

**Archivo:** `backend/scripts/deploy.sh`

```bash
#!/bin/bash

echo "🚀 Iniciando deployment..."

# Generar cliente Prisma
echo "📦 Generando Prisma Client..."
npx prisma generate

# Ejecutar migraciones
echo "🗄️  Ejecutando migraciones..."
npx prisma migrate deploy

# Build de TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

echo "✅ Deployment completado"
```

### 10.3 Configuración de Render

**render.yaml:**
```yaml
services:
  - type: web
    name: autostory-backend
    env: node
    buildCommand: npm install && npx prisma generate && npx prisma migrate deploy && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false  # Configurar manualmente en dashboard
      - key: COHERE_API_KEY
        sync: false
```

## 11. Monitoreo y Logging

### 11.1 Logs de Base de Datos

```typescript
// En DatabaseClient
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
});

prisma.$on('query', (e) => {
  logger.debug('Query:', {
    query: e.query,
    params: e.params,
    duration: e.duration
  });
});

prisma.$on('error', (e) => {
  logger.error('Database error:', e);
});
```

### 11.2 Métricas a Monitorear

- Tiempo de respuesta de queries
- Número de conexiones activas
- Errores de BD por minuto
- Tasa de éxito de persistencia
- Latencia de conexión

## 12. Documentación

### 12.1 Estructura de Documentación

```
backend/doc/db/
├── README.md                    # Overview de persistencia
├── SETUP.md                     # Guía de configuración
├── PRISMA_GUIDE.md             # Guía de Prisma
├── TROUBLESHOOTING.md          # Solución de problemas
├── API_EXAMPLES.md             # Ejemplos de uso
└── postman/
    └── autostory-fase2.postman_collection.json
```

### 12.2 Actualización del README Principal

**Agregar sección en:** `backend/README.md`

```markdown
## Fase 2: Persistencia en Base de Datos

### Configuración de Base de Datos

1. Instalar PostgreSQL o usar NeonTech
2. Configurar DATABASE_URL en `.env`
3. Ejecutar migraciones: `npx prisma migrate dev`
4. Verificar conexión: `npx prisma studio`

### Comandos Prisma

- `npx prisma generate` - Generar cliente
- `npx prisma migrate dev` - Crear migración
- `npx prisma studio` - Abrir GUI
- `npx prisma db push` - Sincronizar schema

### Testing de BD

```bash
npm run test:db           # Tests de BD
npm run test:coverage-db  # Coverage de BD
```

Ver documentación completa en `doc/db/README.md`
```

## 13. Quick Start Guide

### 13.1 Setup Rápido Local

```bash
# 1. Clonar repositorio
git clone [repo-url]
cd backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL

# 4. Setup de Prisma
npx prisma generate
npx prisma migrate dev --name init

# 5. Verificar conexión
npx prisma studio

# 6. Ejecutar tests
npm run test:db

# 7. Iniciar servidor
npm run dev
```

### 13.2 Verificación de Funcionamiento

```bash
# Health check
curl http://localhost:8000/health

# Generar historia (sin imagen)
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "aventura",
    "format": "cuento",
    "text": "Un dragón en las montañas"
  }'

# Verificar en BD
npx prisma studio
# Navegar a tabla "stories" y verificar registro
```

## 14. Consideraciones de Seguridad

### 14.1 Seguridad de Conexión

- ✅ Usar SSL/TLS para conexiones a NeonTech (`sslmode=require`)
- ✅ No commitear `.env` con credenciales reales
- ✅ Rotar credenciales periódicamente
- ✅ Usar variables de entorno en producción
- ✅ Limitar permisos de usuario de BD

### 14.2 Validación de Datos

- ✅ Validar inputs antes de persistir
- ✅ Sanitizar strings para prevenir SQL injection (Prisma lo hace automáticamente)
- ✅ Limitar tamaño de campos TEXT
- ✅ Validar UUIDs antes de queries

### 14.3 Rate Limiting

```typescript
// Considerar para futuras fases
import rateLimit from 'express-rate-limit';

const dbRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por ventana
  message: 'Demasiadas peticiones, intente más tarde'
});

app.use('/api/generate-story', dbRateLimiter);
```

## 15. Roadmap y Futuras Mejoras

### 15.1 Fase 3 (Futuro)

- Implementar autenticación de usuarios
- Historial de historias por usuario
- Versionado de historias
- Búsqueda y filtrado avanzado
- Analytics y métricas

### 15.2 Optimizaciones Potenciales

- Connection pooling
- Caching con Redis
- Read replicas para escalado
- Archivado de historias antiguas
- Compresión de campo `generatedStory`

## 16. Referencias y Recursos

### 16.1 Documentación Oficial

- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [NeonTech Docs](https://neon.tech/docs)
- [Jest Testing](https://jestjs.io/docs/getting-started)

### 16.2 Tutoriales Recomendados

- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Testing with Prisma](https://www.prisma.io/docs/guides/testing)

### 16.3 Herramientas

- [Prisma Studio](https://www.prisma.io/studio) - GUI para BD
- [pgAdmin](https://www.pgadmin.org/) - Administración PostgreSQL
- [Postman](https://www.postman.com/) - Testing de APIs
- [DBeaver](https://dbeaver.io/) - Cliente universal de BD

---

**Versión:** 1.0  
**Fecha:** Diciembre 2024  
**Autor:** Equipo AutoStory Builder  
**Estado:** En Desarrollo
