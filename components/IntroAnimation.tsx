"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function IntroAnimation() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Reveal tagline right as logo lands
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 850);

    // Begin unblur and fade out
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    // Unmount from DOM after transition completes
    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 2900);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setMounted(false);
    }, 500);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#090a0d]/95 backdrop-blur-3xl overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting 
          ? 'opacity-0 scale-110 pointer-events-none backdrop-blur-none' 
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_65%)] pointer-events-none" />
      
      {/* Dynamic Gamecube-style Shockwave Rings */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/40 animate-shockwave-1 pointer-events-none" />
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-purple-400/40 animate-shockwave-2 pointer-events-none" />

      {/* Center Impact Flash Light */}
      <div className="absolute w-40 h-40 bg-white/25 rounded-full blur-2xl animate-flash pointer-events-none" />

      {/* Main 3D Kinetic Logo Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* Rolling / Tumbling 3D Logo */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-gamecube">
          <Image
            src="/logo-white.png"
            alt="The Lee Parsons"
            fill
            priority
            className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]"
          />
        </div>

        {/* Subtitle Reveal on Landing */}
        <div
          className={`space-y-1 text-center transition-all duration-700 transform ${
            showTagline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="block text-base sm:text-xl md:text-2xl font-black uppercase tracking-[0.35em] text-white">
            THE LEE PARSONS
          </span>
          <span className="block text-[10px] sm:text-xs font-mono uppercase tracking-[0.45em] text-zinc-400">
            CREATIVE LIVING
          </span>
        </div>

      </div>

      {/* Subtle Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white px-3 py-1 rounded-full border border-white/10 hover:border-white/30 bg-white/5 transition-all"
      >
        SKIP INTRO ➔
      </button>

    </div>
  );
}
