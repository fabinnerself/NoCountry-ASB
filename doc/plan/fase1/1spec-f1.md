# 📋 DOCUMENTO DE ESPECIFICACIONES - FASE 1
## AutoStory Builder: Generación de Historias con Procesamiento de Imágenes

**Versión:** 1.0  
**Fecha:** 9 de diciembre de 2025  
**Estado:** ✅ Pronto para Planificación Técnica  
**Autor:** Equipo AutoStory Builder fmg

---

## 📖 RESUMEN EJECUTIVO

### Visión del Producto
AutoStory Builder es un sistema inteligente de generación automática de historias narrativas a partir de inputs visuales y textuales. El producto aprovecha modelos de IA avanzados para transformar imágenes y contexto textual en historias coherentes, relevantes y emocionalmente resonantes, adaptadas a diferentes tonos y formatos.

### Propuesta de Valor
**Para Creadores de Contenido:**
- Generación rápida de narrativas basadas en imágenes
- Múltiples tonos y formatos para diferentes canales
- Mejora de la creatividad mediante IA, no sustitución

**Para Empresas:**
- Escalabilidad en producción de contenido
- Consistencia narrativa en campañas
- Reducción de tiempo de creación de historias

**Para la Industria:**
- Demostración práctica de integración IA + Visión Computadora
- Modelo extensible para otras aplicaciones multimedia
- Infraestructura lista para RAG y análisis avanzado

### Metáfora del Producto
*"Si una imagen vale mil palabras, AutoStory Builder convierte esa imagen en una historia de 100 palabras perfectamente estructurada"*

---

## 🎯 OBJETIVOS DE NEGOCIO - FASE 1

### Objetivo Primario
Validar el MVP funcional del endpoint de generación de historias con procesamiento de imágenes, demostrando la capacidad del sistema para:
1. Recibir y procesar imágenes
2. Extraer contexto visual mediante IA
3. Generar narrativas relevantes y coherentes

### Objetivos Secundarios
- Establece base técnica para fases futuras (RAG, edición, exportación)
- Demuestra viabilidad de usar Cohere API con capacidades de visión
- Valida arquitectura modular para integración con BD y frontend
- Crea documentación y procesos reutilizables

### KPIs de Éxito (Fase 1)
- **100%** de tests pasando
- **≥80%** code coverage
- **>80%** de historias con contexto visual relevante
- **0** breaking changes en endpoints existentes
- **100%** documentación completada

---

## 🎭 PERSONAS (User Personas)

### Persona 1: María - Creadora de Contenido
**Perfil:**
- Edad: 28 años
- Rol: Content Creator en redes sociales
- Tech Level: Intermedio

**Necesidades:**
- Crear contenido rápidamente para múltiples plataformas
- Mantener consistencia narrativa
- Ahorrar tiempo en redacción

**Frustraciones:**
- Bloqueo creativo
- Tiempo limitado para escribir historias
- Falta de herramientas automatizadas accesibles

**Caso de Uso:**
*"María saca una foto de su producto, quiere una historia inspiradora para Instagram en 2 minutos"*

### Persona 2: Roberto - Encargado de Marketing
**Perfil:**
- Edad: 42 años
- Rol: Marketing Manager en empresa PyME
- Tech Level: Básico-Intermedio

**Necesidades:**
- Generar contenido a escala para campañas
- Asegurar calidad y consistencia
- Reducir costos de producción

**Frustraciones:**
- Equipo de redactores limitado
- Presupuesto reducido para agencias
- Dificultad en implementar IA en procesos actuales

**Caso de Uso:**
*"Roberto tiene 50 fotos de clientes satisfechos, necesita historias educativas para email marketing"*

### Persona 3: Dev - Desarrollador de IA
**Perfil:**
- Edad: 32 años
- Rol: Senior Backend Developer
- Tech Level: Avanzado

**Necesidades:**
- API bien documentada y robusta
- Ejemplo de integración IA + Visión
- Arquitectura escalable y modular

**Frustraciones:**
- APIs complejas o mal documentadas
- Falta de ejemplos reales de uso
- Coupling de componentes difícil de extender

**Caso de Uso:**
*"Dev integra el endpoint en su plataforma de gestión de contenido como servicio de terceros"*

---

## 📋 REQUISITOS FUNCIONALES

### RF-1: Recibir y Validar Imagen

**Descripción:**
El endpoint debe aceptar una imagen en el request, validar su formato y tamaño.

**Criterios de Aceptación:**
- [ ] Acepta formatos: JPG, PNG, WEBP
- [ ] Rechaza formatos no permitidos con error 400
- [ ] Valida tamaño máximo 10 MB
- [ ] Rechaza archivos >10 MB con error 413
- [ ] Procesa archivo en memoria (sin persistencia Fase 1)
- [ ] Manejo de errores de lectura de archivo

**Prioridad:** 🔴 CRÍTICA  
**Dependencias:** Ninguna

---

### RF-2: Procesar Imagen y Extraer Captions

**Descripción:**
Utilizar IA (Cohere Vision u alternativa) para analizar la imagen y generar descripciones textuales (captions).

**Criterios de Aceptación:**
- [ ] Envía imagen a modelo de visión
- [ ] Recibe captions/descripciones de imagen (mín. 2)
- [ ] Manejo de timeouts (máx 10 segundos)
- [ ] Manejo de errores de API de visión
- [ ] Almacena captions en respuesta metadata
- [ ] Captions descriptivos y relevantes (validación manual)

**Prioridad:** 🔴 CRÍTICA  
**Dependencias:** RF-1

---

### RF-3: Integrar Captions en Generación de Historias

**Descripción:**
Incorporar las descripciones de imagen en el prompt parametrizado para mejorar relevancia de la historia generada.

**Criterios de Aceptación:**
- [ ] Prompt incluye captions de imagen
- [ ] Estructura: [TEXTO BASE] + [CONTEXTO VISUAL] → HISTORIA
- [ ] Historias generadas reflejan contexto de imagen
- [ ] Sin degradación en validaciones existentes
- [ ] Mantiene validaciones de tone y format

**Prioridad:** 🔴 CRÍTICA  
**Dependencias:** RF-2

---

### RF-4: Generar Historia Mejorada

**Descripción:**
Utilizar Cohere LLM para generar historia coherente integrando texto base e información visual.

**Criterios de Aceptación:**
- [ ] Historia generada: 80-120 palabras
- [ ] Estructura: Gancho → Desarrollo → Cierre
- [ ] Refleja tone solicitado (INSPIRACIONAL/EDUCATIVO/TÉCNICO)
- [ ] Apropiada para format (HISTORIA/POST/REDES_SOCIALES/OTRO)
- [ ] Incluye CTA para REDES_SOCIALES
- [ ] Legibilidad: Párrafos máx 3 líneas
- [ ] Sin errores gramaticales obvios

**Prioridad:** 🔴 CRÍTICA  
**Dependencias:** RF-3

---

### RF-5: Validar Output de Historia

**Descripción:**
Validar que la historia generada cumple con requisitos de calidad.

**Criterios de Aceptación:**
- [ ] Verifica longitud (80-120 palabras)
- [ ] Verifica estructura (Gancho/Dev/Cierre)
- [ ] Verifica tono (match con solicitado)
- [ ] Verifica CTA (para REDES_SOCIALES)
- [ ] Retorna validación: ok/error
- [ ] Manejo de regeneración si falla

**Prioridad:** 🟡 ALTA  
**Dependencias:** RF-4

---

### RF-6: Retornar Respuesta Estructurada

**Descripción:**
Endpoint retorna respuesta JSON con historia, validaciones y metadata.

**Criterios de Aceptación:**
- [ ] HTTP 200 OK en éxito
- [ ] Incluye: success, generatedStory, validation, metadata
- [ ] Metadata incluye: wordCount, tone, format, imageProcessed, imageCaptions, generatedAt, model
- [ ] HTTP 400 en validación fallida
- [ ] HTTP 500 con error detallado en fallo interno
- [ ] Tiempos de respuesta <5 segundos

**Prioridad:** 🔴 CRÍTICA  
**Dependencias:** RF-5

---

### RF-7: Validar Parámetros de Entrada

**Descripción:**
Validar que los parámetros tone, format y text cumplen requisitos.

**Criterios de Aceptación:**
- [ ] Tone: requerido, debe ser INSPIRACIONAL|EDUCATIVO|TÉCNICO
- [ ] Format: requerido, debe ser HISTORIA|POST|REDES_SOCIALES|OTRO
- [ ] Text: requerido, 20-1000 caracteres
- [ ] Image: requerido, validado en RF-1
- [ ] Mensajes de error específicos por campo
- [ ] No procesa si hay validación fallida

**Prioridad:** 🔴 CRÍTICA  
**Dependencias:** Ninguna

---

### RF-8: Manejar Errores Robustamente

**Descripción:**
Sistema debe recuperarse de errores de forma controlada sin perder estado.

**Criterios de Aceptación:**
- [ ] Errores de validación: mensaje clara + campo problemático
- [ ] Errores de API: reintento con backoff exponencial
- [ ] Timeout de imagen: fallback a descripción genérica
- [ ] Timeout de generación: error con sugerencia de reintento
- [ ] Logs de errores para debugging
- [ ] No expone detalles técnicos sensibles en respuesta

**Prioridad:** 🟡 ALTA  
**Dependencias:** RF-1 a RF-6

---

## 📋 REQUISITOS NO-FUNCIONALES

### NFR-1: Performance

**Especificación:**
- Tiempo respuesta endpoint: <5 segundos (95 percentil)
- Tiempo procesamiento imagen: <3 segundos
- Tiempo generación historia: <2 segundos
- Throughput: ≥10 req/segundo en servidor dev

**Métrica:** Response time < 5s

---

### NFR-2: Confiabilidad

**Especificación:**
- Disponibilidad: 99% en desarrollo
- Rate limiting: Implementado para API externa (Cohere)
- Reintentos: máx 3 por operación fallida
- Timeout: 30s global por request

**Métrica:** Zero unhandled exceptions

---

### NFR-3: Seguridad

**Especificación:**
- Validación estricta de entrada (tipo archivo, tamaño)
- No almacenamiento de imágenes en Fase 1
- API Key de Cohere protegida en .env
- CORS configurado solo para frontend autorizado
- Rate limiting contra abuso

**Métrica:** Pasa validación OWASP Top 10

---

### NFR-4: Escalabilidad

**Especificación:**
- Diseño sin estado (stateless) para horizontal scaling
- Preparación para migración a BD (schema Prisma ready)
- Sin hardcoding de configuraciones
- Logs centralizados para monitoreo

**Métrica:** Escalable a 100+ req/s

---

### NFR-5: Mantenibilidad

**Especificación:**
- Code coverage ≥80%
- Tests ejecutables con npm test
- Documentación API (swagger/postman)
- Logs detallados pero no verbose
- Commits pequeños y atómicos

**Métrica:** Nuevas features en <1 día

---

### NFR-6: Compatibilidad

**Especificación:**
- Node.js 18+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Formatos imagen: JPG, PNG, WEBP (estándares web)
- Bases de datos: PostgreSQL 12+

**Métrica:** Funciona en todo navegador moderno

---

## 📊 ESQUEMA DE DATOS (Contracts)

### Request Contract

```typescript
// POST /api/generate-story
interface GenerateStoryRequest {
  // Obligatorios
  tone: 'INSPIRACIONAL' | 'EDUCATIVO' | 'TÉCNICO';
  format: 'HISTORIA' | 'POST' | 'REDES_SOCIALES' | 'OTRO';
  text: string; // 20-1000 chars
  image: File | Blob; // JPG|PNG|WEBP, <10MB
}
```

### Response Contract

```typescript
interface GenerateStoryResponse {
  success: 'ok' | 'error';
  generatedStory: string;
  validation: {
    tone: 'ok' | 'error';
    format: 'ok' | 'error';
    text: 'ok' | 'error';
    image: 'ok' | 'error';
  };
  metadata: {
    wordCount: number;
    tone: string;
    format: string;
    imageProcessed: boolean;
    imageCaptions: string[];
    generatedAt: string; // ISO 8601
    model: 'command-r-plus' | 'alternative';
  };
  error?: {
    code: string;
    message: string;
    field?: string;
  };
}
```

### Error Response Contract

```typescript
interface ErrorResponse {
  success: 'error';
  error: {
    code: 'VALIDATION_ERROR' | 'FILE_ERROR' | 'API_ERROR' | 'TIMEOUT' | 'INTERNAL_ERROR';
    message: string;
    details?: Record<string, string>;
    timestamp: string;
  };
}
```

---

## 🎬 CASOS DE USO (Use Cases)

### UC-1: Creador Genera Historias para Redes Sociales

**Actor:** María (Content Creator)

**Precondición:** María tiene una imagen y texto base

**Flujo Principal:**
1. María selecciona imagen en interfaz
2. Ingresa texto de contexto
3. Selecciona tone: INSPIRACIONAL
4. Selecciona format: REDES_SOCIALES
5. Sistema procesa imagen → extrae captions
6. Sistema genera historia integrando contexto visual
7. Sistema valida: 80-120 palabras, incluye CTA
8. María recibe historia lista para publicar

**Flujo Alternativo (Validación Fallida):**
- Paso 7: Validación fallida → Sistema reintenta
- Si reintento falla → Mensaje de error con opción de ajustar parámetros

**Postcondición:** María tiene historia para publicar

---

### UC-2: Marketing Manager Genera Contenido Masivo

**Actor:** Roberto (Marketing Manager)

**Precondición:** Roberto tiene 50 fotos de clientes

**Flujo Principal:**
1. Roberto carga imagen lote
2. Especifica tone: EDUCATIVO, format: POST
3. Proporciona template de texto
4. Sistema procesa cada imagen
5. Para cada imagen: extrae captions, genera historia
6. Sistema valida calidad de cada historia
7. Roberto descarga lote de historias en JSON
8. Roberto importa a CMS para email marketing

**Postcondición:** Roberto tiene 50 historias validadas

---

### UC-3: Developer Integra Endpoint en Plataforma

**Actor:** Dev (Senior Backend Developer)

**Precondición:** Dev tiene documentación API y ejemplos

**Flujo Principal:**
1. Dev estudia documentación de endpoint
2. Dev revisa colección Postman
3. Dev ejecuta test local con imagen de prueba
4. Dev integra endpoint en su aplicación
5. Dev valida respuesta JSON en su schema
6. Dev implementa error handling específico
7. Dev deploy en producción con rate limiting

**Postcondición:** Endpoint integrado y funcional

---

## 🔄 FLUJOS DE USUARIO

### Flujo Principal: Generación de Historia

```
┌─────────────────┐
│  Usuario Carga  │
│    Imagen       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Validación    │
│ Formato/Tamaño  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Extracción de  │
│    Captions     │
│   (IA Vision)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Generación    │
│     Historia    │
│  (Cohere LLM)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Validación   │
│    Resultado    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Retorna Story  │
│   + Metadata    │
└─────────────────┘
```

---

## 🚧 LIMITACIONES Y SUPUESTOS

### Supuestos (Fase 1)

1. **Imagen de Prueba es Suficiente**
   - Usaremos una imagen real para validar flujo
   - Si funciona con prueba → asumimos funciona con cualquier imagen
   - Validación extensiva en fase posterior

2. **No hay Persistencia en BD**
   - Fase 1: Flujo en memoria
   - BD lista para Fase 2 (schema Prisma preparado)

3. **Cohere API Disponible**
   - Plan actual incluye Vision capability
   - Fallback a alternativa gratuita si no disponible

4. **Conexión a Internet Disponible**
   - Requerida para APIs externas (Cohere)
   - No implementamos offline mode en Fase 1

### Limitaciones (Fase 1)

1. **No persistencia de historias generadas**
2. **No edición post-generación** (Fase 3)
3. **No exportación en múltiples formatos** (Fase 3)
4. **No RAG o búsqueda semántica** (Fase 3+)
5. **No análisis avanzado de imagen** (OCR, objetos)
6. **No autenticación de usuarios** (Fase 2)
7. **No rate limiting por usuario** (solo global)

---

## 📈 MÉTRICAS DE ÉXITO

### Métricas de Producto

| Métrica | Meta | Medición |
|---------|------|----------|
| Historias con contexto visual | >80% | Manual QA |
| Tiempo respuesta | <5s | Logs/APM |
| Disponibilidad | 99% | Uptime monitor |
| Code coverage | ≥80% | Jest report |
| Tests passing | 100% | CI/CD |
| Documentación completa | 100% | Checklist DoD |

### Métricas de Calidad

| Métrica | Meta | Medición |
|---------|------|----------|
| Palabras por historia | 80-120 | Count automático |
| Estructura (gancho/dev/cierre) | 100% | Manual QA |
| Tono reflejado | >90% | Manual QA |
| CTA presente (REDES_SOCIALES) | 100% | Manual QA |
| Errores gramaticales | 0 | Manual QA |

---

## 🔮 ROADMAP DE FASES

### ✅ Fase 1 (Actual): MVP con Imagen
- Endpoint recibe imagen + 3 parámetros
- Extracción de captions vía IA
- Generación mejorada con contexto visual
- Tests al 100%

### 🔜 Fase 2: Persistencia y Usuarios
- Schema Prisma para historias
- Base de datos PostgreSQL
- Autenticación de usuarios
- CRUD endpoints básicos

### 🚀 Fase 3: Edición y Exportación
- Panel de edición interactivo
- Exportación (PDF, DOCX, HTML)
- Historial de usuario
- Regeneración selectiva

### 🌟 Fase 4+: IA Avanzada
- RAG: Búsqueda semántica
- Análisis OCR en imágenes
- Detección de objetos
- Recomendaciones personalizadas

---

## 👥 STAKEHOLDERS

| Rol | Responsabilidad | Interés |
|-----|-----------------|---------|
| Product Manager | Definir visión y requisitos | ROI, user satisfaction |
| Desarrollador Backend | Implementar endpoint | Código limpio, tests |
| QA Engineer | Validar funcionalidad | Bugs, edge cases |
| DevOps | Deployment y monitoreo | Performance, uptime |
| Usuarios | Usar producto | Utilidad, velocidad |

---

## 📝 NOTAS FINALES

### Principios de Diseño
1. **Mobile First:** Respuestas rápidas (compatible con conexiones lentas)
2. **Modular:** Componentes intercambiables (LLM, vision API)
3. **User-Centric:** Mensajes claros, manejo robusto de errores
4. **Documentado:** Todo debe ser claro para nuevos devs
5. **Testeable:** Código refactorable y fácil de probar

### Recomendaciones
- Usar imagen real para testing desde el inicio
- Documentar decisiones técnicas importantes
- Mantener commits pequeños y atómicos
- Revisar validaciones de output regularmente
- Preparar schema BD para Fase 2 desde el inicio

---

**Documento de Especificaciones Completado**  
**Listo para Planificación Técnica (1plan-f1.md)**  
**Fecha:** 9 de diciembre de 2025
