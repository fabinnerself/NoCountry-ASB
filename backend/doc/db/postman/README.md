# Colección de Postman - AutoStory Builder

## 📦 Archivos Incluidos

- `autostory-fase2.postman_collection.json` - Colección con todos los endpoints
- `autostory-environments.postman_environment.json` - Variables de entorno

## 🚀 Cómo Importar en Postman

### 1. Importar la Colección

1. Abrir Postman
2. Click en **"Import"** (esquina superior izquierda)
3. Seleccionar **"Upload Files"**
4. Navegar a `backend/doc/db/postman/`
5. Seleccionar `autostory-fase2.postman_collection.json`
6. Click **"Import"**

### 2. Importar Variables de Entorno (Opcional)

1. Click en **"Import"** nuevamente
2. Seleccionar `autostory-environments.postman_environment.json`
3. Click **"Import"**
4. En la esquina superior derecha, seleccionar el ambiente **"AutoStory Environments"**

### 3. Configurar Variables

Si no importaste el archivo de entorno, configura manualmente:

1. Click en el ícono de ⚙️ (Settings) en la esquina superior derecha
2. Click en **"Environments"**
3. Click en **"Add"** para crear nuevo ambiente
4. Nombre: `AutoStory Local`
5. Agregar variable:
   - **Variable**: `base_url`
   - **Initial Value**: `http://localhost:8000`
   - **Current Value**: `http://localhost:8000`
6. Click **"Save"**
7. Seleccionar el ambiente en el dropdown superior derecho

## 📋 Endpoints Incluidos

### 1. Health Check
- **Método**: GET
- **URL**: `{{base_url}}/health`
- **Descripción**: Verifica el estado del servidor y BD

### 2. Generate Story - Inspiracional
- **Método**: POST
- **URL**: `{{base_url}}/api/generate-story`
- **Body**: JSON con tone, format, text
- **Descripción**: Historia inspiracional completa

### 3. Generate Story - Educativo
- **Método**: POST
- **Descripción**: Historia educativa en formato post

### 4. Generate Story - Técnico
- **Método**: POST
- **Descripción**: Historia técnica con datos y métricas

### 5. Generate Story - Redes Sociales
- **Método**: POST
- **Descripción**: Historia corta para redes sociales (80-120 palabras)

### 6. Generate Story - Con Imagen
- **Método**: POST
- **Body**: Form-data con archivo de imagen
- **Descripción**: Historia con imagen adjunta

### 7. Generate Story - Con ID Usuario
- **Método**: POST
- **Descripción**: Historia asociada a un usuario

### 8. Ejemplos de Errores
- Sin tone (campo requerido)
- Tone inválido
- Format inválido

## 🎯 Cómo Usar

### Probar Health Check

1. Asegúrate de que el servidor esté corriendo: `npm run dev`
2. En Postman, selecciona **"Health Check"**
3. Click **"Send"**
4. Deberías ver:
   ```json
   {
     "status": "ok",
     "version": "fase2",
     "database": "connected" // o "disconnected" si no hay BD
   }
   ```

### Generar una Historia

1. Selecciona cualquier request de **"Generate Story"**
2. Revisa el Body (puedes modificar el texto)
3. Click **"Send"**
4. Verás la respuesta con la historia generada

### Generar Historia con Imagen

1. Selecciona **"Generate Story - Con Imagen"**
2. En el Body, tab **"form-data"**
3. En la fila de **"image"**, click en **"Select Files"**
4. Selecciona una imagen (JPG, PNG, GIF)
5. Click **"Send"**

## 🔧 Configurar para Diferentes Ambientes

### Local (Desarrollo)
```
base_url = http://localhost:8000
```

### Producción (Render)
```
base_url = https://nocountry-asb.onrender.com
```

Para cambiar:
1. Click en el ambiente activo (esquina superior derecha)
2. Editar el valor de `base_url`
3. Guardar

## 📝 Valores Permitidos

### Tone (Tono)
- `INSPIRACIONAL` o `inspiracional`
- `EDUCATIVO` o `educativo`
- `TÉCNICO` o `tecnico`

### Format (Formato)
- `HISTORIA` o `historia` - 200-350 palabras
- `POST` o `post` - 150-250 palabras
- `REDES SOCIALES` o `redes sociales` - 80-120 palabras
- `OTRO` o `otro` - Formato personalizado

## 🎨 Personalizar Requests

Puedes modificar cualquier request:

1. Click derecho en el request
2. **"Duplicate"** para crear una copia
3. Modificar el Body con tu propio texto
4. Renombrar el request
5. Guardar

## 📊 Ver Respuestas

Postman muestra:
- **Status Code**: 200 (éxito), 400 (error de validación), 500 (error del servidor)
- **Body**: JSON con la historia generada
- **Headers**: Información de la respuesta
- **Time**: Tiempo de respuesta en ms

### Respuesta Exitosa

```json
{
  "success": true,
  "story": "Historia generada por la IA...",
  "metadata": {
    "tone": "INSPIRACIONAL",
    "format": "HISTORIA",
    "hasImage": false,
    "processingTimeMs": 1234
  },
  "validation": {
    "input": "ok",
    "generation": "ok",
    "db": "ok"  // "error" si no hay BD configurada
  }
}
```

### Respuesta con Error

```json
{
  "success": false,
  "error": "Los campos tone y format son requeridos"
}
```

## 🐛 Troubleshooting

### Error: "Could not get any response"
- Verifica que el servidor esté corriendo: `npm run dev`
- Verifica la URL: `http://localhost:8000`

### Error: "ECONNREFUSED"
- El servidor no está corriendo
- Inicia el servidor: `cd backend && npm run dev`

### Error: 400 Bad Request
- Verifica que el Body tenga `tone` y `format`
- Verifica que los valores sean válidos

### Error: 500 Internal Server Error
- Revisa los logs del servidor
- Verifica que `COHERE_API_KEY` esté configurada en `.env`

## 📚 Recursos Adicionales

- [Documentación de API](../API_EXAMPLES.md)
- [Guía de Setup](../SETUP.md)
- [Troubleshooting](../TROUBLESHOOTING.md)

---

**Última actualización**: Diciembre 2024
