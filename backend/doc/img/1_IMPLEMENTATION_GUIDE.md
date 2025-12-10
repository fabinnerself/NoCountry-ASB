# Implementation Guide - AutoStory Builder Phase 1

## Architecture Overview

```
┌──────────────┐
│   Client     │
└──────┬───────┘
       │ POST /api/generate-story (multipart/form-data)
       ▼
┌──────────────────────────────────────────┐
│        Express Middleware Chain          │
│  1. Multer (file upload)                 │
│  2. Zod Validation                       │
│  3. StoryController                      │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│      StoryGeneratorService               │
│         (Orchestrator)                   │
└──────┬───────────────────────────────────┘
       │
   ┌───┴────┬──────────┬──────────────┐
   ▼        ▼          ▼              ▼
┌─────┐ ┌────────┐ ┌──────────┐ ┌──────────┐
│Image│ │Prompt  │ │LLM       │ │Output    │
│Anal │ │Builder │ │Generator │ │Validator │
└─────┘ └────────┘ └──────────┘ └──────────┘
   │        │          │              │
   └────────┴──────────┴──────────────┘
                  │
                  ▼
           ┌──────────────┐
           │ Cohere API   │
           └──────────────┘
```

---

## Component Details

### 1. ImageAnalyzerService

**File:** `src/services/imageAnalyzer.service.ts`

**Responsibilities:**
- Convert image buffer to base64
- Send to Cohere Vision API
- Extract 3-5 descriptive captions
- Handle retries with exponential backoff

**Key Methods:**
```typescript
async analyzeImage(buffer: Buffer, mimeType: string): Promise<string[]>
private extractCaptions(buffer: Buffer, mimeType: string): Promise<string[]>
private retryWithBackoff<T>(fn: () => Promise<T>, retries: number): Promise<T>
```

**Error Handling:**
- Max 3 retries
- Backoff: 1s, 2s, 4s
- Timeout: 10 seconds
- Fallback to default captions if API fails

---

### 2. PromptBuilderService

**File:** `src/services/promptBuilder.service.ts`

**Responsibilities:**
- Construct prompt with visual context
- Include tone and format requirements
- Add structure guidelines (gancho/desarrollo/cierre)
- Include CTA requirement for REDES_SOCIALES

**Template Structure:**
```
SYSTEM INSTRUCTIONS
↓
VISUAL CONTEXT (from captions)
↓
USER TEXT INPUT
↓
REQUIREMENTS (tone, format, word count, CTA)
↓
GENERATION INSTRUCTION
```

---

### 3. OutputValidatorService

**File:** `src/services/outputValidator.service.ts`

**Responsibilities:**
- Validate word count (80-120)
- Verify structure (hook, development, closure)
- Check tone match
- Verify CTA presence (REDES_SOCIALES only)
- Validate image context relevance

**Validation Criteria:**
```typescript
interface OutputValidation {
  isValid: boolean;
  wordCount: number;
  hasCorrectLength: boolean;
  hasStructure: boolean;
  matchesTone: boolean;
  hasCTA: boolean;
  hasImageContext: boolean;
  errors: string[];
}
```

---

### 4. StoryGeneratorService

**File:** `src/services/storyGenerator.service.ts`

**Responsibilities:**
- Orchestrate full generation pipeline
- Coordinate between services
- Handle retries on validation failure
- Build final response

**Pipeline:**
1. Analyze image → captions
2. Build prompt with captions
3. Generate story with LLM
4. Validate output
5. Retry if validation fails (1 retry)
6. Return response with metadata

---

## Data Flow

### Request Processing

```typescript
// 1. Multer extracts file
const file: Express.Multer.File = req.file;
// { buffer: Buffer, mimetype: string, size: number }

// 2. Zod validates schema
StoryRequestSchema.parse({
  tone: req.body.tone,
  format: req.body.format,
  text: req.body.text,
  image: { buffer: file.buffer, mimetype: file.mimetype, size: file.size }
});

// 3. Controller delegates to service
const response = await storyGenerator.generateStory(
  tone, format, text, file.buffer, file.mimetype
);

// 4. Response sent to client
res.status(200).json(response);
```

---

## Configuration

### Environment Variables

```env
PORT=8000
NODE_ENV=development
COHERE_API_KEY=your-api-key
FRONTEND_URL_LOCAL=http://localhost:5173
FRONTEND_URL=https://frontend.vercel.app
LOG_LEVEL=info
MAX_FILE_SIZE=10485760
```

### CORS Setup

```typescript
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
};
```

---

## Error Handling

### Global Error Handler

```typescript
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  
  const errorResponse = createErrorResponse(
    ERROR_CODES.INTERNAL_ERROR,
    err.message
  );
  
  res.status(500).json(errorResponse);
});
```

### Multer Error Handler

```typescript
if (err.code === 'LIMIT_FILE_SIZE') {
  return res.status(413).json({
    error: { code: 'FILE_ERROR', message: '...' }
  });
}
```

---

## Testing Strategy

### Unit Tests
- Test each service independently
- Mock external dependencies (Cohere API)
- Cover edge cases and error scenarios

### Integration Tests
- Test full endpoint with mocked API
- Verify request/response contracts
- Test validation errors

### E2E Tests
- Test complete workflow with real server
- Verify all tones and formats
- Test different image types

**Coverage Target:** ≥80%

---

## Extension Points

### Adding New Tone

1. Add to `VALID_TONES` in `src/constants/validation.ts`
2. Add keywords in `OutputValidatorService.validateTone()`
3. Update tests

### Adding New Format

1. Add to `VALID_FORMATS` in `src/constants/validation.ts`
2. Update prompt template if needed
3. Add validation logic if required
4. Update tests

### Adding New Image Format

1. Add MIME type to `VALID_IMAGE_MIMES` in `src/constants/imageFormats.ts`
2. Test with real images
3. Update documentation

---

## Performance Optimization

### Current Optimizations
- Exponential backoff for retries
- Timeout limits on API calls
- Memory storage (no disk I/O)
- Stateless design for horizontal scaling

### Future Optimizations (Phase 2+)
- Redis caching for repeated images
- Background job processing
- Response streaming
- CDN for static assets

---

## Security Considerations

### Current Security
- File size validation (10MB max)
- MIME type validation
- Input sanitization with Zod
- CORS restrictions
- API key protection in env

### Phase 2 Security
- JWT authentication
- Rate limiting per user
- Request signing
- Input content filtering

---

## Deployment

### Local Development
```bash
npm install
cp .env.example .env
# Edit .env with COHERE_API_KEY
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t autostory-builder .
docker run -p 8000:8000 --env-file .env autostory-builder
```

---

## Monitoring

### Logs
- Winston logger with levels: error, warn, info, debug
- Structured JSON logs
- File rotation (error.log, combined.log)

### Metrics to Track
- Request count
- Response times
- Error rates
- API call latency
- Validation failure rates

---

## Troubleshooting

### Common Issues

**Issue:** "COHERE_API_KEY is required"  
**Solution:** Set API key in .env file

**Issue:** "File too large" (413)  
**Solution:** Compress image to <10MB

**Issue:** Timeout errors  
**Solution:** Check network connection to Cohere API

**Issue:** Validation failures  
**Solution:** Verify all required fields are present and valid

---

## Next Steps (Phase 2)

1. Add PostgreSQL persistence
2. Implement user authentication
3. Add CRUD endpoints for saved stories
4. Frontend integration
5. Enhanced error reporting
