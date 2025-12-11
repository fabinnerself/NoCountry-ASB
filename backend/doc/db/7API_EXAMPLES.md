# Ejemplos de API - AutoStory Builder

## Health Check

### Request

```bash
curl http://localhost:8000/health
```

### Response

```json
{
  "status": "ok",
  "version": "fase2",
  "timestamp": "2024-12-10T15:30:00.000Z",
  "database": "connected",
  "services": {
    "api": "ok",
    "cohere": "configured"
  }
}
```

## Generar Historia

### Ejemplo 1: Historia Inspiracional (Solo Texto)

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "redes sociales",
    "text": "Un dragón en las montañas descubre su verdadero propósito"
  }'
```

**Response:**

```json
{
  "success": true,
  "story": "En las cumbres nevadas, un dragón solitario buscaba su lugar en el mundo. Día tras día, observaba cómo las águilas surcaban el cielo y los ríos tallaban valles. Hasta que un día comprendió: su fuego no era para destruir, sino para iluminar el camino de otros. Hoy, ese dragón guía a viajeros perdidos, demostrando que nuestro mayor poder está en ayudar a los demás a encontrar su camino.",
  "metadata": {
    "tone": "inspiracional",
    "format": "redes sociales",
    "hasImage": false,
    "processingTimeMs": 1234
  },
  "validation": {
    "input": "ok",
    "generation": "ok",
    "db": "ok"
  }
}
```

### Ejemplo 2: Historia Educativa (Con Imagen)

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -F "tone=educativo" \
  -F "format=post" \
  -F "text=Proyecto de reciclaje comunitario" \
  -F "image=@/path/to/image.jpg" \
  -F "id_usuario=user123"
```

**Response:**

```json
{
  "success": true,
  "story": "El proyecto de reciclaje comunitario implementó una metodología en tres fases. Primera fase: diagnóstico participativo con 50 familias. Segunda fase: capacitación técnica sobre separación de residuos. Tercera fase: implementación de puntos de recolección. Resultados: 75% de reducción en residuos no reciclables, 3 microempresas verdes creadas, y 200 personas capacitadas. El enfoque educativo demostró que el conocimiento técnico combinado con participación comunitaria maximiza el impacto sostenible.",
  "metadata": {
    "tone": "educativo",
    "format": "post",
    "hasImage": true,
    "processingTimeMs": 1567
  },
  "validation": {
    "input": "ok",
    "generation": "ok",
    "db": "ok"
  }
}
```

### Ejemplo 3: Historia Técnica

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "tecnico",
    "format": "post",
    "text": "Implementación de arquitectura cloud-first con microservicios"
  }'
```

**Response:**

```json
{
  "success": true,
  "story": "La migración a arquitectura cloud-first siguió un enfoque incremental. Fase 1: Containerización con Docker (3 semanas). Fase 2: Orquestación con Kubernetes (2 semanas). Fase 3: Implementación de CI/CD con GitHub Actions. Métricas: 99.9% uptime, 40% reducción en costos de infraestructura, 60% mejora en tiempo de deployment. Stack: AWS EKS, PostgreSQL RDS, Redis ElastiCache. La arquitectura de microservicios permitió escalado independiente por servicio, optimizando recursos según demanda real.",
  "metadata": {
    "tone": "tecnico",
    "format": "post",
    "hasImage": false,
    "processingTimeMs": 1890
  },
  "validation": {
    "input": "ok",
    "generation": "ok",
    "db": "ok"
  }
}
```

### Ejemplo 4: Historia con Error de BD (Degradación Elegante)

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "historia",
    "text": "Una maestra que transforma vidas"
  }'
```

**Response (cuando falla la BD):**

```json
{
  "success": true,
  "story": "María llegó a la escuela rural con una maleta llena de sueños y un corazón dispuesto a cambiar vidas. Los primeros días fueron difíciles: aulas sin recursos, niños desmotivados, familias escépticas. Pero María no se rindió. Cada mañana llegaba con una sonrisa y una nueva idea. Creó una biblioteca con libros donados, organizó talleres para padres, convirtió el patio en un laboratorio de ciencias naturales. Tres años después, su escuela es un faro de esperanza. Sus estudiantes no solo aprenden matemáticas y lenguaje, sino que descubren que pueden soñar en grande. María demostró que un maestro comprometido puede transformar una comunidad entera.",
  "metadata": {
    "tone": "inspiracional",
    "format": "historia",
    "hasImage": false,
    "processingTimeMs": 2100
  },
  "validation": {
    "input": "ok",
    "generation": "ok",
    "db": "error",
    "message": "Error al guardar historia en base de datos"
  }
}
```

## Errores

### Error 400: Campos Requeridos Faltantes

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Una historia sin tone ni format"
  }'
```

**Response:**

```json
{
  "success": false,
  "error": "Los campos tone y format son requeridos"
}
```

### Error 400: Tono Inválido

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "romantico",
    "format": "post",
    "text": "Una historia"
  }'
```

**Response:**

```json
{
  "success": false,
  "error": "Tono inválido. Valores permitidos: inspiracional, educativo, tecnico"
}
```

### Error 400: Formato Inválido

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "novela",
    "text": "Una historia"
  }'
```

**Response:**

```json
{
  "success": false,
  "error": "Formato inválido. Valores permitidos: historia, post, redes sociales, otro"
}
```

### Error 500: Error de Generación

**Request:**

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "post",
    "text": "Historia de prueba"
  }'
```

**Response (cuando falla Cohere API):**

```json
{
  "success": false,
  "error": "Error al generar la historia con IA",
  "metadata": {
    "processingTimeMs": 5000
  }
}
```

## Valores Permitidos

### Tone (Tono)

- `inspiracional`: Historias emotivas y motivacionales
- `educativo`: Historias didácticas con aprendizajes
- `tecnico`: Historias con datos y métricas técnicas

### Format (Formato)

- `redes sociales`: 80-120 palabras, estilo conversacional
- `post`: 150-250 palabras, estructura completa
- `historia`: 200-350 palabras, narrativa extensa
- `otro`: Formato personalizado

## Ejemplos con cURL

### Windows (PowerShell)

```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:8000/health" -Method Get

# Generar historia
$body = @{
    tone = "inspiracional"
    format = "redes sociales"
    text = "Un dragón en las montañas"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/generate-story" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Linux/macOS

```bash
# Health check
curl http://localhost:8000/health

# Generar historia
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "redes sociales",
    "text": "Un dragón en las montañas"
  }'
```

## Ejemplos con JavaScript/TypeScript

### Fetch API

```typescript
// Health check
const healthResponse = await fetch('http://localhost:8000/health');
const health = await healthResponse.json();
console.log(health);

// Generar historia
const response = await fetch('http://localhost:8000/api/generate-story', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tone: 'inspiracional',
    format: 'redes sociales',
    text: 'Un dragón en las montañas'
  })
});

const data = await response.json();
console.log(data.story);
```

### Axios

```typescript
import axios from 'axios';

// Health check
const health = await axios.get('http://localhost:8000/health');
console.log(health.data);

// Generar historia
const response = await axios.post('http://localhost:8000/api/generate-story', {
  tone: 'inspiracional',
  format: 'redes sociales',
  text: 'Un dragón en las montañas'
});

console.log(response.data.story);
```

### Con imagen (FormData)

```typescript
const formData = new FormData();
formData.append('tone', 'educativo');
formData.append('format', 'post');
formData.append('text', 'Proyecto de reciclaje');
formData.append('image', fileInput.files[0]);

const response = await fetch('http://localhost:8000/api/generate-story', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.story);
```

## Ejemplos con Python

### Requests

```python
import requests

# Health check
response = requests.get('http://localhost:8000/health')
print(response.json())

# Generar historia
payload = {
    'tone': 'inspiracional',
    'format': 'redes sociales',
    'text': 'Un dragón en las montañas'
}

response = requests.post(
    'http://localhost:8000/api/generate-story',
    json=payload
)

data = response.json()
print(data['story'])
```

### Con imagen

```python
import requests

files = {
    'image': open('image.jpg', 'rb')
}

data = {
    'tone': 'educativo',
    'format': 'post',
    'text': 'Proyecto de reciclaje'
}

response = requests.post(
    'http://localhost:8000/api/generate-story',
    files=files,
    data=data
)

print(response.json()['story'])
```

## Testing con Postman

Ver colección completa en: `doc/db/postman/autostory-fase2.postman_collection.json`

### Importar Colección

1. Abrir Postman
2. Click en "Import"
3. Seleccionar archivo JSON
4. Configurar variables de entorno

### Variables de Entorno

```json
{
  "base_url": "http://localhost:8000",
  "cohere_api_key": "tu_api_key"
}
```

---

**Última actualización**: Diciembre 2024
