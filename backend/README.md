# 👩‍🚀 AutoStory Builder BACKEND 

## 📚 Documentación de Despliegue

La documentación completa de despliegue en **Render** se encuentra en: `doc/render/`

### 🚀 Comienza Aquí

**Para desplegar en Render**, lee estos archivos en orden:

1. **[`doc/render/COMIENZA_AQUI.md`](./doc/render/COMIENZA_AQUI.md)** ⭐ - Resumen ejecutivo (5 min)
2. **[`doc/render/README_DEPLOYMENT.md`](./doc/render/README_DEPLOYMENT.md)** - Guía completa (15 min)
3. **[`doc/render/COMMANDS_READY_TO_COPY.md`](./doc/render/COMMANDS_READY_TO_COPY.md)** - Comandos listos (3 min)

### 📖 Documentación Adicional

- **[RENDER_SETUP.md](./doc/render/RENDER_SETUP.md)** - Guía rápida
- **[STATUS_REPORT.md](./doc/render/STATUS_REPORT.md)** - Reporte de estado actual
- **[DEPLOYMENT_CHECKLIST.md](./doc/render/DEPLOYMENT_CHECKLIST.md)** - Verificaciones técnicas
- **[DEPLOYMENT_GUIDE.md](./doc/render/DEPLOYMENT_GUIDE.md)** - Guía detallada
- **[FRONTEND_INTEGRATION.md](./doc/render/FRONTEND_INTEGRATION.md)** - Conectar con Vercel
- **[FLOW_DIAGRAM.md](./doc/render/FLOW_DIAGRAM.md)** - Diagrama de arquitectura
- **[INDEX_DOCS.md](./doc/render/INDEX_DOCS.md)** - Índice completo
- **[SETUP_SUMMARY.md](./doc/render/SETUP_SUMMARY.md)** - Resumen de cambios

---

## 🛠 Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías:

- **Node.js** - Runtime
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **Cohere AI** - LLM para generación de historias
- **Zod** - Validación de esquemas
- **Docker** - Containerización
- **Prisma** (preparado para Fase 1) - ORM

---

## 🚀 Desarrollo Local

### Requerimientos
- Node.js 18+
- npm

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Accede a `http://localhost:10000`

### Build

```bash
npm run build
```

### Start (Producción)

```bash
npm start
```

### Tests

```bash
npm test
```

---

## 📋 Estructura del Proyecto

```
backend/
├── src/
│   ├── app.ts              # Express app
│   ├── server.ts           # Entry point
│   ├── config/
│   │   ├── env.ts          # Configuración
│   │   └── cohere.ts       # Configuración Cohere
│   ├── controllers/        # Controladores
│   ├── routes/             # Rutas
│   ├── services/           # Servicios de negocio
│   ├── schemas/            # Esquemas Zod
│   ├── middleware/         # Middlewares
│   └── utils/              # Utilidades
├── tests/                  # Tests
├── doc/
│   └── render/             # Documentación Render
├── render.yaml             # Configuración Render
├── Dockerfile              # Docker
├── tsconfig.json
└── package.json
```

---

## 🌍 Despliegue

### Render (Recomendado)

Ver **[`doc/render/COMIENZA_AQUI.md`](./doc/render/COMIENZA_AQUI.md)**

**Tiempo estimado:** 20-30 minutos

---

## 🔑 Variables de Entorno

```env
NODE_ENV=development
PORT=10000
COHERE_API_KEY=tu_clave_aqui
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_LOCAL=http://localhost:5173
```

Ver `.env.example` para todas las variables disponibles.

---

## 📊 API Endpoints

- `GET /health` - Health check
- `POST /api/generate-story` - Generar historia

---

## 🎯 Próximas Fases

- **Fase 0 (Actual)** ✅ - API sin BD
- **Fase 1** - PostgreSQL + Usuarios
- **Fase 2** - Autenticación + Persistencia

---

## 📞 Soporte

Para problemas con el despliegue, revisa `doc/render/README_DEPLOYMENT.md` sección Troubleshooting.

---

**Status**: ✅ Listo para desplegar en Render
