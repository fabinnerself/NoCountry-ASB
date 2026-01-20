# 👩‍🚀 AutoStory Builder

## 👥 Equipo 06
**S11-25-Equipo 06-AI Agent**

Puedes visitar la plataforma FrontEnd en línea en :  https://asb-delta.vercel.app/ 

El endpoint esta disponible en linea en : [health](https://nocountry-asb.onrender.com/health)

Documentacion de la API en Postman : [API](https://documenter.getpostman.com/view/22674808/2sB3dSQUdM)

Nocountry Showcase : [Showcase](https://nocountry.tech/simulacion-laboral-noviembre-2025/cmhow54x70027m001tb14gy2k)

Video demostracion : [Video](https://youtu.be/SE1MXLYM3hc)
 

### Integrante
*   **Favian Medina** (Bolivia)
    *   📞 [Whatsapp](https://wa.me/59167023053)
    *   ✉️ favian.medina.gemio@gmail.com
    *   🌐 [Portfolio](https://favian-medina-cv.vercel.app)
    *   💼 [LinkedIn](https://www.linkedin.com/in/favian-medina-gemio)

## 📄 Descripción del Proyecto

## 👩‍🚀 AutoStory Builder

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

### Integración con API de LLM a eleccion.
Posibilidad de usar CLIP o modelo multimodal para análisis de imagen.
Front minimalista.
Entregables esperados

### Prototipo funcional del generador.
Tres historias generadas con distintos tonos narrativos.
Documentación de endpoints y flujo de uso.

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

### Backend 
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
 
La documentación completa se encuentra en los siguientes archivos:

- README.md (raíz del proyecto) Documentación principal
- backend/README.md 
- frontend/README.md

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
- Implementacion de RAG con pgvector implementada en Supabase

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
- Diagrama Entidad Relacion ![ER](doc/er_asb.png)
- Diseño Figma [Figma](https://www.figma.com/design/rzP9Zo2JxkZAshv80Vm6Rd/Auto-story?node-id=0-1&p=f&t=zyNQXPEhjf2jtOr5-0)

---
(C) Diciembre 2024 NoCountry
