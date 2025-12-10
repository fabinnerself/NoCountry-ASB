# AutoStory Builder - Phase 1

> AI-powered story generation with image processing

## 🎯 Overview

AutoStory Builder transforms images and text into compelling narratives using AI. Phase 1 introduces **image processing** capabilities, extracting visual context to enrich story generation.

### Key Features

- ✅ **Image Analysis:** Extract visual captions using Cohere Vision AI
- ✅ **Multi-tone Support:** INSPIRACIONAL, EDUCATIVO, TÉCNICO
- ✅ **Multi-format Output:** HISTORIA, POST, REDES_SOCIALES, OTRO
- ✅ **Smart Validation:** 80-120 words, structure, tone matching, CTA
- ✅ **Robust Error Handling:** Retries, timeouts, detailed error messages
- ✅ **Full Test Coverage:** 80%+ with unit, integration, and E2E tests

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥18.0.0
- npm ≥9.0.0
- Cohere API Key ([Get one here](https://cohere.com))

### Installation

```bash
# Clone repository
git clone https://github.com/fabinnerself/NoCountry-ASB.git
cd NoCountry-ASB/0code

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env and add your COHERE_API_KEY
```

### Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:8000`

---

## 📋 API Usage

### Generate Story with Image

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -F "tone=INSPIRACIONAL" \
  -F "format=REDES_SOCIALES" \
  -F "text=Joven emprendedora superó obstáculos para crear su empresa" \
  -F "image=@path/to/image.jpg"
```

### Response

```json
{
  "success": "ok",
  "generatedStory": "En una comunidad rural, María transformó su pasión...",
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
    "imageCaptions": ["Emprendedora con laptop", "Espacio creativo"],
    "generatedAt": "2025-12-09T14:30:22.000Z",
    "model": "command-r-plus",
    "processingTimeMs": 3847
  }
}
```

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run with Coverage

```bash
npm run test:coverage
```

### Test Suites

- **Unit Tests:** `npm run test:unit`
- **Integration Tests:** `npm run test:integration`
- **E2E Tests:** `npm run test:e2e`

**Target Coverage:** ≥80%

---

## 📁 Project Structure

```
0code/
├── src/
│   ├── config/          # Environment, Cohere, CORS
│   ├── constants/       # Validation rules, prompts, errors
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Multer, validation, error handling
│   ├── routes/          # API routes
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic
│   │   ├── imageAnalyzer.service.ts    # NEW
│   │   ├── promptBuilder.service.ts    # UPDATED
│   │   ├── storyGenerator.service.ts   # UPDATED
│   │   └── outputValidator.service.ts  # UPDATED
│   └── utils/           # Helpers, logger
│
├── tests/
│   ├── fixtures/        # Test data, images
│   └── img/
│       ├── unit/        # Unit tests
│       ├── integration/ # Integration tests
│       └── e2e/         # E2E tests
│
├── doc/img/
│   ├── 0_API_REFERENCE.md
│   ├── 1_IMPLEMENTATION_GUIDE.md
│   ├── 2_IMAGE_PROCESSING.md
│   ├── 3_TESTING_STRATEGY.md
│   └── postman_collection.json
│
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

```env
PORT=8000
NODE_ENV=development
COHERE_API_KEY=your-api-key-here
FRONTEND_URL_LOCAL=http://localhost:5173
FRONTEND_URL=https://frontend.vercel.app
LOG_LEVEL=info
MAX_FILE_SIZE=10485760
```

---

## 📚 Documentation

- **[API Reference](doc/img/0_API_REFERENCE.md)** - Complete API documentation
- **[Implementation Guide](doc/img/1_IMPLEMENTATION_GUIDE.md)** - Architecture and components
- **[Image Processing](doc/img/2_IMAGE_PROCESSING.md)** - How image analysis works
- **[Testing Strategy](doc/img/3_TESTING_STRATEGY.md)** - Testing approach and coverage
- **[Postman Collection](doc/img/postman_collection.json)** - Ready-to-use API requests

---

## 🎨 Supported Formats

### Image Formats

- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **WEBP** (.webp)

**Max Size:** 10 MB

### Tones

- **INSPIRACIONAL** - Uplifting, motivational narratives
- **EDUCATIVO** - Informative, teaching-focused stories
- **TÉCNICO** - Precise, technical descriptions

### Formats

- **HISTORIA** - Full narrative structure
- **POST** - Blog-style content
- **REDES_SOCIALES** - Social media optimized (includes CTA)
- **OTRO** - Custom format

---

## 🛠️ Development

### Linting

```bash
npm run lint          # Check for errors
npm run lint:fix      # Auto-fix errors
```

### Formatting

```bash
npm run format        # Format code
npm run format:check  # Check formatting
```

### Build

```bash
npm run build         # Compile TypeScript
npm start             # Run production build
```

---

## 🔍 Troubleshooting

### Common Issues

**"COHERE_API_KEY is required"**
- Add your Cohere API key to `.env` file

**"File too large" (413)**
- Compress your image to under 10MB

**Timeout errors**
- Check network connection to Cohere API
- Verify API key is valid

**Validation errors**
- Ensure all required fields are present
- Check tone and format values match allowed enums

---

## 🚦 Roadmap

### ✅ Phase 1 (Current)
- Image processing with AI
- Multi-tone/format support
- Comprehensive testing

### 🔜 Phase 2
- PostgreSQL persistence
- User authentication
- CRUD endpoints
- Frontend integration

### 🌟 Phase 3+
- RAG (Retrieval Augmented Generation)
- OCR text extraction
- Multi-image support
- Export to PDF/DOCX

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests (TDD)
4. Implement feature
5. Ensure all tests pass (`npm test`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👥 Team

AutoStory Builder Team - NoCountry Project

---

## 🙏 Acknowledgments

- [Cohere AI](https://cohere.com) - AI models
- [Express](https://expressjs.com) - Web framework
- [Zod](https://zod.dev) - Schema validation
- [Jest](https://jestjs.io) - Testing framework

---

**Built with ❤️ using TypeScript, Express, and Cohere AI**
