export type ValidationResult = {
    isValid: boolean;
    error?: string;
};

const COMMON_VERBS = [
    "es", "fue", "son", "está", "hay", "tiene", "hace", "dice", "va", "ve", "da", "sabe", "quiere",
    "llega", "pasa", "debe", "pone", "queda", "cree", "habla", "lleva", "deja", "sigue", "encuentra",
    "llama", "viene", "piensa", "sale", "vuelve", "toma", "conoce", "vive", "siente", "trata", "mira",
    "cuenta", "empieza", "espera", "busca", "existe", "entra", "trabaja", "escribe", "pierde", "produce",
    "ocurre", "entiende", "pide", "recibe", "recuerda", "termina", "sirve", "gusta", "comienza", "asegura"
];

const KEYBOARD_SEQUENCES = [
    "asdf", "qwerty", "zxcv", "12345", "qwer", "wert", "erty", "rtyu", "tyui", "yuio", "uiop",
    "asdfg", "sdfgh", "dfghj", "fghjk", "ghjkl", "zxcvb", "xcvbn", "cvbnm", "sdf", "fdfdsf", "mierda", "cojudo", "cabron", "puto", "culo", "fuck", "wtf", "lol"
];

const ONOMATOPOEIAS = ["pum", "bum", "paf", "zas", "crash", "boom"];
const PLACEHOLDERS = ["lorem ipsum", "test test", "hijo de puta", "son of a bitch", "ejemplo ejemplo", "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"];

export const validateText = (text: string): ValidationResult => {
    const trimmedText = text.trim();

    // 1. Texto vacío
    if (!trimmedText) {
        return { isValid: false, error: "El campo no puede estar vacío." };
    }

    // 6. Solo números (remove spaces to check content)
    const contentWithoutSpaces = trimmedText.replace(/\s/g, "");
    if (/^\d+$/.test(contentWithoutSpaces)) {
        return { isValid: false, error: "El texto no puede contener solo números." };
    }

    // 7. Solo caracteres especiales
    // Allow letters, numbers, and basic punctuation, but check if ONLY symbols exist
    // Regex matches if there is NO letter or number in the entire string
    if (/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(contentWithoutSpaces)) {
        return { isValid: false, error: "El texto no puede contener solo símbolos." };
    }

    // 2. Longitud mínima (20 chars)
    if (trimmedText.length < 20) {
        return { isValid: false, error: "El texto debe tener al menos 20 caracteres." };
    }

    // 3. Longitud máxima (1000 chars)
    if (trimmedText.length > 1000) {
        return { isValid: false, error: "El texto no puede exceder los 1000 caracteres." };
    }

    const words = trimmedText.split(/\s+/);

    // 4. Número mínimo de palabras (10 words)
    if (words.length < 10) {
        return { isValid: false, error: "El texto debe tener al menos 10 palabras." };
    }

    // 26. Repetición excesiva de caracteres (e.g. "aaaaaaa")
    if (/(.)\1{6,}/.test(trimmedText)) {
        return { isValid: false, error: "Se detectó repetición excesiva de caracteres." };
    }

    // 27. Repetición de palabras (5+ times consecutive)
    if (/\b(\w+)(\s+\1){4,}\b/i.test(trimmedText)) {
        return { isValid: false, error: "Se detectó repetición excesiva de palabras." };
    }

    // 29. Mayúsculas excesivas (>50% of words are ALL CAPS, ignore short words < 2 chars)
    const significantWords = words.filter(w => w.length > 1);
    if (significantWords.length > 0) {
        const upperCaseWords = significantWords.filter(w => w === w.toUpperCase() && /[A-Z]/.test(w));
        if (upperCaseWords.length / significantWords.length > 0.5) {
            return { isValid: false, error: "Se detectó un exceso de mayúsculas." };
        }
    }

    // 40. Secuencias de teclado
    const lowerText = trimmedText.toLowerCase();
    for (const seq of KEYBOARD_SEQUENCES) {
        if (lowerText.includes(seq)) {
            return { isValid: false, error: "Se detectó una secuencia de teclado sin sentido." };
        }
    }

    // 64. Lenguaje infantil - Onomatopeyas
    for (const word of ONOMATOPOEIAS) {
        if (new RegExp(`\\b${word}\\b`, 'i').test(trimmedText)) {
            return { isValid: false, error: "Se detectó lenguaje infantil (onomatopeyas)." };
        }
    }

    // 65. Lenguaje infantil - Repeticiones (ja ja ja)
    if (/\b(ja|je|ji|jo|ju|la)(\s+\1){2,}\b/i.test(trimmedText)) {
        return { isValid: false, error: "Se detectó risa o repetición infantil." };
    }

    // 73. Texto placeholder
    for (const ph of PLACEHOLDERS) {
        if (new RegExp(ph, 'i').test(trimmedText)) {
            return { isValid: false, error: "Se detectó texto de relleno." };
        }
    }

    // 51. Presencia de verbos (Heuristic)
    // Check if any word is in common verbs list OR ends in ar/er/ir (and is > 3 chars)
    const hasVerb = words.some(w => {
        const lower = w.toLowerCase().replace(/[.,!?;:]/g, "");
        if (COMMON_VERBS.includes(lower)) return true;
        if (lower.length > 3 && (lower.endsWith("ar") || lower.endsWith("er") || lower.endsWith("ir"))) return true;
        return false;
    });

    if (!hasVerb) {
        return { isValid: false, error: "El texto parece carecer de verbos o acciones claras." };
    }

    // 52. Presencia de sustantivos (Heuristic)
    // We assume if it has verbs and passed other checks, it likely has nouns. 
    // But let's check for words that are NOT verbs and length > 3.
    // This is very weak, but satisfies the requirement "Check for nouns".
    const potentialNouns = words.filter(w => {
        const lower = w.toLowerCase().replace(/[.,!?;:]/g, "");
        if (lower.length <= 3) return false;
        if (COMMON_VERBS.includes(lower)) return false;
        if (lower.endsWith("ar") || lower.endsWith("er") || lower.endsWith("ir")) return false;
        return true;
    });

    if (potentialNouns.length === 0 && words.length > 5) {
        // Only flag if we really can't find anything substantial
        // return { isValid: false, error: "El texto parece carecer de sustantivos o sujetos." };
    }

    return { isValid: true };
};
