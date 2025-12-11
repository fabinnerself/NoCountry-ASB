# Especificación de Producto: AutoStory Builder - Fase 0
## Story Generator Function

---

**Versión:** 1.0  
**Fecha:** 8 de Diciembre, 2025  
**Autor:** Equipo AutoStory Builder  
**Estado:** En Desarrollo - Fase 0

---

## 📑 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Visión del Producto](#visión-del-producto)
3. [Problema y Oportunidad](#problema-y-oportunidad)
4. [Objetivos del Producto](#objetivos-del-producto)
5. [Alcance de Fase 0](#alcance-de-fase-0)
6. [Requisitos Funcionales](#requisitos-funcionales)
7. [Casos de Uso](#casos-de-uso)
8. [Criterios de Éxito](#criterios-de-éxito)
9. [Fuera de Alcance](#fuera-de-alcance)
10. [Roadmap y Fases Futuras](#roadmap-y-fases-futuras)
11. [Métricas de Éxito](#métricas-de-éxito)
12. [Riesgos y Mitigaciones](#riesgos-y-mitigaciones)

---

## 1. Resumen Ejecutivo

**AutoStory Builder** es una plataforma impulsada por IA diseñada para ayudar a organizaciones sociales, ONGs, y comunicadores a transformar información básica en historias narrativas impactantes y optimizadas para diferentes canales de comunicación.

La **Fase 0** se enfoca en desarrollar y validar la funcionalidad central: **generación automática de historias** a partir de tres parámetros clave (tono, formato, y contexto textual), estableciendo las bases para un sistema completo de creación de contenido multimedia.

### ¿Qué resuelve?
Elimina la barrera de tiempo y habilidades de escritura creativa que enfrentan las organizaciones al comunicar su impacto social, permitiéndoles generar narrativas profesionales en segundos.

### ¿Para quién?
- Organizaciones sin fines de lucro
- Comunicadores sociales
- Gestores de programas de impacto
- Equipos de marketing social

---

## 2. Visión del Producto

### Visión a Largo Plazo
Convertirse en la herramienta líder para la creación automatizada de contenido narrativo de impacto social, permitiendo que cualquier organización pueda contar historias poderosas sin necesidad de equipos especializados en comunicación.

### Visión de Fase 0
Demostrar que la IA puede generar historias coherentes, emocionalmente resonantes y adaptadas a diferentes tonos y formatos, validando la propuesta de valor central del producto.

### Principios Rectores
1. **Accesibilidad:** Cualquier persona debe poder generar contenido de calidad
2. **Impacto:** Las historias deben conectar emocionalmente y motivar acción
3. **Flexibilidad:** Adaptación a múltiples tonos, formatos y contextos
4. **Calidad:** Mantener estándares profesionales de storytelling
5. **Escalabilidad:** Diseño preparado para crecer en funcionalidades

---

## 3. Problema y Oportunidad

### 3.1 Problema
Las organizaciones sociales enfrentan desafíos críticos en comunicación:

**Problema Principal:**
> "Tenemos historias de impacto increíbles, pero no tenemos tiempo ni recursos para comunicarlas efectivamente"

**Puntos de Dolor Específicos:**
1. **Falta de tiempo:** Los equipos están enfocados en operaciones, no en comunicación
2. **Habilidades limitadas:** No todos tienen experiencia en storytelling o redacción creativa
3. **Recursos escasos:** Contratar comunicadores profesionales es costoso
4. **Inconsistencia:** La calidad del contenido varía según quién lo cree
5. **Adaptación multicanal:** Crear versiones para diferentes plataformas consume mucho tiempo

### 3.2 Oportunidad
**Mercado:**
- Miles de ONGs y organizaciones sociales en Latinoamérica
- Creciente necesidad de presencia digital y comunicación de impacto
- Adopción acelerada de herramientas de IA en el sector social

**Ventaja Competitiva:**
- Especialización en narrativa de impacto social (no solo marketing genérico)
- Comprensión de los tonos y formatos específicos del sector
- Diseño para usuarios no técnicos

**Momento Oportuno:**
- Madurez de modelos de lenguaje (LLMs)
- Democratización del acceso a APIs de IA
- Cultura de transformación digital en el tercer sector

---

## 4. Objetivos del Producto

### 4.1 Objetivos de Negocio
1. **Validar demanda:** Confirmar que existe necesidad real del producto
2. **Probar viabilidad técnica:** Demostrar que la IA puede generar contenido de calidad
3. **Establecer base técnica:** Crear infraestructura escalable para fases futuras
4. **Obtener feedback:** Recopilar insights de usuarios reales para iterar

### 4.2 Objetivos de Usuario
1. **Reducir tiempo de creación:** De horas a minutos
2. **Mejorar calidad:** Narrativas profesionales sin experiencia previa
3. **Facilitar adaptación:** Generar contenido para diferentes canales fácilmente
4. **Aumentar confianza:** Sentirse seguros de compartir sus historias

### 4.3 Objetivos Técnicos (Fase 0)
1. Implementar generación de historias con 3 parámetros
2. Validar integración con Cohere API
3. Establecer arquitectura TDD (Test-Driven Development)
4. Preparar infraestructura para persistencia futura

---

## 5. Alcance de Fase 0

### 5.1 ¿Qué SÍ incluye esta fase?

#### Funcionalidad Principal
**Generación de Historias Parametrizada**
- El usuario proporciona 3 inputs:
  1. **Tono:** El estilo emocional de la narrativa
  2. **Formato:** El tipo de contenido a generar
  3. **Texto:** Contexto o información base

- El sistema genera una historia:
  - Coherente con el tono solicitado
  - Adaptada al formato especificado
  - Basada en el contexto proporcionado
  - Con longitud óptima (80-120 palabras)

#### Parámetros Disponibles

**Tonos:**
- **INSPIRACIONAL:** Historias que motivan y conectan emocionalmente
- **EDUCATIVO:** Contenido didáctico y formativo
- **TÉCNICO:** Narrativas profesionales y orientadas a procesos

**Formatos:**
- **HISTORIA:** Narrativa completa con inicio, desarrollo y cierre
- **POST:** Contenido tipo blog o artículo breve
- **REDES_SOCIALES:** Optimizado para plataformas sociales (emojis, hashtags, CTA)
- **OTRO:** Formato flexible adaptado al contexto

#### Validaciones
- Verificación de parámetros válidos
- Validación de longitud de texto (20-1000 caracteres)
- Validación de output (80-120 palabras)
- Mensajes de error claros y accionables

### 5.2 ¿Qué NO incluye esta fase?
Ver sección [Fuera de Alcance](#fuera-de-alcance)

---

## 6. Requisitos Funcionales

### RF-001: Generación de Historia
**Prioridad:** CRÍTICA  
**Como** usuario del sistema  
**Quiero** generar una historia a partir de tono, formato y contexto  
**Para** comunicar impacto social de manera efectiva

**Criterios de Aceptación:**
- ✅ El sistema acepta 3 parámetros: tone, format, text
- ✅ La historia generada refleja el tono solicitado
- ✅ La historia se adapta al formato especificado
- ✅ La longitud está entre 80-120 palabras
- ✅ El contenido es coherente con el contexto proporcionado
- ✅ El tiempo de respuesta es menor a 10 segundos

**Contrato de Datos:**

*Input:*
```json
{
  "tone": "INSPIRACIONAL" | "EDUCATIVO" | "TÉCNICO",
  "format": "HISTORIA" | "POST" | "REDES_SOCIALES" | "OTRO",
  "text": "string (20-1000 caracteres)"
}
```

*Output:*
```json
{
  "success": "ok",
  "generatedStory": "string",
  "validation": {
    "tone": "ok" | "error",
    "format": "ok" | "error",
    "text": "ok" | "error"
  },
  "metadata": {
    "wordCount": number,
    "tone": "string",
    "format": "string",
    "generatedAt": "ISO 8601 timestamp",
    "model": "string"
  }
}
```

---

### RF-002: Validación de Tono
**Prioridad:** ALTA  
**Como** sistema  
**Quiero** validar que el tono proporcionado sea válido  
**Para** garantizar que puedo generar contenido apropiado

**Criterios de Aceptación:**
- ✅ Solo acepta: "INSPIRACIONAL", "EDUCATIVO", "TÉCNICO"
- ✅ Rechaza valores no válidos con mensaje claro
- ✅ El mensaje de error indica los valores permitidos

**Mensaje de Error:**
```
"Valor de tone no válido: [valor recibido]. 
Valores permitidos: INSPIRACIONAL, EDUCATIVO, TÉCNICO"
```

---

### RF-003: Validación de Formato
**Prioridad:** ALTA  
**Como** sistema  
**Quiero** validar que el formato proporcionado sea válido  
**Para** generar contenido con la estructura correcta

**Criterios de Aceptación:**
- ✅ Solo acepta: "HISTORIA", "POST", "REDES_SOCIALES", "OTRO"
- ✅ Rechaza valores no válidos con mensaje claro
- ✅ El mensaje de error indica los valores permitidos

**Mensaje de Error:**
```
"Valor de format no válido: [valor recibido]. 
Valores permitidos: HISTORIA, POST, REDES_SOCIALES, OTRO"
```

---

### RF-004: Validación de Texto
**Prioridad:** ALTA  
**Como** sistema  
**Quiero** validar que el texto tenga longitud apropiada  
**Para** asegurar que hay suficiente contexto sin exceder límites

**Criterios de Aceptación:**
- ✅ Longitud mínima: 20 caracteres
- ✅ Longitud máxima: 1000 caracteres
- ✅ Rechaza textos fuera de rango con mensaje claro
- ✅ El mensaje indica la longitud recibida

**Mensaje de Error:**
```
"El texto debe tener entre 20 y 1000 caracteres. 
Recibido: [longitud]"
```

---

### RF-005: Validación de Output
**Prioridad:** MEDIA  
**Como** sistema  
**Quiero** validar que la historia generada cumpla estándares de calidad  
**Para** garantizar consistencia en el producto

**Criterios de Aceptación:**
- ✅ Longitud entre 80-120 palabras
- ✅ Incluye indicador de validación en respuesta
- ✅ Registra si cumple o no con el estándar

**Validación Incluida en Response:**
```json
"validation": {
  "tone": "ok",
  "format": "ok",
  "text": "ok"
}
```

---

### RF-006: Manejo de Errores
**Prioridad:** ALTA  
**Como** usuario  
**Quiero** recibir mensajes de error claros cuando algo falla  
**Para** entender qué corregir en mi solicitud

**Criterios de Aceptación:**
- ✅ Errores de validación devuelven HTTP 400
- ✅ Errores de servidor devuelven HTTP 500
- ✅ Mensajes son descriptivos y accionables
- ✅ Se incluye información sobre qué corregir

**Formato de Error:**
```json
{
  "success": false,
  "error": "Mensaje descriptivo del error"
}
```

---

### RF-007: Metadata de Generación
**Prioridad:** MEDIA  
**Como** usuario  
**Quiero** recibir información sobre la historia generada  
**Para** entender el contexto y validar el resultado

**Criterios de Aceptación:**
- ✅ Incluye conteo de palabras
- ✅ Incluye tono y formato utilizados
- ✅ Incluye timestamp de generación
- ✅ Incluye modelo de IA utilizado

---

## 7. Casos de Uso

### Caso de Uso 1: Generar Post para Redes Sociales

**Actor:** Comunicador de ONG  
**Objetivo:** Crear un post inspiracional para Instagram sobre un beneficiario

**Precondiciones:**
- El usuario tiene acceso al sistema
- Tiene información básica del beneficiario

**Flujo Principal:**
1. Usuario accede al endpoint `/api/generate-story`
2. Usuario envía:
   ```json
   {
     "tone": "INSPIRACIONAL",
     "format": "REDES_SOCIALES",
     "text": "María, madre soltera de 3 hijos, completó nuestro programa de emprendimiento. Ahora tiene su propia panadería y emplea a 2 personas de su comunidad."
   }
   ```
3. Sistema valida los parámetros
4. Sistema genera historia optimizada para redes sociales
5. Sistema devuelve historia con emojis, hashtags y llamado a la acción
6. Usuario recibe contenido listo para publicar

**Resultado Esperado:**
```
🌟 De la adversidad al éxito: La historia de María

Madre soltera, 3 hijos, un sueño. María no se rindió. Completó nuestro programa de emprendimiento y hoy su panadería no solo sostiene a su familia, ¡también genera empleo en su comunidad!

¿Conoces a alguien con un sueño como el de María? 💪

#Emprendimiento #MujeresEmprendedoras #ImpactoSocial #Superación
```

**Postcondiciones:**
- Historia generada y lista para usar
- Metadata disponible para análisis

---

### Caso de Uso 2: Generar Contenido Educativo

**Actor:** Coordinador de Programa  
**Objetivo:** Crear contenido educativo sobre metodología de trabajo

**Precondiciones:**
- Usuario tiene información sobre el programa

**Flujo Principal:**
1. Usuario envía solicitud con tone="EDUCATIVO" y format="POST"
2. Proporciona contexto sobre metodología
3. Sistema genera contenido didáctico
4. Usuario recibe explicación clara y estructurada

**Resultado Esperado:**
Contenido que explica conceptos de manera accesible, con estructura lógica y enfoque formativo.

---

### Caso de Uso 3: Generar Historia Completa

**Actor:** Director de Comunicaciones  
**Objetivo:** Crear narrativa completa para informe anual

**Precondiciones:**
- Tiene datos de impacto del año

**Flujo Principal:**
1. Usuario envía solicitud con tone="INSPIRACIONAL" y format="HISTORIA"
2. Proporciona resumen de logros anuales
3. Sistema genera narrativa con estructura completa
4. Usuario recibe historia con inicio, desarrollo y cierre

**Resultado Esperado:**
Historia narrativa completa que puede incluirse en reportes, presentaciones o sitio web.

---

### Caso de Uso 4: Error de Validación

**Actor:** Usuario nuevo  
**Objetivo:** Intentar generar historia con parámetros incorrectos

**Flujo Principal:**
1. Usuario envía tone="EMOTIVO" (no válido)
2. Sistema detecta error de validación
3. Sistema devuelve error HTTP 400
4. Usuario recibe mensaje claro indicando valores permitidos
5. Usuario corrige y reenvía solicitud

**Resultado Esperado:**
Usuario entiende el error y puede corregirlo fácilmente.

---

## 8. Criterios de Éxito

### 8.1 Criterios de Aceptación Técnicos

**Funcionalidad:**
- ✅ Endpoint `/api/generate-story` responde correctamente
- ✅ 100% de tests unitarios pasan
- ✅ Validaciones funcionan correctamente
- ✅ Manejo de errores implementado
- ✅ Tiempo de respuesta < 10 segundos

**Calidad del Output:**
- ✅ Historias cumplen 80-120 palabras
- ✅ Contenido es coherente con el input
- ✅ Tono es consistente con lo solicitado
- ✅ Formato es apropiado para el canal

**Documentación:**
- ✅ API documentada
- ✅ Ejemplos de uso disponibles
- ✅ Mensajes de error documentados

### 8.2 Criterios de Éxito de Producto

**Usabilidad:**
- Usuario puede generar historia en < 1 minuto
- Tasa de error de validación < 10%
- Mensajes de error son comprensibles

**Calidad Percibida:**
- 80% de historias generadas son usables sin edición
- Usuarios reportan ahorro de tiempo significativo
- Contenido es considerado "profesional" por usuarios

### 8.3 Definition of Done (DoD)

Una funcionalidad está "Done" cuando:
- [ ] Código implementado y revisado
- [ ] Tests unitarios escritos y pasando
- [ ] Validaciones implementadas
- [ ] Documentación actualizada
- [ ] Probado manualmente con casos reales
- [ ] Sin errores críticos conocidos
- [ ] Integrado con código existente

---

## 9. Fuera de Alcance

### 9.1 Fuera de Alcance - Fase 0

**NO se incluye en esta fase:**

❌ **Procesamiento de Imágenes**
- Análisis de imágenes con IA
- Extracción de captions de imágenes
- Generación de descripciones visuales
- *Razón:* Se integrará en Fase 1

❌ **Sistema de Usuarios**
- Registro y autenticación
- Perfiles de usuario
- Gestión de sesiones
- *Razón:* No es necesario para validar funcionalidad core

❌ **Persistencia de Datos**
- Almacenamiento de historias en base de datos
- Historial de generaciones
- Recuperación de historias previas
- *Razón:* Se implementará en Fase 1

❌ **Sistema RAG (Retrieval-Augmented Generation)**
- Búsqueda semántica
- Embeddings con pgvector
- Recomendaciones basadas en historias similares
- *Razón:* Funcionalidad avanzada para fases posteriores

❌ **Panel de Edición**
- Interfaz de edición de historias
- Modificación interactiva
- Versionado de contenido
- *Razón:* Requiere frontend completo (Fase 2+)

❌ **Exportación Multicanal**
- Exportación a PDF, Word, etc.
- Adaptación automática a múltiples plataformas
- Programación de publicaciones
- *Razón:* Funcionalidad de valor agregado para fases futuras

❌ **Operaciones Avanzadas**
- REGENERAR historia existente
- EDITAR historia con modificaciones específicas
- Comparación de versiones
- *Razón:* Requiere persistencia (Fase 1)

❌ **Analytics y Métricas**
- Dashboard de uso
- Métricas de engagement
- A/B testing de historias
- *Razón:* Requiere volumen de datos (Fase 2+)

### 9.2 Decisiones Conscientes

**¿Por qué empezar solo con texto?**
- Validar la capacidad de generación de narrativas antes de agregar complejidad
- Probar la propuesta de valor core sin dependencias adicionales
- Iterar rápidamente basado en feedback

**¿Por qué no incluir usuarios en Fase 0?**
- Enfocarse en la funcionalidad central
- Reducir complejidad técnica inicial
- Permitir testing sin fricción de autenticación

**¿Por qué no persistir datos aún?**
- Validar que la funcionalidad es valiosa antes de invertir en infraestructura
- Mantener la fase ágil y enfocada
- Preparar arquitectura para cuando sea necesario

---

## 10. Roadmap y Fases Futuras

### Fase 0 (Actual) - Story Generator Core
**Duración:** 2-3 semanas  
**Objetivo:** Validar generación de historias con 3 parámetros

**Entregables:**
- ✅ Función de generación de historias
- ✅ Validaciones de input/output
- ✅ Tests unitarios
- ✅ Endpoint REST funcional

---

### Fase 1 - Persistencia y Multimodalidad
**Duración:** 3-4 semanas  
**Objetivo:** Agregar imágenes y almacenamiento

**Funcionalidades:**
- 📸 Procesamiento de imágenes
- 💾 Persistencia en PostgreSQL
- 👤 Sistema básico de usuarios
- 🔄 Operaciones REGENERAR y EDITAR
- 📊 Metadata extendida

**Nuevos Parámetros:**
```json
{
  "idUser": "UUID",
  "operacion": "GENERAR | REGENERAR | EDITAR",
  "tone": "...",
  "format": "...",
  "text": "...",
  "image": "base64 | URL (opcional)"
}
```

---

### Fase 2 - RAG y Búsqueda Semántica
**Duración:** 4-5 semanas  
**Objetivo:** Inteligencia contextual

**Funcionalidades:**
- 🔍 Búsqueda semántica de historias similares
- 🧠 Embeddings con pgvector
- 💡 Sugerencias basadas en contexto
- 📚 Base de conocimiento de narrativas

---

### Fase 3 - Panel de Edición y Exportación
**Duración:** 5-6 semanas  
**Objetivo:** Experiencia de usuario completa

**Funcionalidades:**
- ✏️ Editor interactivo de historias
- 📤 Exportación multicanal
- 🎨 Personalización de estilos
- 📱 Optimización por plataforma

---

### Fase 4 - Analytics y Optimización
**Duración:** 4-5 semanas  
**Objetivo:** Insights y mejora continua

**Funcionalidades:**
- 📊 Dashboard de métricas
- 🧪 A/B testing
- 📈 Recomendaciones de optimización
- 🎯 Análisis de engagement

---

## 11. Métricas de Éxito

### 11.1 Métricas Técnicas (Fase 0)

**Performance:**
- Tiempo de respuesta promedio: < 5 segundos
- Tiempo de respuesta p95: < 10 segundos
- Disponibilidad: > 99%

**Calidad:**
- Tasa de éxito de generación: > 95%
- Tasa de error de validación: < 5%
- Cobertura de tests: > 80%

**Consistencia:**
- 90% de historias cumplen longitud objetivo (80-120 palabras)
- 100% de historias reflejan el tono solicitado
- 100% de historias se adaptan al formato especificado

### 11.2 Métricas de Producto (Post-Lanzamiento)

**Adopción:**
- Número de historias generadas por semana
- Número de usuarios activos
- Tasa de retención semanal

**Satisfacción:**
- % de historias usadas sin edición
- Net Promoter Score (NPS)
- Feedback cualitativo positivo

**Impacto:**
- Tiempo ahorrado vs. creación manual
- Aumento en frecuencia de publicación
- Mejora en engagement de contenido publicado

### 11.3 Métricas de Aprendizaje

**Validación de Hipótesis:**
- ¿Los usuarios encuentran valor en la generación automatizada?
- ¿Los tonos y formatos definidos cubren las necesidades?
- ¿La calidad del output es suficiente para uso real?

**Insights para Iterar:**
- ¿Qué tonos/formatos se usan más?
- ¿Qué tipos de contexto generan mejores historias?
- ¿Qué errores son más comunes?

---

## 12. Riesgos y Mitigaciones

### Riesgo 1: Calidad Inconsistente del Output
**Probabilidad:** MEDIA  
**Impacto:** ALTO

**Descripción:**
La IA podría generar historias de calidad variable, algunas excelentes y otras inutilizables.

**Mitigación:**
- Implementar validaciones estrictas de output
- Refinar prompts iterativamente basado en resultados
- Establecer métricas claras de calidad
- Realizar testing exhaustivo con casos reales
- Considerar regeneración automática si no cumple estándares

---

### Riesgo 2: Limitaciones de la API de Cohere
**Probabilidad:** BAJA  
**Impacto:** ALTO

**Descripción:**
Problemas de disponibilidad, rate limits, o costos inesperados de la API.

**Mitigación:**
- Implementar manejo robusto de errores
- Considerar caché de respuestas comunes
- Monitorear uso y costos activamente
- Tener plan de contingencia con API alternativa
- Implementar retry logic con backoff exponencial

---

### Riesgo 3: Expectativas de Usuario Desalineadas
**Probabilidad:** MEDIA  
**Impacto:** MEDIO

**Descripción:**
Usuarios esperan funcionalidades que no están en Fase 0 (ej: edición, imágenes).

**Mitigación:**
- Comunicar claramente el alcance de Fase 0
- Establecer roadmap visible
- Recopilar feedback para priorizar fases futuras
- Documentar limitaciones conocidas
- Gestionar expectativas desde el inicio

---

### Riesgo 4: Tiempo de Respuesta Elevado
**Probabilidad:** MEDIA  
**Impacto:** MEDIO

**Descripción:**
Las llamadas a la API de IA podrían tardar más de lo aceptable para UX.

**Mitigación:**
- Establecer timeout apropiado (10 segundos)
- Implementar indicadores de progreso en frontend
- Optimizar prompts para respuestas más rápidas
- Considerar procesamiento asíncrono para fases futuras
- Monitorear latencia activamente

---

### Riesgo 5: Sesgo o Contenido Inapropiado
**Probabilidad:** BAJA  
**Impacto:** ALTO

**Descripción:**
La IA podría generar contenido sesgado, ofensivo o inapropiado.

**Mitigación:**
- Diseñar prompts con directrices éticas claras
- Implementar filtros de contenido
- Realizar auditorías de calidad regularmente
- Establecer proceso de reporte de problemas
- Documentar casos problemáticos para mejorar prompts

---

## 13. Dependencias y Supuestos

### 13.1 Dependencias Técnicas

**Externas:**
- Disponibilidad de Cohere API
- Acceso a API key válida
- Conectividad a internet estable

**Internas:**
- Código base de backend funcional
- Infraestructura de testing configurada
- Entorno de desarrollo preparado

### 13.2 Supuestos

**Técnicos:**
- La API de Cohere puede generar contenido en español de calidad
- El modelo "command-r-plus" es adecuado para storytelling
- 80-120 palabras es longitud óptima para los formatos definidos

**De Negocio:**
- Existe demanda real para esta funcionalidad
- Usuarios están dispuestos a usar IA para generar contenido
- El ahorro de tiempo justifica el uso de la herramienta

**De Usuario:**
- Usuarios pueden proporcionar contexto suficiente en 20-1000 caracteres
- Los 3 tonos definidos cubren casos de uso principales
- Los 4 formatos son suficientes para Fase 0

---

## 14. Glosario

**Story Generator:** Función central que genera historias a partir de parámetros  
**Tone:** Estilo emocional y narrativo de la historia (ej: inspiracional)  
**Format:** Tipo de contenido y estructura (ej: post de redes sociales)  
**Context:** Información base proporcionada por el usuario  
**RAG:** Retrieval-Augmented Generation - técnica de IA que combina búsqueda y generación  
**pgvector:** Extensión de PostgreSQL para búsqueda de similitud vectorial  
**TDD:** Test-Driven Development - metodología de desarrollo guiada por tests  
**PRD:** Product Requirements Document - documento de requisitos del producto  
**DoD:** Definition of Done - criterios para considerar una tarea completada  
**LLM:** Large Language Model - modelo de lenguaje de gran escala  

---

## 15. Aprobaciones y Revisiones

| Rol | Nombre | Fecha | Estado |
|-----|--------|-------|--------|
| Product Owner | - | - | Pendiente |
| Tech Lead | - | - | Pendiente |
| UX Lead | - | - | Pendiente |
| Stakeholder | - | - | Pendiente |

---

## 16. Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2025-12-08 | Equipo AutoStory | Versión inicial del documento |

---

## 17. Anexos

### Anexo A: Ejemplo Completo de Interacción

**Request:**
```bash
POST /api/generate-story
Content-Type: application/json

{
  "tone": "INSPIRACIONAL",
  "format": "REDES_SOCIALES",
  "text": "Joven de comunidad rural accedió a programa de becas tecnológicas. Superó barreras de conectividad y hoy trabaja como desarrollador remoto, ayudando a su familia."
}
```

**Response:**
```json
{
  "success": "ok",
  "generatedStory": "🌟 De las montañas al código: la historia de superación de Juan\n\nSin internet estable, con solo su determinación y un celular prestado, Juan aprendió a programar. Hoy, desde su pueblo, trabaja para empresas internacionales y está cambiando el futuro de su familia.\n\n¿Cuál es tu historia de superación? 💪\n\n#Inspiración #Tecnología #Superación",
  "validation": {
    "tone": "ok",
    "format": "ok",
    "text": "ok"
  },
  "metadata": {
    "wordCount": 95,
    "tone": "INSPIRACIONAL",
    "format": "REDES_SOCIALES",
    "generatedAt": "2025-12-09T02:13:27.227Z",
    "model": "command-r-plus"
  }
}
```

### Anexo B: Referencias

- Documento de brainstorming: `backend/plan/brainstornF0.txt`
- Descripción general del proyecto: `desc_gral_proy_auto_store-builder.txt`
- Estructura de base de datos: `db_struct.sql`

---

**Fin del Documento de Especificación**
