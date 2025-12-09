# Changelog - AutoStory Builder

## [0.1.2] - 2025-12-09

### 🔄 Changed
- **Modelo de IA actualizado:** `command-r` → `command-r7b-12-2024`
  - Razón: Los modelos `command-r-plus` y `command-r` fueron deprecados el 15 de septiembre de 2025
  - Nuevo modelo: `command-r7b-12-2024` (versión más reciente de diciembre 2024)
  - Modelos alternativos disponibles: `command-r-08-2024`, `command-r-03-2024`
  - Archivos actualizados:
    - `.env`
    - `.env.example`
    - `src/config/env.ts`
    - Documentación en `doc/`

---

## [0.1.1] - 2025-12-09 (Deprecado)

### 🔄 Changed
- **Modelo de IA actualizado:** `command-r-plus` → `command-r`
  - Este modelo también fue deprecado
  - Ver versión 0.1.2 para el modelo actual

### 📝 Note
- Los tests mantienen referencias a `command-r-plus` en sus datos mock (solo para referencia histórica)
- Todas las funcionalidades siguen operando correctamente con el nuevo modelo

---

## [0.1.0] - 2025-12-09

### ✨ Initial Release - Fase 0 Complete

#### Features
- ✅ API REST con Express + TypeScript
- ✅ Generación de historias con Cohere AI
- ✅ 3 tonos: INSPIRACIONAL, EDUCATIVO, TÉCNICO
- ✅ 4 formatos: HISTORIA, POST, REDES_SOCIALES, OTRO
- ✅ Validación type-safe con Zod
- ✅ Tests con TDD (75 tests, 100% pasando)
- ✅ Cobertura de código > 90%
- ✅ Documentación completa

#### Technical
- TypeScript 5.3+ (strict mode)
- Express.js 4.18+
- Zod 3.22+
- Cohere SDK 7.3+
- Jest 29+ + Supertest 6+
- ESLint 8+ + Prettier 3+

#### Documentation
- README.md completo
- 5 documentos técnicos en `doc/`
- Resultados de tests en `tests/TEST_RESULTS.md`
- Ejemplos de uso incluidos

#### Quality Metrics
- Tests: 75/75 pasando (100%)
- Coverage: 92.19% statements, 76.19% branches
- TypeScript: 0 errores
- ESLint: 0 errores

---

## Formato

Este changelog sigue el formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

### Tipos de cambios
- **Added** para funcionalidades nuevas
- **Changed** para cambios en funcionalidades existentes
- **Deprecated** para funcionalidades que se eliminarán
- **Removed** para funcionalidades eliminadas
- **Fixed** para corrección de bugs
- **Security** para vulnerabilidades
