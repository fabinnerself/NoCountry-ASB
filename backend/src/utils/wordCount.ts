export function countWords(text: string): number {
  if (!text || text.trim().length === 0) {
    return 0;
  }

  // Remove emojis and split by whitespace
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const textWithoutEmojis = text.replace(emojiRegex, '').trim();
  
  const words = textWithoutEmojis.split(/\s+/).filter(word => word.length > 0);
  return words.length;
}
