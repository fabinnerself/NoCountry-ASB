#!/bin/bash

# Script para probar Docker localmente antes de deployar

echo "🐳 Testing Docker Build - AutoStory Backend"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar que Docker está instalado
echo "📦 Verificando Docker..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker instalado: $(docker --version)${NC}"
echo ""

# 2. Verificar archivo .env
echo "🔧 Verificando .env..."
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Archivo .env no encontrado${NC}"
    echo "Creando desde .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Por favor edita .env con tus credenciales${NC}"
    exit 0
fi
echo -e "${GREEN}✅ Archivo .env encontrado${NC}"
echo ""

# 3. Build de la imagen
echo "🏗️  Building Docker image..."
docker build -t autostory-backend:test . --no-cache

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en build${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Imagen creada exitosamente${NC}"
echo ""

# 4. Ver tamaño de la imagen
echo "📊 Tamaño de la imagen:"
docker images autostory-backend:test
echo ""

# 5. Ejecutar contenedor de prueba
echo "🚀 Iniciando contenedor de prueba..."
docker run -d \
  --name autostory-test \
  -p 8001:8000 \
  --env-file .env \
  autostory-backend:test

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al iniciar contenedor${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Contenedor iniciado${NC}"
echo ""

# 6. Esperar a que el servidor inicie
echo "⏳ Esperando a que el servidor inicie (30 segundos)..."
sleep 30

# 7. Ver logs
echo "📝 Logs del contenedor:"
docker logs autostory-test
echo ""

# 8. Probar health check
echo "🔍 Probando health check..."
response=$(curl -s http://localhost:8001/health)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Health check respondió:${NC}"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
else
    echo -e "${RED}❌ Health check falló${NC}"
fi
echo ""

# 9. Limpiar
echo "🧹 Limpiando..."
docker stop autostory-test
docker rm autostory-test

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Test completado${NC}"
echo ""
echo "Para deployar en Render:"
echo "  1. git add ."
echo "  2. git commit -m 'feat: Docker configurado para Fase 2'"
echo "  3. git push origin main"
echo "  4. Configurar variables en Render Dashboard"
echo "  5. Deploy automático"
