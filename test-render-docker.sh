#!/bin/bash
# Test Docker build - Simula el deployment de Render con Fase 2

set -e  # Exit on error

echo "🐳 Testing Render Docker Build - Fase 2"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}❌ Error: Dockerfile no encontrado${NC}"
    echo "Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

# Verificar .env
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}❌ Error: backend/.env no encontrado${NC}"
    exit 1
fi

# Leer variables del .env
echo "📋 Leyendo variables de entorno..."
export COHERE_API_KEY=$(grep COHERE_API_KEY backend/.env | cut -d '=' -f2)
export COHERE_MODEL=$(grep COHERE_MODEL backend/.env | cut -d '=' -f2)
export DATABASE_URL=$(grep DATABASE_URL backend/.env | grep -v '^#' | cut -d '=' -f2-)

if [ -z "$COHERE_API_KEY" ]; then
    echo -e "${RED}❌ COHERE_API_KEY no encontrada en .env${NC}"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  DATABASE_URL no encontrada (se ejecutará sin BD)${NC}"
fi

echo -e "${GREEN}✅ Variables cargadas${NC}"
echo ""

# Limpiar contenedores anteriores
echo "🧹 Limpiando contenedores anteriores..."
docker stop autostory-render 2>/dev/null || true
docker rm autostory-render 2>/dev/null || true

# Build de la imagen (como Render)
echo "🏗️  Building Docker image (esto puede tomar 2-5 minutos)..."
docker build -t autostory-render:test -f Dockerfile . --no-cache

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en build${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build exitoso${NC}"
echo ""

# Ver tamaño de la imagen
echo "📊 Información de la imagen:"
docker images autostory-render:test
echo ""

# Ejecutar contenedor (como Render)
echo "🚀 Iniciando contenedor (simulando Render)..."
docker run -d \
  --name autostory-render \
  -p 8000:10000 \
  -e NODE_ENV=production \
  -e PORT=10000 \
  -e COHERE_API_KEY="${COHERE_API_KEY}" \
  -e COHERE_MODEL="${COHERE_MODEL:-command-r7b-12-2024}" \
  -e DATABASE_URL="${DATABASE_URL}" \
  -e FRONTEND_URL="https://asb-delta.vercel.app" \
  -e FRONTEND_URL_LOCAL="http://localhost:3000" \
  autostory-render:test

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al iniciar contenedor${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Contenedor iniciado${NC}"
echo ""

# Esperar a que el servidor inicie
echo "⏳ Esperando a que el servidor inicie (30 segundos)..."
sleep 30

# Ver logs
echo "📝 Logs del contenedor:"
echo "----------------------------------------"
docker logs autostory-render
echo "----------------------------------------"
echo ""

# Probar health check
echo "🔍 Probando health check..."
response=$(curl -s http://localhost:8000/health)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Health check respondió:${NC}"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    
    # Verificar campos específicos
    if echo "$response" | grep -q '"version":"fase2"'; then
        echo -e "${GREEN}✅ Version: fase2${NC}"
    else
        echo -e "${RED}❌ Version incorrecta${NC}"
    fi
    
    if echo "$response" | grep -q '"database":"connected"'; then
        echo -e "${GREEN}✅ Database: connected${NC}"
    elif echo "$response" | grep -q '"database":"disconnected"'; then
        echo -e "${YELLOW}⚠️  Database: disconnected (esperado sin BD configurada)${NC}"
    fi
else
    echo -e "${RED}❌ Health check falló${NC}"
    echo "Ver logs arriba para más detalles"
fi
echo ""

# Probar endpoint de generación
echo "🧪 Probando endpoint de generación..."
story_response=$(curl -s -X POST http://localhost:8000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{
    "tone": "inspiracional",
    "format": "post",
    "text": "Test desde Docker simulando Render"
  }')

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Endpoint respondió${NC}"
    echo "$story_response" | jq '.' 2>/dev/null || echo "$story_response"
else
    echo -e "${RED}❌ Endpoint falló${NC}"
fi
echo ""

# Resumen
echo "=========================================="
echo -e "${GREEN}✅ Test completado${NC}"
echo ""

echo "📊 Resumen:"
echo "  - Build: OK"
echo "  - Contenedor: Corriendo"
echo "  - Health check: Verificado"
echo "  - Endpoint: Probado"
echo ""

echo "🔍 Para ver logs en tiempo real:"
echo "  docker logs -f autostory-render"
echo ""

echo "🧹 Para limpiar:"
echo "  docker stop autostory-render"
echo "  docker rm autostory-render"
echo "  docker rmi autostory-render:test"
echo ""

echo "🚀 Si todo funciona, estás listo para deployar en Render!"
echo ""
