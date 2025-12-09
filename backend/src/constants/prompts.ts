import { Tone, Format } from '../schemas/storyRequest.schema';

export const BASE_PROMPT = `Eres un asistente especializado en crear narrativas de impacto social. 
Tu tarea es generar una historia con las siguientes características:

TONO: {tone}
{toneGuidelines}

FORMATO: {format}
{formatGuidelines}

CONTEXTO:
{text}

INSTRUCCIONES CRÍTICAS:
1. La historia debe tener entre 80 y 120 palabras
2. Debe estar escrita en español
3. Debe ser coherente con el contexto proporcionado
4. Debe reflejar el tono especificado
5. Debe adaptarse al formato indicado
6. Mantén un estilo profesional pero accesible

Genera la historia ahora:`;

export const TONE_GUIDELINES: Record<Tone, string> = {
  INSPIRACIONAL: `- Usa un lenguaje emotivo y motivador
- Enfócate en la superación y el logro
- Incluye elementos de esperanza y transformación
- Conecta emocionalmente con el lector
- Destaca el impacto humano`,

  EDUCATIVO: `- Usa un lenguaje claro y didáctico
- Estructura la información de manera lógica
- Explica conceptos de forma accesible
- Incluye datos concretos cuando sea relevante
- Enfócate en el aprendizaje y comprensión`,

  TÉCNICO: `- Usa terminología profesional apropiada
- Enfócate en procesos y metodologías
- Mantén un tono formal y objetivo
- Incluye detalles específicos
- Prioriza la precisión sobre la emoción`,
};

export const FORMAT_GUIDELINES: Record<Format, string> = {
  HISTORIA: `- Estructura: inicio, desarrollo y cierre
- Narrativa completa con arco dramático
- Incluye personajes y situaciones concretas
- Desarrollo coherente de principio a fin`,

  POST: `- Formato de blog o artículo breve
- Introducción, desarrollo y conclusión
- Párrafos cortos y fáciles de leer
- Puede incluir subtítulos o énfasis`,

  REDES_SOCIALES: `- Texto optimizado para redes sociales (Instagram, Facebook, LinkedIn)
- Incluye emojis relevantes para dar énfasis
- Agrega 3-4 hashtags relacionados al final
- Incluye un llamado a la acción (CTA)
- Formato visual: párrafos cortos con saltos de línea`,

  OTRO: `- Formato flexible adaptado al contexto
- Mantén coherencia narrativa
- Prioriza claridad y impacto`,
};
