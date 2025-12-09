# 🚀 Guía de Despliegue - AutoStory Backend en Render

## TL;DR (3 minutos)

1. **Commit & Push**
   ```bash
   git add .
   git commit -m "Setup Render deployment"
   git push origin main
   ```

2. **Crear Web Service en Render**
   - https://dashboard.render.com/ → New Web Service
   - Selecciona tu repo
   - Espera deploy (~5-10 min)

3. **Configurar Variables**
   - `COHERE_API_KEY` = Tu clave de Cohere
   - `FRONTEND_URL` = Tu URL de Vercel

4. **Verificar**
   ```bash
   curl https://tu-app.onrender.com/health
   ```

---

## ¿Qué se Cambió en el Código?

✅ **Dockerfile** - Containerización optimizada
✅ **render.yaml** - Configuración automática de Render
✅ **Port 10000** - Standard de Render (cambiado de 8000)
✅ **.env.example** - Variables documentadas
✅ **Documentación** - 7 guías diferentes

El código backend **funciona exactamente igual**, solo está preparado para producción.

---

## Archivos de Documentación

| Archivo | Para Quién | Lectura |
|---------|-----------|---------|
| **STATUS_REPORT.md** | Verificar que todo está listo | 5 min |
| **RENDER_SETUP.md** | Guía rápida de despliegue | 5 min |
| **COMMANDS_READY_TO_COPY.md** | Copiar comandos listos | 3 min |
| **DEPLOYMENT_CHECKLIST.md** | Verificaciones técnicas | 10 min |
| **DEPLOYMENT_GUIDE.md** | Guía completa y detallada | 15 min |
| **FRONTEND_INTEGRATION.md** | Conectar con Vercel | 5 min |
| **SETUP_SUMMARY.md** | Resumen de cambios | 5 min |

**Recomendado**: Lee STATUS_REPORT.md primero.

---

## Requisitos

- [x] Código funcional localmente ✅
- [x] Repository en GitHub ✅
- [x] Cuenta en Render (gratis) 
- [x] COHERE_API_KEY
- [x] URL del frontend en Vercel

---

## Proceso Paso a Paso

### Paso 1: Testea Localmente

```bash
cd backend
npm run build   # Debe compilar sin errores
npm start       # Puerto 10000
```

Accede a: `http://localhost:10000/health`

### Paso 2: Push a GitHub

```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### Paso 3: Crea Web Service en Render

1. Ve a https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Conecta GitHub (si no está ya conectado)
4. Selecciona repo `NoCountry-ASB`
5. Configura:
   - **Name**: `autostory-backend` (o tu nombre)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Click **Create Web Service**

Render detectará `render.yaml` automáticamente.

### Paso 4: Configura Variables de Entorno

En el dashboard de Render, ve a **Environment Variables** y añade:

```
COHERE_API_KEY=tu_clave_aqui
FRONTEND_URL=https://tu-vercel-app.vercel.app
NODE_ENV=production
```

Click **Save** → Render redeploy automático (~5-10 min)

### Paso 5: Verifica el Deploy

Una vez que veas **"Live"** en el dashboard:

```bash
curl https://tu-app.onrender.com/health
```

Deberías ver:
```json
{"status":"ok","message":"AutoStory Builder API - Fase 0"}
```

### Paso 6: Actualiza el Frontend

En tu proyecto de Vercel:

1. **Settings** → **Environment Variables**
2. Añade: `VITE_API_URL=https://tu-app.onrender.com`
3. **Redeploy**

En tu código frontend, úsalo así:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

---

## URLs Post-Deploy

```
Health Check:     https://tu-app.onrender.com/health
API Base:         https://tu-app.onrender.com/api
Story Generation: https://tu-app.onrender.com/api/generate-story
```

---

## Troubleshooting

### ❌ Build falla
**Causa:** Variables de entorno faltantes o error de compilación

**Solución:**
1. Verifica logs en Render dashboard
2. Asegúrate que `COHERE_API_KEY` está configurada
3. Testa build local: `npm run build`

### ❌ CORS errors
**Causa:** `FRONTEND_URL` incorrecta en Render

**Solución:**
1. Ve a Environment Variables en Render
2. Verifica que `FRONTEND_URL` tiene:
   - `https://` (no http)
   - URL correcta de Vercel
   - Sin `/` al final

### ❌ 503 Service Unavailable
**Causa:** Cold start (especialmente Free plan)

**Solución:**
- Espera 30 segundos e intenta de nuevo
- Para producción considera plan Starter

### ❌ "Cannot GET /"
**Causa:** Intentaste acceder a raíz del API

**Solución:**
- Usa `/health` o `/api/generate-story`
- API no tiene ruta raíz

---

## Monitoreo

Después del deploy, revisa regularmente:

1. **Logs** - Dashboard → Logs (arriba a la derecha)
2. **Metrics** - CPU, memoria, requests
3. **Health** - Visita `/health` endpoint cada tanto
4. **Errors** - Busca errores 5xx

---

## Costos

| Plan | Costo | Características |
|------|-------|-----------------|
| **Free** | $0 | Cold starts después de 15 min, bueno para testing |
| **Starter** | $7/mes | Sin pauses, mejor para producción |
| **Standard** | $25/mes | Más recursos, 99.99% uptime |

Para desarrollo usa Free. Para producción con usuarios reales, considera Starter.

---

## Siguiente Fase (Fase 1)

Cuando estés listo para Fase 1 (con base de datos):

1. Crea PostgreSQL en Render
2. Obtén `DATABASE_URL`
3. Configura en Environment Variables
4. Actualiza build command para migrations:
   ```
   npm install && npm run build && npx prisma migrate deploy
   ```

---

## ¿Necesitas Ayuda?

1. **Documentes en esta carpeta** - Empieza aquí
2. **Render Docs** - https://render.com/docs
3. **Logs en Render** - Información detallada del error
4. **Validaciones locales** - `npm run build`, `npm start`

---

## Checklist Final

```
✅ npm run build funciona localmente
✅ npm start funciona en puerto 10000
✅ /health endpoint responde
✅ Código pushed a GitHub
✅ Web Service creado en Render
✅ COHERE_API_KEY configurada
✅ FRONTEND_URL configurada
✅ Deploy completado (Live status)
✅ Health endpoint responde en URL de Render
✅ Frontend apunta a nueva URL
✅ CORS funciona desde frontend
```

---

**Status**: ✅ Listo para desplegar
**Complejidad**: Baja
**Tiempo estimado**: 15-20 minutos

¡Adelante! 🚀
