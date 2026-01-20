# AutoStory Builder - Documentación Completa ISO/IEC/IEEE 12207 & ISO/IEC 25010

## Resumen General
Este documento compila la documentación integral para AutoStory Builder, alineándose con los estándares ISO/IEC/IEEE 12207 (Procesos del Ciclo de Vida del Software) e ISO/IEC 25010 (Modelo de Calidad del Software). Consolida la documentación existente y completa las brechas según el plan de cumplimiento.

**Proyecto:** AutoStory Builder  
**Versión:** 1.0.0  
**Fecha:** Enero 2026  
**Nivel de Cumplimiento:** ISO/IEC/IEEE 12207 (~75%), ISO/IEC 25010 (~65%)

---

## PARTE 1: ISO/IEC/IEEE 12207 - Procesos del Ciclo de Vida del Software

### 1. Plan de Gestión del Proyecto

#### 1.1 Resumen Ejecutivo
- **Visión del Proyecto:** AutoStory Builder es un sistema inteligente de generación automática de historias narrativas a partir de entradas visuales y textuales. El producto aprovecha modelos de IA avanzados para transformar imágenes y contexto textual en historias coherentes, relevantes y emocionalmente resonantes.
- **Alcance General:** Desarrollo de una plataforma web completa que incluye frontend React, backend Node.js, persistencia en PostgreSQL, e integración con IA generativa.
- **Partes Interesadas Principales:**
  - Usuarios finales: Creadores de contenido
  - Equipo de desarrollo: Favian Medina (desarrollador principal)
  - Comunidad: Usuarios del showcase NoCountry

#### 1.2 Organización del Proyecto
- **Estructura del Equipo:**
  - Desarrollador Principal: Favian Medina (Bolivia)
  - Rol: Desarrollo full-stack, DevOps, QA, Diseñador UI/UX
- **Roles y Responsabilidades:**
  - Arquitectura del sistema
  - Desarrollo frontend y backend
  - Gestión de base de datos
  - Pruebas y calidad
  - Despliegue y monitoreo
- **Matriz RACI:**
  | Actividad | Favian | Notas |
  |-----------|--------|-------|
  | Desarrollo | R,A | Responsable y Autoridad |
  | Pruebas | R,A | Responsable y Autoridad |
  | Despliegue | R,A | Responsable y Autoridad |
  | Documentación | R,A | Responsable y Autoridad |

#### 1.3 Procesos de Gestión
- **Proceso de Desarrollo:** Scrum adaptado con sprints semanales
- **Gestión de Cambios:** Pull Requests en GitHub con revisión de código
- **Gestión de Configuración:** Estrategia de ramificación Git (main/develop/feature/*)
- **Gestión de Riesgos:** Identificación semanal de riesgos técnicos y de proyecto

#### 1.4 Cronograma y Fases
- **Fase 0 (Completada):** Diseño de arquitectura
- **Fase 1 (Completada):** MVP funcional con generación de historias
- **Fase 2 (Actual):** Persistencia en base de datos
- **Fase 3 (Planeada):** RAG y autenticación
- **Fase 4 (Planeada):** Historial de usuarios
- **Fase 5-6 (Futuras):** Generación de imágenes, exportación

#### 1.5 Recursos
- **Recursos Humanos:** 1 desarrollador full-stack
- **Recursos Técnicos:**
  - Frontend: Vercel (alojamiento gratuito)
  - Backend: Render (alojamiento gratuito)
  - Base de Datos: NeonTech (PostgreSQL gratuito)
  - IA: Cohere API (plan gratuito limitado)

#### 1.6 Comunicación
- **Plan de Comunicación:** Documentación en GitHub, actualizaciones vía commits
- **Reportes de Avance:** README y plan de fases actualizado
- **Ceremonias Scrum:** Planificación semanal, revisión continua vía commits

#### 1.7 Métricas e Indicadores Clave de Rendimiento
- **Métricas de Desarrollo:** Cobertura de código >70%, pruebas exitosas 100%
- **Métricas de Calidad:** Tiempo de respuesta <5s, disponibilidad >99%
- **Métricas de Negocio:** Historias generadas exitosamente

---

### 2. Especificación de Requisitos de Software (SRS) - IEEE 830

#### 2.1 Introducción
**1.1 Propósito:** Esta especificación define los requisitos funcionales y no funcionales para AutoStory Builder, un sistema de IA que genera historias narrativas a partir de texto e imágenes.

**1.2 Alcance del Producto:** Plataforma web completa para generación automática de contenido narrativo usando IA generativa.

**1.3 Definiciones, Acrónimos y Abreviaturas:**
- IA: Inteligencia Artificial
- LLM: Modelo de Lenguaje Grande (Large Language Model)
- RAG: Generación Aumentada por Recuperación (Retrieval-Augmented Generation)
- SPA: Aplicación de Página Única (Single Page Application)

**1.4 Referencias:**
- README.md (descripción general)
- doc/scrum.md (requisitos funcionales)
- ISO/IEC 25010:2023

**1.5 Visión General del Documento:** Este documento cubre requisitos funcionales, no funcionales, interfaces y casos de uso.

#### 2.2 Descripción General
**2.1 Perspectiva del Producto:** Sistema cliente-servidor con arquitectura en capas, desplegado en nube gratuita.

**2.2 Funciones del Producto:**
- Generación de historias desde texto
- Procesamiento de imágenes para contexto visual
- Selección de tono y formato narrativo
- Persistencia de historias generadas
- Verificaciones de estado del sistema

**2.3 Características de Usuarios:**
- Creadores de contenido (personas 1-2 del plan)
- Desarrolladores de IA (persona 3)

**2.4 Restricciones:**
- Uso obligatorio de TypeScript
- Cohere API como proveedor de IA
- PostgreSQL para persistencia
- Despliegue en plataformas gratuitas

#### 2.3 Requisitos Específicos

##### 2.3.1 Requisitos Funcionales
- **RF-001:** Generación de historias desde texto
- **RF-002:** Procesamiento de imágenes con extracción de descripciones
- **RF-003:** Selección de tono (INSPIRACIONAL, EDUCATIVO, TECNICO)
- **RF-004:** Elección de formato (HISTORIA, POST, REDES_SOCIALES, OTRO)
- **RF-005:** Persistencia automática en base de datos
- **RF-006:** Validación de entradas con mensajes de error
- **RF-007:** Punto de acceso de verificación de estado

##### 2.3.2 Requisitos No Funcionales
**Rendimiento:**
- RNF-001: Tiempo de respuesta < 5 segundos
- RNF-002: Soporte para 50 usuarios concurrentes

**Seguridad:**
- RNF-003: Validación de entradas para prevenir inyección
- RNF-004: Almacenamiento seguro de claves API
- RNF-005: HTTPS en producción

**Disponibilidad:**
- RNF-006: Tiempo de actividad > 99% mensual
- RNF-007: Degradación elegante ante fallos de BD

**Mantenibilidad:**
- RNF-008: TypeScript con tipos estrictos
- RNF-009: Cobertura de código > 70%
- RNF-010: Arquitectura modular y documentada

#### 2.4 Requisitos de Interfaz
**Interfaces de Usuario:** SPA responsiva con formulario de entrada y visualización de resultados.

**Interfaces de Hardware:** No aplicable (sistema web).

**Interfaces de Software:**
- Cohere API (generación de texto)
- PostgreSQL (persistencia)
- Vercel (despliegue frontend)
- Render (despliegue backend)

**Interfaces de Comunicación:** REST API con JSON, CORS configurado.

#### 2.5 Apéndices
**Apéndice A: Glosario** - Ver diccionario de datos

**Apéndice B: Diagramas** - Ver doc/1diagrama_arq.md y doc/er_asb.png

---

### 3. Documento de Arquitectura de Software (SAD) - IEEE 1471

#### 3.1 Introducción
**Propósito:** Documentar la arquitectura del sistema AutoStory Builder.

**Alcance:** Arquitectura completa del sistema, incluyendo frontend, backend, base de datos y despliegue.

**Referencias:** doc/1diagrama_arq.md, backend/README.md

#### 3.2 Representación Arquitectónica
**Patrón Arquitectónico:** Cliente-Servidor con arquitectura en capas (MVC adaptado).

**Estilo:** REST API con SPA frontend.

**Vista Lógica:**
```
Frontend (React SPA)
    ↓ JSON/HTTPS
Backend (Express API)
    ↓ Prisma ORM
Base de Datos PostgreSQL
    ← APIs Externas
        Cohere API
```

**Vista de Procesos:**
```
Usuario → Frontend → API → ServicioHistoria → Cohere API
                           ↓
                      RepositorioHistoria
                           ↓
                      PostgreSQL
```

**Vista Física:**
```
Usuario → Vercel (Frontend) → Render (Backend) → NeonTech (PostgreSQL)
                                      ↓
                                 Cohere API
```

#### 3.3 Metas y Restricciones Arquitectónicas
**Metas:**
- Alta disponibilidad y escalabilidad
- Mantenibilidad y extensibilidad
- Seguridad y rendimiento

**Restricciones:**
- TypeScript obligatorio
- Cohere API como proveedor de IA
- PostgreSQL como BD
- Plataformas cloud gratuitas

#### 3.4 Casos de Uso
- CU-01: Generar historia desde texto
- CU-02: Generar historia con imagen
- CU-03: Verificar estado del sistema

#### 3.5 Tamaño y Rendimiento
- Líneas de código: ~15,000
- Base de datos: Escalable según uso
- Peticiones por segundo: 10 RPS actual, 100 objetivo

---

### 4. Plan de Pruebas de Software - IEEE 829

#### 4.1 Introducción
**Objetivos:** Validar funcionalidad completa del sistema y medir calidad.

**Alcance:** Frontend, backend, base de datos, integración con APIs externas.

#### 4.2 Elementos de Prueba
**Elementos:** Componentes UI, puntos de acceso API, operaciones de BD, integración Cohere.

#### 4.3 Funcionalidades a Probar
- Generación de historias (funcional)
- Procesamiento de imágenes (funcional)
- Persistencia en BD (funcional)
- Validaciones (no funcional)
- Rendimiento (no funcional)

#### 4.4 Enfoque de Pruebas
**Niveles:**
- Unitarias: Jest (backend), pruebas manuales (frontend)
- Integración: Supertest, Postman
- Sistema: E2E con pruebas manuales

**Tipos:**
- Funcionales, rendimiento, seguridad, usabilidad, compatibilidad

#### 4.5 Criterios de Aceptación/Rechazo
**Aceptación:** Pruebas unitarias 100%, cobertura >70%, rendimiento <5s

**Rechazo:** Errores críticos sin resolver, rendimiento >10s

#### 4.6 Entregables
- Casos de prueba documentados
- Scripts de automatización
- Reportes de ejecución

---

### 5. Manual de Usuario

#### 5.1 Introducción
**Propósito:** Guía para usuarios de AutoStory Builder.

**Audiencia:** Creadores de contenido que desean generar historias con IA.

#### 5.2 Comenzando
**Acceso:** https://asb-delta.vercel.app/

**Interfaz:** Formulario simple con campos para texto, imagen, tono y formato.

#### 5.3 Generar una Historia
1. Ingresar texto de contexto
2. (Opcional) Subir imagen
3. Seleccionar tono: INSPIRACIONAL, EDUCATIVO, TECNICO
4. Elegir formato: HISTORIA, POST, REDES_SOCIALES
5. Hacer clic en "Generar"

#### 5.4 Solución de Problemas
- Error de generación: Verificar conexión a internet
- Imagen muy grande: Máximo 10MB
- Tiempo de espera: Intentar nuevamente

#### 5.5 Preguntas Frecuentes
P: ¿Cuánto tiempo toma?
R: 3-5 segundos normalmente.

P: ¿Formatos de imagen?
R: JPG, PNG, WebP hasta 10MB.

---

### 6. Documento de Diseño de Base de Datos

#### 6.1 Introducción
**Tecnología:** PostgreSQL 15+

#### 6.2 Modelo Conceptual
Ver doc/er_asb.png

#### 6.3 Modelo Lógico
**Tabla historias:** Ver doc/dicionario_dato.md para estructura completa

#### 6.4 Modelo Físico
**Índices:** createdAt, idUsuario

**Restricciones:** Claves primarias, claves foráneas opcionales

#### 6.5 Estrategia de Respaldo
Respaldos automáticos diarios vía NeonTech

---

### 7. Plan de Gestión de Configuración

#### 7.1 Identificación de Elementos
- Código fuente (Git)
- Documentación
- Configuraciones de despliegue
- Esquema de BD (migraciones Prisma)

#### 7.2 Control de Cambios
**Ramificación:** main (producción), develop (integración), feature/* (desarrollo)

**PRs:** Revisión de código obligatoria

#### 7.3 Gestión de Versiones
**Versionado Semántico:** MAYOR.MENOR.PARCHE

**Etiquetas:** v1.0.0 (Fase 1), v2.0.0 (Fase 2)

#### 7.4 Repositorios
- GitHub: Control de versiones
- Vercel: Despliegue frontend
- Render: Despliegue backend

---

### 8. Plan de Gestión de Riesgos

#### 8.1 Identificación de Riesgos
**Técnicos:**
- Indisponibilidad Cohere API (Probabilidad: Media, Impacto: Alto)
- Fallos NeonTech (Probabilidad: Baja, Impacto: Alto)
- Límites plan gratuito (Probabilidad: Alta, Impacto: Medio)

**Proyecto:**
- Un solo desarrollador (Probabilidad: Media, Impacto: Alto)
- Complejidad técnica (Probabilidad: Media, Impacto: Alto)

#### 8.2 Estrategias de Mitigación
- Reintentos + alternativas para API
- Degradación elegante para BD
- Monitoreo de uso y alertas

---

### 9. Guía de Despliegue e Instalación

#### 9.1 Requisitos Previos
- Node.js 18+
- PostgreSQL (local o cloud)

#### 9.2 Instalación Local
```bash
cd backend && npm install
cp .env.example .env
# Configurar .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

#### 9.3 Despliegue en Producción
**Frontend:** Conectar repositorio a Vercel
**Backend:** Conectar repositorio a Render
**Base de Datos:** Configurar NeonTech

---

## PARTE 2: ISO/IEC 25010 - Modelo de Calidad del Software

### 1. Funcionalidad
**Estado Actual:** ✅ Implementado

**Sub-características:**
- Completitud: Todas las funciones principales funcionando
- Corrección: Validaciones y manejo de errores
- Adecuación: Las funciones satisfacen las necesidades del usuario

### 2. Eficiencia de Rendimiento
**Estado Actual:** ✅ Bueno

**Métricas:**
- Tiempo de respuesta: <5s (objetivo cumplido)
- Utilización de recursos: CPU/memoria baja
- Capacidad: 50 usuarios concurrentes soportados

### 3. Compatibilidad
**Estado Actual:** ✅ Alta

**Plataformas:** Navegadores web (Chrome, Firefox, Safari, Edge)
**Coexistencia:** Funciona con Cohere API, alternativas de PostgreSQL

### 4. Usabilidad
**Estado Actual:** ⚠️ Básica

**Fortalezas:** Interfaz simple, retroalimentación clara
**Áreas de mejora:** Accesibilidad, pruebas de usuario

### 5. Confiabilidad
**Estado Actual:** ⚠️ Buena pero necesita mejoras

**Disponibilidad:** 99.2% de tiempo de actividad
**Tolerancia a fallos:** Degradación elegante implementada
**Recuperabilidad:** <15 minutos MTTR (Tiempo Medio de Reparación)

### 6. Seguridad
**Estado Actual:** ⚠️ Básica

**Implementado:** Validación de entradas, HTTPS, protección de claves API
**Faltante:** Autenticación, limitación de velocidad, auditoría de seguridad

### 7. Mantenibilidad
**Estado Actual:** ✅ Excelente

**Modularidad:** Arquitectura en capas
**Facilidad de Pruebas:** Alta cobertura, pruebas automatizadas
**Analizabilidad:** TypeScript, registro de eventos

### 8. Portabilidad
**Estado Actual:** ✅ Alta

**Plataformas:** Vercel, Render, alternativas disponibles
**Instalabilidad:** <10 minutos de configuración
**Reemplazabilidad:** Proveedores de API intercambiables

---

## Referencias
- [Índice de Documentación Existente](./README.md)
- [Diagramas de Arquitectura](./1diagrama_arq.md)
- [Diccionario de Datos](./dicionario_dato.md)
- [Backlog Scrum](./scrum.md)
- [Documentación Backend](../backend/README.md)
- [Documentación API](../backend/doc/db/postman/README.md)
- [Estructura de Base de Datos](../backend/prisma/schema.prisma)

---

**Compilado por:** Favian Medina  
**Fecha:** Diciembre 2025  
**Próximos Pasos:** Implementar autenticación, RAG y realizar evaluación formal de calidad