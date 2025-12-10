# Test Images

Esta carpeta debe contener imágenes de prueba para los tests.

## Imágenes Necesarias

1. **test-image.jpg** - Imagen JPEG estándar (1-5 MB)
2. **test-image.png** - Imagen PNG (1-5 MB)
3. **test-image.webp** - Imagen WEBP (1-5 MB)
4. **test-image-large.jpg** - Imagen >10MB para test de validación de tamaño

## Cómo Obtener Imágenes de Prueba

### Opción 1: Generar con Placeholder
```bash
# Crear imagen de prueba simple
convert -size 800x600 xc:white -pointsize 40 -draw "text 100,300 'Test Image'" test-image.jpg
```

### Opción 2: Descargar de Unsplash
```bash
# Descargar imagen de ejemplo
curl -o test-image.jpg "https://source.unsplash.com/800x600/?entrepreneur"
curl -o test-image.png "https://source.unsplash.com/800x600/?workspace"
curl -o test-image.webp "https://source.unsplash.com/800x600/?business"
```

### Opción 3: Usar Imágenes Propias

Simplemente coloca imágenes propias que cumplan con los requisitos:
- Formato: JPG, PNG o WEBP
- Tamaño: 1-10 MB (excepto test-image-large.jpg que debe ser >10MB)
- Contenido: Preferiblemente relacionado con emprendimiento, trabajo, o temas sociales

## Crear Imagen Grande para Tests de Error

```bash
# Crear imagen de 11MB
convert -size 4000x3000 xc:white test-image-large.jpg
```

## Notas

- Estas imágenes NO se suben al repositorio (están en .gitignore)
- Cada desarrollador debe generar sus propias imágenes de prueba
- Los tests esperan estas imágenes en esta ubicación
