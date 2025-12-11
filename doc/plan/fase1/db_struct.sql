-- ============================================
-- CONFIGURACIÓN INICIAL
-- ============================================

-- Habilitar extensión pgvector (EJECUTAR PRIMERO)
CREATE EXTENSION IF NOT EXISTS vector;

-- Habilitar UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TIPOS ENUM
-- ============================================

-- Eliminar tipos si existen (para recrear)
DROP TYPE IF EXISTS narrative_tone CASCADE;
DROP TYPE IF EXISTS formato_comunicacional CASCADE;
DROP TYPE IF EXISTS story_status CASCADE;

CREATE TYPE narrative_tone AS ENUM ('INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO');
CREATE TYPE formato_comunicacional AS ENUM ('HISTORIA', 'POST', 'REDES SOCIALES', 'OTRO');
CREATE TYPE story_status AS ENUM ('uploaded', 'processing', 'generated', 'failed', 'exported');

-- ============================================
-- TABLAS
-- ============================================

-- ============================================
-- TABLA: users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    last_login TIMESTAMPTZ,        
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: stories  
-- ============================================
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- INPUTS DEL USUARIO (4 variables)
    user_input_text TEXT,                   -- Texto del usuario (opcional)
    narrative_tone narrative_tone NOT NULL DEFAULT 'INSPIRACIONAL',
    formato_comunicacional formato_comunicacional NOT NULL DEFAULT 'REDES SOCIALES',
    
    -- SUPABASE STORAGE METADATA
    media_storage_path TEXT,                -- Ej: 'user-123/image.jpg' (path en Supabase Storage)
    media_public_url TEXT,                  -- URL pública generada por Supabase
    media_file_name TEXT,                   -- Nombre original del archivo    
    media_mime_type TEXT,                   -- 'image/jpeg', 'image/png', etc.
    
    -- PROCESAMIENTO IA
    extracted_context JSONB,                -- Análisis de IA: {themes: [], emotions: [], context_summary: ""}
    generated_content TEXT,                 -- Narrativa generada por LLM
    embedding VECTOR(512),                  -- Para consultas RAG futuras
    
    -- ESTADO Y METADATA
    status story_status DEFAULT 'uploaded',
    error_message TEXT,    
    processing_time_ms INTEGER,             -- Tiempo de procesamiento en ms
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: rag_documents (BASE DE CONOCIMIENTO RAG)
-- ============================================
CREATE TABLE IF NOT EXISTS rag_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    content_type TEXT NOT NULL,              -- 'style_guide', 'example', 'format_rules'
    metadata JSONB DEFAULT '{}',             -- {tone: "INSPIRACIONAL", format: "REDES SOCIALES", category: "narrative_rules"}
    embedding VECTOR(512),                   -- pgvector para búsquedas semánticas
    created_at TIMESTAMPTZ DEFAULT NOW()
);

 
 
-- ============================================
-- ÍNDICES
-- ============================================

-- Índices para stories
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at);
CREATE INDEX IF NOT EXISTS idx_stories_embedding ON stories USING ivfflat (embedding vector_cosine_ops);

-- Índices para rag_documents
CREATE INDEX IF NOT EXISTS idx_rag_documents_embedding ON rag_documents USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_rag_documents_metadata ON rag_documents USING gin(metadata);
CREATE INDEX IF NOT EXISTS idx_rag_documents_content_type ON rag_documents(content_type);



-- ============================================
-- DATOS INICIALES RAG (BASE DE CONOCIMIENTO)
-- ============================================

-- Limpiar datos existentes (opcional)
-- DELETE FROM rag_documents;

-- Insertar manuales de estilo
INSERT INTO rag_documents (content, content_type, metadata) VALUES
(
'TONO INSPIRACIONAL: Usar lenguaje emotivo que conecte con sentimientos de esperanza y superación. Estructura recomendada: 1) Situación desafiante inicial 2) Esfuerzo y perseverancia 3) Transformación positiva 4) Mensaje esperanzador. Incluir metáforas de luz, camino, crecimiento. Palabras clave: superación, esperanza, cambio, impacto, comunidad. Evitar tecnicismos y lenguaje frío.',
'style_guide',
'{"tone": "INSPIRACIONAL", "category": "narrative_rules", "language": "es"}'
),
(
'TONO EDUCATIVO: Enfoque en claridad y aprendizaje. Estructura: 1) Contexto y problema 2) Metodología aplicada 3) Resultados observables 4) Aprendizajes clave. Usar datos específicos pero accesibles. Lenguaje: preciso pero comprensible. Incluir ejemplos concretos y datos verificables. Formato didáctico y progresivo.',
'style_guide',
'{"tone": "EDUCATIVO", "category": "narrative_rules", "language": "es"}'
),
(
'TONO TÉCNICO: Precisión en datos y métricas. Estructura: 1) Objetivo 2) Metodología 3) Resultados 4) Conclusiones. Incluir porcentajes, cifras, metodologías específicas. Vocabulario especializado cuando sea necesario. Formato directo, sin florituras literarias. Enfocar en datos cuantificables y procesos.',
'style_guide',
'{"tone": "TÉCNICO", "category": "narrative_rules", "language": "es"}'
);

-- Insertar reglas de formato
INSERT INTO rag_documents (content, content_type, metadata) VALUES
(
'FORMATO REDES SOCIALES: Extensión 80-120 palabras. Párrafo inicial impactante (gancho emocional). Lenguaje conversacional y cercano. Incluir llamado a la acción. Estructura: Gancho → Desarrollo breve → Cierre inspirador. Optimizado para engagement en plataformas sociales.',
'format_guide',
'{"format": "REDES SOCIALES", "category": "format_rules", "word_count": "80-120"}'
),
(
'FORMATO POST: Extensión 150-250 palabras. Estructura completa: Introducción → Desarrollo → Conclusión. Tono más formal pero accesible. Incluir datos de soporte y contexto. Ideal para blogs y contenido educativo.',
'format_guide',
'{"format": "POST", "category": "format_rules", "word_count": "150-250"}'
),
(
'FORMATO HISTORIA: Extensión 200-350 palabras. Narrativa extensa con desarrollo de personajes y contexto. Estructura clásica: planteamiento → nudo → desenlace. Permitir mayor profundidad emocional y descriptiva.',
'format_guide',
'{"format": "HISTORIA", "category": "format_rules", "word_count": "200-350"}'
);

-- Insertar ejemplos de narrativas efectivas
INSERT INTO rag_documents (content, content_type, metadata) VALUES
(
'Cuando Ana llegó al programa, las puertas parecían cerradas. Pero su curiosidad era más fuerte que el miedo. Día a día, libro tras libro, no solo aprendió nuevas habilidades sino que descubrió su voz. Hoy, Ana enseña a otros, creando un círculo virtuoso de aprendizaje que ya alcanza a 200 personas. Su historia prueba que la educación no solo cambia vidas, sino que construye futuros.',
'example',
'{"tone": "INSPIRACIONAL", "format": "REDES SOCIALES", "quality": "high", "language": "es", "use_case": "educación"}'
),
(
'La implementación del programa de sostenibilidad ambiental siguió una metodología en tres fases: diagnóstico participativo, capacitación técnica y acompañamiento comunitario. Resultados: 75% de reducción en residuos, 50 familias implementaron huertos urbanos, y se crearon 3 microempresas verdes. El enfoque demostró que la combinación de conocimiento técnico y participación comunitaria maximiza el impacto sostenible.',
'example',
'{"tone": "EDUCATIVO", "format": "POST", "quality": "high", "language": "es", "use_case": "sostenibilidad"}'
),
(
'El proyecto de digitalización alcanzó un ROI del 240% en 12 meses. Metodología: implementación en 4 fases iterativas usando SCRUM. Métricas clave: 85% adopción usuario final, 40% reducción tiempo procesos, 15% aumento productividad. La arquitectura cloud-first permitió escalabilidad inmediata.',
'example',
'{"tone": "TÉCNICO", "format": "POST", "quality": "high", "language": "es", "use_case": "tecnología"}'
);

 

 

-- ============================================
-- VERIFICACIONES FINALES
-- ============================================

-- Verificar que todo se creó correctamente
DO $$
BEGIN
    -- Verificar extensión pgvector
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
        RAISE NOTICE '✅ Extensión pgvector habilitada correctamente';
    ELSE
        RAISE EXCEPTION '❌ Error: pgvector no está habilitado';
    END IF;

    -- Verificar tablas
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'stories') THEN
        RAISE NOTICE '✅ Tabla stories creada correctamente';
    ELSE
        RAISE EXCEPTION '❌ Error: Tabla stories no existe';
    END IF;

   

    -- Verificar datos RAG
    IF EXISTS (SELECT 1 FROM rag_documents LIMIT 1) THEN
        RAISE NOTICE '✅ Datos RAG insertados correctamente';
    ELSE
        RAISE EXCEPTION '❌ Error: No hay datos en rag_documents';
    END IF;

    RAISE NOTICE '🎉 Configuración de base de datos completada exitosamente!';
END $$;

-- ============================================
-- PRUEBAS RÁPIDAS
-- ============================================

-- Probar función de búsqueda RAG
SELECT 'Probando función RAG...' as test;

SELECT * FROM match_rag_documents(
  (SELECT embedding FROM rag_documents LIMIT 1),
  0.1,  -- threshold bajo para prueba
  2,    -- límite
  'INSPIRACIONAL'
);

-- Verificar conteo de documentos
SELECT content_type, COUNT(*) as count 
FROM rag_documents 
GROUP BY content_type;

-- Mostrar resumen de configuración
SELECT 
  (SELECT COUNT(*) FROM rag_documents) as total_rag_documents,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public') as total_tables,
  (SELECT version FROM pg_extension WHERE extname = 'vector') as pgvector_version;