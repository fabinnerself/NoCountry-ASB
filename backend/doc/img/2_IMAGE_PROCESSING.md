# Image Processing - AutoStory Builder Phase 1

## Overview

La Fase 1 introduce procesamiento de imágenes usando IA para extraer contexto visual y enriquecer la generación de historias.

---

## Supported Formats

### Formats Allowed

| Format | MIME Type | Extension | Max Size |
|--------|-----------|-----------|----------|
| JPEG | `image/jpeg` | .jpg, .jpeg | 10 MB |
| PNG | `image/png` | .png | 10 MB |
| WEBP | `image/webp` | .webp | 10 MB |

### Why These Formats?

- **JPEG:** Universal compatibility, good compression
- **PNG:** Lossless quality, transparency support
- **WEBP:** Modern format, excellent compression

### Formats NOT Supported (Phase 1)

- GIF (animation handling complexity)
- AVIF (limited browser support)
- SVG (vector graphics, different processing)
- TIFF (large file sizes)

---

## Image Upload Flow

```
┌──────────────┐
│ Client sends │
│ multipart    │
│ form-data    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ Multer Middleware        │
│ - Validates MIME type    │
│ - Validates size (<10MB) │
│ - Stores in memory       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Zod Schema Validation    │
│ - Validates buffer       │
│ - Validates mimetype     │
│ - Validates size         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ ImageAnalyzerService     │
│ - Converts to base64     │
│ - Sends to Cohere API    │
│ - Extracts captions      │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Captions Array           │
│ ["caption1", "caption2"] │
└──────────────────────────┘
```

---

## Caption Extraction

### Process

1. **Image Encoding:**
   ```typescript
   const base64Image = buffer.toString('base64');
   ```

2. **API Call:**
   ```typescript
   const response = await cohereClient.chat({
     model: 'command-r-plus',
     message: 'Analiza esta imagen y proporciona 3-5 descripciones...',
     temperature: 0.3
   });
   ```

3. **Caption Parsing:**
   ```typescript
   const captions = response.text
     .split('\n')
     .map(line => line.trim())
     .filter(line => line.length > 0)
     .slice(0, 5);
   ```

### Caption Quality

**Good Captions (Specific):**
- ✅ "Mujer joven emprendedora con laptop en espacio moderno"
- ✅ "Productos artesanales sobre mesa de madera"
- ✅ "Espacio de trabajo creativo con plantas"

**Poor Captions (Too Generic):**
- ❌ "Imagen de persona"
- ❌ "Foto"
- ❌ "Espacio interior"

**Model Temperature:** 0.3 (low) para descripciones más precisas y menos creativas

---

## Integration with Story Generation

### Prompt Enhancement

**Without Image:**
```
Eres un escritor experto...

INFORMACIÓN BASE:
{text}

GENERA LA HISTORIA:
```

**With Image:**
```
Eres un escritor experto...

CONTEXTO VISUAL (de la imagen):
1. Mujer joven emprendedora con laptop
2. Productos artesanales sobre mesa
3. Espacio de trabajo creativo

INFORMACIÓN BASE:
{text}

GENERA LA HISTORIA:
```

### Example Output Comparison

**Text Only:**
> "María es una emprendedora que superó obstáculos para crear su empresa..."

**Text + Image Context:**
> "En su espacio de trabajo creativo, María transformó su pasión por la artesanía en oportunidad global. Con su laptop, conectó sus productos artesanales con clientes en cinco continentes..."

**Difference:** More specific, visual, and contextually rich

---

## Error Handling

### Validation Errors

**File Too Large:**
```json
{
  "code": "FILE_ERROR",
  "message": "Archivo excede tamaño máximo de 10 MB. Recibido: 15.2 MB"
}
```

**Invalid Format:**
```json
{
  "code": "FILE_ERROR",
  "message": "Tipo de archivo no válido: image/gif. Permitidos: image/jpeg, image/png, image/webp"
}
```

### API Errors

**Timeout:**
```typescript
const timeoutPromise = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('timeout')), 10000)
);

const result = await Promise.race([apiCall, timeoutPromise]);
```

**Retry Logic:**
```typescript
private async retryWithBackoff<T>(fn: () => Promise<T>, retries = 0): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries >= 3) throw error;
    
    const backoffMs = Math.pow(2, retries) * 1000;
    await sleep(backoffMs);
    return this.retryWithBackoff(fn, retries + 1);
  }
}
```

**Retry Schedule:**
- Retry 1: Wait 1 second
- Retry 2: Wait 2 seconds
- Retry 3: Wait 4 seconds
- After 3 retries: Fail

### Fallback Strategy

If image analysis fails after retries, use default captions:
```typescript
return [
  'Imagen proporcionada por el usuario',
  'Contexto visual relevante para la historia'
];
```

---

## Performance Considerations

### Memory Usage

- **Storage:** In-memory (Buffer)
- **No disk I/O** in Phase 1
- **Cleanup:** Automatic garbage collection after request

### Processing Time

| Step | Time | Optimization |
|------|------|--------------|
| Upload | <100ms | Memory storage |
| Validation | <50ms | Zod caching |
| Image Analysis | 1-3s | Parallel processing |
| Story Generation | 1-2s | Optimized prompts |
| **Total** | **3-5s** | Pipeline optimization |

### Optimization Techniques

1. **Parallel API Calls** (future):
   ```typescript
   const [captions, additionalData] = await Promise.all([
     analyzeImage(buffer),
     fetchMetadata()
   ]);
   ```

2. **Caption Caching** (Phase 2):
   ```typescript
   const cacheKey = hash(imageBuffer);
   if (cache.has(cacheKey)) {
     return cache.get(cacheKey);
   }
   ```

3. **Progressive Processing:**
   - Start story generation while finalizing captions

---

## Size Limitations

### Why 10MB Limit?

- **API Constraints:** Cohere API limits
- **Performance:** Avoid memory issues
- **User Experience:** Reasonable upload time
- **Security:** Prevent abuse

### Recommended Image Sizes

| Use Case | Recommended Size | Quality |
|----------|------------------|---------|
| Web upload | 1-3 MB | High |
| Mobile | 500KB - 1MB | Medium-High |
| Professional | 3-10 MB | Very High |

### Compression Tips

```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 1920x1080\> output.jpg

# Using online tools
tinypng.com
squoosh.app
```

---

## Security Considerations

### Validation

1. **MIME Type Check:**
   ```typescript
   fileFilter: (req, file, cb) => {
     if (VALID_IMAGE_MIMES.includes(file.mimetype)) {
       cb(null, true);
     } else {
       cb(new Error('Invalid file type'));
     }
   }
   ```

2. **Size Check:**
   ```typescript
   limits: {
     fileSize: MAX_FILE_SIZE
   }
   ```

3. **Buffer Validation:**
   ```typescript
   if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
     throw new Error('Invalid buffer');
   }
   ```

### Malicious File Protection

- **No file execution:** Files stay in memory, never saved
- **MIME validation:** Prevent non-image uploads
- **Size limits:** Prevent DoS attacks
- **No metadata parsing:** Avoid EXIF exploits (Phase 1)

---

## Alternatives Evaluated

### Google Cloud Vision API

**Pros:**
- Very accurate
- Rich metadata (labels, objects, text OCR)
- Free tier: 1000 requests/month

**Cons:**
- More complex setup
- Requires GCP account
- Slower response time (~2-3s)

**Decision:** Cohere chosen for unified provider

### Hugging Face Inference API

**Pros:**
- Free and open-source models
- Fast inference (<1s)
- No API key required

**Cons:**
- Less accurate captions
- Requires model selection
- Rate limiting on free tier

**Decision:** Cohere preferred for quality

---

## Future Enhancements (Phase 2+)

### Advanced Analysis

- **Object Detection:** Identify specific objects
- **OCR:** Extract text from images
- **Face Recognition:** Detect people (with consent)
- **Scene Classification:** Urban, rural, indoor, outdoor

### Metadata Extraction

- **EXIF Data:** Camera settings, location, timestamp
- **Color Analysis:** Dominant colors for theme matching
- **Composition:** Rule of thirds, golden ratio

### Multiple Images

- **Image Galleries:** Process 2-5 images per story
- **Image Comparison:** Before/after narratives
- **Slideshow Stories:** Sequential narrative

---

## Testing Images

### Test Image Requirements

For comprehensive testing, include:

1. **Various Subjects:**
   - People (portraits, groups)
   - Objects (products, tools)
   - Scenes (landscapes, interiors)

2. **Quality Levels:**
   - High resolution (>5MB)
   - Medium (1-3MB)
   - Low (~500KB)

3. **Formats:**
   - JPEG (most common)
   - PNG (with transparency)
   - WEBP (modern compression)

### Sample Test Images Location

```
tests/fixtures/testImages/
├── test-image.jpg        # Standard JPEG
├── test-image.png        # PNG with transparency
├── test-image.webp       # Modern WEBP
└── test-image-large.jpg  # >10MB for error testing
```

---

## Troubleshooting

### Common Issues

**Issue:** Captions are too generic  
**Solution:** Adjust temperature, improve prompt, use higher quality images

**Issue:** Timeout errors  
**Solution:** Check network, verify Cohere API status, reduce image size

**Issue:** Memory errors  
**Solution:** Reduce max file size, implement streaming (Phase 2)

**Issue:** Inconsistent captions  
**Solution:** Lower temperature, add more specific instructions in prompt
