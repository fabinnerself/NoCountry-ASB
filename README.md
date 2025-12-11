# 👩‍🚀 AutoStory Builder

## 👥 Equipo
**S11-25-Equipo 06-AI Agent**

Puede visitar la plataforma FrontEnd en línea en :  https://asb-delta.vercel.app/ 

El endpoint esta disponible en linea en : [health](https://nocountry-asb.onrender.com/health)

Documentacion de la API en : [API](https://documenter.getpostman.com/view/22674808/2sB3dSQUdM)


### Integrantes
*   **Mel Zárate** (Argentina) - Machine Learning
*   **Carla Dabalos** (Perú) - Machine Learning
*   **Micaela Callahuanca** (Argentina) - AI Engineer
*   **Agustin Ammazzagatti** (Argentina) - Machine Learning
*   **Favian Medina** (Bolivia)
    *   📞 [Whatsapp](https://wa.me/59167023053)
    *   ✉️ favian.medina.gemio@gmail.com
    *   🌐 [Portfolio](https://favian-medina-cv.vercel.app)
    *   💼 [LinkedIn](https://www.linkedin.com/in/favian-medina-gemio)

## 📄 Descripción del Proyecto

### Sector de Negocios
Cross-industry

### Necesidad del Cliente
Implementar una IA que, a partir de imágenes, testimonios y capturas de pantalla del usuario, cree automáticamente historias visuales listas para redes y comunicación institucional.

### Objetivo
Desarrollar un agente de inteligencia artificial capaz de generar historias visuales y textuales a partir de inputs multimedia (imágenes, videos, testimonios o texto). El sistema debe producir contenido narrativo en múltiples formatos (post social, resumen de caso, storytelling de impacto).

### Requerimientos Funcionales
*   Carga de archivos multimedia y texto como input.
*   Procesamiento del contenido con IA generativa (texto + imagen).
*   Creación automática de una narrativa coherente y con tono configurable (inspiracional, educativo, técnico).
*   Posibilidad de exportar el resultado en formato Imagen, PDF o publicación web.
*   Panel para revisar, editar y versionar las historias generadas.

### Requerimientos Técnicos
*   Integración con API de LLM a elección.
*   Posibilidad de usar CLIP o modelo multimodal para análisis de imagen.
*   Front minimalista.

### Entregables Esperados
*   Prototipo funcional del generador.
*   Tres historias generadas con distintos tonos narrativos.
*   Documentación de endpoints y flujo de uso.

## 🏗️ Arquitectura del Proyecto

### Frontend
- **Framework**: React + TypeScript + Vite
- **Deployment**: Vercel
- **URL**: https://asb-delta.vercel.app/

### Backend (Fase 2)
- **Framework**: Node.js + Express + TypeScript
- **Base de Datos**: PostgreSQL con Prisma ORM
- **IA**: Cohere API para generación de historias
- **Deployment**: Render
- **URL**: https://nocountry-asb.onrender.com

## 🚀 Cómo Correr el Código

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ver documentación completa en `frontend/README.md`

### Backend (Fase 2 - Con Persistencia)

**Inicio Rápido:**

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

**Requisitos:**
- Node.js 18+
- PostgreSQL 15+ (local o NeonTech)
- Cohere API Key

Ver documentación completa en:
- `backend/README.md` - Documentación principal
- `backend/QUICK_START.md` - Inicio rápido
- `backend/doc/db/SETUP.md` - Configuración detallada

## 📊 Fases del Proyecto

### ✅ Fase 0 - Prototipo Inicial
- Diseño de arquitectura
- Definición de requisitos
- Prototipo básico

### ✅ Fase 1 - MVP Funcional
- Frontend con React + TypeScript
- Backend con generación de historias (Cohere API)
- Deployment en Vercel + Render

### ✅ Fase 2 - Persistencia en Base de Datos (ACTUAL)
- Integración de PostgreSQL con Prisma ORM
- Almacenamiento de todas las historias generadas
- Health check con estado de BD
- Degradación elegante ante fallos
- Documentación completa

### 🔜 Fase 3 - Futuras Mejoras
- Autenticación de usuarios
- Historial de historias por usuario
- Versionado de historias
- Búsqueda y filtrado avanzado
- Analytics y métricas

## 🛠️ Stack Tecnológico

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Winston (logging)
- Multer (file uploads)
- Cohere API (IA)

### DevOps
- Git + GitHub
- Vercel (Frontend)
- Render (Backend)
- NeonTech (PostgreSQL Cloud)

## 📚 Documentación

- **Frontend**: `frontend/README.md`
- **Backend**: `backend/README.md`
- **Base de Datos**: `backend/doc/db/`
  - Setup: `backend/doc/db/SETUP.md`
  - Prisma Guide: `backend/doc/db/PRISMA_GUIDE.md`
  - Troubleshooting: `backend/doc/db/TROUBLESHOOTING.md`
  - API Examples: `backend/doc/db/API_EXAMPLES.md`
- **Planificación**: `doc/plan/`

---
(C) Diciembre 2024 NoCountry
