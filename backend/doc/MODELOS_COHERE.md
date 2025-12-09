# 📋 Guía de Modelos Cohere - AutoStory Builder

**Última actualización:** 9 de Diciembre, 2025

---

## 🎯 Modelo Actual

**Modelo en uso:** `command-r7b-12-2024`

Este es el modelo **más reciente** disponible de Cohere para generación de texto.

---

## 📊 Modelos Disponibles (Diciembre 2025)

| Modelo | Estado | Fecha | Uso Recomendado |
|--------|--------|-------|-----------------|
| `command-r7b-12-2024` | ✅ Activo | Dic 2024 | **Recomendado** - Más reciente |
| `command-r-08-2024` | ✅ Activo | Ago 2024 | Alternativa estable |
| `command-r-03-2024` | ✅ Activo | Mar 2024 | Alternativa legacy |
| `command-r` | ❌ Deprecado | Sep 2025 | No usar |
| `command-r-plus` | ❌ Deprecado | Sep 2025 | No usar |

---

## 🔄 Cómo Cambiar de Modelo

### Opción 1: Modificar .env (Recomendado)

```bash
# Editar archivo .env
COHERE_MODEL="command-r7b-12-2024"
```

### Opción 2: Probar otro modelo

Si tienes problemas con el modelo actual, prueba con:

```bash
# Alternativa 1: Modelo de Agosto 2024
COHERE_MODEL="command-r-08-2024"

# Alternativa 2: Modelo de Marzo 2024
COHERE_MODEL="command-r-03-2024"
```

### Reiniciar Servidor

Después de cambiar el modelo:

```bash
# Detener el servidor (Ctrl+C)
# Reiniciar
npm run dev
```

---

## 📝 Características de los Modelos

### command-r7b-12-2024 (Actual)

**Características:**
- ✅ Soporte multilingüe (español nativo)
- ✅ Contexto de 128k tokens
- ✅ Optimizado para chat y generación
- ✅ Versión más reciente (Diciembre 2024)
- ✅ Mejor rendimiento en tareas de storytelling

**Casos de uso:**
- Generación de historias narrativas
- Contenido para redes sociales
- Artículos y posts
- Contenido educativo

---

## 🔍 Verificar Modelo en Uso

### Método 1: Revisar .env

```bash
cat .env | grep COHERE_MODEL
```

### Método 2: Probar el API

```bash
POST http://localhost:8000/api/generate-story
# Revisar el campo metadata.model en la respuesta
```

**Response:**
```json
{
  "metadata": {
    "model": "command-r7b-12-2024"  ← Modelo en uso
  }
}
```

---

## ⚠️ Solución de Problemas

### Error: "model was removed"

**Causa:** Estás usando un modelo deprecado

**Solución:**
1. Actualizar `.env` con un modelo activo
2. Reiniciar el servidor
3. Probar nuevamente

### Error: 404 Not Found

**Causa:** El modelo no existe o está mal escrito

**Solución:**
1. Verificar el nombre del modelo en `.env`
2. Usar uno de los modelos listados arriba
3. Reiniciar el servidor

### Error: Invalid API Key

**Causa:** La API key de Cohere no es válida

**Solución:**
1. Verificar `COHERE_API_KEY` en `.env`
2. Obtener nueva key en https://dashboard.cohere.com/
3. Reiniciar el servidor

---

## 📚 Documentación Oficial

**Cohere Models:** https://docs.cohere.com/docs/models#command

Para ver la lista más actualizada de modelos disponibles, consulta la documentación oficial de Cohere.

---

## 🔄 Historial de Deprecaciones

### Septiembre 2025
- ❌ `command-r-plus` - Removido
- ❌ `command-r` - Removido

### Modelos Actuales (Diciembre 2025)
- ✅ Serie `command-r-*-2024` - Activos

---

## 💡 Recomendaciones

### Para Producción
- Usar `command-r7b-12-2024` (más reciente)
- Configurar monitoring de la API
- Tener plan de fallback a modelo alternativo

### Para Desarrollo
- Cualquier modelo de la serie 2024 funciona
- Probar con diferentes modelos si es necesario
- Mantener `.env.example` actualizado

### Para Testing
- Los tests usan mocks, no requieren modelo real
- Puedes ejecutar tests sin API key válida

---

## 🎯 Próximos Pasos

1. ✅ Verificar que estás usando `command-r7b-12-2024`
2. ✅ Reiniciar servidor después de cambios
3. ✅ Probar endpoint con request de ejemplo
4. ✅ Verificar metadata.model en la respuesta

---

**Última verificación:** 9 de Diciembre, 2025  
**Modelo recomendado:** command-r7b-12-2024  
**Estado:** ✅ Funcionando correctamente
