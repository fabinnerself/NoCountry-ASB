@echo off
REM Script para probar Docker localmente en Windows

echo ========================================
echo Docker Build Test - AutoStory Backend
echo ========================================
echo.

REM Verificar Docker
echo Verificando Docker...
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Docker no esta instalado
    exit /b 1
)
docker --version
echo [OK] Docker instalado
echo.

REM Verificar .env
echo Verificando .env...
if not exist .env (
    echo [WARNING] Archivo .env no encontrado
    echo Creando desde .env.example...
    copy .env.example .env
    echo [WARNING] Por favor edita .env con tus credenciales
    pause
    exit /b 0
)
echo [OK] Archivo .env encontrado
echo.

REM Build de la imagen
echo Building Docker image...
docker build -t autostory-backend:test . --no-cache

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Error en build
    exit /b 1
)
echo [OK] Imagen creada exitosamente
echo.

REM Ver tamaño
echo Tamaño de la imagen:
docker images autostory-backend:test
echo.

REM Ejecutar contenedor
echo Iniciando contenedor de prueba...
docker run -d --name autostory-test -p 8001:8000 --env-file .env autostory-backend:test

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Error al iniciar contenedor
    exit /b 1
)
echo [OK] Contenedor iniciado
echo.

REM Esperar
echo Esperando a que el servidor inicie (30 segundos)...
timeout /t 30 /nobreak >nul

REM Ver logs
echo Logs del contenedor:
docker logs autostory-test
echo.

REM Probar health check
echo Probando health check...
curl -s http://localhost:8001/health
echo.
echo.

REM Limpiar
echo Limpiando...
docker stop autostory-test
docker rm autostory-test

echo.
echo ========================================
echo [OK] Test completado
echo.
echo Para deployar en Render:
echo   1. git add .
echo   2. git commit -m "feat: Docker configurado para Fase 2"
echo   3. git push origin main
echo   4. Configurar variables en Render Dashboard
echo   5. Deploy automatico
echo.
pause
