import { ValidTone, ValidFormat } from '../../src/constants/validation';

export const validTestData = {
  tone: 'INSPIRACIONAL' as ValidTone,
  format: 'REDES_SOCIALES' as ValidFormat,
  text: 'Una joven emprendedora superó todos los obstáculos para crear su empresa',
  imageCaptions: [
    'Mujer joven con laptop en entorno moderno',
    'Espacio de trabajo creativo',
    'Productos artesanales sobre mesa',
  ],
};

export const mockImageBuffer = Buffer.from('fake-image-data', 'utf-8');

export const mockGeneratedStory = `En una pequeña comunidad rural, María transformó su pasión por la artesanía tradicional en una verdadera oportunidad de negocio global. Con determinación inquebrantable, superó enormes barreras de conectividad y recursos tecnológicos limitados que enfrentaba diariamente. Hoy sus hermosos productos artesanales llegan exitosamente a cinco continentes diferentes, inspirando profundamente a otros emprendedores emergentes. Su increíble historia personal demuestra claramente que los límites aparentes son solo el comienzo emocionante de algo realmente extraordinario e inspirador. Únete ahora a esta revolución digital transformadora y comparte tu propia historia única con el mundo entero.`;
