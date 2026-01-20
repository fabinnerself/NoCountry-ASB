# AutoStory Builder - Backend API (Fase 2)

Backend API para AutoStory Builder con persistencia en PostgreSQL usando Prisma ORM.

## 🚀 Características

- ✅ Generación de historias con IA (Cohere API)
- ✅ Persistencia en PostgreSQL con Prisma ORM
- ✅ Soporte para imágenes (upload con Multer)
- ✅ Degradación elegante ante fallos de BD
- ✅ Health check con estado de base de datos
- ✅ Logging estructurado con Winston
- ✅ TypeScript con tipos estrictos
- ✅ Testing con Jest

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 15+ (local o NeonTech)
- npm o yarn

## 🛠️ Instalación

### 1. Clonar e instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
NODE_ENV=development
PORT=8000
COHERE_API_KEY=tu_api_key_de_cohere
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/autostory?schema=public
```

### 3. Configurar base de datos

```bash
# Generar cliente Prisma
npm run prisma:generate

# Crear migración inicial
npm run prisma:migrate

# Verificar con Prisma Studio (opcional)
npm run prisma:studio
```

### 4. Iniciar servidor

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm run build
npm start
```

## 📡 Endpoints

### Health Check

```bash
GET /health
```

Respuesta:
```json
{
  "status": "ok",
  "version": "fase2",
  "timestamp": "2024-12-10T...",
  "database": "connected",
  "services": {
    "api": "ok",
    "cohere": "configured"
  }
}
```

### Generar Historia

```bash
POST /api/generate-story
Content-Type: multipart/form-data

{
  "tone": "inspiracional",
  "format": "redes sociales",
  "text": "Un dragón en las montañas",
  "image": [archivo opcional],
  "id_usuario": "user123"
}
```

Respuesta:
```json
{
  "success": true,
  "story": "Historia generada...",
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

## 🗄️ Base de Datos

### Schema Prisma

La tabla `stories` almacena:
- `id` (UUID): Identificador único
- `tone`: Tono de la historia
- `format`: Formato de la historia
- `text`: Texto de entrada del usuario
- `image`: Referencia a imagen subida
- `generatedStory`: Historia generada por IA
- `idUsuario`: ID del usuario (opcional)
- `createdAt`: Timestamp de creación
- `updatedAt`: Timestamp de actualización
- `version`: Versión de la fase
- `errorMessage`: Mensaje de error si aplica

### Comandos Prisma

```bash
# Generar cliente
npm run prisma:generate

# Crear migración
npm run prisma:migrate

# Aplicar en producción
npm run prisma:deploy

# Abrir GUI
npm run prisma:studio

# Validar schema
npx prisma validate

# Formatear schema
npx prisma format
```

## 🧪 Testing

```bash
# Todos los tests
npm test

# Tests con watch mode
npm run test:watch

# Tests con cobertura
npm run test:coverage

# Solo tests de BD
npm run test:db

# Tests E2E
npm run test:e2e
```

## 🚢 Deployment

### Local con PostgreSQL

1. Instalar PostgreSQL
2. Crear base de datos: `createdb autostory`
3. Configurar `DATABASE_URL` en `.env`
4. Ejecutar migraciones: `npm run prisma:migrate`
5. Iniciar servidor: `npm run dev`

### Cloud con NeonTech

1. Crear proyecto en [NeonTech](https://neon.tech)
2. Copiar `DATABASE_URL` de NeonTech
3. Configurar en `.env`
4. Ejecutar: `npm run prisma:deploy`
5. Verificar con: `npm run prisma:studio`

### Producción en Render

1. Configurar variables de entorno en Render Dashboard:
   - `DATABASE_URL`
   - `COHERE_API_KEY`
   - `NODE_ENV=production`

2. Build command:
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

3. Start command:
```bash
npm start
```

## 📁 Estructura del Proyecto

```
backend/
├── prisma/
│   └── schema.prisma          # Schema de Prisma
├── src/
│   ├── config/
│   │   ├── database.ts        # Cliente Prisma singleton
│   │   └── multer.ts          # Configuración de uploads
│   ├── controllers/
│   │   └── story.controller.ts
│   ├── repositories/
│   │   └── story.repository.ts
│   ├── routes/
│   │   ├── story.routes.ts
│   │   └── health.routes.ts
│   ├── services/
│   │   └── storyGenerator.service.ts
│   ├── types/
│   │   └── story.dto.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── databaseErrorHandler.ts
│   ├── app.ts
│   └── index.ts
├── tests/                     # Tests (a implementar)
├── uploads/                   # Archivos subidos
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuración Avanzada

### Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `NODE_ENV` | Ambiente (development/production) | No |
| `PORT` | Puerto del servidor | No (default: 8000) |
| `COHERE_API_KEY` | API key de Cohere | Sí |
| `FRONTEND_URL` | URL del frontend para CORS | No |
| `DATABASE_URL` | URL de conexión PostgreSQL | Sí |
| `DATABASE_TEST_URL` | URL de BD de prueba | No |

### Logging

El sistema usa Winston para logging estructurado:
- **Development**: Logs detallados con queries SQL
- **Production**: Solo errores y warnings

### Manejo de Errores

El sistema implementa degradación elegante:
- Si falla la BD, la historia se genera pero no se persiste
- El campo `validation.db` indica el estado de persistencia
- Los errores se loggean pero no afectan la respuesta al usuario

## 📚 Documentación Adicional

Ver carpeta `doc/db/` para:
- Guía de configuración detallada
- Guía de Prisma
- Troubleshooting
- Ejemplos de API
- Colección de Postman

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

MIT

## 👥 Equipo

AutoStory Builder Team - NoCountry

---

**Versión:** 2.0.0 (Fase 2)  
**Última actualización:** Diciembre 2024
