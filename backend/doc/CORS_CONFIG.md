# Configuración de CORS

## 🌐 Orígenes Permitidos

El backend está configurado para aceptar requests desde múltiples orígenes:

### Configuración Actual

```typescript
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,  // Local development
  process.env.FRONTEND_URL,         // Production (Vercel)
  'http://localhost:5173',          // Vite dev server
  'http://localhost:3000'           // Fallback
];
```

### Variables de Entorno

En `.env`:

```env
FRONTEND_URL_LOCAL=http://localhost:3000
FRONTEND_URL=https://asb-delta.vercel.app
```

## ✅ Orígenes Permitidos por Defecto

1. **Local Development**: `http://localhost:3000`
2. **Vite Dev Server**: `http://localhost:5173`
3. **Production (Vercel)**: `https://asb-delta.vercel.app`
4. **Sin origen**: Postman, curl, etc.

## 🔧 Configuración de CORS

### Opciones Habilitadas

- **credentials**: `true` - Permite cookies y headers de autenticación
- **methods**: `GET, POST, PUT, DELETE, OPTIONS`
- **allowedHeaders**: `Content-Type, Authorization`

### Validación de Origen

```typescript
origin: (origin, callback) => {
  // Permitir requests sin origin (Postman, curl)
  if (!origin) return callback(null, true);
  
  // Verificar si el origin está en la lista permitida
  if (allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    logger.warn(`CORS blocked origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  }
}
```

## 🧪 Probar CORS

### Desde Frontend Local

```javascript
// http://localhost:3000
fetch('http://localhost:8000/api/generate-story', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tone: 'inspiracional',
    format: 'post',
    text: 'Test desde local'
  })
})
```

✅ **Permitido** - `FRONTEND_URL_LOCAL` configurada

### Desde Frontend en Vercel

```javascript
// https://asb-delta.vercel.app
fetch('https://tu-backend.onrender.com/api/generate-story', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tone: 'inspiracional',
    format: 'post',
    text: 'Test desde Vercel'
  })
})
```

✅ **Permitido** - `FRONTEND_URL` configurada

### Desde Postman/curl

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{"tone":"inspiracional","format":"post","text":"Test"}'
```

✅ **Permitido** - Sin origen (requests de herramientas)

### Desde Origen No Permitido

```javascript
// https://otro-sitio.com
fetch('http://localhost:8000/api/generate-story', ...)
```

❌ **Bloqueado** - Origen no está en la lista

## 🔍 Logs de CORS

Cuando se bloquea un origen, verás en los logs:

```
WARN: CORS blocked origin: https://sitio-no-permitido.com
```

## ➕ Agregar Nuevos Orígenes

### Opción 1: Variables de Entorno

Agrega en `.env`:

```env
FRONTEND_URL_STAGING=https://staging.ejemplo.com
```

Actualiza `app.ts`:

```typescript
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_STAGING,
  // ...
];
```

### Opción 2: Hardcoded (no recomendado)

```typescript
const allowedOrigins = [
  'http://localhost:3000',
  'https://asb-delta.vercel.app',
  'https://nuevo-origen.com'  // Agregar aquí
];
```

## 🚀 Deployment

### Local Development

```env
FRONTEND_URL_LOCAL=http://localhost:3000
FRONTEND_URL=https://asb-delta.vercel.app
```

Backend acepta ambos orígenes.

### Production (Render)

Configurar en Render Dashboard:

```
FRONTEND_URL_LOCAL=http://localhost:3000
FRONTEND_URL=https://asb-delta.vercel.app
```

El backend en producción aceptará requests desde Vercel.

## 🐛 Troubleshooting

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Causa**: El origen no está en la lista permitida.

**Solución**:
1. Verificar que `FRONTEND_URL_LOCAL` y `FRONTEND_URL` estén en `.env`
2. Verificar que el origen coincida exactamente (con/sin trailing slash)
3. Reiniciar el servidor después de cambiar `.env`

### Error: "Preflight request doesn't pass"

**Causa**: El navegador envía OPTIONS request que no está permitido.

**Solución**: Ya está configurado en `methods: ['OPTIONS']`

### Frontend local no puede conectar

**Verificar**:
1. Backend corriendo: `npm run dev`
2. `.env` tiene `FRONTEND_URL_LOCAL=http://localhost:3000`
3. Frontend usa la URL correcta del backend

### Frontend en Vercel no puede conectar

**Verificar**:
1. Backend en Render tiene `FRONTEND_URL=https://asb-delta.vercel.app`
2. Frontend usa la URL correcta del backend en producción
3. Backend está desplegado y corriendo

## 📝 Ejemplo Completo

### Backend (.env)

```env
FRONTEND_URL_LOCAL=http://localhost:3000
FRONTEND_URL=https://asb-delta.vercel.app
```

### Frontend Local (config)

```javascript
const API_URL = 'http://localhost:8000';
```

### Frontend Vercel (config)

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tu-backend.onrender.com';
```

## 🔐 Seguridad

### Buenas Prácticas

✅ **Hacer**:
- Listar explícitamente orígenes permitidos
- Usar variables de entorno
- Loggear orígenes bloqueados
- Validar cada origen

❌ **No Hacer**:
- `origin: '*'` (permite cualquier origen)
- Hardcodear URLs en producción
- Permitir orígenes no confiables

### Configuración Segura Actual

```typescript
✅ Validación de origen
✅ Lista explícita de orígenes
✅ Logging de bloqueos
✅ Credentials habilitadas solo para orígenes permitidos
```

---

**Última actualización**: Diciembre 2024
