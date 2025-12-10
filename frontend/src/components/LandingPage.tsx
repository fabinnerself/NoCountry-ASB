import { Header } from "./Header";
import { Footer } from "./Footer";
import { FAQItem } from "./FAQItem";



export function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqs = [
    {
      question: "🤖 ¿Qué tipo de IA utiliza AutoStory Builder y cómo garantiza la calidad del contenido?",
      answer: (
        <div>
          <p className="mb-2">Utilizamos un sistema RAG (Retrieval-Augmented Generation) que combina modelos multimodales para análisis de imágenes (CLIP) y modelos de lenguaje avanzados (LLaMA 3/Groq) para generación de texto.</p>
          <p className="mb-2">Nuestro sistema:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>✅ Analiza el contexto visual y emocional de tus imágenes</li>
            <li>✅ Aplica reglas de estilo según el tono seleccionado</li>
            <li>✅ Genera narrativas coherentes basadas en mejores prácticas de storytelling</li>
            <li>✅ Aprendemos continuamente de ejemplos de alta calidad</li>
          </ul>
        </div>
      )
    },
    {
      question: "📸 ¿Qué formatos de archivo soporta y hay límites de tamaño?",
      answer: (
        <div>
          <p className="mb-2">Formatos aceptados:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>✅ Imágenes: JPG, PNG, WEBP (hasta 50MB)</li>
            <li>✅ Texto: Cualquier testimonio o descripción escrita</li>
            <li>✅ Próximamente: Videos cortos y documentos PDF</li>
          </ul>
        </div>
      )
    },
    {
      question: "🔒 ¿Cómo protegen mi privacidad y los derechos sobre el contenido generado?",
      answer: (
        <div>
          <p className="mb-2">Tu privacidad es prioridad:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>✅ Tus archivos se procesan de forma segura y no se comparten con terceros</li>
            <li>✅ El contenido generado es 100% tuyo - sin restricciones de uso</li>
            <li>✅ No almacenamos tus imágenes después del procesamiento</li>
            <li>✅ Cumplimos con regulaciones de protección de datos</li>
            <li>✅ Por el momento operamos en modo guest - sin necesidad de crear cuenta</li>
          </ul>
        </div>
      )
    },
    {
      question: "⚡ ¿Cuánto tiempo toma generar una historia y puedo editarla después?",
      answer: (
        <div>
          <p className="mb-2">Tiempos aproximados:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>✅ Procesamiento básico: 2-4 segundos</li>
            <li>✅ Generación completa de historia: 6-10 segundos</li>
            <li>✅ Exportación: 3-5 segundos adicionales</li>
          </ul>
        </div>
      )
    },
    {
      question: "💰 ¿Es realmente gratuito? ¿Qué incluye la versión actual?",
      answer: (
        <div>
          <p className="mb-2">Sí, completamente gratuito en esta versión MVP:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>✅ Procesamiento ilimitado de imágenes y texto</li>
            <li>✅ 3 tonos narrativos (inspiracional funcional + educativos/técnicos como preview)</li>
            <li>✅ Exportación a PNG y PDF</li>
            <li>✅ Edición y previsualización en tiempo real</li>
            <li>✅ Almacenamiento temporal en tu navegador</li>
          </ul>
          <p className="mb-2">Próximas funciones en desarrollo:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>🔄 Autenticación y historial permanente</li>
            <li>🔄 Más tonos y plantillas personalizables</li>
            <li>🔄 Integración con redes sociales</li>
            <li>🔄 Análisis de video</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-200 min-h-screen w-full">
      <Header onNavigate={scrollToSection} />

      {/* Hero Section */}
      <section id="inicio" className="pt-[120px] lg:pt-[150px] px-4 md:px-8 lg:px-[89px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16">
            <div className="flex flex-col gap-6">
              <h1 className="font-['Julius_Sans_One',sans-serif] text-[40px] md:text-[54px] lg:text-[64px] text-slate-800 leading-tight">
                Crea contenido de valor en tres pasos
              </h1>
              <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800">
                Simplifica la producción de contenido. Subí imágenes, textos, testimonios para crear contenido para redes
              </p>
              <a
                href="/form#formHeader"
                className="bg-[#041f59] rounded-[15px] px-8 py-4 inline-flex items-center justify-center hover:bg-[#062a7a] transition-colors w-fit"
              >
                <span className="font-['Julius_Sans_One',sans-serif] text-[24px] text-white">
                  crear contenido
                </span>
              </a>
            </div>
            <div className="w-full h-[400px] lg:h-[438px]">
              <img
                src="/hero.png"
                alt="Hero"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-[320px] mx-auto h-[1px] bg-[#1E293B] my-8"></div>

      {/* How It Works Section */}
      <section id="como-funciona" className="px-4 md:px-8 lg:px-[89px] py-16">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-slate-800 mb-12">
            ¿cómo funciona?
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4 md:gap-8 items-start">
              <div className="w-[82px] h-[62px] flex-shrink-0">
                <img src="/num1.png" alt="Upload" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-['Julius_Sans_One',sans-serif] text-[28px] md:text-[32px] text-slate-800 mb-2">
                  sUBE
                </h3>
                <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800">
                  Arrastra imágenes, videos o textos (testimonios, capturas)
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 md:gap-8 items-start">
              <div className="w-[85px] h-[69px] flex-shrink-0">
                <img src="/num2.png" alt="Generate" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-['Julius_Sans_One',sans-serif] text-[28px] md:text-[32px] text-slate-800 mb-2">
                  GENERA
                </h3>
                <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800">
                  Arrastra imágenes, videos o textos (testimonios, capturas)
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 md:gap-8 items-start">
              <div className="w-[83px] h-[70px] flex-shrink-0">
                <img src="/num3.png" alt="Export" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-['Julius_Sans_One',sans-serif] text-[28px] md:text-[32px] text-slate-800 mb-2">
                  EXPORTA
                </h3>
                <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800">
                  Descarga como imagen, PDF o comparte en redes
                </p>
              </div>
            </div>
          </div>

          <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800 mt-8">
            *Para más información{" "}
            <a href="https://www.youtube.com/shorts/Pu8rMTgJnHQ?feature=share" className="underline hover:text-emerald-500 transition-colors" target="_blank">
              ver video
            </a>
            .
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-[320px] mx-auto h-[1px] bg-[#1E293B] my-8"></div>

      {/* Use Cases Section */}
      <section id="casos-uso" className="px-4 md:px-8 lg:px-[89px] py-16">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-slate-800 text-center mb-12">
            casos de uso
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#3f3f3f] rounded-[10px] w-full aspect-[295/538] mb-4 overflow-hidden">
                <img
                  src="/card1.png"
                  alt="Fundaciones"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Inter',sans-serif] text-[24px] text-slate-800 mb-2">
                Fundaciones
              </h3>
              <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800 text-center">
                Convierte testimonios en campañas emocionales.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#3f3f3f] rounded-[10px] w-full aspect-[295/538] mb-4 overflow-hidden">
                <img
                  src="/card2.png"
                  alt="Marca Personal"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Inter',sans-serif] text-[24px] text-slate-800 mb-2">
                Marca Personal
              </h3>
              <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800 text-center">
                Automatiza stories diarios a partir de tus logros.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#3f3f3f] rounded-[10px] w-full aspect-[295/538] mb-4 overflow-hidden">
                <img
                  src="/card3.png"
                  alt="Instituciones"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Inter',sans-serif] text-[24px] text-slate-800 mb-2">
                Instituciones
              </h3>
              <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-slate-800 text-center">
                Genera casos de estudio a partir de evidencias visuales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-[320px] mx-auto h-[1px] bg-[#1E293B] my-8"></div>

      {/* CTA Section */}
      <section id="cta" className="px-4 md:px-8 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-[#041f59] rounded-[10px] px-8 py-16 text-center">
            <h2 className="font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-white mb-4">
              LLAMADA A ACCION
            </h2>
            <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-white mb-8 max-w-[838px] mx-auto">
              Sube tus materiales y deja que la IA haga el resto. Sin experiencia en diseño o redacción.
            </p>
            <a
              href="/form#formHeader"
              className="bg-emerald-500 rounded-[15px] px-12 py-6 inline-flex items-center justify-center hover:bg-emerald-600 transition-colors"
            >
              <span className="font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-white">
                CREAR AHORA →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-[320px] mx-auto h-[1px] bg-[#1E293B] my-8"></div>

      {/* FAQ Section */}
      <section id="faq" className="px-4 md:px-8 lg:px-[89px] py-16">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-black text-center mb-12">
            preguntas frecuentes (FAQs)
          </h2>

          <div className="bg-emerald-500 rounded-[10px] p-8 md:p-12 max-w-[1044px] mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}