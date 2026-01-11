
import React, { useEffect, useState } from 'react';
import { Prize } from '../types';

interface PrizeModalProps {
  prize: Prize;
  fortune: string | null;
  onClose: () => void;
}

export const PrizeModal: React.FC<PrizeModalProps> = ({ prize, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRendered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl transition-opacity duration-1000 ${isRendered ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
      
      {/* Deep Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="w-[1000px] h-[1000px] rounded-full border border-[#cfa24d]/10 vortex-spin" style={{ animationDuration: '40s' }}></div>
          <div className="absolute w-[800px] h-[800px] rounded-full border border-[#cfa24d]/5 vortex-spin" style={{ animationDirection: 'reverse', animationDuration: '60s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={i} 
          className="gold-leaf"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-20px`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            '--duration': `${Math.random() * 4 + 3}s`,
            animationDelay: `${Math.random() * 5}s`,
          } as any}
        />
      ))}

      {/* Luxury Prize Card Container - Responsive optimized */}
      <div className={`relative w-full max-w-[360px] bg-[#030706] border border-[#cfa24d]/40 rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_0_150px_rgba(207,162,77,0.2)] p-1 text-center transition-all duration-1000 transform ${isRendered ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
        
        {/* Patterned Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 pointer-events-none"></div>

        <div className="relative border border-[#cfa24d]/20 rounded-[22px] sm:rounded-[28px] p-6 sm:p-10 flex flex-col items-center">
          
          <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 opacity-60 animate-pulse">
            <div className="h-[0.5px] w-6 sm:w-8 bg-[#cfa24d]"></div>
            <span className="text-[#f3e29f] font-montserrat uppercase tracking-[0.4em] text-[8px] sm:text-[9px] font-bold whitespace-nowrap">
              Armani Reward
            </span>
            <div className="h-[0.5px] w-6 sm:w-8 bg-[#cfa24d]"></div>
          </div>

          {/* Premium Voucher Card - Scaled for Mobile */}
          <div className="relative w-full aspect-[16/10] bg-[#000] border border-[#cfa24d]/60 rounded-xl p-6 sm:p-8 mb-8 sm:mb-12 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,1)] overflow-hidden group">
            {/* Moving Gold Foil Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/15 to-transparent w-[300%] h-full -translate-x-[150%] skew-x-[-30deg] animate-[sweep-shimmer_5s_infinite_ease-in-out]"></div>
            
            <div className="absolute inset-3 border-[0.5px] border-[#cfa24d]/30"></div>
            
            <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#cfa24d]/20 border border-[#cfa24d]/40 rounded-full text-[8px] sm:text-[9px] text-[#f3e29f] font-montserrat tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-6 sm:mb-8 z-10 shadow-[0_0_15px_rgba(207,162,77,0.3)]">
              Congratulation
            </div>

            <div className="font-bodoni text-5xl sm:text-6xl font-bold text-[#fff] drop-shadow-[0_10px_15px_rgba(0,0,0,1)] mb-3 sm:mb-4 italic z-10 gold-shine">
              {prize.label}
            </div>

            <div className="flex items-center gap-4 sm:gap-6 w-full max-w-[160px] sm:max-w-[200px] z-10">
              <div className="h-[0.5px] flex-1 bg-[#cfa24d]/50"></div>
              <span className="text-[#cfa24d] font-montserrat uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] font-medium">Voucher</span>
              <div className="h-[0.5px] flex-1 bg-[#cfa24d]/50"></div>
            </div>
          </div>

          <p className="text-[#f3e29f]/90 font-garamond italic text-lg sm:text-xl leading-relaxed mb-8 sm:mb-12 max-w-[280px] sm:max-w-[300px] px-2">
            Selamat atas voucher yang berhasil Anda dapatkan. Silakan simpan bukti ini dan kirimkan kepada mentor pembimbing Anda.
          </p>

          {/* Luxury Action Button - Mobile Height Optimized */}
          <button
            onClick={onClose}
            className="group w-full flex items-center justify-center gap-4 sm:gap-6 py-4 sm:py-6 bg-gradient-to-b from-[#111] to-[#000] border border-[#cfa24d]/50 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] active:scale-95 transition-all duration-700 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[#cfa24d]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border border-[#cfa24d]/40 flex items-center justify-center text-[#f3e29f] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(243,226,159,0.3)] transition-all duration-700 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              </svg>
            </div>
            <div className="flex flex-col items-start leading-none gap-1 sm:gap-2 z-10">
              <span className="text-[#f3e29f] font-montserrat font-bold text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase">Simpan Bukti</span>
              <span className="text-[#f3e29f]/40 font-montserrat text-[8px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.15em] uppercase">Screenshot Confirmation</span>
            </div>
          </button>
        </div>
        
        {/* Footnote accent */}
        <div className="py-3 sm:py-4 bg-black/60 border-t border-[#cfa24d]/20 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]">
          <p className="text-[#cfa24d]/30 font-montserrat text-[7px] tracking-[0.8em] sm:tracking-[1em] uppercase whitespace-nowrap px-4">GIORGIO ARMANI MILANO</p>
        </div>
      </div>
    </div>
  );
};
