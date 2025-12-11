# 🐳 Docker Compose - Guía de Uso

## 📋 Descripción

Este `docker-compose.yml` está configurado para:
- ✅ Ejecutar el backend en un contenedor Docker
- ✅ Conectarse directamente a **NeonDB Cloud** (NO PostgreSQL local)
- ✅ Simular el ambiente de producción de Render
- ✅ Aplicar migraciones automáticamente

## ⚠️ Importante

**Este docker-compose NO crea una base de datos local.**  
Se conecta directamente a tu base de datos en NeonDB Cloud.

## 🚀 Uso

### 1. Configurar Variables de Entorno

Asegúrate de que tu `.env` tenga la URL de NeonDB:

```env
# .env
NODE_ENV=production
PORT=8000
COHERE_API_KEY=tu_api_key
COHERE_MODEL=command-r7b-12-2024
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
FRONTEND_URL_LOCAL=http://localhost:3000
FRONTEND_URL=https://asb-delta.vercel.app
```

**CRÍTICO**: `DATABASE_URL` debe apuntar a NeonDB, no a localhost.

### 2. Iniciar Servicios

```bash
# Iniciar en background
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver solo logs del backend
docker-compose logs -f backend
```

### 3. Verificar

```bash
# Health check
curl http://localhost:8000/health

# Debería mostrar:
# {
#   "status": "ok",
#   "version": "fase2",
#   "database": "connected"  # ← Conectado a NeonDB
# }
```

### 4. Probar Endpoint

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "post",
    "text": "Test desde Docker Compose"
  }'
```

### 5. Verificar Datos en NeonDB

Los datos se guardan directamente en NeonDB. Puedes verificar:

**Opción A: Prisma Studio**
```bash
# En otra terminal (fuera de Docker)
npm run prisma:studio
```

**Opción B: Dashboard de NeonDB**
1. Ir a https://console.neon.tech
2. Seleccionar tu proyecto
3. SQL Editor
4. Ejecutar: `SELECT * FROM stories;`

### 6. Detener Servicios

```bash
# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes locales (uploads, logs)
docker-compose down -v
```

## 📊 Flujo de Datos

```
Docker Container (Backend)
         ↓
    HTTP Request
         ↓
   Prisma Client
         ↓
    Internet
         ↓
NeonDB Cloud (PostgreSQL)
```

## 🔍 Comandos Útiles

### Ver Estado

```bash
# Ver contenedores corriendo
docker-compose ps

# Ver logs
docker-compose logs

# Ver logs en tiempo real
docker-compose logs -f backend
```

### Reiniciar

```bash
# Reiniciar backend
docker-compose restart backend

# Reiniciar todo
docker-compose restart
```

### Rebuild

```bash
# Rebuild de la imagen
docker-compose build

# Rebuild sin cache
docker-compose build --no-cache

# Rebuild y reiniciar
docker-compose up -d --build
```

### Entrar al Contenedor

```bash
# Abrir shell en el contenedor
docker-compose exec backend sh

# Dentro del contenedor:
ls -la
npx prisma --version
env | grep DATABASE_URL
exit
```

### Limpiar

```bash
# Detener y eliminar contenedores
docker-compose down

# Eliminar también volúmenes
docker-compose down -v

# Eliminar también imágenes
docker-compose down --rmi all
```

## ⚙️ Configuración

### Variables de Entorno

El `docker-compose.yml` lee del archivo `.env`:

| Variable | Requerido | Descripción |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ Sí | URL de NeonDB |
| `COHERE_API_KEY` | ✅ Sí | API key de Cohere |
| `COHERE_MODEL` | No | Modelo de Cohere (default: command-r7b-12-2024) |
| `NODE_ENV` | No | Ambiente (default: production) |
| `PORT` | No | Puerto (default: 8000) |
| `FRONTEND_URL` | No | URL del frontend |
| `FRONTEND_URL_LOCAL` | No | URL local del frontend |

### Volúmenes

```yaml
volumes:
  - ./uploads:/app/uploads  # Archivos subidos
  - ./logs:/app/logs        # Logs del servidor
```

Los archivos se guardan en tu máquina local, no en el contenedor.

### Health Check

El contenedor tiene un health check que verifica cada 30 segundos:
- ✅ Servidor respondiendo
- ✅ Endpoint `/health` accesible

## 🐛 Troubleshooting

### Error: "DATABASE_URL is required"

**Causa**: No hay `.env` o DATABASE_URL no está configurada.

**Solución**:
```bash
# Verificar .env
cat .env | grep DATABASE_URL

# Debe mostrar la URL de NeonDB
```

### Error: "Can't reach database server"

**Causa**: DATABASE_URL apunta a localhost o es incorrecta.

**Solución**:
1. Verificar que DATABASE_URL apunta a NeonDB (no localhost)
2. Verificar que incluye `?sslmode=require`
3. Verificar credenciales en NeonDB Dashboard

### Error: "COHERE_API_KEY is required"

**Causa**: COHERE_API_KEY no está en `.env`.

**Solución**:
```bash
# Agregar a .env
echo "COHERE_API_KEY=tu_api_key" >> .env
```

### Contenedor se detiene inmediatamente

**Diagnóstico**:
```bash
# Ver logs
docker-compose logs backend

# Ver últimas líneas
docker-compose logs --tail=50 backend
```

**Causas comunes**:
- Error en migraciones de Prisma
- DATABASE_URL incorrecta
- COHERE_API_KEY faltante

### Migraciones fallan

**Solución**:
```bash
# Aplicar migraciones manualmente
docker-compose exec backend npx prisma migrate deploy

# Ver estado de migraciones
docker-compose exec backend npx prisma migrate status
```

## ✅ Checklist de Verificación

Antes de usar docker-compose:

- [ ] `.env` existe con DATABASE_URL de NeonDB
- [ ] COHERE_API_KEY configurada
- [ ] DATABASE_URL incluye `?sslmode=require`
- [ ] NeonDB accesible desde tu máquina
- [ ] Docker Desktop corriendo

Después de `docker-compose up`:

- [ ] Contenedor corriendo: `docker-compose ps`
- [ ] Sin errores en logs: `docker-compose logs`
- [ ] Health check OK: `curl http://localhost:8000/health`
- [ ] Database: "connected"
- [ ] Endpoint funciona: probar con curl/Postman

## 🎯 Diferencias con Producción

| Aspecto | Docker Compose | Render |
|---------|----------------|--------|
| Base de Datos | NeonDB Cloud | NeonDB Cloud |
| Puerto | 8000 | 10000 |
| Volúmenes | Local (./uploads) | Efímero |
| Logs | Local (./logs) | Render Dashboard |
| Restart | Manual | Automático |

## 🚀 Ventajas de Este Setup

1. ✅ **Mismo ambiente que producción** (conecta a NeonDB)
2. ✅ **Prueba migraciones** antes de deployar
3. ✅ **Verifica conectividad** a NeonDB
4. ✅ **Simula Render** sin crear BD local
5. ✅ **Fácil de limpiar** (solo un contenedor)

## 📝 Ejemplo Completo

```bash
# 1. Verificar .env
cat .env | grep DATABASE_URL

# 2. Iniciar
docker-compose up -d

# 3. Ver logs
docker-compose logs -f

# 4. En otra terminal, probar
curl http://localhost:8000/health

# 5. Generar historia
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{"tone":"inspiracional","format":"post","text":"Test"}'

# 6. Verificar en NeonDB (Prisma Studio)
npm run prisma:studio

# 7. Detener
docker-compose down
```

---

**Última actualización**: Diciembre 2024  
**Versión**: 2.0.0 (Fase 2)
