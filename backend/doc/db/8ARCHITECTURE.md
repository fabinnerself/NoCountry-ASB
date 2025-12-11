# Arquitectura del Backend - Fase 2

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Frontend)                       │
│                    https://asb-delta.vercel.app                  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/REST
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER (Backend)                    │
│                  https://nocountry-asb.onrender.com              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    ROUTES LAYER                           │  │
│  │  • /health (GET) - Health check                          │  │
│  │  • /api/generate-story (POST) - Generar historia         │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                          │
│  ┌────────────────────▼─────────────────────────────────────┐  │
│  │                 CONTROLLERS LAYER                         │  │
│  │  • story.controller.ts                                    │  │
│  │    - Validación de inputs                                 │  │
│  │    - Orquestación de servicios                            │  │
│  │    - Manejo de respuestas                                 │  │
│  └────────────┬──────────────────────┬──────────────────────┘  │
│               │                      │                          │
│  ┌────────────▼──────────┐  ┌───────▼──────────────────────┐  │
│  │   SERVICES LAYER      │  │   REPOSITORIES LAYER         │  │
│  │                       │  │                              │  │
│  │  StoryGenerator       │  │  StoryRepository             │  │
│  │  Service              │  │  • create()                  │  │
│  │  • generate()         │  │  • findById()                │  │
│  │                       │  │  • findAll()                 │  │
│  └────────────┬──────────┘  │  • update()                  │  │
│               │              │  • delete()                  │  │
│               │              │  • count()                   │  │
│               │              └───────┬──────────────────────┘  │
│               │                      │                          │
│  ┌────────────▼──────────┐  ┌───────▼──────────────────────┐  │
│  │   EXTERNAL API        │  │   DATABASE CLIENT            │  │
│  │                       │  │                              │  │
│  │  Cohere API           │  │  Prisma Client (Singleton)   │  │
│  │  • Text Generation    │  │  • Connection pooling        │  │
│  │  • Model: command     │  │  • Query builder             │  │
│  └───────────────────────┘  │  • Type-safe operations      │  │
│                              └───────┬──────────────────────┘  │
└──────────────────────────────────────┼──────────────────────────┘
                                       │ SQL
                                       ▼
                    ┌──────────────────────────────────┐
                    │      POSTGRESQL DATABASE         │
                    │      (NeonTech Cloud)            │
                    │                                  │
                    │  Table: stories                  │
                    │  • id (UUID)                     │
                    │  • tone                          │
                    │  • format                        │
                    │  • text                          │
                    │  • image                         │
                    │  • generatedStory                │
                    │  • idUsuario                     │
                    │  • createdAt                     │
                    │  • updatedAt                     │
                    │  • version                       │
                    │  • errorMessage                  │
                    └──────────────────────────────────┘
```

## Flujo de Datos

### 1. Generación de Historia Exitosa

```
1. Cliente → POST /api/generate-story
   {
     "tone": "inspiracional",
     "format": "redes sociales",
     "text": "Un dragón en las montañas"
   }

2. Controller → Validación de inputs
   ✓ tone válido
   ✓ format válido

3. Controller → StoryGeneratorService.generate()
   → Cohere API
   ← Historia generada

4. Controller → StoryRepository.create()
   → Prisma Client
   → PostgreSQL
   ← Registro insertado

5. Controller → Cliente
   {
     "success": true,
     "story": "Historia generada...",
     "validation": {
       "input": "ok",
       "generation": "ok",
       "db": "ok"
     }
   }
```

### 2. Generación con Error de BD (Degradación Elegante)

```
1-3. [Igual que flujo exitoso]

4. Controller → StoryRepository.create()
   → Prisma Client
   → PostgreSQL
   ✗ Error de conexión

5. Controller → Log error
   → Winston Logger

6. Controller → Cliente
   {
     "success": true,
     "story": "Historia generada...",
     "validation": {
       "input": "ok",
       "generation": "ok",
       "db": "error",
       "message": "Error al guardar historia en base de datos"
     }
   }
```

## Capas de la Arquitectura

### 1. Routes Layer (Enrutamiento)

**Responsabilidad**: Definir endpoints y mapear a controllers

**Archivos**:
- `src/routes/health.routes.ts`
- `src/routes/story.routes.ts`

**Ejemplo**:
```typescript
router.post('/generate-story', upload.single('image'), generateStory);
```

### 2. Controllers Layer (Controladores)

**Responsabilidad**: 
- Validar inputs
- Orquestar servicios
- Manejar respuestas y errores

**Archivos**:
- `src/controllers/story.controller.ts`

**Ejemplo**:
```typescript
export const generateStory = async (req: Request, res: Response) => {
  // Validación
  // Generación con IA
  // Persistencia en BD
  // Respuesta
};
```

### 3. Services Layer (Servicios)

**Responsabilidad**: Lógica de negocio y llamadas a APIs externas

**Archivos**:
- `src/services/storyGenerator.service.ts`

**Ejemplo**:
```typescript
class StoryGeneratorService {
  async generate(input: GenerateStoryInput): Promise<string> {
    // Llamada a Cohere API
  }
}
```

### 4. Repositories Layer (Repositorios)

**Responsabilidad**: Acceso a datos y operaciones CRUD

**Archivos**:
- `src/repositories/story.repository.ts`

**Ejemplo**:
```typescript
class StoryRepository {
  async create(data: CreateStoryDTO): Promise<StoryResponse> {
    // Operación con Prisma
  }
}
```

### 5. Database Layer (Base de Datos)

**Responsabilidad**: Gestión de conexión y cliente Prisma

**Archivos**:
- `src/config/database.ts`

**Ejemplo**:
```typescript
class DatabaseClient {
  static getInstance(): PrismaClient {
    // Singleton pattern
  }
}
```

## Patrones de Diseño

### 1. Singleton Pattern

**Uso**: Cliente Prisma

**Beneficio**: Una sola instancia de conexión a BD

```typescript
class DatabaseClient {
  private static instance: PrismaClient;
  
  static getInstance(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient();
    }
    return this.instance;
  }
}
```

### 2. Repository Pattern

**Uso**: Acceso a datos

**Beneficio**: Abstracción de la capa de datos

```typescript
class StoryRepository {
  async create(data: CreateStoryDTO): Promise<StoryResponse> {
    // Implementación con Prisma
  }
}
```

### 3. Service Layer Pattern

**Uso**: Lógica de negocio

**Beneficio**: Separación de responsabilidades

```typescript
class StoryGeneratorService {
  async generate(input: GenerateStoryInput): Promise<string> {
    // Lógica de generación
  }
}
```

### 4. DTO Pattern

**Uso**: Transferencia de datos

**Beneficio**: Type-safety y validación

```typescript
interface CreateStoryDTO {
  tone: string;
  format: string;
  text?: string;
  // ...
}
```

## Manejo de Errores

### Jerarquía de Errores

```
Error
├── DatabaseError
│   ├── ConnectionError
│   ├── TimeoutError
│   ├── ConstraintViolationError
│   ├── QueryError
│   └── TransactionError
└── ApplicationError
    ├── ValidationError
    └── GenerationError
```

### Error Handler

```typescript
class DatabaseErrorHandler {
  static handle(error: unknown): DatabaseError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Manejar errores conocidos
    }
    // ...
  }
}
```

## Logging

### Niveles de Log

```
DEBUG → INFO → WARN → ERROR
```

### Configuración por Ambiente

```typescript
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  // ...
});
```

### Eventos Loggeados

- Requests HTTP
- Queries SQL (desarrollo)
- Errores de BD
- Errores de aplicación
- Métricas de performance

## Seguridad

### 1. Variables de Entorno

```env
DATABASE_URL=postgresql://...
COHERE_API_KEY=...
```

### 2. CORS

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### 3. Validación de Inputs

```typescript
if (!tone || !format) {
  return res.status(400).json({ error: '...' });
}
```

### 4. Sanitización

Prisma maneja automáticamente SQL injection prevention.

## Performance

### 1. Connection Pooling

Prisma maneja automáticamente el pool de conexiones.

### 2. Índices en BD

```prisma
model Story {
  // ...
  @@index([createdAt])
  @@index([idUsuario])
}
```

### 3. Paginación

```typescript
const stories = await prisma.story.findMany({
  skip: page * pageSize,
  take: pageSize
});
```

## Escalabilidad

### Horizontal Scaling

- Múltiples instancias en Render
- Load balancer automático
- Stateless design

### Vertical Scaling

- Aumentar recursos de servidor
- Optimizar queries
- Caching (futuro)

## Monitoreo

### Health Check

```
GET /health
→ {
    "status": "ok",
    "version": "fase2",
    "database": "connected"
  }
```

### Métricas

- Tiempo de respuesta
- Tasa de errores
- Estado de BD
- Uso de recursos

## Deployment

### Ambientes

1. **Local**: PostgreSQL local
2. **Cloud Dev**: NeonTech
3. **Producción**: Render + NeonTech

### CI/CD

```
GitHub → Push → Render → Build → Deploy
```

### Build Process

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
npm start
```

## Futuras Mejoras

### Fase 3

- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] Caching con Redis
- [ ] WebSockets para real-time
- [ ] Microservicios
- [ ] GraphQL API

---

**Versión**: 2.0.0  
**Última actualización**: Diciembre 2024
