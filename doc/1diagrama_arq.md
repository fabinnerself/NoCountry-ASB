# Documentación de Arquitectura de AutoStory Builder

Esta documentación proporciona una visión técnica de alto nivel de la arquitectura del sistema **AutoStory Builder**, utilizando el modelo C4 para describir el contexto y los contenedores del sistema.

## 1. Diagrama de Contexto (Nivel 1)

Este diagrama muestra cómo **AutoStory Builder** interactúa con sus usuarios y sistemas externos.

```mermaid
C4Context
    title Diagrama de Contexto - AutoStory Builder

    Person(usuario, "Usuario / Creador de Contenido", "Utiliza la aplicación para generar historias para redes sociales.")

    System(sistema, "AutoStory Builder", "Plataforma web que genera historias automatizadas basadas en texto e imágenes.")

    System_Ext(cohere, "Cohere API", "Servicio de IA Generativa (LLM) para crear y reescribir textos narrativos.")
    System_Ext(almacenamiento, "Cloud Storage / DB", "Sistema de persistencia de datos.")

    Rel(usuario, sistema, "Configura parámetros y solicita historias", "HTTPS")
    Rel(sistema, cohere, "Envía prompts y contexto", "API REST/JSON")
    Rel(sistema, almacenamiento, "Lee y escribe historial de historias generadas", "PostgreSQL Protocol")
```


## 2. Diagrama de Contenedores (Nivel 2)

Este diagrama profundiza en el sistema para mostrar los contenedores (aplicaciones ejecutables) que lo componen y sus interacciones.

```mermaid
C4Container
    title Diagrama de Contenedores - AutoStory Builder

    Person(usuario, "Usuario", "Navegador Web")

    Container_Boundary(c1, "AutoStory Builder System") {
        Container(spa, "Single Page Application", "React (Vite), TypeScript", "Interfaz de usuario responsiva para la configuración y visualización de historias.")
        Container(api, "API Backend", "Node.js, Express, TypeScript", "Maneja la lógica de negocio, validaciones y orquestación de servicios de IA.")
        ContainerDb(db, "Base de Datos", "PostgreSQL", "Almacena las historias generadas, metadatos y logs de errores.")
    }

    System_Ext(cohere, "Cohere API", "Generación de texto")

    Rel(usuario, spa, "Usa", "HTTPS")
    Rel(spa, api, "Llamadas API", "JSON/HTTPS")
    Rel(api, db, "Lectura/Escritura", "Prisma ORM")
    Rel(api, cohere, "Generación de texto", "HTTPS")
```



## 3. Descripción de Componentes

### Frontend (SPA - Single Page Application)
*   **Tecnología**: React, Vite, TailwindCSS (presumiblemente).
*   **Responsabilidad**:
    *   Presentar el formulario de entrada (tono, formato, inputs de texto/imagen).
    *   Gestionar el estado de la aplicación.
    *   Mostrar la historia generada al usuario.
    *   Manejar la comunicación con el Backend.

### Backend (API REST)
*   **Tecnología**: Node.js, Express, TypeScript.
*   **Responsabilidad**:
    *   **Validación**: Asegura que los datos de entrada cumplan con los requisitos (longitud, tipos).
    *   **Orquestación**: Construye los prompts adecuados para la IA.
    *   **Integración**: Se comunica con la API de Cohere.
    *   **Persistencia**: Guarda el historial de creaciones en PostgreSQL mediante Prisma.

### Base de Datos
*   **Tecnología**: PostgreSQL.
*   **Esquema Principal**:
    *   `Story`: Almacena el ID, texto de entrada, configuración (tono/formato), el resultado generado y timestamps.

### Servicios Externos
*   **Cohere API**: Proveedor de LLM (Large Language Model) utilizado para la generación creativa de texto.

## 4. Despliegue (Infraestructura)

El sistema está preparado para ser desplegado en entornos modernos de nube.

*   **Contenerización**: Uso de **Docker** para empaquetar el backend y asegurar consistencia entre desarrollo y producción.
*   **Orquestación Local**: `docker-compose` para levantar base de datos y backend simultáneamente en entornos de desarrollo.
*   **Nube (Producción)**: Configuración lista para **Render** (vía `render.yaml`) o plataformas similares.

 
