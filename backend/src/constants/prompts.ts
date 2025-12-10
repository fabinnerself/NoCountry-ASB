import { ValidTone, ValidFormat } from './validation';

export const PROMPT_TEMPLATES = {
  BASE: `Eres un escritor experto en narrativa de impacto. Tu tarea es generar una historia coherente, emocionalmente resonante y profesional.

RESTRICCIONES OBLIGATORIAS:
- Longitud: EXACTAMENTE entre 80 y 120 palabras
- Estructura: Gancho inicial → Desarrollo → Cierre
- Formato de salida: {format}
- Tono narrativo: {tone}
{ctaRequirement}

INFORMACIÓN BASE:
{text}

{visualContext}

GENERA LA HISTORIA (80-120 palabras):`,

  CTA_REQUIREMENT: `- INCLUIR Call-to-Action al final`,
  NO_CTA: '',

  VISUAL_CONTEXT_WITH_CAPTIONS: `CONTEXTO VISUAL (de la imagen proporcionada):
{captions}

Integra este contexto visual en la narrativa de forma natural y relevante.`,

  VISUAL_CONTEXT_WITHOUT: '',
};

export function buildPrompt(
  tone: ValidTone,
  format: ValidFormat,
  text: string,
  imageCaptions?: string[]
): string {
  const ctaRequirement =
    format === 'REDES_SOCIALES' ? PROMPT_TEMPLATES.CTA_REQUIREMENT : PROMPT_TEMPLATES.NO_CTA;

  const visualContext =
    imageCaptions && imageCaptions.length > 0
      ? PROMPT_TEMPLATES.VISUAL_CONTEXT_WITH_CAPTIONS.replace(
          '{captions}',
          imageCaptions.map((caption, idx) => `${idx + 1}. ${caption}`).join('\n')
        )
      : PROMPT_TEMPLATES.VISUAL_CONTEXT_WITHOUT;

  return PROMPT_TEMPLATES.BASE.replace('{format}', format)
    .replace('{tone}', tone)
    .replace('{ctaRequirement}', ctaRequirement)
    .replace('{text}', text)
    .replace('{visualContext}', visualContext);
}
