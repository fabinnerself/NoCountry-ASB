export const VALID_TONES = ['INSPIRACIONAL', 'EDUCATIVO', 'TÉCNICO'] as const;
export const VALID_FORMATS = ['HISTORIA', 'POST', 'REDES_SOCIALES', 'OTRO'] as const;

export const TEXT_MIN_LENGTH = 20;
export const TEXT_MAX_LENGTH = 1000;

export const WORD_COUNT_MIN = 80;
export const WORD_COUNT_MAX = 120;

export type ValidTone = (typeof VALID_TONES)[number];
export type ValidFormat = (typeof VALID_FORMATS)[number];
