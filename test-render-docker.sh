#!/bin/bash
# Prueba usando el mismo Dockerfile que Render

cd /c/nocountry/2

# Build usando el Dockerfile de la raíz (como Render)
docker build -t autostory-render -f Dockerfile .

# Run con las mismas variables de Render
docker run -p 8000:10000 \
  -e NODE_ENV=production \
  -e PORT=10000 \
  -e COHERE_API_KEY="${COHERE_API_KEY}" \
  -e FRONTEND_URL="https://asb-delta.vercel.app" \
  -e FRONTEND_URL_LOCAL="http://localhost:5173" \
  autostory-render
