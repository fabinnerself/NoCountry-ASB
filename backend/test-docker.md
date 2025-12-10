# Prueba del Backend en Docker

## Pasos para probar:

### 1. Asegúrate de tener el archivo .env configurado
```bash
cp .env.example .env
# Edita .env con tus valores reales (COHERE_API_KEY, etc.)
```

### 2. Construir la imagen Docker
```bash
docker build -t autostory-backend .
```

### 3. Ejecutar con Docker Compose (recomendado)
```bash
docker-compose up
```

### 4. O ejecutar directamente con Docker
```bash
docker run -p 8000:10000 --env-file .env autostory-backend
```

## Probar los endpoints:

### Health Check
```bash
curl http://localhost:8000/health
```

### Generar historia
```bash
curl -X POST http://localhost:8000/api/story/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"text\":\"Un niño encuentra una puerta mágica en el bosque\"}"
```

## Ver logs
```bash
docker-compose logs -f
```

## Detener
```bash
docker-compose down
```

## Limpiar
```bash
docker-compose down -v
docker rmi autostory-backend
```
