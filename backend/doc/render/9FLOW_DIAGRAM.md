# 🔄 Flujo de Despliegue - Render + Vercel

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         TU ARQUITECTURA FINAL                           │
└─────────────────────────────────────────────────────────────────────────┘

                            VERCEL (Frontend)
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
           Frontend React/Vite          Environment Vars:
           (Tu app visual)              VITE_API_URL=
                    │                   https://...onrender.com
                    │
                    │ HTTP Requests
                    │
                    ▼
          ┌──────────────────────┐
          │   RENDER (Backend)   │◄─── Build de GitHub Push
          ├──────────────────────┤
          │ Node.js Express API  │
          │ AutoStory Builder    │
          │ Port: 10000          │
          └──────────────────────┘
                    │
                    ▼
          ┌──────────────────────┐
          │    COHERE API        │
          │ (LLM para historias) │
          └──────────────────────┘


FLUJO DE DATOS:
═════════════════════════════════════════════════════════════════════════════

Usuario en Vercel Frontend
        ↓
 Escribe/envía datos
        ↓
 React hace POST a VITE_API_URL
        ↓
 Llega a Render Backend (https://...onrender.com/api/generate-story)
        ↓
 Backend procesa y envía prompt a Cohere
        ↓
 Cohere genera historia
        ↓
 Backend devuelve respuesta
        ↓
 Frontend muestra resultado al usuario


TIMELINE DE DESPLIEGUE:
═════════════════════════════════════════════════════════════════════════════

T+0min:   ┌─ Haces git push origin main
          │
T+1min:   ├─ GitHub recibe cambios
          │
T+2min:   ├─ Creas Web Service en Render
          │  ├─ Seleccionas repo
          │  ├─ Render clona código
          │
T+3min:   ├─ Render comienza BUILD
          │  ├─ npm install
          │  ├─ npm run build (tsc)
          │  ├─ Crea imagen Docker
          │
T+8min:   ├─ Deploy de contenedor
          │
T+10min:  ├─ ✅ LIVE - Backend en https://xxx.onrender.com
          │
T+10min:  ├─ Actualizas COHERE_API_KEY en Render
          │
T+12min:  ├─ Configuras FRONTEND_URL en Render
          │
T+12min:  ├─ Verifica /health endpoint
          │
T+15min:  ├─ Actualizas Vercel con VITE_API_URL
          │
T+20min:  └─ ✅ LISTO - Full stack funcionando


ARCHIVOS Y SUS FUNCIONES:
═════════════════════════════════════════════════════════════════════════════

📄 CONFIGURACIÓN (Render lee estos)
├── render.yaml ................. Build Command, Start Command, Env Vars
└── Dockerfile .................. Cómo crear la imagen (opcional, render.yaml lo maneja)

📄 CÓDIGO FUENTE
├── src/app.ts .................. Express app (no cambió)
├── src/server.ts ............... Entry point (no cambió)
├── src/config/env.ts ........... Config, PUERTO ACTUALIZADO A 10000
└── package.json ................ Scripts npm (no cambió)

📄 DOCUMENTACIÓN (Para ti)
├── 🌟 COMIENZA_AQUI.md ......... ESTE PRIMERO
├── README_DEPLOYMENT.md ........ Guía principal detallada
├── RENDER_SETUP.md ............. Guía rápida
├── COMMANDS_READY_TO_COPY.md ... Comandos listos
├── DEPLOYMENT_CHECKLIST.md ..... Verificaciones
├── STATUS_REPORT.md ............ Reporte de estado
├── FRONTEND_INTEGRATION.md ..... Conectar con Vercel
└── SETUP_SUMMARY.md ............ Resumen técnico


VARIABLES DE ENTORNO NECESARIAS:
═════════════════════════════════════════════════════════════════════════════

En RENDER (Environment Variables):
┌─────────────────────────────────────────────────────────────┐
│ COHERE_API_KEY=sk_live_... (¡CRÍTICA!)                      │
│ FRONTEND_URL=https://tu-vercel-app.vercel.app               │
│ NODE_ENV=production                                         │
│ PORT=10000 (automático en render.yaml)                      │
└─────────────────────────────────────────────────────────────┘

En VERCEL (Environment Variables):
┌─────────────────────────────────────────────────────────────┐
│ VITE_API_URL=https://tu-app.onrender.com                    │
└─────────────────────────────────────────────────────────────┘


VERIFICACIONES EN CADA ETAPA:
═════════════════════════════════════════════════════════════════════════════

✓ Local (Antes de push)
  └─ npm run build          → Sin errores
  └─ npm start              → Corre en http://localhost:10000
  └─ curl localhost:10000/health → Status 200 OK

✓ GitHub (Después de push)
  └─ Repo actualizado
  └─ render.yaml presente

✓ Render Build
  └─ Logs sin errores
  └─ Status "Live" en verde

✓ Render Runtime
  └─ curl https://xxx.onrender.com/health → Status 200 OK
  └─ /api/generate-story devuelve respuesta

✓ Vercel Frontend
  └─ VITE_API_URL configurada
  └─ Frontend apunta a URL correcta
  └─ Formulario → POST a API → Respuesta


MONITOREO POST-DEPLOY:
═════════════════════════════════════════════════════════════════════════════

Cada día (o según necesidad):
  □ Verifica /health endpoint
  □ Revisa logs en Render
  □ Monitorea CPU/Memory
  □ Prueba request API completo

Cada semana:
  □ Verifica uptime
  □ Revisa errores 5xx
  □ Verifica CORS funciona
  □ Test desde diferentes navegadores


DIAGRAMA DE CARPETAS:
═════════════════════════════════════════════════════════════════════════════

nocountry/2/
├── backend/
│   ├── 🌟 COMIENZA_AQUI.md .................. EMPIEZA AQUÍ
│   ├── README_DEPLOYMENT.md
│   ├── RENDER_SETUP.md
│   ├── COMMANDS_READY_TO_COPY.md
│   ├── DEPLOYMENT_CHECKLIST.md
│   ├── STATUS_REPORT.md
│   ├── FRONTEND_INTEGRATION.md
│   ├── SETUP_SUMMARY.md
│   ├── 🔧 render.yaml ...................... Render lo leerá
│   ├── 🐳 Dockerfile ........................ Build Docker
│   ├── .dockerignore ........................ Optimize Docker
│   ├── .env.example ......................... Template de variables
│   ├── package.json ......................... Scripts OK
│   ├── tsconfig.json ........................ Build OK
│   ├── src/
│   │   ├── app.ts ........................... Express (no cambió)
│   │   ├── server.ts ........................ Entry point (no cambió)
│   │   ├── config/
│   │   │   └── env.ts ....................... PUERTO=10000 ✓
│   │   └── ... resto sin cambios
│   └── dist/ ............................... Generado por npm build
│
└── frontend/
    ├── vite.config.ts
    ├── .env.production ....................... VITE_API_URL=...
    ├── src/
    │   ├── App.tsx
    │   └── ... componentes
    └── (Deploy en Vercel)


URLS FINALES:
═════════════════════════════════════════════════════════════════════════════

Local Development:
  Frontend: http://localhost:5173
  Backend:  http://localhost:10000
  Health:   http://localhost:10000/health

Production:
  Frontend: https://tu-proyecto.vercel.app
  Backend:  https://tu-app.onrender.com
  Health:   https://tu-app.onrender.com/health
  API:      https://tu-app.onrender.com/api/generate-story


COSTOS ESTIMADOS:
═════════════════════════════════════════════════════════════════════════════

Vercel Frontend (ya tienes):
  ✓ Free tier con custom domain
  ✓ Incluye environment variables

Render Backend (nuevo):
  ✓ Free: $0 (cold starts)
  ✓ Starter: $7/mes (recomendado para producción)
  ✓ Standard: $25/mes (más recursos)

Total para producción: ~$7/mes


TROUBLESHOOTING VISUAL:
═════════════════════════════════════════════════════════════════════════════

Frontend no conecta a Backend:
  └─ VITE_API_URL ≠ URL de Render?
  └─ CORS error en console?
  └─ Render status no está "Live"?

Render no compila:
  └─ COHERE_API_KEY no está en env vars?
  └─ Código no compila localmente?
  └─ npm run build falla?

API devuelve 503:
  └─ Cold start (plan Free), espera
  └─ O falta memoria, considera Starter

/health endpoint no responde:
  └─ Render aún compilando
  └─ Revisa logs en dashboard
  └─ Espera status "Live"


¡ESTÁS LISTO! 🚀
═════════════════════════════════════════════════════════════════════════════

Próximo paso: Abre COMIENZA_AQUI.md y sigue los pasos.
Tiempo total: ~20 minutos hasta tener todo en producción.
```

---

**Nota:** Este diagrama es una vista general. Para detalles específicos, consulta los archivos de documentación correspondientes.
