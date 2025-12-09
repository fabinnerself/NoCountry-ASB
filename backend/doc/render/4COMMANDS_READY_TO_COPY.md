# 📋 Comandos Ready-to-Copy para Render

## Local Testing (Antes de Desplegar)

### 1. Compilar
```powershell
cd backend
npm run build
```

### 2. Iniciar servidor (producción)
```powershell
npm start
```

### 3. Testear health endpoint
```powershell
# En otra terminal PowerShell
$response = Invoke-WebRequest -Uri "http://localhost:10000/health" -UseBasicParsing
$response.Content
```

### 4. Testear API (ejemplo)
```powershell
$body = @{
    text = "Un día soleado en la playa"
    format = "HISTORIA"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:10000/api/generate-story" `
    -Method Post `
    -Headers @{"Content-Type" = "application/json"} `
    -Body $body `
    -UseBasicParsing

$response.Content | ConvertFrom-Json | ConvertTo-Json
```

## Git Commands

### 1. Verificar cambios
```bash
git status
```

### 2. Agregar archivos
```bash
git add .
```

### 3. Commit
```bash
git commit -m "Setup backend for Render deployment: add Dockerfile, render.yaml, and deployment docs"
```

### 4. Push a GitHub
```bash
git push origin main
```

## Render Environment Variables (Copy-Paste)

Una vez en el dashboard de Render, en la sección "Environment Variables", añade:

```
COHERE_API_KEY=TU_CLAVE_AQUI
FRONTEND_URL=https://tu-proyecto.vercel.app
NODE_ENV=production
```

### Valores opcionales (si diferentes de defaults):
```
COHERE_MODEL=command-r7b-12-2024
COHERE_TEMPERATURE=0.7
COHERE_MAX_TOKENS=500
TEXT_MIN_LENGTH=20
TEXT_MAX_LENGTH=1000
STORY_MIN_WORDS=80
STORY_MAX_WORDS=120
```

## Verificación Post-Deploy

### 1. Obtén tu URL de Render
```
Desde el dashboard → Settings → Copy render.onrender.com URL
Debería verse: https://autostory-backend.onrender.com (o similar)
```

### 2. Test health endpoint (reemplaza URL)
```powershell
$url = "https://autostory-backend.onrender.com/health"
Invoke-WebRequest -Uri $url -UseBasicParsing
```

### 3. Test API endpoint
```powershell
$url = "https://autostory-backend.onrender.com/api/generate-story"
$body = @{
    text = "Un día increíble"
    format = "HISTORIA"
} | ConvertTo-Json

Invoke-WebRequest -Uri $url `
    -Method Post `
    -Headers @{"Content-Type" = "application/json"} `
    -Body $body `
    -UseBasicParsing
```

## Frontend Update (Vercel)

### 1. En Vercel Dashboard
```
Proyecto → Settings → Environment Variables
```

### 2. Añade
```
Variable Name: VITE_API_URL
Variable Value: https://autostory-backend.onrender.com (TU URL)
```

### 3. Redeploy
```
Dashboard → Deployments → Click último commit → Redeploy
```

## Debugging Comandos

### Ver logs en tiempo real (Render CLI, si la instalaste)
```bash
render logs -s autostory-backend --tail
```

### O desde el dashboard
```
Render Dashboard → Tu Web Service → Logs (arriba a la derecha)
```

### Test con curl (si tienes curl instalado)
```bash
curl https://autostory-backend.onrender.com/health
```

### Test API con curl
```bash
curl -X POST https://autostory-backend.onrender.com/api/generate-story \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"Un cuento\",\"format\":\"HISTORIA\"}"
```

## Docker Testing (Opcional)

Si quieres probar Docker localmente:

### 1. Build imagen
```bash
docker build -t autostory-backend .
```

### 2. Run contenedor
```bash
docker run -p 10000:10000 \
  -e COHERE_API_KEY=tu_clave \
  -e FRONTEND_URL=http://localhost:5173 \
  -e NODE_ENV=production \
  autostory-backend
```

### 3. Test
```powershell
Invoke-WebRequest -Uri "http://localhost:10000/health" -UseBasicParsing
```

## Database (Si necesitas en Fase 1)

### Crear PostgreSQL en Render
```
Dashboard → New + → PostgreSQL
Nombre: autostory-db
Copia DATABASE_URL y úsala en Web Service
```

### Ejecutar migrations (en build command)
```
npm install && npm run build && npx prisma migrate deploy
```

## Rollback (Si algo sale mal)

### 1. En Render Dashboard
```
Tu Web Service → Deployments → Click en deployment anterior
```

### 2. Or volver a desplegar
```bash
git revert HEAD
git push origin main
# Render redeploy automáticamente
```

## Monitoreo Continuo

### Checks periódicos
```powershell
# Crea un script PowerShell para monitorear
$url = "https://autostory-backend.onrender.com/health"
while ($true) {
    $time = Get-Date -Format "HH:mm:ss"
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        Write-Host "[$time] ✅ API UP - Status: $($response.StatusCode)"
    } catch {
        Write-Host "[$time] ❌ API DOWN - Error: $($_.Exception.Message)"
    }
    Start-Sleep -Seconds 60
}
```

## Checklist Final (Copy-Paste)

```
Pre-Deploy:
☐ npm run build (sin errores)
☐ npm start (funciona local)
☐ curl /health (devuelve 200)
☐ git push (cambios en GitHub)

Deploy:
☐ New Web Service en Render
☐ Repo seleccionado
☐ COHERE_API_KEY configurada
☐ FRONTEND_URL configurada
☐ NODE_ENV=production
☐ Create Web Service

Post-Deploy:
☐ Esperar a "Live" status
☐ https://tu-app/health funciona
☐ API endpoint devuelve respuesta
☐ CORS funciona desde frontend
☐ Frontend actualizado con URL
☐ Vercel redeploy completado
```

---

**Pro Tips:**
- Guarda tu URL de Render en favoritos
- Configura alertas en Render para downtime
- Crea un alias en PowerShell para los comandos frecuentes
- Revisa logs después de cada deploy

**Tiempo total estimado:** 15-20 minutos
