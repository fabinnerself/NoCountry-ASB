# 🚀 Quick Start - AutoStory Builder Backend

## Inicio Rápido (5 minutos)

### Opción 1: Script Automático

**Windows:**
```bash
cd backend
scripts\quick-start.bat
```

**Linux/macOS:**
```bash
cd backend
chmod +x scripts/quick-start.sh
./scripts/quick-start.sh
```

### Opción 2: Manual

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 3. Generar cliente Prisma
npm run prisma:generate

# 4. Ejecutar migraciones
npm run prisma:migrate

# 5. Iniciar servidor
npm run dev
```

## Verificación

```bash
# Health check
curl http://localhost:8000/health

# Debería retornar:
# {
#   "status": "ok",
#   "version": "fase2",
#   "database": "connected"
# }
```

## Configuración Mínima Requerida

### 1. Variables de Entorno (.env)

```env
# Requerido
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/autostory
COHERE_API_KEY=tu_api_key_aqui

# Opcional
NODE_ENV=development
PORT=8000
FRONTEND_URL=http://localhost:3000
```

### 2. PostgreSQL

**Opción A: Local**
```bash
# Instalar PostgreSQL
# Windows: https://www.postgresql.org/download/windows/
# macOS: brew install postgresql@15
# Linux: sudo apt install postgresql

# Crear base de datos
psql -U postgres
CREATE DATABASE autostory;
\q
```

**Opción B: NeonTech (Cloud)**
1. Ir a https://neon.tech
2. Crear cuenta gratis
3. Crear proyecto
4. Copiar DATABASE_URL
5. Pegar en .env

### 3. Cohere API Key

1. Ir a https://cohere.com
2. Crear cuenta
3. Obtener API key
4. Pegar en .env

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar con hot reload
npm run build            # Compilar TypeScript
npm start                # Iniciar producción

# Prisma
npm run prisma:generate  # Generar cliente
npm run prisma:migrate   # Crear migración
npm run prisma:studio    # Abrir GUI
npm run prisma:deploy    # Deploy en producción

# Testing
npm test                 # Todos los tests
npm run test:watch       # Watch mode
npm run test:coverage    # Con cobertura
```

## Probar el API

### Con cURL

```bash
curl -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "redes sociales",
    "text": "Un dragón en las montañas"
  }'
```

### Con Postman

1. Importar colección (si existe)
2. Configurar base_url: `http://localhost:8000`
3. Ejecutar request "Generate Story"

## Troubleshooting Rápido

### Error: "Can't reach database server"

```bash
# Verificar que PostgreSQL está corriendo
# Windows:
sc query postgresql-x64-15

# macOS:
brew services list

# Linux:
sudo systemctl status postgresql
```

### Error: "COHERE_API_KEY not configured"

Verificar que `.env` tiene:
```env
COHERE_API_KEY=tu_api_key_real
```

### Error: "Migration failed"

```bash
# Reset de BD (solo desarrollo)
npx prisma migrate reset

# Aplicar migraciones
npm run prisma:migrate
```

## Próximos Pasos

1. ✅ Servidor corriendo
2. ✅ Health check funcionando
3. ✅ Base de datos conectada

Ahora puedes:
- Ver datos en Prisma Studio: `npm run prisma:studio`
- Probar el API con ejemplos en `doc/db/API_EXAMPLES.md`
- Leer documentación completa en `README.md`

## Documentación Completa

- `README.md` - Documentación principal
- `doc/db/4SETUP.md` - Configuración detallada
- `doc/db/5PRISMA_GUIDE.md` - Guía de Prisma
- `doc/db/6TROUBLESHOOTING.md` - Solución de problemas
- `doc/db/7API_EXAMPLES.md` - Ejemplos de uso

## Soporte

Si tienes problemas:
1. Revisar `6TROUBLESHOOTING.md`
2. Verificar logs del servidor
3. Consultar documentación de Prisma
4. Contactar al equipo

---

¡Feliz desarrollo! 🎉
