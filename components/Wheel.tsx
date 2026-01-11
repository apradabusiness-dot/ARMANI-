
import React, { useMemo } from 'react';
import { Prize } from '../types';
import { GOLD_PRIMARY, GOLD_SECONDARY } from '../constants';

interface WheelProps {
  prizes: Prize[];
  rotation: number;
  isSpinning: boolean;
}

export const Wheel: React.FC<WheelProps> = ({ prizes, rotation, isSpinning }) => {
  const size = 600;
  const center = size / 2;
  const radius = center - 50;
  const segmentAngle = 360 / prizes.length;

  const segments = useMemo(() => {
    return prizes.map((prize, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
      const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
      const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
      const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
      const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);

      const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
      const isDark = prize.color === '#111111' || prize.color === '#d99a89';
      
      // Calculate responsive font size based on text length
      const fontSize = prize.label.length > 4 ? '26px' : '32px';
      
      return (
        <g key={prize.id}>
          <defs>
            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={prize.color} />
              <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
            </linearGradient>
            <filter id={`inset-shadow-${index}`}>
                <feOffset dx="0" dy="2" />
                <feGaussianBlur stdDeviation="3" result="offset-blur" />
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                <feFlood floodColor="black" floodOpacity="0.4" result="color" />
                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <path
            d={path}
            fill={`url(#grad-${index})`}
            stroke="rgba(207,162,77,0.3)"
            strokeWidth="1.5"
            filter={`url(#inset-shadow-${index})`}
          />
          <g transform={`rotate(${startAngle + segmentAngle / 2}, ${center}, ${center})`}>
            {/* VOUCHER Label - Positioned closer to the rim for more width */}
            <text
              x={center}
              y={center - radius * 0.82}
              fill={isDark ? '#f3e29f' : '#888'}
              className="font-montserrat font-bold tracking-[0.4em]"
              textAnchor="middle"
              style={{ fontSize: '8px', textTransform: 'uppercase', opacity: 0.8 }}
            >
              Voucher
            </text>
            {/* Amount Label - Positioned optimally and size adjusted */}
            <text
              x={center}
              y={center - radius * 0.65}
              fill={isDark ? '#fff' : '#000'}
              className="font-bodoni font-bold italic"
              textAnchor="middle"
              style={{ 
                fontSize: fontSize, 
                letterSpacing: '-1px', 
                filter: isDark ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.8))' : 'none' 
              }}
            >
              {prize.label}
            </text>
          </g>
        </g>
      );
    });
  }, [prizes, radius, center, segmentAngle]);

  const studs = useMemo(() => {
    return Array.from({ length: 72 }).map((_, i) => {
      const angle = (i * 360) / 72;
      const r = radius + 28;
      const x = center + r * Math.cos((Math.PI * angle) / 180);
      const y = center + r * Math.sin((Math.PI * angle) / 180);
      const isMajor = i % 8 === 0;
      return (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={isMajor ? "4" : "1.8"}
            fill={isMajor ? "url(#brushedGoldLux)" : GOLD_PRIMARY}
            style={{ 
              filter: isMajor ? 'drop-shadow(0 0 10px rgba(243, 226, 159, 0.6))' : 'none',
              opacity: isMajor ? 1 : 0.4 
            }}
          />
        </g>
      );
    });
  }, [radius, center]);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[500px] aspect-square mx-auto">
      {/* Precision Needle / Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 z-30 w-12 h-20 flex flex-col items-center">
         <div className="w-8 h-12 bg-gradient-to-b from-[#b91c1c] via-[#7f1d1d] to-[#450a0a] border-[1.5px] border-[#f3e29f] shadow-[0_12px_25px_rgba(0,0,0,0.8)]" 
              style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}>
         </div>
         <div className="w-3 h-3 rounded-full bg-gradient-to-b from-[#fff] to-[#cfa24d] mt-[-6px] shadow-[0_0_15px_#f3e29f] z-10 border border-black/20"></div>
      </div>

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full drop-shadow-[0_40px_100px_rgba(0,0,0,0.95)]"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 8.5s cubic-bezier(0.1, 0, 0, 1)' : 'none',
        }}
      >
        <defs>
          <linearGradient id="brushedGoldLux" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d3a1d" />
            <stop offset="15%" stopColor="#f3e29f" />
            <stop offset="30%" stopColor="#8a6d3b" />
            <stop offset="50%" stopColor="#fffce6" />
            <stop offset="70%" stopColor="#cfa24d" />
            <stop offset="85%" stopColor="#f3e29f" />
            <stop offset="100%" stopColor="#4d3a1d" />
          </linearGradient>

          <radialGradient id="glassReflection" cx="30%" cy="30%" r="70%">
             <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
             <stop offset="50%" stopColor="#fff" stopOpacity="0.02" />
             <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="hubDeep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a2e26" />
            <stop offset="100%" stopColor="#030706" />
          </radialGradient>
        </defs>

        {/* Outer Deep Foundation */}
        <circle cx={center} cy={center} r={radius + 48} fill="#010302" />
        
        {/* Main Bezel - High Detail */}
        <circle cx={center} cy={center} r={radius + 42} fill="url(#brushedGoldLux)" />
        <circle cx={center} cy={center} r={radius + 38} fill="#050a08" />
        <circle cx={center} cy={center} r={radius + 36} fill="none" stroke="#cfa24d" strokeWidth="0.5" opacity="0.3" />
        
        {/* The Wheel Surface */}
        <circle cx={center} cy={center} r={radius + 15} fill="#030706" stroke="#cfa24d" strokeWidth="1" />
        
        {segments}
        {studs}

        {/* Sapphire Crystal Reflection */}
        <circle cx={center} cy={center} r={radius} fill="url(#glassReflection)" pointerEvents="none" />

        {/* Center Hub - Minimalist & Polished */}
        <circle cx={center} cy={center} r="70" fill="url(#brushedGoldLux)" shadow="0 10px 20px black" />
        <circle cx={center} cy={center} r="65" fill="url(#hubDeep)" />
        
        {/* Delicate inner rings */}
        <circle cx={center} cy={center} r="25" fill="none" stroke="#f3e29f" strokeWidth="0.8" opacity="0.5" />
        <circle cx={center} cy={center} r="20" fill="#000" />
        <circle cx={center} cy={center} r="8" fill="#cfa24d" />
      </svg>
    </div>
  );
};
