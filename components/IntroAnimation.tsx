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
    }, 2100);

    // Unmount from DOM after transition completes
    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 2800);

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
          ? 'opacity-0 scale-105 pointer-events-none backdrop-blur-none' 
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Radial Spotlight (Center Locked) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_65%)] pointer-events-none" />
      
      {/* Center Anchor Point: Everything radiates from (50%, 50%) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        
        {/* Shockwave Rings */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/40 animate-shockwave-1 pointer-events-none" />
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-purple-400/30 animate-shockwave-2 pointer-events-none" />

        {/* Center Impact Flash Light */}
        <div className="absolute w-44 h-44 bg-white/20 rounded-full blur-2xl animate-flash pointer-events-none" />

        {/* Rolling / Tumbling 3D Logo (Locked at exact center) */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-gamecube flex items-center justify-center">
          <Image
            src="/logo-white.png"
            alt="The Lee Parsons"
            fill
            priority
            className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.5)]"
          />
        </div>

        {/* Subtitle Positioned Absolutely Below Center Logo (Does NOT displace logo) */}
        <div
          className={`absolute top-full mt-4 w-80 text-center transition-all duration-700 pointer-events-none ${
            showTagline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <span className="block text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">
            THE LEE PARSONS
          </span>
        </div>

      </div>

    </div>
  );
}
