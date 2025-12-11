# Requirements Document - Fase 2: Persistencia en Base de Datos

## Introduction

AutoStory Builder es un sistema de IA para generar historias visuales y textuales a partir de inputs multimedia. La Fase 2 se enfoca en agregar persistencia en base de datos al endpoint existente `/api/generate-story`, permitiendo almacenar todas las historias generadas junto con sus metadatos para futuras funcionalidades de versionado, historial y análisis.

Esta fase NO desarrolla desde cero, sino que extiende el código funcional existente (Fase 1) que ya está desplegado en producción (Frontend en Vercel, Backend en Render).

## Glossary

- **AutoStory Builder**: Sistema completo de generación de historias con IA
- **Story**: Historia generada por el sistema a partir de inputs del usuario
- **Endpoint**: Punto de acceso API REST para generar historias
- **Prisma**: ORM (Object-Relational Mapping) para interactuar con PostgreSQL
- **PostgreSQL**: Sistema de gestión de base de datos relacional
- **NeonTech**: Proveedor de PostgreSQL en la nube
- **Render**: Plataforma de deployment para el backend
- **Vercel**: Plataforma de deployment para el frontend
- **TDD**: Test-Driven Development, metodología de desarrollo guiado por tests
- **Health Check**: Endpoint para verificar el estado del servicio
- **Cohere API**: Servicio de IA para generación de texto
- **CRUD**: Create, Read, Update, Delete - operaciones básicas de base de datos

## Requirements

### Requirement 1: Persistencia de Historias Generadas

**User Story:** Como desarrollador del sistema, quiero que todas las historias generadas se almacenen en base de datos, para que podamos implementar funcionalidades de historial, versionado y análisis en futuras fases.

#### Acceptance Criteria

1. WHEN el endpoint `/api/generate-story` genera exitosamente una historia THEN el sistema SHALL persistir en la tabla `stories` los campos: tone, format, text, image, generatedStory, id_usuario, created_at, version
2. WHEN ocurre un error durante la generación THEN el sistema SHALL persistir en la tabla `stories` el mensaje de error junto con los datos de entrada
3. WHEN se persiste una historia THEN el sistema SHALL retornar en el campo `validation.db` el valor "ok"
4. WHEN falla la persistencia en base de datos THEN el sistema SHALL retornar en el campo `validation.db` el valor "error" y un mensaje descriptivo del error
5. WHEN se consulta la tabla `stories` THEN el sistema SHALL mostrar todos los registros persistidos con sus timestamps correctos

### Requirement 2: Configuración de Prisma ORM

**User Story:** Como desarrollador del sistema, quiero configurar Prisma ORM con el schema de base de datos, para que pueda interactuar de forma segura y tipada con PostgreSQL.

#### Acceptance Criteria

1. WHEN se ejecuta `npx prisma generate` THEN el sistema SHALL generar el cliente Prisma basado en el schema definido
2. WHEN se ejecuta `npx prisma migrate dev` THEN el sistema SHALL crear las tablas en la base de datos según el schema
3. WHEN el schema de Prisma se define THEN el sistema SHALL incluir la tabla `stories` con todos los campos especificados en `db_struct.sql`
4. WHEN se importa el cliente Prisma en el código THEN el sistema SHALL proporcionar autocompletado y validación de tipos TypeScript
5. WHEN se configura la conexión THEN el sistema SHALL leer la variable de entorno `DATABASE_URL` para conectarse a PostgreSQL

### Requirement 3: Validación de Conexión a Base de Datos

**User Story:** Como desarrollador del sistema, quiero validar la conexión a la base de datos en diferentes entornos, para asegurar que el sistema funcione correctamente en local, cloud y producción.

#### Acceptance Criteria

1. WHEN el sistema inicia THEN el sistema SHALL verificar la conexión a PostgreSQL usando la DATABASE_URL configurada
2. WHEN la conexión falla THEN el sistema SHALL retornar el mensaje "Error de conexión con base de datos. Verifique la configuración de DATABASE_URL"
3. WHEN la conexión excede el timeout THEN el sistema SHALL retornar el mensaje "Tiempo de espera agotado al conectar con base de datos"
4. WHEN se conecta a PostgreSQL local THEN el sistema SHALL completar la conexión en menos de 200ms
5. WHEN se conecta a NeonTech cloud THEN el sistema SHALL completar la conexión en menos de 500ms

### Requirement 4: Manejo de Errores de Base de Datos

**User Story:** Como desarrollador del sistema, quiero manejar todos los errores de base de datos de forma clara y específica, para facilitar el debugging y proporcionar información útil al usuario.

#### Acceptance Criteria

1. WHEN ocurre un error de persistencia THEN el sistema SHALL retornar "Error al guardar historia en base de datos. Código: [DB_ERROR_CODE]"
2. WHEN se viola una restricción de base de datos THEN el sistema SHALL retornar "Violación de restricción de base de datos: [CONSTRAINT_NAME]"
3. WHEN falla una transacción THEN el sistema SHALL ejecutar rollback y retornar "Error al ejecutar transacción. Los cambios fueron revertidos"
4. WHEN ocurre cualquier error de BD THEN el sistema SHALL mantener la funcionalidad de generación de historias (degradación elegante)
5. WHEN se registra un error THEN el sistema SHALL incluir el stack trace en los logs del servidor para debugging

### Requirement 5: Testing de Persistencia

**User Story:** Como desarrollador del sistema, quiero una suite completa de tests para la funcionalidad de base de datos, para asegurar que la persistencia funciona correctamente en todos los escenarios.

#### Acceptance Criteria

1. WHEN se ejecuta `npm run test:db` THEN el sistema SHALL ejecutar únicamente los tests relacionados con base de datos
2. WHEN se ejecuta `npm run test:coverage-db` THEN el sistema SHALL generar un reporte de cobertura de código para los módulos de persistencia
3. WHEN se mide la cobertura THEN el sistema SHALL alcanzar al menos 80% de cobertura en todos los módulos de persistencia
4. WHEN se ejecutan tests de integración THEN el sistema SHALL validar operaciones CRUD completas contra una base de datos de test
5. WHEN se ejecutan tests E2E THEN el sistema SHALL validar el flujo completo desde el endpoint hasta la persistencia en BD

### Requirement 6: Actualización del Health Check

**User Story:** Como operador del sistema, quiero que el endpoint de health check incluya la versión de la fase actual, para poder verificar qué versión está desplegada en cada ambiente.

#### Acceptance Criteria

1. WHEN se consulta el endpoint `/health` THEN el sistema SHALL retornar un campo `version` con el valor "fase2"
2. WHEN se consulta el endpoint `/health` THEN el sistema SHALL retornar el estado de conexión con la base de datos
3. WHEN la base de datos está disponible THEN el sistema SHALL incluir `database: "connected"` en la respuesta
4. WHEN la base de datos no está disponible THEN el sistema SHALL incluir `database: "disconnected"` en la respuesta
5. WHEN se consulta el health check THEN el sistema SHALL responder en menos de 1 segundo

### Requirement 7: Compatibilidad con Fase 1

**User Story:** Como usuario del sistema, quiero que todas las funcionalidades de la Fase 1 sigan funcionando exactamente igual, para que la actualización sea transparente y no rompa la experiencia existente.

#### Acceptance Criteria

1. WHEN se envía una petición al endpoint `/api/generate-story` THEN el sistema SHALL mantener el mismo formato de input de la Fase 1
2. WHEN se recibe una respuesta del endpoint THEN el sistema SHALL mantener el mismo formato de output de la Fase 1 más el campo adicional `validation.db`
3. WHEN se validan los inputs THEN el sistema SHALL aplicar las mismas reglas de validación de la Fase 1
4. WHEN se generan historias THEN el sistema SHALL mantener la misma calidad y estructura de output de la Fase 1
5. WHEN el frontend envía peticiones THEN el sistema SHALL responder sin requerir cambios en el código del frontend

### Requirement 8: Deployment en Múltiples Ambientes

**User Story:** Como DevOps del sistema, quiero desplegar la funcionalidad de persistencia en tres ambientes (local, cloud, producción), para validar que funciona correctamente antes de llegar a usuarios finales.

#### Acceptance Criteria

1. WHEN se despliega en ambiente local THEN el sistema SHALL conectarse a PostgreSQL local usando DATABASE_URL del archivo .env
2. WHEN se despliega en ambiente cloud THEN el sistema SHALL conectarse a NeonTech usando DATABASE_URL de NeonTech
3. WHEN se despliega en Render THEN el sistema SHALL leer las variables de entorno configuradas en Render Dashboard
4. WHEN se ejecutan migraciones en NeonTech THEN el sistema SHALL crear las tablas correctamente en la base de datos cloud
5. WHEN se valida el deployment en producción THEN el sistema SHALL responder en menos de 3 segundos para el flujo completo

### Requirement 9: Documentación y Herramientas de Testing

**User Story:** Como desarrollador del equipo, quiero documentación completa y herramientas de testing (Postman), para poder probar y entender fácilmente la funcionalidad de persistencia.

#### Acceptance Criteria

1. WHEN se crea la documentación THEN el sistema SHALL incluir un archivo README actualizado en `backend/README.md` con información de la Fase 2
2. WHEN se crea documentación técnica THEN el sistema SHALL ubicarla en el directorio `backend/doc/db/`
3. WHEN se crea la colección Postman THEN el sistema SHALL ubicarla en `backend/doc/db/postman/` con ejemplos de todas las operaciones
4. WHEN se consulta la documentación THEN el sistema SHALL incluir ejemplos de uso del endpoint con y sin imágenes
5. WHEN se revisa la documentación THEN el sistema SHALL mantener la información de fases anteriores para referencia histórica

### Requirement 10: Estructura de Datos en Base de Datos

**User Story:** Como arquitecto del sistema, quiero que la estructura de la tabla `stories` siga el diseño especificado en `db_struct.sql`, para mantener consistencia y preparar el sistema para futuras funcionalidades.

#### Acceptance Criteria

1. WHEN se crea la tabla `stories` THEN el sistema SHALL incluir los campos: id (UUID), tone, format, text, image, generatedStory, id_usuario, created_at, updated_at, version
2. WHEN se inserta un registro THEN el sistema SHALL generar automáticamente el campo `id` como UUID
3. WHEN se inserta un registro THEN el sistema SHALL generar automáticamente el campo `created_at` con el timestamp actual
4. WHEN se actualiza un registro THEN el sistema SHALL actualizar automáticamente el campo `updated_at` con el timestamp actual
5. WHEN se almacena el campo `image` THEN el sistema SHALL guardar la referencia o metadata de la imagen, no el binario completo
