# Documentación de Persistencia - Fase 2

## Overview

La Fase 2 de AutoStory Builder agrega persistencia en PostgreSQL usando Prisma ORM. Todas las historias generadas se almacenan en la base de datos para futuras funcionalidades de historial, versionado y análisis.

## Características Principales

- ✅ **Persistencia automática**: Todas las historias se guardan en PostgreSQL
- ✅ **Degradación elegante**: Si falla la BD, la historia se genera igualmente
- ✅ **Type-safe**: Prisma proporciona tipos TypeScript automáticos
- ✅ **Migraciones**: Control de versiones del schema de BD
- ✅ **Logging**: Registro detallado de operaciones de BD

## Arquitectura

```
Controller → Repository → Prisma Client → PostgreSQL
```

### Flujo de Datos

1. **Request** llega al controller
2. **Validación** de inputs
3. **Generación** de historia con Cohere API
4. **Persistencia** en BD (try-catch para degradación elegante)
5. **Response** con campo `validation.db`

## Schema de Base de Datos

### Tabla: stories

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único (auto-generado) |
| tone | VARCHAR(50) | Tono de la historia |
| format | VARCHAR(50) | Formato de la historia |
| text | TEXT | Texto de entrada del usuario (opcional) |
| image | TEXT | Referencia a imagen subida (opcional) |
| generatedStory | TEXT | Historia generada por IA |
| idUsuario | VARCHAR(100) | ID del usuario (opcional) |
| createdAt | TIMESTAMPTZ | Timestamp de creación |
| updatedAt | TIMESTAMPTZ | Timestamp de actualización |
| version | VARCHAR(20) | Versión de la fase (default: "fase2") |
| errorMessage | TEXT | Mensaje de error si aplica (opcional) |

### Índices

- **Primary Key**: `id`
- **Index**: `createdAt` - Para consultas ordenadas por fecha
- **Index**: `idUsuario` - Para futuras consultas por usuario

## Componentes

### 1. DatabaseClient (Singleton)

**Ubicación**: `src/config/database.ts`

Gestiona la conexión única a PostgreSQL:

```typescript
const prisma = DatabaseClient.getInstance();
await DatabaseClient.healthCheck();
await DatabaseClient.disconnect();
```

### 2. StoryRepository

**Ubicación**: `src/repositories/story.repository.ts`

Encapsula todas las operaciones CRUD:

```typescript
const repo = new StoryRepository();

// Crear
await repo.create(storyData);

// Leer
await repo.findById(id);
await repo.findAll({ skip: 0, take: 10 });

// Actualizar
await repo.update(id, updateData);

// Eliminar
await repo.delete(id);

// Contar
await repo.count();
```

### 3. DatabaseErrorHandler

**Ubicación**: `src/utils/databaseErrorHandler.ts`

Maneja errores de Prisma de forma consistente:

```typescript
try {
  await repo.create(data);
} catch (error) {
  const dbError = DatabaseErrorHandler.handle(error);
  logger.error(dbError.message);
}
```

## Configuración

### Variables de Entorno

```env
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
```

### Formatos de DATABASE_URL

**Local:**
```
postgresql://postgres:postgres@localhost:5432/autostory?schema=public
```

**NeonTech:**
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/autostory?sslmode=require
```

**Render (con NeonTech):**
```
Configurar en Render Dashboard como variable de entorno
```

## Comandos Prisma

### Setup Inicial

```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npm run prisma:generate

# Crear migración inicial
npm run prisma:migrate
```

### Desarrollo

```bash
# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Abrir Prisma Studio (GUI)
npm run prisma:studio

# Validar schema
npx prisma validate

# Formatear schema
npx prisma format
```

### Producción

```bash
# Aplicar migraciones
npm run prisma:deploy

# Generar cliente
npm run prisma:generate
```

## Manejo de Errores

### Tipos de Errores

1. **CONNECTION_ERROR**: Error de conexión a BD
2. **TIMEOUT_ERROR**: Timeout de conexión
3. **CONSTRAINT_VIOLATION**: Violación de restricción única
4. **QUERY_ERROR**: Error en query SQL
5. **TRANSACTION_ERROR**: Error en transacción
6. **UNKNOWN_ERROR**: Error desconocido

### Degradación Elegante

Si falla la persistencia:
- ✅ La historia se genera normalmente
- ✅ Se retorna al usuario
- ✅ El campo `validation.db` indica "error"
- ✅ Se loggea el error para debugging

```json
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

## Testing

### Configurar BD de Prueba

```env
DATABASE_TEST_URL=postgresql://postgres:postgres@localhost:5432/autostory_test?schema=public
```

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Solo tests de BD
npm run test:db

# Con cobertura
npm run test:coverage-db
```

## Troubleshooting

Ver `TROUBLESHOOTING.md` para solución de problemas comunes.

## Próximos Pasos

- Implementar autenticación de usuarios
- Agregar endpoints de consulta de historias
- Implementar versionado de historias
- Agregar búsqueda y filtrado
- Implementar analytics

---

**Versión**: 2.0.0  
**Última actualización**: Diciembre 2024
