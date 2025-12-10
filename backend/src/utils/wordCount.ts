export function countWords(text: string): number {
  if (!text || typeof text !== 'string') {
    return 0;
  }
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function isWithinWordRange(text: string, min: number, max: number): boolean {
  const count = countWords(text);
  return count >= min && count <= max;
}
