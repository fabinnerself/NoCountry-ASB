import { VALID_TONES, VALID_FORMATS } from '../constants/validation';
import { VALID_IMAGE_MIMES, MAX_FILE_SIZE } from '../constants/imageFormats';

export function getToneErrorMessage(received: string): string {
  return `Valor de tone no válido: "${received}". Permitidos: ${VALID_TONES.join(', ')}`;
}

export function getFormatErrorMessage(received: string): string {
  return `Valor de format no válido: "${received}". Permitidos: ${VALID_FORMATS.join(', ')}`;
}

export function getTextErrorMessage(length: number): string {
  if (length < 20) {
    return `Text debe tener al menos 20 caracteres. Recibido: ${length}`;
  }
  if (length > 1000) {
    return `Text no debe exceder 1000 caracteres. Recibido: ${length}`;
  }
  return 'Text no cumple con los requisitos de longitud';
}

export function getImageErrorMessage(error: string): string {
  return `Error procesando imagen: ${error}`;
}

export function getFileSizeErrorMessage(sizeBytes: number): string {
  const sizeMB = (sizeBytes / 1024 / 1024).toFixed(2);
  const maxMB = (MAX_FILE_SIZE / 1024 / 1024).toFixed(0);
  return `Archivo excede tamaño máximo de ${maxMB} MB. Recibido: ${sizeMB} MB`;
}

export function getFileTypeErrorMessage(received: string): string {
  return `Tipo de archivo no válido: "${received}". Permitidos: ${VALID_IMAGE_MIMES.join(', ')}`;
}
