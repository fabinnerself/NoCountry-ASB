# Installation Guide - AutoStory Builder Phase 1

## Prerequisites

Asegúrate de tener instalado:

- **Node.js** ≥18.0.0
- **npm** ≥9.0.0
- **Git** (para clonar el repositorio)

Verifica las versiones:

```bash
node -v  # Should show v18.0.0 or higher
npm -v   # Should show 9.0.0 or higher
```

---

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone https://github.com/fabinnerself/NoCountry-ASB.git
cd NoCountry-ASB
```

### 2. Navigate to Phase 1 Code

```bash
cd 0code
```

### 3. Install Dependencies

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- Express, Multer, Zod (producción)
- Jest, TypeScript, ESLint (desarrollo)

### 4. Setup Environment Variables

```bash
# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

Edita el archivo `.env` y agrega tu Cohere API Key:

```env
PORT=8000
NODE_ENV=development
COHERE_API_KEY=tu-api-key-aqui  # ← Reemplaza esto
FRONTEND_URL_LOCAL=http://localhost:5173
FRONTEND_URL=https://frontend.vercel.app
LOG_LEVEL=info
MAX_FILE_SIZE=10485760
```

**Obtén tu API Key:**
1. Ve a [https://cohere.com](https://cohere.com)
2. Crea una cuenta (es gratuito)
3. Ve a Dashboard → API Keys
4. Copia la API Key
5. Pégala en el archivo `.env`

### 5. Setup Test Images (Opcional para tests)

Crea imágenes de prueba en `tests/fixtures/testImages/`:

```bash
# Opción 1: Descargar de Unsplash
curl -o tests/fixtures/testImages/test-image.jpg "https://source.unsplash.com/800x600/?entrepreneur"
curl -o tests/fixtures/testImages/test-image.png "https://source.unsplash.com/800x600/?workspace"
curl -o tests/fixtures/testImages/test-image.webp "https://source.unsplash.com/800x600/?business"

# Opción 2: Copiar tus propias imágenes
# Solo asegúrate que sean JPG, PNG o WEBP y <10MB
```

---

## Verification

### 1. Check TypeScript Compilation

```bash
npm run build
```

Debería compilar sin errores.

### 2. Run Tests

```bash
npm test
```

Todos los tests deberían pasar. Si algunos fallan por falta de imágenes, crea las imágenes de prueba (paso 5 anterior).

### 3. Start Development Server

```bash
npm run dev
```

Deberías ver:

```
🚀 AutoStory Builder - Phase 1 running on port 8000
📝 Environment: development
🌐 CORS enabled for: http://localhost:5173, https://frontend.vercel.app
✅ Health check: http://localhost:8000/health
```

### 4. Test Health Endpoint

En otra terminal:

```bash
curl http://localhost:8000/health
```

Debería retornar:

```json
{"status":"ok","timestamp":"2025-12-09T..."}
```

---

## Common Installation Issues

### Issue: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "Cannot find module 'typescript'"

**Solution:**
```bash
npm install --save-dev typescript
```

### Issue: "COHERE_API_KEY is required"

**Solution:**
- Verifica que el archivo `.env` existe
- Verifica que `COHERE_API_KEY` está configurado
- NO uses comillas alrededor del valor

### Issue: Tests fail with "Cannot read property 'buffer'"

**Solution:**
- Crea las imágenes de prueba en `tests/fixtures/testImages/`
- Ver paso 5 de instalación

---

## Next Steps

Una vez instalado, puedes:

1. **Leer la documentación:**
   - [API Reference](doc/img/0_API_REFERENCE.md)
   - [Implementation Guide](doc/img/1_IMPLEMENTATION_GUIDE.md)

2. **Probar el endpoint:**
   ```bash
   curl -X POST http://localhost:8000/api/generate-story \
     -F "tone=INSPIRACIONAL" \
     -F "format=REDES_SOCIALES" \
     -F "text=Historia de emprendimiento exitoso" \
     -F "image=@path/to/image.jpg"
   ```

3. **Importar colección Postman:**
   - Importa `doc/img/postman_collection.json` en Postman
   - Configura variable `base_url` a `http://localhost:8000`

4. **Ejecutar tests con coverage:**
   ```bash
   npm run test:coverage
   ```

---

## Development Workflow

### Start Development

```bash
npm run dev
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Lint Code

```bash
npm run lint
npm run lint:fix
```

### Format Code

```bash
npm run format
```

---

## Production Build

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## Docker (Optional)

### Build Docker Image

```bash
docker build -t autostory-builder .
```

### Run Docker Container

```bash
docker run -p 8000:8000 --env-file .env autostory-builder
```

---

## Troubleshooting

If you encounter any issues:

1. **Check Node.js version:** Must be ≥18.0.0
2. **Check npm version:** Must be ≥9.0.0
3. **Check .env file:** Must exist and have COHERE_API_KEY
4. **Check network:** Ensure you can reach api.cohere.com
5. **Check logs:** Look at logs/error.log for details

---

## Support

For issues or questions:
- Open an issue on GitHub
- Check documentation in `doc/img/`
- Review test examples in `tests/img/`

---

**¡Listo para desarrollar! 🚀**
