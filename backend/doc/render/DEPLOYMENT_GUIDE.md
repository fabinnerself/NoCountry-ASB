# Guía de Despliegue en Render

## Requisitos Previos

1. **Cuenta en Render** - https://render.com
2. **Variables de entorno configuradas**
3. **El repositorio debe estar en GitHub**

## Pasos para Desplegar

### 1. Preparar el Repositorio

Asegúrate de que todos los cambios estén commiteados:

```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### 2. Crear un Nuevo Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **New +** → **Web Service**
3. Selecciona tu repositorio (conecta GitHub si es necesario)
4. Configura el servicio:

   - **Name**: `autostory-backend` (o el nombre que prefieras)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Elige según necesidades (Free o Paid)

### 3. Configurar Variables de Entorno

En la sección **Environment Variables** del dashboard de Render, añade:

```
NODE_ENV=production
PORT=10000
COHERE_API_KEY=tu_clave_cohere_aqui
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/autostory_db?schema=public
FRONTEND_URL=https://tu-frontend.vercel.app
FRONTEND_URL_LOCAL=http://localhost:5173
COHERE_MODEL=command-r7b-12-2024
COHERE_TEMPERATURE=0.7
COHERE_MAX_TOKENS=500
TEXT_MIN_LENGTH=20
TEXT_MAX_LENGTH=1000
STORY_MIN_WORDS=80
STORY_MAX_WORDS=120
```

### 4. Base de Datos PostgreSQL

Tienes dos opciones:

#### Opción A: PostgreSQL en Render
1. Ve a **New +** → **PostgreSQL**
2. Nombre: `autostory-db`
3. Copia la DATABASE_URL y úsala en tu Web Service

#### Opción B: Usar una BD existente
- Reemplaza `DATABASE_URL` con tu conexión existente

### 5. Migrations de Prisma (Opcional - si usas BD)

Si necesitas ejecutar migraciones:

1. Añade en **Build Command**:
   ```
   npm install && npm run build && npx prisma migrate deploy
   ```

### 6. Desplegar

1. Click en **Create Web Service**
2. Render iniciará el build automáticamente
3. Monitorea el deploy en los logs

### 7. Verificar el Despliegue

Una vez completado:

- Accede a `https://tu-app.onrender.com/health`
- Deberías ver: `{"status":"ok","message":"AutoStory Builder API - Fase 0"}`

## URLs Importantes

- **API Base**: `https://tu-app.onrender.com`
- **Health Check**: `https://tu-app.onrender.com/health`
- **Story Generation**: `https://tu-app.onrender.com/api/generate-story`

## Solución de Problemas

### Error: "Missing environment variable"
- Verifica que todas las variables en `config/env.ts` estén en Render

### Error: "Port already in use"
- Render asigna automáticamente el puerto. No hardcodees puertos en el código.

### Prisma Client no encuentra el binario
- El Dockerfile y `render.yaml` incluyen la configuración necesaria

### CORS Errors
- Actualiza `FRONTEND_URL` en Render con la URL correcta de tu frontend en Vercel

## Logs

Para ver los logs en tiempo real:

1. Ve al dashboard de tu servicio en Render
2. Selecciona **Logs** en la barra superior

## Auto-Deploy

Cada push a `main` en GitHub generará un nuevo deploy automáticamente.

## Monitoreo

- Visita regularmente el dashboard para monitorear:
  - CPU usage
  - Memory usage
  - Request rate
  - Error rates

---

**Nota**: Render cancela servicios gratuitos después de 15 minutos sin actividad. Para producción, considera un plan pagado.
