
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Wheel } from './components/Wheel';
import { PrizeModal } from './components/PrizeModal';
import { PRIZES } from './constants';
import { AppStatus, Prize } from './types';
import { getFortuneMessage } from './services/geminiService';

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [winningPrize, setWinningPrize] = useState<Prize | null>(null);
  const [fortune, setFortune] = useState<string | null>(null);
  const [particles, setParticles] = useState<any[]>([]);
  const [hasSpun, setHasSpun] = useState<boolean>(false);
  
  const currentRotation = useRef(0);

  // Check if user has already spun on mount
  useEffect(() => {
    const savedSpinState = localStorage.getItem('armani_spin_used');
    if (savedSpinState === 'true') {
      setHasSpun(true);
    }

    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 5}s`,
      size: `${Math.random() * 4 + 2}px`
    }));
    setParticles(newParticles);
  }, []);

  const handleSpin = useCallback(async () => {
    // Prevent spin if already spinning or if already used
    if (status === AppStatus.SPINNING || hasSpun) return;

    setStatus(AppStatus.SPINNING);
    setWinningPrize(null);
    setFortune(null);

    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const prize = PRIZES[prizeIndex];
    
    const segmentAngle = 360 / PRIZES.length;
    const stopAt = 360 - (prizeIndex * segmentAngle + segmentAngle / 2);
    
    // Extra cinematic spins for high tension
    const extraSpins = 12 + Math.floor(Math.random() * 6); 
    const totalNewRotation = currentRotation.current + (extraSpins * 360) + stopAt;
    
    setRotation(totalNewRotation);
    currentRotation.current = totalNewRotation;

    const fortunePromise = getFortuneMessage(`Armani Privilege Voucher ${prize.label}`);

    setTimeout(async () => {
      const fetchedFortune = await fortunePromise;
      setWinningPrize(prize);
      setFortune(fetchedFortune);
      setStatus(AppStatus.WINNER);
      
      // Persist that the spin has been used
      setHasSpun(true);
      localStorage.setItem('armani_spin_used', 'true');
    }, 8500);
  }, [status, hasSpun]);

  const closeModal = () => {
    setStatus(AppStatus.IDLE);
    setWinningPrize(null);
    setFortune(null);
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-between py-8 px-6 armani-gradient relative overflow-hidden">
      {/* Gold Leaf Particles */}
      {particles.map(p => (
        <div 
          key={p.id}
          className="gold-leaf"
          style={{
            left: p.left,
            bottom: '-20px',
            width: p.size,
            height: p.size,
            '--duration': p.duration,
            animationDelay: p.delay,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          } as any}
        />
      ))}

      {/* Cinematic Overlays */}
      <div className="flare-overlay"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-[0.1] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none"></div>

      {/* Luxury Framing */}
      <div className="absolute inset-4 border-[0.5px] border-[#cfa24d]/20 rounded-[30px] pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
      
      {/* Header Section */}
      <header className="w-full flex flex-col items-center z-20 flex-shrink-0 animate-[scaleInLux_1.5s_ease-out]">
        <div className="flex items-center gap-6 mb-6 opacity-80">
          <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent via-[#cfa24d] to-transparent"></div>
          <span className="text-[#f3e29f] font-montserrat uppercase tracking-[0.5em] text-[9px] font-bold whitespace-nowrap">
            Exclusive Event
          </span>
          <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent via-[#cfa24d] to-transparent"></div>
        </div>
        
        <h1 className="font-bodoni text-5xl font-light tracking-[0.2em] text-[#f3e29f] mb-4 uppercase text-center gold-shine drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
          GIORGIO ARMANI
        </h1>
        
        <p className="text-[#f3e29f]/90 text-center max-w-[320px] font-garamond italic text-xl leading-relaxed opacity-0 animate-[scaleInLux_1s_ease-out_0.5s_forwards]">
          {hasSpun && status !== AppStatus.SPINNING 
            ? "Anda telah menggunakan kesempatan spin Anda hari ini."
            : "Silakan melakukan SPIN untuk mengetahui hadiah yang Anda peroleh."}
        </p>
      </header>

      {/* Main Wheel Container */}
      <main className="flex-1 w-full flex flex-col items-center justify-center z-20 overflow-hidden py-4 opacity-0 animate-[scaleInLux_1.2s_ease-out_0.8s_forwards]">
        <div className="relative transform scale-[0.8] sm:scale-100 transition-all duration-1000">
           <Wheel prizes={PRIZES} rotation={rotation} isSpinning={status === AppStatus.SPINNING} />
           
           {/* Sophisticated Glow Ring */}
           <div className={`absolute inset-[-80px] border-[0.5px] border-[#cfa24d]/10 rounded-full -z-10 ${status === AppStatus.SPINNING ? 'animate-[spin_15s_linear_infinite]' : ''}`}></div>
           <div className="absolute inset-[-40px] bg-[#cfa24d]/5 blur-[120px] rounded-full -z-20"></div>
        </div>
      </main>

      {/* Action Footer */}
      <section className="w-full flex flex-col items-center gap-8 z-20 flex-shrink-0 pb-12 opacity-0 animate-[scaleInLux_1s_ease-out_1.2s_forwards]">
        <button
          onClick={handleSpin}
          disabled={status === AppStatus.SPINNING || hasSpun}
          className={`
            relative w-full max-w-[280px] py-5 rounded-full font-montserrat text-[12px] tracking-[0.5em] transition-all duration-700 overflow-hidden group
            ${status === AppStatus.SPINNING || hasSpun
              ? 'bg-[#050807] text-[#cfa24d]/30 cursor-not-allowed border border-[#cfa24d]/10 opacity-70 scale-95' 
              : 'bg-gradient-to-b from-[#f3e29f] via-[#cfa24d] to-[#8a6d3b] text-[#030706] font-bold shadow-[0_20px_40px_rgba(0,0,0,0.6),0_5px_15px_rgba(207,162,77,0.3)] hover:shadow-[0_30px_60px_rgba(207,162,77,0.4)] active:scale-95'}
          `}
        >
          <span className="relative z-10 flex items-center justify-center pl-[0.5em]">
            {status === AppStatus.SPINNING 
              ? 'MANIFESTING...' 
              : hasSpun 
                ? 'SPIN TELAH DIGUNAKAN' 
                : 'PUTAR SEKARANG'}
          </span>
          {status !== AppStatus.SPINNING && !hasSpun && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-[100px] h-full -skew-x-[30deg] translate-x-[-200px] animate-[sweep-shimmer_3s_infinite_ease-in-out]"></div>
          )}
          {/* Subtle permanent highlight */}
          <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="h-[0.5px] w-40 bg-gradient-to-r from-transparent via-[#cfa24d]/30 to-transparent"></div>
          <p className="text-[#cfa24d]/50 font-montserrat text-[8px] uppercase tracking-[1.2em] text-center pl-[1.2em]">
            GIORGIO ARMANI &bull; MILANO
          </p>
        </div>
      </section>

      {/* Winner Overlay Modal */}
      {status === AppStatus.WINNER && winningPrize && (
        <PrizeModal 
          prize={winningPrize} 
          fortune={fortune} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default App;
