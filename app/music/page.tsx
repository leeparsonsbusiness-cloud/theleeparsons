"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Disc3 } from 'lucide-react';

export default function MusicPage() {
  return (
    <div className="min-h-[85vh] bg-[#090a0d] text-white flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden selection:bg-white selection:text-black">
      
      {/* Ambient Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/[0.04] blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Animated Disc / Sound Icon */}
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shadow-2xl">
          <Disc3 className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        {/* Page Title & Status */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            AUDIO ARCHIVE
          </span>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
            MUSIC
          </h1>
          <p className="text-sm sm:text-base font-mono uppercase tracking-[0.4em] text-zinc-400 font-bold">
            COMING SOON
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-mono">
          Original audio releases, scores, and curated soundscapes currently in production.
        </p>

        {/* Navigation Back Home / Explore Clothing */}
        <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
          >
            RETURN HOME
          </Link>

          <Link
            href="/clothing"
            className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white text-white font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <span>SHOP CLOTHING</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
