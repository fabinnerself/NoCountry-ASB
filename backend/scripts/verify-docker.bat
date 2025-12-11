@echo off
REM Script de verificacion completa de Docker antes de deployar

echo ============================================
echo Verificacion Completa de Docker - Fase 2
echo ============================================
echo.

set ERRORS=0

REM 1. Verificar archivos necesarios
echo Verificando archivos...

if exist "..\Dockerfile" (
    echo   [OK] Dockerfile raiz
) else (
    echo   [ERROR] Dockerfile raiz - NO ENCONTRADO
    set /a ERRORS+=1
)

if exist "Dockerfile" (
    echo   [OK] Dockerfile backend
) else (
    echo   [ERROR] Dockerfile backend - NO ENCONTRADO
    set /a ERRORS+=1
)

if exist ".dockerignore" (
    echo   [OK] .dockerignore
) else (
    echo   [ERROR] .dockerignore - NO ENCONTRADO
    set /a ERRORS+=1
)

if exist "docker-compose.yml" (
    echo   [OK] docker-compose.yml
) else (
    echo   [ERROR] docker-compose.yml - NO ENCONTRADO
    set /a ERRORS+=1
)

if exist "package.json" (
    echo   [OK] package.json
) else (
    echo   [ERROR] package.json - NO ENCONTRADO
    set /a ERRORS+=1
)

if exist "prisma\schema.prisma" (
    echo   [OK] prisma\schema.prisma
) else (
    echo   [ERROR] prisma\schema.prisma - NO ENCONTRADO
    set /a ERRORS+=1
)

if exist "tsconfig.json" (
    echo   [OK] tsconfig.json
) else (
    echo   [ERROR] tsconfig.json - NO ENCONTRADO
    set /a ERRORS+=1
)
echo.

REM 2. Verificar .env
echo Verificando .env...
if exist ".env" (
    echo [OK] .env encontrado
    
    findstr /C:"COHERE_API_KEY=" .env >nul
    if %ERRORLEVEL% EQU 0 (
        echo   [OK] COHERE_API_KEY configurada
    ) else (
        echo   [ERROR] COHERE_API_KEY faltante
        set /a ERRORS+=1
    )
    
    findstr /C:"DATABASE_URL=" .env | findstr /V /C:"#" >nul
    if %ERRORLEVEL% EQU 0 (
        echo   [OK] DATABASE_URL configurada
    ) else (
        echo   [WARNING] DATABASE_URL no configurada (opcional)
    )
) else (
    echo [ERROR] .env no encontrado
    set /a ERRORS+=1
)
echo.

REM 3. Verificar Dockerfile raiz
echo Verificando Dockerfile raiz...
findstr /C:"npx prisma generate" ..\Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Prisma generate encontrado
) else (
    echo [ERROR] Prisma generate faltante
    set /a ERRORS+=1
)

findstr /C:"FROM node:20-alpine" ..\Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node 20 Alpine
) else (
    echo [WARNING] Version de Node diferente
)
echo.

REM 4. Verificar Dockerfile backend
echo Verificando Dockerfile backend...
findstr /C:"npx prisma generate" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Prisma generate encontrado
) else (
    echo [ERROR] Prisma generate faltante
    set /a ERRORS+=1
)

findstr /C:"openssl" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] OpenSSL instalado
) else (
    echo [ERROR] OpenSSL faltante (requerido por Prisma)
    set /a ERRORS+=1
)
echo.

REM 5. Verificar docker-compose.yml
echo Verificando docker-compose.yml...
findstr /C:"postgres:" docker-compose.yml >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] PostgreSQL configurado
) else (
    echo [ERROR] PostgreSQL faltante
    set /a ERRORS+=1
)

findstr /C:"prisma migrate deploy" docker-compose.yml >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Migraciones configuradas
) else (
    echo [ERROR] Migraciones faltantes
    set /a ERRORS+=1
)
echo.

REM 6. Verificar render.yaml
echo Verificando render.yaml...
if exist "..\render.yaml" (
    echo [OK] render.yaml encontrado
    
    findstr /C:"runtime: docker" ..\render.yaml >nul
    if %ERRORLEVEL% EQU 0 (
        echo   [OK] Runtime: docker
    ) else (
        echo   [ERROR] Runtime no es docker
        set /a ERRORS+=1
    )
    
    findstr /C:"dockerfilePath:" ..\render.yaml >nul
    if %ERRORLEVEL% EQU 0 (
        echo   [OK] Dockerfile path configurado
    ) else (
        echo   [ERROR] Dockerfile path faltante
        set /a ERRORS+=1
    )
) else (
    echo [ERROR] render.yaml no encontrado
    set /a ERRORS+=1
)
echo.

REM 7. Verificar Prisma schema
echo Verificando Prisma schema...
findstr /C:"model Story" prisma\schema.prisma >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Modelo Story definido
) else (
    echo [ERROR] Modelo Story faltante
    set /a ERRORS+=1
)

findstr /C:"provider = \"postgresql\"" prisma\schema.prisma >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Provider: PostgreSQL
) else (
    echo [ERROR] Provider no es PostgreSQL
    set /a ERRORS+=1
)
echo.

REM 8. Verificar package.json
echo Verificando package.json...
findstr /C:"\"@prisma/client\"" package.json >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] @prisma/client en dependencies
) else (
    echo [ERROR] @prisma/client faltante
    set /a ERRORS+=1
)

findstr /C:"\"prisma\"" package.json >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] prisma en devDependencies
) else (
    echo [ERROR] prisma faltante
    set /a ERRORS+=1
)
echo.

REM 9. Verificar scripts
echo Verificando scripts...
findstr /C:"\"start\":" package.json >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Script start definido
) else (
    echo [ERROR] Script start faltante
    set /a ERRORS+=1
)

findstr /C:"\"build\":" package.json >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Script build definido
) else (
    echo [ERROR] Script build faltante
    set /a ERRORS+=1
)
echo.

REM Resumen
echo ============================================
if %ERRORS% EQU 0 (
    echo [OK] TODAS LAS VERIFICACIONES PASARON
    echo.
    echo Tu configuracion Docker esta lista para:
    echo   - Testing local con docker-compose
    echo   - Build manual
    echo   - Deployment en Render
    echo.
    echo Proximos pasos:
    echo   1. Probar localmente: docker-compose up -d
    echo   2. Verificar: curl http://localhost:8000/health
    echo   3. Deployar: git push origin main
) else (
    echo [ERROR] ENCONTRADOS %ERRORS% ERRORES
    echo.
    echo Por favor corrige los errores antes de deployar
    exit /b 1
)
echo.
pause
