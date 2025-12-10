# API Reference - AutoStory Builder Phase 1

## Overview

AutoStory Builder API permite generar historias narrativas profesionales a partir de imágenes y contexto textual usando IA.

**Base URL:** `http://localhost:8000/api`

**Version:** 1.0.0

---

## Endpoints

### POST /generate-story

Genera una historia basada en imagen, tono, formato y texto contextual.

#### Request

**Content-Type:** `multipart/form-data`

**Parameters:**

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `image` | File | Yes | Imagen de contexto | JPG/PNG/WEBP, <10MB |
| `tone` | String | Yes | Tono narrativo | INSPIRACIONAL \| EDUCATIVO \| TÉCNICO |
| `format` | String | Yes | Formato de salida | HISTORIA \| POST \| REDES_SOCIALES \| OTRO |
| `text` | String | Yes | Contexto base | 20-1000 caracteres |

#### Response (200 OK)

```json
{
  "success": "ok",
  "generatedStory": "En una comunidad rural, una joven emprendedora transformó su pasión...",
  "validation": {
    "tone": "ok",
    "format": "ok",
    "text": "ok",
    "image": "ok"
  },
  "metadata": {
    "wordCount": 95,
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "imageProcessed": true,
    "imageCaptions": [
      "Mujer joven emprendedora con laptop",
      "Espacio de trabajo moderno",
      "Productos artesanales"
    ],
    "generatedAt": "2025-12-09T14:30:22.000Z",
    "model": "command-r-plus",
    "processingTimeMs": 3847
  }
}
```

#### Error Responses

**400 Bad Request - Validation Error**

```json
{
  "success": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Valor de tone no válido: INVALIDO. Permitidos: INSPIRACIONAL, EDUCATIVO, TÉCNICO",
    "details": {
      "field": "tone",
      "received": "INVALIDO"
    },
    "timestamp": "2025-12-09T14:30:22.000Z"
  }
}
```

**413 Payload Too Large**

```json
{
  "success": "error",
  "error": {
    "code": "FILE_ERROR",
    "message": "Archivo excede tamaño máximo de 10 MB. Recibido: 15.2 MB",
    "timestamp": "2025-12-09T14:30:22.000Z"
  }
}
```

**500 Internal Server Error**

```json
{
  "success": "error",
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Error procesando solicitud. Por favor reintenta.",
    "timestamp": "2025-12-09T14:30:22.000Z"
  }
}
```

---

## cURL Examples

### Successful Request

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -F "tone=INSPIRACIONAL" \
  -F "format=REDES_SOCIALES" \
  -F "text=Joven emprendedora superó obstáculos para crear su empresa" \
  -F "image=@path/to/image.jpg"
```

### With Different Tone and Format

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -F "tone=EDUCATIVO" \
  -F "format=POST" \
  -F "text=Aprende sobre desarrollo sostenible y su impacto en comunidades" \
  -F "image=@path/to/image.png"
```

---

## Rate Limiting

- **Development:** No limits
- **Production:** TBD (depends on Cohere plan)

---

## Authentication

**Phase 1:** No authentication required  
**Phase 2:** JWT-based authentication

---

## CORS

Allowed origins:
- `http://localhost:5173` (development)
- Production frontend URL (configurable via env)

---

## Headers

**Required:**
- `Content-Type: multipart/form-data`

**Optional:**
- None for Phase 1

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 413 | Payload Too Large (file > 10MB) |
| 500 | Internal Server Error |
| 504 | Gateway Timeout |

---

## Models Used

- **Vision:** Cohere Command-R-Plus (image analysis)
- **LLM:** Cohere Command-R-Plus (story generation)

---

## Performance

- **Average Response Time:** 3-5 seconds
- **Image Processing:** 1-2 seconds
- **Story Generation:** 1-2 seconds
- **Timeout:** 30 seconds

---

## Limitations

- Max file size: 10 MB
- Supported formats: JPG, PNG, WEBP
- Max text length: 1000 characters
- No persistence (Phase 1)
- No batch processing (Phase 1)
