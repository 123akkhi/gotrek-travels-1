import React, { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { X, Shirt, Sparkles, ShieldCheck, Footprints, Zap, AlertCircle, FileCheck, PhoneCall } from 'lucide-react';

interface WhatToWearModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatToWearModal: React.FC<WhatToWearModalProps> = ({ isOpen, onClose }) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[170] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl my-auto bg-white border border-[#E6E2D3] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] smooth-scroll-y crisp-dialog"
      >
        {/* Header */}
        <div 
          className="p-4 sm:p-5 bg-gradient-to-r from-[#1E293B] to-[#5A5A40] text-white flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-amber-400/20 text-amber-300">
              <Shirt size={22} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                GoTrek Official Gear & Medical Guide
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold">
                High Altitude Clothing & What to Wear Guide
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-xs bg-[#FDFBF7]">
          {/* Temperature Guide Box */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-[#1E293B] space-y-2">
            <h4 className="font-serif font-bold text-sm text-amber-950 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-700" />
              <span>Vyas Valley Temperature Chart (10,500 ft to 14,500 ft)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <div className="font-bold text-amber-900">May - June</div>
                <div>Day: 8°C to 15°C</div>
                <div className="text-rose-800 font-bold">Night: -2°C to 4°C</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <div className="font-bold text-amber-900">Sept - Oct</div>
                <div>Day: 5°C to 12°C</div>
                <div className="text-rose-800 font-bold">Night: -5°C to 2°C</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <div className="font-bold text-amber-900">Wind Factor</div>
                <div>High wind chill at Jolingkong & Nabhidhang</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <div className="font-bold text-amber-900">Sun Factor</div>
                <div>Extreme UV Index above 12,000 ft</div>
              </div>
            </div>
          </div>

          {/* 3-Layer System */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1E293B] flex items-center gap-2 border-b border-[#E6E2D3] pb-2">
              <Shirt size={18} className="text-amber-800" />
              <span>1. The Mandatory 3-Layer Clothing Protocol</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E6E2D3] space-y-1.5">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">Layer 1: Base</span>
                <div className="font-serif font-bold text-[#1E293B]">Thermal Underwear</div>
                <p className="text-[#5A5A40] text-[11px]">
                  Merino wool or synthetic heat-tech top & bottom. Keeps sweat away from body. 2 full sets required.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E6E2D3] space-y-1.5">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">Layer 2: Mid</span>
                <div className="font-serif font-bold text-[#1E293B]">Fleece / Heavy Sweater</div>
                <p className="text-[#5A5A40] text-[11px]">
                  Traps body heat inside. 1 fleece jacket for daytime drives & village homestays.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E6E2D3] space-y-1.5">
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-bold">Layer 3: Outer</span>
                <div className="font-serif font-bold text-[#1E293B]">Feather Down Jacket</div>
                <p className="text-[#5A5A40] text-[11px]">
                  Heavy hooded puffer jacket rated for -10°C. Blocks freezing mountain winds at Om Parvat sunrise.
                </p>
              </div>
            </div>
          </div>

          {/* Footwear & Headgear */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E6E2D3] space-y-2">
              <h5 className="font-serif font-bold text-sm text-[#1E293B] flex items-center gap-1.5">
                <Footprints size={16} className="text-amber-800" />
                <span>Footwear & Socks</span>
              </h5>
              <ul className="space-y-1.5 text-[#5A5A40] text-[11px]">
                <li>• <strong>Waterproof High-Ankle Trekking Shoes:</strong> Sturdy rubber soles (Quechua / Wildcraft / Columbia).</li>
                <li>• <strong>4 Pairs Heavy Woolen Socks:</strong> Essential for sub-zero nights in Nabi/Gunji.</li>
                <li>• <strong>Camp Slippers:</strong> For easy indoor homestay use.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E6E2D3] space-y-2">
              <h5 className="font-serif font-bold text-sm text-[#1E293B] flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-800" />
                <span>Extremities Protection</span>
              </h5>
              <ul className="space-y-1.5 text-[#5A5A40] text-[11px]">
                <li>• <strong>Thermal Balaclava:</strong> Covers head, ears, and neck.</li>
                <li>• <strong>Fleece & Waterproof Gloves:</strong> 1 inner fleece + 1 outer windproof glove.</li>
                <li>• <strong>UV Polarized Sunglasses:</strong> Prevents snow glare & UV eye strain.</li>
              </ul>
            </div>
          </div>

          {/* Electronics & Power */}
          <div className="p-5 rounded-2xl bg-white border border-[#E6E2D3] space-y-2">
            <h5 className="font-serif font-bold text-sm text-[#1E293B] flex items-center gap-1.5">
              <Zap size={16} className="text-amber-800" />
              <span>Power, Flask & Medical Kit</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#5A5A40]">
              <div className="p-2.5 rounded-xl bg-[#F5F2ED]">
                <strong className="text-[#1E293B]">20,000 mAh Power Bank:</strong> Batteries drop fast in sub-zero cold.
              </div>
              <div className="p-2.5 rounded-xl bg-[#F5F2ED]">
                <strong className="text-[#1E293B]">1L Stainless Steel Thermos Flask:</strong> Drink warm water continuously.
              </div>
              <div className="p-2.5 rounded-xl bg-[#F5F2ED]">
                <strong className="text-[#1E293B]">Personal Meds & Diamox:</strong> Consult doctor for altitude prep.
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#1E293B] hover:bg-[#5A5A40] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhatToWearModal;
