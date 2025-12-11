@echo off
echo ========================================
echo AutoStory Builder - Quick Start Script
echo ========================================
echo.

REM Verificar Node.js
echo Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado
    echo Por favor instala Node.js 18+ desde https://nodejs.org
    exit /b 1
)
node --version
echo [OK] Node.js instalado

REM Verificar npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm no esta instalado
    exit /b 1
)
npm --version
echo [OK] npm instalado

REM Instalar dependencias
echo.
echo Instalando dependencias...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Error instalando dependencias
    exit /b 1
)
echo [OK] Dependencias instaladas

REM Verificar .env
echo.
echo Verificando configuracion...
if not exist .env (
    echo [WARNING] Archivo .env no encontrado
    echo Creando desde .env.example...
    copy .env.example .env
    echo [WARNING] Por favor edita .env con tus credenciales
    echo    - DATABASE_URL
    echo    - COHERE_API_KEY
    pause
    exit /b 0
)
echo [OK] Archivo .env encontrado

REM Generar cliente Prisma
echo.
echo Generando cliente Prisma...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Error generando cliente Prisma
    exit /b 1
)
echo [OK] Cliente Prisma generado

REM Ejecutar migraciones
echo.
echo Ejecutando migraciones...
call npx prisma migrate dev --name init
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Error ejecutando migraciones
    echo Verifica que PostgreSQL este corriendo y DATABASE_URL sea correcta
    exit /b 1
)
echo [OK] Migraciones aplicadas

REM Resumen
echo.
echo ========================================
echo [OK] Setup completado!
echo.
echo Proximos pasos:
echo   1. Edita .env si es necesario
echo   2. Ejecuta: npm run dev
echo   3. Prueba: curl http://localhost:8000/health
echo   4. Abre Prisma Studio: npm run prisma:studio
echo.
echo Documentacion:
echo   - README.md
echo   - doc\db\SETUP.md
echo   - doc\db\PRISMA_GUIDE.md
echo.
echo Feliz desarrollo!
pause
