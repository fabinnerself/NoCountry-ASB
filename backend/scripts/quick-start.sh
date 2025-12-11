#!/bin/bash

echo "🚀 AutoStory Builder - Quick Start Script"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo "Por favor instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version)${NC}"

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error instalando dependencias${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencias instaladas${NC}"

# Verificar .env
echo ""
echo "🔧 Verificando configuración..."
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Archivo .env no encontrado${NC}"
    echo "Creando desde .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Por favor edita .env con tus credenciales${NC}"
    echo "   - DATABASE_URL"
    echo "   - COHERE_API_KEY"
    exit 0
fi
echo -e "${GREEN}✅ Archivo .env encontrado${NC}"

# Verificar DATABASE_URL
if ! grep -q "DATABASE_URL=" .env; then
    echo -e "${RED}❌ DATABASE_URL no configurada en .env${NC}"
    exit 1
fi

# Generar cliente Prisma
echo ""
echo "🗄️  Generando cliente Prisma..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error generando cliente Prisma${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Cliente Prisma generado${NC}"

# Ejecutar migraciones
echo ""
echo "🗄️  Ejecutando migraciones..."
npx prisma migrate dev --name init

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Error ejecutando migraciones${NC}"
    echo "Verifica que PostgreSQL esté corriendo y DATABASE_URL sea correcta"
    exit 1
fi
echo -e "${GREEN}✅ Migraciones aplicadas${NC}"

# Verificar conexión
echo ""
echo "🔍 Verificando conexión a base de datos..."
npx prisma db pull > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Conexión a base de datos exitosa${NC}"
else
    echo -e "${YELLOW}⚠️  No se pudo conectar a la base de datos${NC}"
    echo "Verifica DATABASE_URL en .env"
fi

# Resumen
echo ""
echo "=========================================="
echo -e "${GREEN}✅ Setup completado!${NC}"
echo ""
echo "Próximos pasos:"
echo "  1. Edita .env si es necesario"
echo "  2. Ejecuta: npm run dev"
echo "  3. Prueba: curl http://localhost:8000/health"
echo "  4. Abre Prisma Studio: npm run prisma:studio"
echo ""
echo "Documentación:"
echo "  - README.md"
echo "  - doc/db/SETUP.md"
echo "  - doc/db/PRISMA_GUIDE.md"
echo ""
echo "¡Feliz desarrollo! 🎉"
