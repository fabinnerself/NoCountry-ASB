# Cambios para conectar Frontend con Backend en Render

Una vez que tu backend esté desplegado en Render, necesitas actualizar el frontend para que apunte a la nueva URL.

## 1. Obtén tu URL de Render

Después de desplegar, tu URL será algo como:
```
https://autostory-backend.onrender.com
```

## 2. Actualiza el Frontend

### Opción A: Variables de Entorno (Recomendado)

En tu proyecto de frontend (Vercel), añade una variable de entorno:

1. Ve a **Vercel Dashboard** → Tu proyecto → **Settings** → **Environment Variables**
2. Añade:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://autostory-backend.onrender.com`

3. En tu código frontend (donde hagas las llamadas a la API):

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Uso:
const response = await fetch(`${API_URL}/api/generate-story`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### Opción B: Hardcodear en Desarrollo

Si estás testeando localmente, crea un `.env.local`:

```
VITE_API_URL=https://autostory-backend.onrender.com
```

## 3. Verifica CORS

En tu backend (Render), asegúrate de que `FRONTEND_URL` está configurado con tu URL de Vercel:

```
FRONTEND_URL=https://tu-proyecto.vercel.app
```

## 4. Testea

Después de actualizar:

1. **Local**: `npm run dev` en frontend
2. **Producción**: Push a main en frontend (Vercel redeploy automático)
3. Prueba hacer una solicitud a la API

## Debugging

Si ves errores CORS:

1. Verifica que `FRONTEND_URL` en Render incluya `https://`
2. No incluyas `/` al final de la URL
3. Espera 5 minutos para que Render recargue la config

---

**URLs Importantes**:
- Backend Render: `https://tu-backend.onrender.com`
- Frontend Vercel: `https://tu-proyecto.vercel.app`
- API Endpoint: `https://tu-backend.onrender.com/api/generate-story`
