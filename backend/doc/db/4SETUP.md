# Guía de Configuración - Base de Datos

## Requisitos Previos

- Node.js 18+
- PostgreSQL 15+ (local) o cuenta en NeonTech (cloud)
- npm o yarn

## Opción 1: PostgreSQL Local

### 1. Instalar PostgreSQL

**Windows:**
```bash
# Descargar desde https://www.postgresql.org/download/windows/
# O usar Chocolatey:
choco install postgresql
```

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Crear Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE autostory;

# Crear usuario (opcional)
CREATE USER autostory_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE autostory TO autostory_user;

# Salir
\q
```

### 3. Configurar DATABASE_URL

Editar `.env`:

```env
DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/autostory?schema=public
```

### 4. Ejecutar Migraciones

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
```

### 5. Verificar Conexión

```bash
# Abrir Prisma Studio
npm run prisma:studio

# O verificar con health check
npm run dev
# En otro terminal:
curl http://localhost:8000/health
```

## Opción 2: NeonTech (Cloud)

### 1. Crear Cuenta en NeonTech

1. Ir a [https://neon.tech](https://neon.tech)
2. Crear cuenta (gratis)
3. Crear nuevo proyecto

### 2. Obtener DATABASE_URL

1. En el dashboard de NeonTech
2. Ir a "Connection Details"
3. Copiar "Connection string"

Ejemplo:
```
postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Configurar en .env

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 4. Ejecutar Migraciones

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:deploy  # Usar deploy en cloud
```

### 5. Verificar Conexión

```bash
npm run prisma:studio
```

## Opción 3: Render + NeonTech (Producción)

### 1. Configurar NeonTech

Seguir pasos de "Opción 2" para crear BD en NeonTech.

### 2. Configurar Render

1. Ir a [Render Dashboard](https://dashboard.render.com)
2. Seleccionar tu servicio backend
3. Ir a "Environment"
4. Agregar variables:

```
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
COHERE_API_KEY=tu_api_key
NODE_ENV=production
PORT=8000
```

### 3. Configurar Build Command

En Render, configurar:

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

**Start Command:**
```bash
npm start
```

### 4. Deploy

1. Hacer push a GitHub
2. Render detectará cambios y desplegará automáticamente
3. Verificar logs en Render Dashboard

### 5. Verificar Deployment

```bash
curl https://tu-app.onrender.com/health
```

## Configuración de BD de Prueba (Opcional)

### 1. Crear BD de Test

```bash
# PostgreSQL local
psql -U postgres
CREATE DATABASE autostory_test;
\q
```

### 2. Configurar en .env

```env
DATABASE_TEST_URL=postgresql://postgres:password@localhost:5432/autostory_test?schema=public
```

### 3. Ejecutar Tests

```bash
npm run test:db
```

## Verificación de Configuración

### Checklist

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos creada
- [ ] DATABASE_URL configurada en .env
- [ ] Dependencias instaladas (`npm install`)
- [ ] Cliente Prisma generado (`npm run prisma:generate`)
- [ ] Migraciones aplicadas (`npm run prisma:migrate`)
- [ ] Conexión verificada (Prisma Studio o health check)

### Comandos de Verificación

```bash
# 1. Verificar que PostgreSQL está corriendo
# Windows:
sc query postgresql-x64-15

# macOS/Linux:
pg_isready

# 2. Verificar conexión con Prisma
npx prisma db pull

# 3. Ver tablas creadas
npx prisma studio

# 4. Verificar health check
npm run dev
curl http://localhost:8000/health
```

## Troubleshooting

### Error: "Can't reach database server"

**Solución:**
1. Verificar que PostgreSQL está corriendo
2. Verificar DATABASE_URL en .env
3. Verificar firewall/puertos

### Error: "Authentication failed"

**Solución:**
1. Verificar usuario y password en DATABASE_URL
2. Verificar permisos del usuario en PostgreSQL

### Error: "SSL connection required"

**Solución:**
Para NeonTech, agregar `?sslmode=require` al final de DATABASE_URL:
```
postgresql://user:pass@host/db?sslmode=require
```

### Error: "Migration failed"

**Solución:**
```bash
# Reset de migraciones (solo desarrollo)
npx prisma migrate reset

# Aplicar migraciones manualmente
npx prisma migrate deploy
```

## Próximos Pasos

1. ✅ Configuración completada
2. Ver `PRISMA_GUIDE.md` para comandos avanzados
3. Ver `API_EXAMPLES.md` para ejemplos de uso
4. Ver `TROUBLESHOOTING.md` para problemas comunes

---

**Última actualización**: Diciembre 2024
