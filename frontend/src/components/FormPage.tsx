import { useState, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import svgPaths from "../imports/svg-pkvk548t6z";
import { Edit, RefreshCcw, Download } from "lucide-react";

export function FormPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [textContent, setTextContent] = useState("");
  const [tone, setTone] = useState("profesional");
  const [format, setFormat] = useState("historia");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(
        `Contenido generado con tono ${tone} en formato de ${format}:\n\n${textContent}\n\nArchivos adjuntos: ${files.length}`
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleExport = () => {
    // Simulate export
    alert("Exportando contenido...");
  };

  const handleEdit = () => {
    // Allow editing of generated content
    const newContent = prompt("Editar contenido:", generatedContent);
    if (newContent) {
      setGeneratedContent(newContent);
    }
  };

  const handleRetry = () => {
    handleGenerate();
  };

  const scrollToSection = (sectionId: string) => {
    window.location.href = `/#${sectionId}`;
  };

  return (
    <div id="formHeader" className="bg-slate-200 min-h-screen w-full">
      <Header onNavigate={scrollToSection} />

      <div className="pt-[120px] lg:pt-[180px] px-4 md:px-8 lg:px-[84px] pb-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Title */}
          <h1 className="font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-black text-center mb-8">
            CREA TU HISTORIA VISUAL EN 3 PASOS
          </h1>

          <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-black text-center mb-12 max-w-[920px] mx-auto">
            Sube tu contendo. Elige tu tono, ingresa tu texto y carga tu imagen. La IA hace el resto. Sin experiencia necesaria.
          </p>

          {/* Multimedia Upload Area */}
          <h2 className="font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-black mb-6">
            ÁREA DE CARGA MULTIMEDIA
          </h2>

          <div
            className={`bg-[#1e1e1e] rounded-[15px] p-8 mb-6 min-h-[312px] flex flex-col items-center justify-center border-2 border-dashed transition-colors ${isDragging ? "border-emerald-500 bg-[#2a2a2a]" : "border-transparent"
              }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="text-center">
              <div className="w-[62px] h-[62px] mx-auto mb-4 opacity-20">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 62">
                  <path d={svgPaths.p24522900} fill="#E7E0EC" />
                </svg>
              </div>

              <p className="font-['Julius_Sans_One',sans-serif] text-[24px] md:text-[32px] text-[#3f3f3f] text-center mb-2">
                arrastra tus archivos aquí
              </p>
              <p className="font-['Julius_Sans_One',sans-serif] text-[24px] md:text-[32px] text-[#3f3f3f] text-center mb-4">
                o haz clic para buscar en tu dispositivo
              </p>

              <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-[#3f3f3f] text-center">
                Soporte: JPG, PNG, WEBP, videos, testimonios &lt; 50 MB
              </p>

              {files.length > 0 && (
                <div className="mt-4">
                  <p className="text-emerald-500 text-[18px]">
                    {files.length} archivo(s) seleccionado(s)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Text Input Area */}
          <div className="bg-[#1e1e1e] rounded-[15px] p-8 mb-6 min-h-[179px]">
            <div className="w-[62px] h-[62px] mx-auto mb-4 opacity-20">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 62">
                <path d={svgPaths.p1a0de900} fill="#E7E0EC" />
              </svg>
            </div>

            <p className="font-['Julius_Sans_One',sans-serif] text-[24px] md:text-[32px] text-[#3f3f3f] text-center mb-4">
              ingresa texto
            </p>

            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              maxLength={500}
              placeholder="Escribe aquí tu contenido..."
              className="w-full min-h-[100px] bg-white/10 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <p className="font-['Inter',sans-serif] text-[20px] md:text-[24px] text-[#3f3f3f] text-center mt-2">
              Límites de caracteres: {textContent.length}/500
            </p>
          </div>

          {/* Tone and Format Selectors */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <div className="relative">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="bg-[#041f59] rounded-[15px] px-6 py-5 font-['Julius_Sans_One',sans-serif] text-[20px] text-white appearance-none pr-12 cursor-pointer w-full md:w-[262px]"
              >
                <option value="INSPIRACIONAL">INSPIRACIONAL</option>
                <option value="EDUCATIVO">EDUCATIVO</option>
                <option value="TÉCNICO">TÉCNICO</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-[33px] h-[33px]" fill="none" viewBox="0 0 33 33">
                  <path d={svgPaths.p1c099c00} fill="#FEF7FF" />
                </svg>
              </div>
              <p className="font-['Julius_Sans_One',sans-serif] text-[14px] text-slate-800 text-center mt-2">
                TONO NARRATIVO
              </p>
            </div>

            <div className="relative">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="bg-[#041f59] rounded-[15px] px-6 py-5 font-['Julius_Sans_One',sans-serif] text-[20px] text-white appearance-none pr-12 cursor-pointer w-full md:w-[348px]"
              >
                <option value="HISTORIA">HISTORIA</option>
                <option value="POST">POST</option>
                <option value="REDES SOCIALES">REDES SOCIALES</option>
                <option value="OTRO">OTRO</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-[33px] h-[33px]" fill="none" viewBox="0 0 33 33">
                  <path d={svgPaths.p1c099c00} fill="#FEF7FF" />
                </svg>
              </div>
              <p className="font-['Julius_Sans_One',sans-serif] text-[14px] text-slate-800 text-center mt-2">
                Formato comunicacional
              </p>
            </div>
          </div>

          {/* Create Button */}
          <div className="flex justify-center mb-12">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || (!files.length && !textContent)}
              className="bg-[#041f59] rounded-[15px] px-16 py-6 font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-white hover:bg-[#062a7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generando..." : "Crear"}
            </button>
          </div>

          {/* Result Area */}
          {generatedContent && (
            <div className="mb-8">
              <div className="bg-[#d9d9d9] rounded-[15px] p-8 min-h-[453px] mb-4">
                <p className="whitespace-pre-wrap text-[18px]">{generatedContent}</p>
              </div>

              {/* Edit and Retry Links */}
              <div className="flex justify-between items-center mb-6 max-w-[1250px] mx-auto">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <Edit className="w-[48px] h-[48px]" strokeWidth={1.5} />
                  <span className="font-['Inter',sans-serif] text-[24px]">Editar</span>
                </button>

                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <RefreshCcw className="w-[48px] h-[48px]" strokeWidth={1.5} />
                  <span className="font-['Inter',sans-serif] text-[24px]">Reintentar</span>
                </button>
              </div>

              {/* Export Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleExport}
                  className="bg-[#041f59] rounded-[15px] px-16 py-6 font-['Julius_Sans_One',sans-serif] text-[32px] md:text-[40px] text-white hover:bg-[#062a7a] transition-colors flex items-center gap-4"
                >
                  EXPORTAR
                  <Download className="w-[62px] h-[62px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}