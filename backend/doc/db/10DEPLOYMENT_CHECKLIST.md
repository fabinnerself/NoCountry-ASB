# 🚀 Checklist de Deployment - Backend Fase 2

## Pre-Deployment

### ✅ Código

- [ ] Todos los archivos creados y en su lugar
- [ ] No hay errores de TypeScript
- [ ] No hay console.logs innecesarios
- [ ] Código comentado donde sea necesario
- [ ] .gitignore configurado correctamente

### ✅ Configuración

- [ ] `.env.example` actualizado con todas las variables
- [ ] Variables de entorno documentadas
- [ ] Valores por defecto configurados
- [ ] Secrets no commiteados

### ✅ Base de Datos

- [ ] Schema de Prisma validado (`npx prisma validate`)
- [ ] Migraciones creadas
- [ ] Migraciones probadas localmente
- [ ] Índices configurados
- [ ] Constraints definidos

### ✅ Testing

- [ ] Tests unitarios escritos
- [ ] Tests de integración escritos
- [ ] Tests pasando localmente
- [ ] Cobertura de código aceptable (>80%)

### ✅ Documentación

- [ ] README.md actualizado
- [ ] API documentada
- [ ] Ejemplos de uso incluidos
- [ ] Troubleshooting documentado
- [ ] Changelog actualizado

## Deployment Local

### 1. Instalación

```bash
cd backend
npm install
```

- [ ] Dependencias instaladas sin errores
- [ ] No hay vulnerabilidades críticas

### 2. Configuración

```bash
cp .env.example .env
# Editar .env
```

- [ ] DATABASE_URL configurada
- [ ] COHERE_API_KEY configurada
- [ ] PORT configurado (default: 8000)
- [ ] FRONTEND_URL configurada

### 3. Base de Datos

```bash
# PostgreSQL local
createdb autostory

# Prisma
npm run prisma:generate
npm run prisma:migrate
```

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos creada
- [ ] Cliente Prisma generado
- [ ] Migraciones aplicadas
- [ ] Tablas creadas correctamente

### 4. Verificación

```bash
npm run dev
```

- [ ] Servidor inicia sin errores
- [ ] Health check responde: `curl http://localhost:8000/health`
- [ ] Database status: "connected"
- [ ] Endpoint de generación funciona

### 5. Testing

```bash
npm test
npm run test:coverage
```

- [ ] Todos los tests pasan
- [ ] Cobertura aceptable
- [ ] No hay warnings críticos

## Deployment Cloud (NeonTech)

### 1. Crear Proyecto en NeonTech

- [ ] Cuenta creada en https://neon.tech
- [ ] Proyecto creado
- [ ] DATABASE_URL obtenida
- [ ] Región seleccionada (us-east-2 recomendado)

### 2. Configurar Localmente

```bash
# En .env
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require
```

- [ ] DATABASE_URL actualizada
- [ ] SSL mode configurado (`?sslmode=require`)

### 3. Aplicar Migraciones

```bash
npm run prisma:deploy
```

- [ ] Migraciones aplicadas en NeonTech
- [ ] Tablas creadas en cloud
- [ ] Verificado con Prisma Studio

### 4. Verificación

```bash
npm run dev
curl http://localhost:8000/health
```

- [ ] Conexión a NeonTech exitosa
- [ ] Health check muestra "connected"
- [ ] Latencia aceptable (<500ms)

## Deployment Producción (Render)

### 1. Preparar Repositorio

```bash
git add .
git commit -m "feat: Fase 2 - Persistencia en PostgreSQL"
git push origin main
```

- [ ] Código commiteado
- [ ] Push a GitHub exitoso
- [ ] Branch principal actualizado

### 2. Configurar Render

#### A. Crear Web Service

- [ ] Ir a https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Conectar repositorio GitHub
- [ ] Seleccionar repositorio

#### B. Configuración Básica

- [ ] **Name**: `autostory-backend`
- [ ] **Region**: Oregon (US West) o más cercano
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `backend`
- [ ] **Runtime**: Node
- [ ] **Build Command**: 
  ```bash
  npm install && npx prisma generate && npx prisma migrate deploy && npm run build
  ```
- [ ] **Start Command**: 
  ```bash
  npm start
  ```

#### C. Variables de Entorno

Agregar en "Environment":

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `8000`
- [ ] `DATABASE_URL` = `[NeonTech URL]`
- [ ] `COHERE_API_KEY` = `[Tu API Key]`
- [ ] `FRONTEND_URL` = `https://asb-delta.vercel.app`

#### D. Plan

- [ ] Seleccionar plan (Free tier disponible)
- [ ] Confirmar configuración

### 3. Deploy

- [ ] Click "Create Web Service"
- [ ] Esperar build (5-10 minutos)
- [ ] Verificar logs de build
- [ ] Build exitoso

### 4. Verificación Post-Deploy

#### A. Health Check

```bash
curl https://tu-app.onrender.com/health
```

Verificar respuesta:
```json
{
  "status": "ok",
  "version": "fase2",
  "database": "connected"
}
```

- [ ] Status: "ok"
- [ ] Version: "fase2"
- [ ] Database: "connected"
- [ ] Responde en <1 segundo

#### B. Endpoint de Generación

```bash
curl -X POST https://tu-app.onrender.com/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "redes sociales",
    "text": "Test de producción"
  }'
```

- [ ] Respuesta exitosa
- [ ] Historia generada
- [ ] validation.db: "ok"
- [ ] Tiempo de respuesta <3 segundos

#### C. Verificar Base de Datos

```bash
# Localmente con Prisma Studio apuntando a producción
DATABASE_URL="[NeonTech URL]" npx prisma studio
```

- [ ] Tabla stories visible
- [ ] Registros de prueba guardados
- [ ] Timestamps correctos
- [ ] Datos consistentes

### 5. Configurar Dominio (Opcional)

- [ ] Agregar dominio personalizado en Render
- [ ] Configurar DNS
- [ ] SSL automático configurado
- [ ] Verificar HTTPS funciona

## Post-Deployment

### 1. Monitoreo

- [ ] Configurar alertas en Render
- [ ] Verificar logs regularmente
- [ ] Monitorear métricas de BD en NeonTech
- [ ] Configurar uptime monitoring (UptimeRobot, etc.)

### 2. Documentación

- [ ] Actualizar README con URL de producción
- [ ] Documentar proceso de deployment
- [ ] Crear runbook para incidentes
- [ ] Compartir credenciales con equipo (seguro)

### 3. Testing en Producción

- [ ] Smoke tests
- [ ] Verificar todos los endpoints
- [ ] Probar con diferentes inputs
- [ ] Verificar persistencia
- [ ] Medir performance

### 4. Comunicación

- [ ] Notificar al equipo
- [ ] Actualizar documentación de proyecto
- [ ] Compartir URLs de producción
- [ ] Documentar cambios en changelog

## Rollback Plan

### Si algo sale mal:

1. **Revertir en Render**:
   - [ ] Ir a "Manual Deploy"
   - [ ] Seleccionar commit anterior
   - [ ] Deploy

2. **Revertir Migraciones**:
   ```bash
   # Conectar a BD de producción
   DATABASE_URL="[prod]" npx prisma migrate resolve --rolled-back [migration_name]
   ```

3. **Verificar Estado**:
   - [ ] Health check responde
   - [ ] BD funcional
   - [ ] Frontend conecta correctamente

## Checklist Final

### Antes de Marcar como Completo

- [ ] ✅ Deployment local funciona
- [ ] ✅ Deployment cloud funciona
- [ ] ✅ Deployment producción funciona
- [ ] ✅ Health check responde correctamente
- [ ] ✅ Endpoint de generación funciona
- [ ] ✅ Persistencia en BD funciona
- [ ] ✅ Frontend conecta correctamente
- [ ] ✅ Documentación actualizada
- [ ] ✅ Equipo notificado
- [ ] ✅ Monitoreo configurado

## Troubleshooting Rápido

### Error: "Can't reach database server"

```bash
# Verificar DATABASE_URL
echo $DATABASE_URL

# Verificar conexión
psql $DATABASE_URL -c "SELECT 1"
```

### Error: "Prisma Client not found"

```bash
# Regenerar cliente
npx prisma generate
```

### Error: "Migration failed"

```bash
# Ver estado
npx prisma migrate status

# Aplicar manualmente
npx prisma migrate deploy
```

### Error: "Port already in use"

```bash
# Cambiar PORT en .env
PORT=8001
```

## Recursos

- [Render Docs](https://render.com/docs)
- [NeonTech Docs](https://neon.tech/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Troubleshooting Guide](./doc/db/TROUBLESHOOTING.md)

---

**Última actualización**: Diciembre 2024  
**Versión**: 2.0.0 (Fase 2)
