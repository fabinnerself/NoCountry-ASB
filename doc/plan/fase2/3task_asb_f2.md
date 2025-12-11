# Implementation Plan - Fase 2: Persistencia en Base de Datos

## Overview

Este plan de implementación descompone la Fase 2 de AutoStory Builder en tareas manejables para implementación incremental. El objetivo es agregar persistencia en PostgreSQL al endpoint existente `/api/generate-story`, manteniendo compatibilidad total con la Fase 1.

**Principios:**
- Implementación incremental y testeable
- Compatibilidad 100% con Fase 1
- Degradación elegante ante fallos de BD
- Testing exhaustivo en cada paso

---

## Tasks

- [ ] 1. Configuración inicial de Prisma y PostgreSQL
  - Instalar dependencias de Prisma (`@prisma/client`, `prisma`)
  - Inicializar Prisma con `npx prisma init`
  - Configurar variable de entorno `DATABASE_URL` en `.env` y `.env.example`
  - Crear archivo `backend/prisma/schema.prisma` con configuración básica
  - _Requirements: 2.1, 2.2, 2.5_

- [ ] 1.1 Definir schema de Prisma para tabla stories
  - Crear modelo `Story` en `schema.prisma` con todos los campos especificados
  - Incluir campos: id (UUID), tone, format, text, image, generatedStory, id_usuario, created_at, updated_at, version, error_message
  - Configurar índices para created_at e id_usuario
  - Generar cliente Prisma con `npx prisma generate`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 1.2 Crear y aplicar migración inicial
  - Ejecutar `npx prisma migrate dev --name init_stories_table`
  - Verificar que la tabla se creó correctamente en PostgreSQL
  - Validar estructura con `npx prisma studio`
  - _Requirements: 2.2, 2.3_

- [ ] 2. Implementar capa de base de datos
  - Crear archivo `backend/src/config/database.ts` con singleton de PrismaClient
  - Implementar método `getInstance()` para obtener instancia única
  - Implementar método `disconnect()` para cerrar conexión
  - Implementar método `healthCheck()` para verificar estado de conexión
  - Configurar logging según ambiente (development/production)
  - _Requirements: 3.1, 3.4, 3.5_

- [ ] 2.1 Crear DTOs para operaciones de base de datos
  - Crear archivo `backend/src/types/story.dto.ts`
  - Definir interface `CreateStoryDTO` con campos requeridos
  - Definir interface `UpdateStoryDTO` para actualizaciones
  - Definir interface `FindOptions` para consultas con paginación
  - _Requirements: 1.1, 1.2_

- [ ] 2.2 Implementar Story Repository
  - Crear archivo `backend/src/repositories/story.repository.ts`
  - Implementar método `create()` para insertar historias
  - Implementar método `findById()` para consultar por ID
  - Implementar método `findAll()` con soporte de paginación
  - Implementar método `update()` para actualizar historias
  - Implementar método `delete()` para eliminar historias
  - Implementar método `count()` para contar registros
  - _Requirements: 1.1, 1.2, 1.5_

- [ ] 2.3 Implementar manejo de errores de base de datos
  - Crear archivo `backend/src/utils/databaseErrorHandler.ts`
  - Definir enum `DatabaseErrorType` con tipos de errores
  - Implementar clase `DatabaseErrorHandler` con método `handle()`
  - Manejar errores específicos de Prisma (PrismaClientKnownRequestError, etc.)
  - Crear constantes de mensajes de error en español
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 2.4 Escribir tests unitarios para Story Repository
  - Crear archivo `backend/tests/unit/repositories/story.repository.test.ts`
  - Testear método `create()` con datos válidos
  - Testear método `findById()` con ID existente y no existente
  - Testear método `findAll()` con y sin paginación
  - Testear método `update()` con datos válidos
  - Testear método `delete()` con ID existente
  - Testear manejo de errores en cada operación
  - _Requirements: 5.1, 5.3_

- [ ] 3. Integrar persistencia en el endpoint existente
  - Actualizar `backend/src/controllers/story.controller.ts`
  - Importar `StoryRepository` en el controller
  - Agregar lógica de persistencia después de generar historia
  - Implementar try-catch para manejar errores de BD sin afectar respuesta
  - Agregar campo `validation.db` en la respuesta del endpoint
  - Retornar `validation.db: "ok"` cuando persiste exitosamente
  - Retornar `validation.db: "error"` con mensaje cuando falla persistencia
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 3.1 Escribir tests de integración para endpoint con BD
  - Actualizar archivo `backend/tests/integration/api/story.routes.test.ts`
  - Testear generación exitosa con persistencia en BD
  - Testear que el campo `validation.db` retorna "ok" en éxito
  - Testear que el campo `validation.db` retorna "error" en fallo
  - Testear que la historia se persiste correctamente en la tabla
  - Testear que el endpoint funciona aunque falle la BD (degradación elegante)
  - Verificar compatibilidad con formato de respuesta de Fase 1
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.4, 7.1, 7.2, 7.5_

- [ ] 4. Actualizar endpoint de health check
  - Actualizar archivo `backend/src/routes/health.routes.ts`
  - Importar `DatabaseClient` para verificar conexión
  - Agregar campo `version: "fase2"` en respuesta
  - Agregar campo `database` con estado de conexión ("connected"/"disconnected")
  - Llamar a `DatabaseClient.healthCheck()` para verificar BD
  - Asegurar que responde en menos de 1 segundo
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 4.1 Escribir tests para health check actualizado
  - Crear o actualizar tests de health check
  - Testear que retorna `version: "fase2"`
  - Testear que retorna `database: "connected"` cuando BD está disponible
  - Testear que retorna `database: "disconnected"` cuando BD no está disponible
  - Testear que responde en menos de 1 segundo
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 5. Checkpoint - Validar funcionamiento local
  - Ejecutar todos los tests con `npm test`
  - Verificar que todos los tests pasan
  - Probar endpoint manualmente con Postman o curl
  - Verificar persistencia en BD con `npx prisma studio`
  - Confirmar que health check retorna información correcta
  - Preguntar al usuario si hay problemas antes de continuar

- [ ]* 5.1 Escribir tests E2E para flujo completo
  - Crear archivo `backend/tests/e2e/story-generation-with-db.e2e.test.ts`
  - Testear flujo completo: request → generación → persistencia → response
  - Testear con diferentes combinaciones de tone y format
  - Testear con y sin imagen
  - Testear con y sin texto de entrada
  - Verificar que los datos persisten correctamente en BD
  - Verificar que el campo `validation.db` es correcto
  - _Requirements: 5.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 6. Configurar ambiente de testing con BD de prueba
  - Crear variable de entorno `DATABASE_TEST_URL` en `.env`
  - Configurar setup de tests para usar BD de prueba
  - Implementar limpieza de BD antes de cada test
  - Implementar desconexión de BD después de tests
  - Actualizar scripts en `package.json` para tests de BD
  - _Requirements: 5.1, 5.2_

- [ ]* 6.1 Generar reporte de cobertura de tests
  - Ejecutar `npm run test:coverage-db`
  - Verificar que la cobertura es al menos 80% en módulos de persistencia
  - Revisar áreas sin cobertura y agregar tests si es necesario
  - _Requirements: 5.2, 5.3_

- [ ] 7. Preparar deployment en NeonTech (cloud)
  - Crear cuenta y proyecto en NeonTech
  - Obtener `DATABASE_URL` de NeonTech
  - Configurar `DATABASE_URL` en archivo `.env` para ambiente cloud
  - Ejecutar `npx prisma migrate deploy` contra NeonTech
  - Verificar que las tablas se crearon correctamente
  - _Requirements: 8.2, 8.4_

- [ ] 7.1 Validar funcionamiento en ambiente cloud
  - Configurar backend para usar DATABASE_URL de NeonTech
  - Iniciar servidor y probar endpoint
  - Verificar que las historias se persisten en NeonTech
  - Medir latencia de conexión (debe ser < 500ms)
  - Verificar health check con conexión cloud
  - _Requirements: 3.5, 8.2, 8.4_

- [ ] 8. Configurar deployment en Render (producción)
  - Configurar variable `DATABASE_URL` en Render Dashboard
  - Actualizar build command en Render: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
  - Configurar otras variables de entorno necesarias
  - Realizar deployment desde GitHub
  - _Requirements: 8.3, 8.4_

- [ ] 8.1 Validar deployment en producción
  - Verificar que el servicio inicia correctamente en Render
  - Probar endpoint `/health` y verificar `version: "fase2"`
  - Probar endpoint `/api/generate-story` con diferentes inputs
  - Verificar que las historias se persisten en la BD de producción
  - Medir tiempo de respuesta completo (debe ser < 3 segundos)
  - _Requirements: 8.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 9. Crear documentación técnica
  - Actualizar `backend/README.md` con información de Fase 2
  - Crear directorio `backend/doc/db/`
  - Crear `backend/doc/db/README.md` con overview de persistencia
  - Crear `backend/doc/db/SETUP.md` con guía de configuración
  - Crear `backend/doc/db/PRISMA_GUIDE.md` con comandos y ejemplos
  - Crear `backend/doc/db/TROUBLESHOOTING.md` con solución de problemas comunes
  - Crear `backend/doc/db/API_EXAMPLES.md` con ejemplos de uso
  - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [ ] 9.1 Crear colección de Postman
  - Crear directorio `backend/doc/db/postman/`
  - Crear colección `autostory-fase2.postman_collection.json`
  - Incluir ejemplos de generación con y sin imagen
  - Incluir ejemplos de health check
  - Incluir variables de entorno para diferentes ambientes
  - Documentar cada request con descripción y ejemplos
  - _Requirements: 9.3, 9.4_

- [ ] 10. Checkpoint final - Validación completa
  - Ejecutar suite completa de tests: `npm test`
  - Verificar cobertura de tests: `npm run test:coverage`
  - Validar funcionamiento en los 3 ambientes (local, cloud, producción)
  - Verificar que la documentación está completa y actualizada
  - Confirmar que el frontend sigue funcionando sin cambios
  - Preguntar al usuario si hay problemas o ajustes necesarios

---

## Notas Importantes

### Compatibilidad con Fase 1
- El endpoint `/api/generate-story` mantiene el mismo formato de input
- La respuesta mantiene todos los campos de Fase 1 más `validation.db`
- El frontend NO requiere cambios para funcionar con Fase 2

### Degradación Elegante
- Si falla la persistencia en BD, el endpoint sigue funcionando
- La historia se genera y retorna al usuario normalmente
- El campo `validation.db` indica el estado de persistencia

### Testing
- Tests marcados con `*` son opcionales pero recomendados
- La cobertura mínima objetivo es 80% en módulos de persistencia
- Usar BD de prueba separada para evitar contaminar datos

### Deployment Progresivo
1. **Local**: Validar con PostgreSQL local
2. **Cloud**: Validar con NeonTech en desarrollo
3. **Producción**: Deploy final en Render con NeonTech

### Scripts Útiles
```bash
# Prisma
npx prisma generate          # Generar cliente
npx prisma migrate dev       # Crear migración
npx prisma migrate deploy    # Aplicar en producción
npx prisma studio            # Abrir GUI

# Testing
npm run test                 # Todos los tests
npm run test:db              # Solo tests de BD
npm run test:coverage        # Con cobertura
npm run test:e2e             # Tests E2E

# Desarrollo
npm run dev                  # Iniciar servidor
npm run build                # Compilar TypeScript
```

---

**Versión:** 1.0  
**Fecha:** Diciembre 2024  
**Estado:** Listo para implementación
