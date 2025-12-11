// Script de prueba rápida para Cohere API
require('dotenv').config();
const { CohereClientV2 } = require('cohere-ai');

async function testCohere() {
  console.log('🧪 Probando conexión con Cohere API...\n');
  
  const apiKey = process.env.COHERE_API_KEY;
  
  if (!apiKey) {
    console.error('❌ COHERE_API_KEY no está configurada en .env');
    process.exit(1);
  }
  
  console.log('✅ API Key encontrada:', apiKey.substring(0, 10) + '...\n');
  
  try {
    const cohere = new CohereClientV2({ token: apiKey });
    
    console.log('📝 Generando historia de prueba...\n');
    
    const model = process.env.COHERE_MODEL || 'command-r7b-12-2024';
    console.log('🤖 Usando modelo:', model, '\n');
    
    const response = await cohere.chat({
      model: model,
      messages: [
        {
          role: 'user',
          content: 'Genera una historia inspiracional corta (50 palabras) sobre un emprendedor que supera obstáculos.'
        }
      ],
      temperature: 0.7,
      maxTokens: 200
    });
    
    const text = response.message?.content?.[0]?.text || '';
    
    if (text) {
      console.log('✅ Historia generada exitosamente:\n');
      console.log('─'.repeat(60));
      console.log(text);
      console.log('─'.repeat(60));
      console.log('\n✅ Cohere API funciona correctamente!');
    } else {
      console.error('❌ No se recibió texto en la respuesta');
      console.log('Respuesta completa:', JSON.stringify(response, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error al conectar con Cohere API:');
    console.error(error.message);
    
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
    
    if (error.body) {
      console.error('Body:', JSON.stringify(error.body, null, 2));
    }
    
    process.exit(1);
  }
}

testCohere();
