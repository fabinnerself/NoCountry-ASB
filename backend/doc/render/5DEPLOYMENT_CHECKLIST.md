# Checklist Pre-Despliegue a Render

## ✅ Preparación del Código (Completado)

- [x] Dockerfile creado con multi-stage build
- [x] render.yaml configurado
- [x] .dockerignore optimizado
- [x] package.json con scripts correctos
- [x] tsconfig.json listo para producción
- [x] Variables de entorno documentadas en .env.example
- [x] Puerto por defecto actualizado a 10000

## ✅ Código a Revisar Localmente

### 1. Testear el Build

```bash
cd backend
npm run build
```

Debe compilar sin errores. Deberías ver una carpeta `dist/` con los archivos compilados.

### 2. Testear Localmente

```bash
# En terminal 1
npm run dev

# En terminal 2
curl http://localhost:10000/health
```

Deberías ver:
```json
{"status":"ok","message":"AutoStory Builder API - Fase 0"}
```

### 3. Testear los Endpoints Principales

```bash
# Story generation endpoint
curl -X POST http://localhost:10000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{"text":"Una historia interesante","format":"HISTORIA"}'
```

## 📝 Pasos para Render

### 1. Commit y Push

```bash
git add .
git commit -m "Setup for Render deployment"
git push origin main
```

### 2. En Render Dashboard

1. **New +** → **Web Service**
2. Selecciona repo: `NoCountry-ASB` (o tu repo)
3. **Runtime**: Node
4. **Build Command**: (auto-detectado de render.yaml)
5. **Start Command**: (auto-detectado de render.yaml)

### 3. Variables de Entorno Críticas en Render

Estas DEBEN estar configuradas:

```
COHERE_API_KEY=tu_clave_aqui (REQUERIDA)
FRONTEND_URL=https://tu-vercel-app.vercel.app (IMPORTANTE para CORS)
DATABASE_URL=postgresql://... (si usas BD)
NODE_ENV=production (IMPORTANTE)
```

Las demás tienen defaults razonables.

### 4. Esperar Deploy

- **Tiempo estimado**: 5-10 minutos
- **Monitorea los logs** en el dashboard de Render

### 5. Verificar

```
GET https://tu-app.onrender.com/health
```

Debe retornar status 200 con el mensaje.

## 🔗 Integración Frontend

Una vez que el backend esté en Render:

1. Obtén la URL: `https://tu-app.onrender.com`
2. En Vercel, configura variable de entorno:
   - `VITE_API_URL=https://tu-app.onrender.com`
3. Actualiza código frontend para usar esa variable
4. Redeploy automático en Vercel

## 🚨 Problemas Comunes

| Problema | Causa | Solución |
|----------|-------|----------|
| Build falla | Variables de entorno faltantes | Verifica render.yaml, especialmente COHERE_API_KEY |
| "Cannot connect to API" | CORS configurado mal | Actualiza FRONTEND_URL en Render |
| 503 Service Unavailable | Cold start o falta de recursos | Plan Free puede ser lento, considera Pro |
| Logs vacíos | Render aún compilando | Espera más tiempo |

## 📊 Monitoreo Post-Deploy

Después de desplegar, revisa regularmente:

1. **Logs** - en el dashboard
2. **Metrics** - CPU, memoria, requests
3. **Health endpoint** - `/health` debe estar siempre disponible
4. **Errores** - revisa si hay 5xx

## 📞 Soporte

- Docs de Render: https://render.com/docs
- Docs de Express: https://expressjs.com/
- Prisma (si usas BD): https://www.prisma.io/docs/

---

**Status**: ✅ Backend listo para Render
**Próximo paso**: Hacer push a GitHub y crear Web Service en Render
