# 🚀 Inicio Rápido - AutoStory Builder

## ⚡ 4 Pasos para Ejecutar

### 1️⃣ Instalar Dependencias
```bash
npm install
```

### 2️⃣ Configurar API Key
Editar `.env` y agregar tu API key de Cohere:
```env
COHERE_API_KEY="tu_cohere_api_key_aqui"
```
💡 Obtener API key en: https://dashboard.cohere.com/

### 3️⃣ Verificar que Todo Funciona
```bash
npm run type-check    # Verificar tipos TypeScript
npm run lint          # Verificar calidad de código
npm test              # Ejecutar tests (requiere API key)
```

### 4️⃣ Iniciar Servidor
```bash
npm run dev
```
✅ Servidor corriendo en: http://localhost:8000

---

## 🧪 Probar el API

### Health Check
```bash
curl http://localhost:8000/health
```

### Generar Historia
```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "text": "María, madre soltera de 3 hijos, completó nuestro programa de emprendimiento. Ahora tiene su propia panadería y emplea a 2 personas de su comunidad."
  }'
```

**Response esperado:**
```json
{
  "success": "ok",
  "generatedStory": "🌟 Historia inspiradora generada por IA...",
  "validation": {
    "tone": "ok",
    "format": "ok",
    "text": "ok"
  },
  "metadata": {
    "wordCount": 95,
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "generatedAt": "2025-12-09T...",
    "model": "command-r-plus"
  }
}
```

---

## 📋 Comandos Útiles

```bash
npm run dev          # Desarrollo con hot reload
npm test             # Tests + coverage
npm run test:watch   # Tests en modo watch
npm run lint         # Verificar código
npm run type-check   # Verificar tipos
npm run build        # Build producción
npm start            # Ejecutar producción
```

---

## 🎯 Parámetros del API

### Tonos Disponibles
- `INSPIRACIONAL` - Historias emotivas y motivadoras
- `EDUCATIVO` - Contenido didáctico y formativo
- `TÉCNICO` - Narrativas profesionales

### Formatos Disponibles
- `HISTORIA` - Narrativa completa con inicio, desarrollo y cierre
- `POST` - Contenido tipo blog
- `REDES_SOCIALES` - Optimizado para Instagram/Facebook (con emojis y hashtags)
- `OTRO` - Formato flexible

### Validaciones
- **text:** Entre 20 y 1000 caracteres
- **output:** Ideal entre 80 y 120 palabras

---

## ✅ Estado del Proyecto

- ✅ TypeScript type-check: **PASANDO**
- ✅ ESLint code quality: **PASANDO**
- ✅ Tests preparados: **LISTOS**
- ✅ Documentación: **COMPLETA**

---

## 📚 Más Información

- `README.md` - Documentación completa
- `IMPLEMENTATION_SUMMARY.md` - Detalles técnicos
- `ESTRUCTURA_PROYECTO.txt` - Árbol del proyecto
- `VALIDACION_COMPLETADA.md` - Validación de calidad

---

## ⚠️ Requisitos

- Node.js 18+
- API Key de Cohere
- npm o yarn

---

**¡Listo para desarrollar! 🚀**
