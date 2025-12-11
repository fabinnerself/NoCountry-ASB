# 🐳 Guía de Docker - AutoStory Builder Backend

## 📋 Archivos Docker

- `Dockerfile` - Imagen de producción optimizada
- `.dockerignore` - Archivos excluidos de la imagen
- `docker-compose.yml` - Orquestación local con PostgreSQL

## 🚀 Uso Local con Docker Compose

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en `backend/`:

```env
COHERE_API_KEY=tu_api_key_aqui
COHERE_MODEL=command-r7b-12-2024
```

### 2. Iniciar Servicios

```bash
cd backend

# Iniciar PostgreSQL + Backend
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (limpia BD)
docker-compose down -v
```

### 3. Verificar

```bash
# Health check
curl http://localhost:8000/health

# Debería mostrar:
# {
#   "status": "ok",
#   "version": "fase2",
#   "database": "connected"
# }
```

### 4. Probar Endpoint

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "post",
    "text": "Test con Docker"
  }'
```

## 🏗️ Build Manual de Imagen

### Build

```bash
cd backend

# Build de la imagen
docker build -t autostory-backend:fase2 .

# Ver imagen creada
docker images | grep autostory
```

### Run

```bash
# Ejecutar contenedor
docker run -d \
  --name autostory-backend \
  -p 8000:8000 \
  -e NODE_ENV=production \
  -e PORT=8000 \
  -e COHERE_API_KEY=tu_api_key \
  -e COHERE_MODEL=command-r7b-12-2024 \
  -e DATABASE_URL=postgresql://user:pass@host/db \
  -e FRONTEND_URL=https://asb-delta.vercel.app \
  -e FRONTEND_URL_LOCAL=http://localhost:3000 \
  autostory-backend:fase2

# Ver logs
docker logs -f autostory-backend

# Detener
docker stop autostory-backend

# Eliminar
docker rm autostory-backend
```

## 🌐 Deployment en Render

### Opción 1: Usando render.yaml (Recomendado)

El archivo `render.yaml` en la raíz ya está configurado:

```yaml
services:
  - type: web
    name: autostory-backend-fase2
    runtime: docker
    dockerfilePath: ./Dockerfile
    dockerContext: .
```

**Pasos**:
1. Push a GitHub
2. Conectar Render con el repo
3. Render detectará `render.yaml` automáticamente
4. Configurar variables de entorno en Dashboard:
   - `COHERE_API_KEY`
   - `DATABASE_URL` (NeonDB)
5. Deploy automático

### Opción 2: Manual en Render Dashboard

1. **New Web Service**
2. **Connect GitHub repo**
3. **Configuración**:
   - Name: `autostory-backend-fase2`
   - Region: Oregon (US West)
   - Branch: `main`
   - Root Directory: `.` (raíz del proyecto)
   - Runtime: `Docker`
   - Dockerfile Path: `./Dockerfile`

4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   COHERE_API_KEY=[tu_key]
   COHERE_MODEL=command-r7b-12-2024
   DATABASE_URL=[neondb_url]
   FRONTEND_URL=https://asb-delta.vercel.app
   FRONTEND_URL_LOCAL=http://localhost:3000
   ```

5. **Deploy**

## 🔍 Verificar Imagen Docker

### Inspeccionar Imagen

```bash
# Ver capas de la imagen
docker history autostory-backend:fase2

# Ver tamaño
docker images autostory-backend:fase2

# Inspeccionar configuración
docker inspect autostory-backend:fase2
```

### Ejecutar Shell en Contenedor

```bash
# Entrar al contenedor
docker exec -it autostory-backend sh

# Verificar archivos
ls -la
ls -la dist/
ls -la prisma/

# Verificar Prisma
npx prisma --version

# Salir
exit
```

## 🐛 Troubleshooting

### Error: "Prisma Client not found"

**Causa**: Cliente Prisma no generado en la imagen.

**Solución**: Verificar que el Dockerfile incluye:
```dockerfile
RUN npx prisma generate
```

### Error: "Cannot connect to database"

**Causa**: DATABASE_URL incorrecta o BD no accesible.

**Solución**:
1. Verificar DATABASE_URL en variables de entorno
2. Verificar que NeonDB permite conexiones desde Render
3. Verificar que la URL incluye `?sslmode=require`

### Error: "Port already in use"

**Causa**: Puerto 8000 ocupado.

**Solución**:
```bash
# Usar otro puerto
docker run -p 8001:8000 ...

# O detener contenedor existente
docker stop autostory-backend
```

### Imagen muy grande

**Optimizaciones aplicadas**:
- ✅ Multi-stage build
- ✅ Alpine Linux (imagen base pequeña)
- ✅ Solo dependencias de producción
- ✅ .dockerignore configurado

**Tamaño esperado**: ~200-300 MB

## 📊 Comandos Útiles

### Docker Compose

```bash
# Iniciar en background
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Reiniciar servicios
docker-compose restart

# Ver estado
docker-compose ps

# Ejecutar comando en contenedor
docker-compose exec backend sh

# Limpiar todo
docker-compose down -v --rmi all
```

### Docker

```bash
# Listar contenedores
docker ps
docker ps -a

# Listar imágenes
docker images

# Eliminar contenedor
docker rm -f autostory-backend

# Eliminar imagen
docker rmi autostory-backend:fase2

# Limpiar sistema
docker system prune -a

# Ver uso de recursos
docker stats
```

## 🔐 Seguridad

### Buenas Prácticas Implementadas

✅ **Usuario no-root**: Contenedor corre como usuario `nodejs`
✅ **Multi-stage build**: Reduce superficie de ataque
✅ **Alpine Linux**: Imagen base mínima
✅ **Health check**: Monitoreo automático
✅ **Variables de entorno**: Secrets no hardcodeados
✅ **.dockerignore**: Excluye archivos sensibles

### Recomendaciones Adicionales

- 🔒 Usar secrets de Docker/Render para API keys
- 🔒 Escanear imagen con `docker scan`
- 🔒 Actualizar dependencias regularmente
- 🔒 Limitar recursos del contenedor

## 📈 Performance

### Optimizaciones Implementadas

- ✅ Multi-stage build (reduce tamaño)
- ✅ npm ci (instalación más rápida)
- ✅ Layer caching (build incremental)
- ✅ Solo dependencias de producción
- ✅ Prisma Client pre-generado

### Métricas Esperadas

- **Build time**: 2-5 minutos
- **Image size**: 200-300 MB
- **Startup time**: 10-20 segundos
- **Memory usage**: 100-200 MB
- **CPU usage**: Bajo (<10%)

## 🎯 Checklist de Deployment

### Pre-deployment

- [ ] Dockerfile probado localmente
- [ ] docker-compose funciona
- [ ] Variables de entorno configuradas
- [ ] NeonDB accesible
- [ ] Health check responde

### Deployment

- [ ] Push a GitHub
- [ ] Render conectado
- [ ] Variables configuradas en Render
- [ ] Build exitoso
- [ ] Contenedor iniciado
- [ ] Health check OK en producción

### Post-deployment

- [ ] Endpoint funciona
- [ ] BD conectada
- [ ] CORS configurado
- [ ] Logs sin errores
- [ ] Frontend puede conectar

---

**Última actualización**: Diciembre 2024  
**Versión**: 2.0.0 (Fase 2)
