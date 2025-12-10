export function bufferToBase64(buffer: Buffer): string {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('Input must be a Buffer');
  }
  return buffer.toString('base64');
}

export function base64ToBuffer(base64: string): Buffer {
  if (typeof base64 !== 'string') {
    throw new Error('Input must be a string');
  }
  return Buffer.from(base64, 'base64');
}

export function validateBuffer(buffer: unknown): buffer is Buffer {
  return Buffer.isBuffer(buffer) && buffer.length > 0;
}
