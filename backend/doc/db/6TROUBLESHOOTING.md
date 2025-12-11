# Troubleshooting - Problemas Comunes

## Problemas de Conexión

### Error: "Can't reach database server at localhost:5432"

**Causa**: PostgreSQL no está corriendo o no está en el puerto correcto.

**Solución**:

```bash
# Windows - Verificar servicio
sc query postgresql-x64-15

# Si no está corriendo, iniciar:
net start postgresql-x64-15

# macOS - Verificar con Homebrew
brew services list
brew services start postgresql@15

# Linux - Verificar con systemctl
sudo systemctl status postgresql
sudo systemctl start postgresql
```

### Error: "password authentication failed for user"

**Causa**: Credenciales incorrectas en DATABASE_URL.

**Solución**:

1. Verificar DATABASE_URL en `.env`:
```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/autostory
```

2. Resetear password de PostgreSQL:
```bash
# Conectar como superuser
psql -U postgres

# Cambiar password
ALTER USER postgres PASSWORD 'nuevo_password';
```

### Error: "database autostory does not exist"

**Causa**: La base de datos no ha sido creada.

**Solución**:

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE autostory;

# Verificar
\l

# Salir
\q
```

### Error: "SSL connection required"

**Causa**: NeonTech requiere SSL pero no está configurado en DATABASE_URL.

**Solución**:

Agregar `?sslmode=require` al final de DATABASE_URL:

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require
```

## Problemas de Migraciones

### Error: "Migration failed to apply"

**Causa**: Conflicto en el schema o migración corrupta.

**Solución 1 - Reset (solo desarrollo)**:

```bash
# CUIDADO: Esto borra todos los datos
npx prisma migrate reset
```

**Solución 2 - Aplicar manualmente**:

```bash
# Ver estado
npx prisma migrate status

# Marcar como aplicada
npx prisma migrate resolve --applied "nombre_migracion"

# O marcar como revertida
npx prisma migrate resolve --rolled-back "nombre_migracion"
```

### Error: "Drift detected"

**Causa**: El schema de la BD no coincide con las migraciones.

**Solución**:

```bash
# Ver diferencias
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-schema-datasource prisma/schema.prisma

# Crear migración para sincronizar
npx prisma migrate dev --name sync_schema
```

### Error: "Migration already applied"

**Causa**: Intentando aplicar una migración que ya existe.

**Solución**:

```bash
# Ver estado de migraciones
npx prisma migrate status

# Si es necesario, crear nueva migración
npx prisma migrate dev --name nueva_migracion
```

## Problemas de Prisma Client

### Error: "PrismaClient is unable to be run in the browser"

**Causa**: Intentando usar Prisma Client en frontend.

**Solución**:

Prisma Client solo funciona en backend (Node.js). Crear API endpoints para el frontend.

### Error: "Unknown argument 'xxx'"

**Causa**: Cliente Prisma desactualizado después de cambios en schema.

**Solución**:

```bash
# Regenerar cliente
npx prisma generate

# Si persiste, limpiar y regenerar
rm -rf node_modules/.prisma
npx prisma generate
```

### Error: "Type 'xxx' is not assignable"

**Causa**: Tipos TypeScript desactualizados.

**Solución**:

```bash
# Regenerar cliente y tipos
npx prisma generate

# Reiniciar TypeScript server en VSCode
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

## Problemas de Performance

### Queries muy lentas

**Diagnóstico**:

```typescript
// Habilitar logging de queries
const prisma = new PrismaClient({
  log: ['query']
});

prisma.$on('query', (e) => {
  console.log('Query:', e.query);
  console.log('Duration:', e.duration, 'ms');
});
```

**Soluciones**:

1. Agregar índices:
```prisma
model Story {
  // ...
  @@index([createdAt])
  @@index([tone, format])
}
```

2. Usar select para campos específicos:
```typescript
const stories = await prisma.story.findMany({
  select: {
    id: true,
    tone: true,
    createdAt: true
  }
});
```

3. Implementar paginación:
```typescript
const stories = await prisma.story.findMany({
  take: 20,
  skip: page * 20
});
```

### Demasiadas conexiones abiertas

**Causa**: No cerrar conexiones o crear múltiples instancias de PrismaClient.

**Solución**:

```typescript
// Usar singleton pattern
class DatabaseClient {
  private static instance: PrismaClient;
  
  static getInstance(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient();
    }
    return this.instance;
  }
}

// Cerrar al finalizar
await prisma.$disconnect();
```

## Problemas de Deployment

### Error en Render: "Prisma Client not found"

**Causa**: Cliente Prisma no generado en build.

**Solución**:

Actualizar Build Command en Render:

```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

### Error: "Environment variable not found: DATABASE_URL"

**Causa**: Variable de entorno no configurada en producción.

**Solución**:

1. En Render Dashboard:
   - Ir a "Environment"
   - Agregar `DATABASE_URL`
   - Redeploy

2. Verificar en código:
```typescript
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada');
}
```

### Migraciones no se aplican en producción

**Causa**: Usando `migrate dev` en lugar de `migrate deploy`.

**Solución**:

```bash
# En producción, usar:
npx prisma migrate deploy

# NO usar en producción:
npx prisma migrate dev
```

## Problemas de Testing

### Tests fallan por conflictos de BD

**Causa**: Tests usando la misma BD que desarrollo.

**Solución**:

1. Crear BD de test separada:
```bash
createdb autostory_test
```

2. Configurar en tests:
```typescript
process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
```

3. Limpiar antes de cada test:
```typescript
beforeEach(async () => {
  await prisma.story.deleteMany();
});
```

### Error: "Too many connections"

**Causa**: Tests no cierran conexiones.

**Solución**:

```typescript
afterAll(async () => {
  await prisma.$disconnect();
});
```

## Problemas de Datos

### Datos corruptos o inconsistentes

**Solución**:

```bash
# Backup de datos
pg_dump -U postgres autostory > backup.sql

# Reset de BD (desarrollo)
npx prisma migrate reset

# Restaurar datos
psql -U postgres autostory < backup.sql
```

### Necesito cambiar el schema sin perder datos

**Solución**:

1. Crear migración:
```bash
npx prisma migrate dev --name cambio_schema
```

2. Si Prisma no puede migrar automáticamente, editar SQL:
```bash
# Editar archivo en prisma/migrations/xxx_cambio_schema/migration.sql
```

3. Aplicar:
```bash
npx prisma migrate deploy
```

## Problemas de Logging

### No veo logs de queries

**Solución**:

```typescript
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    }
  ],
});

prisma.$on('query', (e) => {
  console.log('Query:', e.query);
  console.log('Params:', e.params);
  console.log('Duration:', e.duration, 'ms');
});
```

### Logs muy verbosos en producción

**Solución**:

```typescript
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'production' 
    ? ['error'] 
    : ['query', 'error', 'warn']
});
```

## Comandos de Diagnóstico

### Verificar conexión

```bash
# Con Prisma
npx prisma db pull

# Con psql
psql -U postgres -d autostory -c "SELECT 1"
```

### Ver estado de migraciones

```bash
npx prisma migrate status
```

### Validar schema

```bash
npx prisma validate
```

### Ver estructura de BD

```bash
# Con Prisma Studio
npx prisma studio

# Con psql
psql -U postgres autostory
\dt  # Listar tablas
\d stories  # Describir tabla
```

### Verificar índices

```bash
psql -U postgres autostory
\di  # Listar índices
```

## Recursos Adicionales

- [Prisma Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)
- [PostgreSQL Error Codes](https://www.postgresql.org/docs/current/errcodes-appendix.html)
- [Prisma Community Discord](https://discord.gg/prisma)

## Contacto de Soporte

Si el problema persiste:

1. Revisar logs del servidor
2. Verificar configuración de variables de entorno
3. Consultar documentación oficial de Prisma
4. Contactar al equipo de desarrollo

---

**Última actualización**: Diciembre 2024
