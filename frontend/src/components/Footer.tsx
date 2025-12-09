import imgImgLogo from "figma:asset/66aa22cf11db1271204d7fb2f00a05d9816b7e7a.png";
import imgBtnExt from "figma:asset/790b2daefb33308c894a1f4f4f275a0aca61ccdc.png";
import imgBtnExt1 from "figma:asset/1db5342d61a843b37cb79ee60c9195ed7ce74e59.png";
import imgBtnExt2 from "figma:asset/b6c7ea212af1aeeeae59a3b68d5b86f2725ca577.png";
import imgBtnExt3 from "figma:asset/7e9d540a6809ba8956509d866eabe6e24608ecdc.png";

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      window.location.href = `/#${section}`;
    }
  };

  return (
    <div className="bg-[#041f59] w-full py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and Tagline */}
          <div className="flex flex-col gap-4">
            <div className="h-[171px] w-[419px] max-w-full">
              <img
                alt="AutoStory Builder Logo"
                className="w-full h-full object-contain"
                src="/logo.png"
              />
            </div>
            <p className="font-['Inter',sans-serif] text-[24px] text-white">
              La IA que convierte momentos en historia
            </p>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-['Inter',sans-serif] text-[32px] text-white mb-2">
              Recursos
            </h3>
            <button
              onClick={() => handleNavClick('inicio')}
              className="font-['Inter',sans-serif] text-[24px] text-white text-left hover:text-emerald-500 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('como-funciona')}
              className="font-['Inter',sans-serif] text-[24px] text-white text-left hover:text-emerald-500 transition-colors"
            >
              Como funciona
            </button>

            <button
              onClick={() => handleNavClick('cta')}
              className="font-['Inter',sans-serif] text-[24px] text-white text-left hover:text-emerald-500 transition-colors"
            >
              Llamada a acción
            </button>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-['Inter',sans-serif] text-[32px] text-white mb-2">
              Sigueme en mis redes sociales
            </h3>
            <div className="flex gap-4 flex-wrap">
              {/* WhatsApp */}
              <a href="https://wa.me/+59167023053/?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services." className="social-icon" aria-label="Contáctanos en WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.451 3.488" />
                </svg>
              </a>
              {/* Email */}
              <a href="mailto:fabinnerself@gmail.com?subject=Consulta%20sobre%20tus%20servicios" className="social-icon" aria-label="Envíanos un email" target="_blank" rel="noopener noreferrer">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/favian-medina-gemio/" className="social-icon" aria-label="Síguenos en LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/fabinnerself" className="social-icon" aria-label="Síguenos en Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="https://x.com/favinnerself" className="social-icon" aria-label="Síguenos en X (Twitter)" target="_blank" rel="noopener noreferrer">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#CAC4D0] my-8"></div>

        {/* Copyright */}
        <p className="font-['Inter',sans-serif] text-[24px] text-white text-center">
          © 2025 AutoStory Builder. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}