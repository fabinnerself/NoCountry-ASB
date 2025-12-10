#!/bin/bash
# Prueba usando el mismo Dockerfile que Render

cd /mnt/c/nocountry/4

# Leer COHERE_API_KEY del archivo .env
export COHERE_API_KEY=$(grep COHERE_API_KEY backend/.env | cut -d '=' -f2)

echo "Building Docker image..."
# Build usando el Dockerfile de la raíz (como Render)
docker build -t autostory-render -f Dockerfile .

echo "Running Docker container..."
# Run con las mismas variables de Render
docker run -p 8000:10000 \
  -e NODE_ENV=production \
  -e PORT=10000 \
  -e COHERE_API_KEY="${COHERE_API_KEY}" \
  -e FRONTEND_URL="https://asb-delta.vercel.app" \
  -e FRONTEND_URL_LOCAL="http://localhost:3000" \
  autostory-render
