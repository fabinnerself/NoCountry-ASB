# Despliegue en Render - Guía Rápida

## ¿Qué se hizo para preparar el backend para Render?

✅ **render.yaml** - Configuración automática para Render
✅ **Dockerfile** - Imagen Docker optimizada para producción
✅ **package.json** - Scripts de build y start configurados
✅ **Variables de entorno** - Todas configuradas en env.ts
✅ **.dockerignore** - Optimización de imagen
✅ **.env.example** - Documentación actualizada

## Pasos para Desplegar

### 1️⃣ Pushea los cambios a GitHub

```bash
git add .
git commit -m "Setup for Render deployment"
git push origin main
```

### 2️⃣ Ve a Render y crea un nuevo Web Service

**URL**: https://dashboard.render.com/

- Selecciona **New +** → **Web Service**
- Conecta tu repositorio GitHub
- Render debería detectar automáticamente el `render.yaml`

### 3️⃣ Configura las Variables de Entorno

En el dashboard de Render, añade **exactamente** estas variables:

```
COHERE_API_KEY=tu_clave_cohere
DATABASE_URL=tu_database_url (si usas BD)
FRONTEND_URL=https://tu-vercel-app.vercel.app
NODE_ENV=production
```

Las demás variables tienen defaults en el `render.yaml`.

### 4️⃣ Crea el servicio

Render iniciará el build automáticamente. Espera a que termine (5-10 minutos).

## Verificar que funciona

Una vez desplegado, visita:

```
https://tu-app.onrender.com/health
```

Deberías ver:
```json
{"status":"ok","message":"AutoStory Builder API - Fase 0"}
```

## URLs de Producción

- **Base URL**: `https://tu-app.onrender.com`
- **Health Check**: `https://tu-app.onrender.com/health`
- **API**: `https://tu-app.onrender.com/api`

## Actualizar el Frontend

En tu frontend (Vercel), cambia los URLs de la API:

**De:**
```
http://localhost:8000
```

**A:**
```
https://tu-app.onrender.com
```

Actualiza también el `.env` de Vercel si es necesario.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "Dockerfile not found" | Asegúrate de que `Dockerfile` esté en la raíz del `backend/` |
| "Build failed" | Revisa los logs en Render - probablemente falten variables de entorno |
| "Cannot GET /" | Eso es normal, la API no tiene ruta raíz. Usa `/health` o `/api/` |
| CORS errors | Actualiza `FRONTEND_URL` en Render con la URL correcta de Vercel |

## Costos

- **Plan Free**: App se pausa después de 15 min sin uso (cold start)
- **Plan Pro**: $7/mes - Sin pausas, mejor rendimiento

Para desarrollo puedes usar Free. Para producción, Pro es recomendado.

---

**¿Dudas?** Revisa los logs en tiempo real en el dashboard de Render.
