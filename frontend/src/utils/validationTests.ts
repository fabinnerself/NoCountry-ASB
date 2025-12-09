import { validateText } from "./textValidations";

type TestCase = {
    name: string;
    input: string;
    expectedValid: boolean;
    expectedError?: string; // Partial match for error message
};

const testCases: TestCase[] = [
    // 1. Texto vacío
    { name: "Empty string", input: "", expectedValid: false, expectedError: "vacío" },
    { name: "Only spaces", input: "   ", expectedValid: false, expectedError: "vacío" },

    // 2. Longitud mínima (20 chars)
    { name: "Too short", input: "Hola mundo", expectedValid: false, expectedError: "al menos 20 caracteres" },

    // 3. Longitud máxima (2000 chars)
    { name: "Too long", input: "b".repeat(2001), expectedValid: false, expectedError: "exceder los 2000 caracteres" },

    // 4. Número mínimo de palabras (10 words)
    { name: "Not enough words", input: "Una dos tres cuatro cinco seis siete ocho nueve", expectedValid: false, expectedError: "al menos 10 palabras" },

    // 6. Solo números
    { name: "Only numbers", input: "1234567890 1234567890 12345", expectedValid: false, expectedError: "solo números" },

    // 7. Solo caracteres especiales
    { name: "Only special chars", input: "!@#$%^&*() !@#$%^&*()", expectedValid: false, expectedError: "solo símbolos" },

    // 26. Repetición excesiva de caracteres
    { name: "Char repetition", input: "Hoooooooooola mundo como estas esto es una prueba de longitud", expectedValid: false, expectedError: "repetición excesiva de caracteres" },

    // 27. Repetición de palabras
    { name: "Word repetition", input: "test test test test test test palabra palabra palabra palabra palabra", expectedValid: false, expectedError: "repetición excesiva de palabras" },

    // 29. Mayúsculas excesivas (>50%)
    { name: "Excessive caps", input: "HOLA MUNDO COMO ESTAS TODO BIEN ESTO ES MAYUSCULAS relleno para llegar", expectedValid: false, expectedError: "exceso de mayúsculas" },

    // 40. Secuencias de teclado
    { name: "Keyboard sequence", input: "asdfghjkl qwertyuiop zxcvbnm esto es un texto de relleno para validar", expectedValid: false, expectedError: "secuencia de teclado" },

    // 51. Presencia de verbos (Heuristic)
    { name: "No verbs", input: "mesa silla gato perro casa arbol libro ventana puerta pared techo piso", expectedValid: false, expectedError: "carecer de verbos" },

    // 64. Lenguaje infantil - Onomatopeyas
    { name: "Onomatopoeia", input: "El coche hizo pum y luego crash contra el muro de la casa", expectedValid: false, expectedError: "lenguaje infantil" },

    // 65. Lenguaje infantil - Repeticiones
    { name: "Childish repeats", input: "ja ja ja que risa me da esto es una prueba mas larga", expectedValid: false, expectedError: "risa o repetición infantil" },

    // 73. Texto placeholder
    { name: "Placeholder text", input: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod", expectedValid: false, expectedError: "texto de relleno" },

    // Valid Case
    {
        name: "Valid text",
        input: "Esta es una historia válida que tiene suficiente longitud y palabras correctas para pasar la validación sin problemas.",
        expectedValid: true
    }
];

export function runTests(): string[] {
    const logs: string[] = [];
    logs.push("Running validations tests...");
    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = validateText(test.input);
        const isValidMatch = result.isValid === test.expectedValid;
        const errorMatch = test.expectedValid
            ? true
            : (result.error && test.expectedError && result.error.toLowerCase().includes(test.expectedError.toLowerCase()));

        if (isValidMatch && errorMatch) {
            logs.push(`✅ Test ${index + 1}: ${test.name} PASSED ${test.input}`);
            passed++;
        } else {
            logs.push(`❌ Test ${index + 1}: ${test.name} FAILED ${test.input}`);
            logs.push(`   Expected: valid=${test.expectedValid}, error~="${test.expectedError}"`);
            logs.push(`   Got: valid=${result.isValid}, error="${result.error}"`);
            failed++;
        }
    });

    logs.push(`\nResults: ${passed} passed, ${failed} failed.`);
    return logs;
}
