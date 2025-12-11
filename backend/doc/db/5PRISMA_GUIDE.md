# Guía de Prisma ORM

## ¿Qué es Prisma?

Prisma es un ORM (Object-Relational Mapping) moderno para Node.js y TypeScript que proporciona:

- Type-safe database client
- Migraciones automáticas
- Query builder intuitivo
- Introspección de schema
- GUI de administración (Prisma Studio)

## Instalación

```bash
npm install @prisma/client
npm install -D prisma
```

## Comandos Esenciales

### Inicialización

```bash
# Inicializar Prisma (solo primera vez)
npx prisma init

# Esto crea:
# - prisma/schema.prisma
# - .env con DATABASE_URL
```

### Generación de Cliente

```bash
# Generar cliente Prisma basado en schema
npx prisma generate

# Usar en package.json:
npm run prisma:generate
```

**Cuándo ejecutar:**
- Después de cambios en `schema.prisma`
- Después de `git pull` con cambios en schema
- En build de producción

### Migraciones

```bash
# Crear y aplicar migración (desarrollo)
npx prisma migrate dev --name nombre_descriptivo

# Ejemplos:
npx prisma migrate dev --name init_stories_table
npx prisma migrate dev --name add_user_id_field
npx prisma migrate dev --name add_indexes

# Aplicar migraciones (producción)
npx prisma migrate deploy

# Ver estado de migraciones
npx prisma migrate status

# Reset completo (solo desarrollo - CUIDADO!)
npx prisma migrate reset
```

### Prisma Studio

```bash
# Abrir GUI de administración
npx prisma studio

# Se abre en http://localhost:5555
```

Prisma Studio permite:
- Ver datos de todas las tablas
- Crear, editar, eliminar registros
- Ejecutar queries visuales
- Explorar relaciones

### Validación y Formateo

```bash
# Validar schema
npx prisma validate

# Formatear schema
npx prisma format
```

### Introspección

```bash
# Generar schema desde BD existente
npx prisma db pull

# Sincronizar schema con BD (sin migraciones)
npx prisma db push
```

## Schema de Prisma

### Estructura Básica

```prisma
// Generador de cliente
generator client {
  provider = "prisma-client-js"
}

// Configuración de BD
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Modelo (tabla)
model Story {
  id        String   @id @default(uuid()) @db.Uuid
  title     String   @db.VarChar(255)
  content   String   @db.Text
  createdAt DateTime @default(now()) @map("created_at")
  
  @@map("stories")
  @@index([createdAt])
}
```

### Tipos de Datos

| Prisma | PostgreSQL | TypeScript |
|--------|-----------|------------|
| String | TEXT | string |
| Int | INTEGER | number |
| Float | DOUBLE PRECISION | number |
| Boolean | BOOLEAN | boolean |
| DateTime | TIMESTAMP | Date |
| Json | JSONB | object |

### Atributos de Campo

```prisma
model Example {
  // Primary key
  id Int @id @default(autoincrement())
  
  // UUID
  uuid String @id @default(uuid()) @db.Uuid
  
  // Único
  email String @unique
  
  // Opcional
  bio String?
  
  // Default value
  status String @default("active")
  
  // Auto-actualizado
  updatedAt DateTime @updatedAt
  
  // Mapeo de nombre
  firstName String @map("first_name")
}
```

### Atributos de Modelo

```prisma
model User {
  id    Int    @id
  email String @unique
  
  // Mapear nombre de tabla
  @@map("users")
  
  // Índice simple
  @@index([email])
  
  // Índice compuesto
  @@index([firstName, lastName])
  
  // Unique constraint compuesto
  @@unique([email, username])
}
```

## Uso del Cliente Prisma

### Importar Cliente

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
```

### Operaciones CRUD

#### Create

```typescript
// Crear un registro
const story = await prisma.story.create({
  data: {
    tone: 'inspiracional',
    format: 'redes sociales',
    generatedStory: 'Historia...'
  }
});

// Crear múltiples
const stories = await prisma.story.createMany({
  data: [
    { tone: 'inspiracional', format: 'post', generatedStory: '...' },
    { tone: 'educativo', format: 'historia', generatedStory: '...' }
  ]
});
```

#### Read

```typescript
// Buscar por ID
const story = await prisma.story.findUnique({
  where: { id: 'uuid-here' }
});

// Buscar primero que coincida
const story = await prisma.story.findFirst({
  where: { tone: 'inspiracional' }
});

// Buscar todos
const stories = await prisma.story.findMany();

// Con filtros
const stories = await prisma.story.findMany({
  where: {
    tone: 'inspiracional',
    createdAt: {
      gte: new Date('2024-01-01')
    }
  },
  orderBy: {
    createdAt: 'desc'
  },
  take: 10,
  skip: 0
});

// Contar
const count = await prisma.story.count({
  where: { tone: 'inspiracional' }
});
```

#### Update

```typescript
// Actualizar uno
const story = await prisma.story.update({
  where: { id: 'uuid' },
  data: {
    generatedStory: 'Nueva historia...'
  }
});

// Actualizar múltiples
const result = await prisma.story.updateMany({
  where: { tone: 'inspiracional' },
  data: { version: 'fase2' }
});
```

#### Delete

```typescript
// Eliminar uno
await prisma.story.delete({
  where: { id: 'uuid' }
});

// Eliminar múltiples
await prisma.story.deleteMany({
  where: { tone: 'inspiracional' }
});
```

### Queries Avanzadas

#### Filtros

```typescript
// AND implícito
const stories = await prisma.story.findMany({
  where: {
    tone: 'inspiracional',
    format: 'post'
  }
});

// OR explícito
const stories = await prisma.story.findMany({
  where: {
    OR: [
      { tone: 'inspiracional' },
      { tone: 'educativo' }
    ]
  }
});

// NOT
const stories = await prisma.story.findMany({
  where: {
    NOT: {
      tone: 'tecnico'
    }
  }
});

// Operadores de comparación
const stories = await prisma.story.findMany({
  where: {
    createdAt: {
      gte: new Date('2024-01-01'),
      lt: new Date('2024-12-31')
    }
  }
});

// Búsqueda de texto
const stories = await prisma.story.findMany({
  where: {
    generatedStory: {
      contains: 'dragón',
      mode: 'insensitive'
    }
  }
});
```

#### Ordenamiento

```typescript
// Orden simple
const stories = await prisma.story.findMany({
  orderBy: {
    createdAt: 'desc'
  }
});

// Orden múltiple
const stories = await prisma.story.findMany({
  orderBy: [
    { tone: 'asc' },
    { createdAt: 'desc' }
  ]
});
```

#### Paginación

```typescript
// Offset pagination
const page = 2;
const pageSize = 10;

const stories = await prisma.story.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: 'desc' }
});

// Cursor pagination
const stories = await prisma.story.findMany({
  take: 10,
  cursor: {
    id: lastStoryId
  },
  orderBy: { createdAt: 'desc' }
});
```

#### Selección de Campos

```typescript
// Seleccionar campos específicos
const stories = await prisma.story.findMany({
  select: {
    id: true,
    tone: true,
    format: true,
    createdAt: true
  }
});
```

### Transacciones

```typescript
// Transacción secuencial
const result = await prisma.$transaction(async (tx) => {
  const story = await tx.story.create({
    data: { /* ... */ }
  });
  
  await tx.analytics.create({
    data: { storyId: story.id }
  });
  
  return story;
});

// Transacción batch
const [deleteResult, createResult] = await prisma.$transaction([
  prisma.story.deleteMany({ where: { tone: 'old' } }),
  prisma.story.create({ data: { /* ... */ } })
]);
```

### Raw Queries

```typescript
// Query raw
const stories = await prisma.$queryRaw`
  SELECT * FROM stories 
  WHERE tone = ${tone} 
  ORDER BY created_at DESC
`;

// Execute raw
const result = await prisma.$executeRaw`
  UPDATE stories 
  SET version = 'fase2' 
  WHERE version IS NULL
`;
```

## Logging

```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

// Event listeners
prisma.$on('query', (e) => {
  console.log('Query:', e.query);
  console.log('Duration:', e.duration, 'ms');
});
```

## Manejo de Errores

```typescript
import { Prisma } from '@prisma/client';

try {
  await prisma.story.create({ data: { /* ... */ } });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Error conocido con código
    if (error.code === 'P2002') {
      console.log('Violación de constraint único');
    }
  }
  
  if (error instanceof Prisma.PrismaClientValidationError) {
    console.log('Error de validación');
  }
}
```

### Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| P2002 | Violación de constraint único |
| P2025 | Registro no encontrado |
| P2003 | Violación de foreign key |
| P2024 | Timeout de conexión |

## Best Practices

### 1. Singleton Pattern

```typescript
// database.ts
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

### 2. Cerrar Conexión

```typescript
// Al finalizar la aplicación
await prisma.$disconnect();
```

### 3. Type Safety

```typescript
// Usar tipos generados
import { Story, Prisma } from '@prisma/client';

type StoryCreateInput = Prisma.StoryCreateInput;
type StoryWhereInput = Prisma.StoryWhereInput;
```

### 4. Validación

```typescript
// Validar antes de persistir
function validateStory(data: any): boolean {
  return data.tone && data.format && data.generatedStory;
}
```

## Troubleshooting

### Error: "Can't reach database server"

```bash
# Verificar conexión
npx prisma db pull
```

### Error: "Migration failed"

```bash
# Ver estado
npx prisma migrate status

# Reset (solo desarrollo)
npx prisma migrate reset
```

### Cliente desactualizado

```bash
# Regenerar cliente
npx prisma generate
```

## Recursos

- [Documentación oficial](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

---

**Última actualización**: Diciembre 2024
