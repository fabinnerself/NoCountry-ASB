#!/bin/bash
# Script de verificación completa de Docker antes de deployar

set -e

echo "🔍 Verificación Completa de Docker - Fase 2"
echo "============================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ERRORS=0

# 1. Verificar archivos necesarios
echo "📁 Verificando archivos..."

files=(
    "../Dockerfile"
    "Dockerfile"
    ".dockerignore"
    "docker-compose.yml"
    "package.json"
    "prisma/schema.prisma"
    "tsconfig.json"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✅${NC} $file"
    else
        echo -e "  ${RED}❌${NC} $file - NO ENCONTRADO"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# 2. Verificar .env
echo "🔧 Verificando .env..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env encontrado${NC}"
    
    # Verificar variables críticas
    if grep -q "COHERE_API_KEY=" .env; then
        echo -e "  ${GREEN}✅${NC} COHERE_API_KEY configurada"
    else
        echo -e "  ${RED}❌${NC} COHERE_API_KEY faltante"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "DATABASE_URL=" .env && ! grep -q "^#.*DATABASE_URL=" .env; then
        echo -e "  ${GREEN}✅${NC} DATABASE_URL configurada"
    else
        echo -e "  ${YELLOW}⚠️${NC}  DATABASE_URL no configurada (opcional)"
    fi
else
    echo -e "${RED}❌ .env no encontrado${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Verificar Dockerfile raíz
echo "🐳 Verificando Dockerfile raíz..."
if grep -q "npx prisma generate" ../Dockerfile; then
    echo -e "${GREEN}✅ Prisma generate encontrado${NC}"
else
    echo -e "${RED}❌ Prisma generate faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi

if grep -q "FROM node:20-alpine" ../Dockerfile; then
    echo -e "${GREEN}✅ Node 20 Alpine${NC}"
else
    echo -e "${YELLOW}⚠️  Versión de Node diferente${NC}"
fi
echo ""

# 4. Verificar Dockerfile backend
echo "🐳 Verificando Dockerfile backend..."
if grep -q "npx prisma generate" Dockerfile; then
    echo -e "${GREEN}✅ Prisma generate encontrado${NC}"
else
    echo -e "${RED}❌ Prisma generate faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi

if grep -q "openssl" Dockerfile; then
    echo -e "${GREEN}✅ OpenSSL instalado${NC}"
else
    echo -e "${RED}❌ OpenSSL faltante (requerido por Prisma)${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 5. Verificar docker-compose.yml
echo "🐳 Verificando docker-compose.yml..."
if grep -q "postgres:" docker-compose.yml; then
    echo -e "${GREEN}✅ PostgreSQL configurado${NC}"
else
    echo -e "${RED}❌ PostgreSQL faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi

if grep -q "prisma migrate deploy" docker-compose.yml; then
    echo -e "${GREEN}✅ Migraciones configuradas${NC}"
else
    echo -e "${RED}❌ Migraciones faltantes${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Verificar render.yaml
echo "🚀 Verificando render.yaml..."
if [ -f "../render.yaml" ]; then
    echo -e "${GREEN}✅ render.yaml encontrado${NC}"
    
    if grep -q "runtime: docker" ../render.yaml; then
        echo -e "  ${GREEN}✅${NC} Runtime: docker"
    else
        echo -e "  ${RED}❌${NC} Runtime no es docker"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "dockerfilePath:" ../render.yaml; then
        echo -e "  ${GREEN}✅${NC} Dockerfile path configurado"
    else
        echo -e "  ${RED}❌${NC} Dockerfile path faltante"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ render.yaml no encontrado${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 7. Verificar Prisma schema
echo "🗄️  Verificando Prisma schema..."
if grep -q "model Story" prisma/schema.prisma; then
    echo -e "${GREEN}✅ Modelo Story definido${NC}"
else
    echo -e "${RED}❌ Modelo Story faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi

if grep -q "provider = \"postgresql\"" prisma/schema.prisma; then
    echo -e "${GREEN}✅ Provider: PostgreSQL${NC}"
else
    echo -e "${RED}❌ Provider no es PostgreSQL${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 8. Verificar package.json
echo "📦 Verificando package.json..."
if grep -q "\"@prisma/client\"" package.json; then
    echo -e "${GREEN}✅ @prisma/client en dependencies${NC}"
else
    echo -e "${RED}❌ @prisma/client faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi

if grep -q "\"prisma\"" package.json; then
    echo -e "${GREEN}✅ prisma en devDependencies${NC}"
else
    echo -e "${RED}❌ prisma faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 9. Verificar scripts
echo "📜 Verificando scripts..."
if grep -q "\"start\":" package.json; then
    echo -e "${GREEN}✅ Script start definido${NC}"
else
    echo -e "${RED}❌ Script start faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi

if grep -q "\"build\":" package.json; then
    echo -e "${GREEN}✅ Script build definido${NC}"
else
    echo -e "${RED}❌ Script build faltante${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Resumen
echo "============================================"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ TODAS LAS VERIFICACIONES PASARON${NC}"
    echo ""
    echo "🎉 Tu configuración Docker está lista para:"
    echo "  ✅ Testing local con docker-compose"
    echo "  ✅ Build manual"
    echo "  ✅ Deployment en Render"
    echo ""
    echo "📝 Próximos pasos:"
    echo "  1. Probar localmente: docker-compose up -d"
    echo "  2. Verificar: curl http://localhost:8000/health"
    echo "  3. Deployar: git push origin main"
    exit 0
else
    echo -e "${RED}❌ ENCONTRADOS $ERRORS ERRORES${NC}"
    echo ""
    echo "Por favor corrige los errores antes de deployar"
    exit 1
fi
