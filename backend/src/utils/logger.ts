export function logInfo(message: string): void {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

export function logError(message: string, error?: unknown): void {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  if (error) {
    console.error(error);
  }
}

export function logWarning(message: string): void {
  console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
}
