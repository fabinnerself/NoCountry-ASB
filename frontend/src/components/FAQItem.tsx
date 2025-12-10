import { useState } from "react";
import svgPaths from "../imports/svg-hp3kjhvs8k";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
      >
        <p className="font-['Julius_Sans_One',sans-serif] text-[32px] text-slate-800 text-left">
          {question}
        </p>
        <div className={`w-[33px] h-[33px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
            <path d={svgPaths.p1c099c00} fill="#1E293B" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="pb-4 pl-4">
          <p className="font-['Inter',sans-serif] text-[20px] text-slate-700">
            {answer}
          </p>
        </div>
      )}

      <div className="h-[1px] w-full bg-[#E7E0EC]"></div>
    </div>
  );
}
