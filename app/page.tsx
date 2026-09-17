"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import CampaignVideo from '@/components/CampaignVideo';
import { ArrowRight, Play, ShoppingBag, Film, ChevronDown, MapPin, Clock } from 'lucide-react';

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function HomePage() {
  const countdown = useCountdown('2026-10-01T00:00:00');

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      <IntroAnimation />
      
      {/* Top Banner */}
      <div className="bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.2em] py-2 overflow-hidden whitespace-nowrap border-b border-black">
        <div className="inline-block animate-marquee">
          <span>FREE SHIPPING WHEN YOU BUY 2 OR MORE ITEMS • SEPTEMBER DROP IS LIVE • FREE SHIPPING WHEN YOU BUY 2 OR MORE ITEMS • SEPTEMBER DROP IS LIVE • </span>
        </div>
      </div>

      {/* Hero Section: Campaign Video */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 overflow-hidden">
        
        {/* Ambient Radial Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.03] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center space-y-6">
          
          <h1 className="sr-only">THE LEE PARSONS</h1>

          {/* Featured Campaign Video */}
          <CampaignVideo />

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/clothing"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-2xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SHOP CLOTHING</span>
            </Link>

            <Link
              href="/films"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Film className="w-4 h-4" />
              <span>WATCH FILMS</span>
            </Link>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="pt-6 flex flex-col items-center gap-1 text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-bounce">
          <span>SCROLL</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* TRUST THE THUMB Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/10">
        <a
          href="https://trustthethumb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/60 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-gradient-to-br from-[#0f1008] via-[#12110a] to-[#090a0d] shadow-2xl block"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(200,160,20,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

          {/* Left: Text content */}
          <div className="relative z-10 flex flex-col gap-4 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                INCOMING · OCT 1, 2026
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <MapPin className="w-3 h-3" /> LA → COLUMBUS, OH
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white group-hover:text-amber-50 transition-colors">
              TRUST<br />THE THUMB
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              Me and my brother Jake are hitchhiking across the country — no car, no plan, just our thumbs. Follow every ride, every stranger, every mile.
            </p>

            <span className="mt-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 group-hover:gap-3 transition-all">
              FOLLOW THE JOURNEY <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          {/* Right: Countdown */}
          <div className="relative z-10 flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
              <Clock className="w-3 h-3" /> LAUNCHES IN
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              {[
                { value: countdown.days, label: 'DAYS' },
                { value: countdown.hours, label: 'HRS' },
                { value: countdown.minutes, label: 'MIN' },
                { value: countdown.seconds, label: 'SEC' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-400/20 transition-colors flex items-center justify-center">
                    <span className="text-2xl font-black text-white tabular-nums">
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </a>
      </section>

      {/* Portal Section 1: CLOTHING DROP */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              SEPTEMBER DROP
            </h2>
          </div>
          <Link
            href="/clothing"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group"
          >
            <span>VIEW ALL ITEMS</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: 7.5 oz Heavyweight Tee */}
          <Link
            href="/clothing"
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col justify-between p-8 shadow-2xl"
          >
            <div className="flex justify-between items-start z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                7.5 OZ HEAVYWEIGHT
              </span>
              <span className="text-lg font-black text-white">$27.99</span>
            </div>

            <div className="relative w-full h-3/5 flex items-center justify-center">
              <Image
                src="/mockups/washed-charcoal.png"
                alt="Shoutout Heavyweight Tee"
                fill
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="z-10 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <h3 className="font-black text-base uppercase text-white">SHOUTOUT BOX TEE</h3>
                <p className="text-[11px] font-mono text-zinc-400">3 Colorways (S - 3XL)</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white flex items-center gap-1">
                SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 2: 10.0 oz Heavyweight Hoodie */}
          <Link
            href="/clothing"
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col justify-between p-8 shadow-2xl"
          >
            <div className="flex justify-between items-start z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                10.0 OZ FLEECE
              </span>
              <span className="text-lg font-black text-white">$49.99</span>
            </div>

            <div className="relative w-full h-3/5 flex items-center justify-center">
              <Image
                src="/mockups/hoodie-charcoal.png"
                alt="Shoutout Heavyweight Hoodie"
                fill
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="z-10 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <h3 className="font-black text-base uppercase text-white">SHOUTOUT HOODIE</h3>
                <p className="text-[11px] font-mono text-zinc-400">3 Colorways (S - 3XL)</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white flex items-center gap-1">
                SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* Portal Section 2: MY VIDEOS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              MY VIDEOS
            </h2>
          </div>
          <Link
            href="/films"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group"
          >
            <span>EXPLORE ALL VIDEOS</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1: Featured Reel */}
          <Link
            href="/films"
            className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#181924] via-[#101117] to-black shadow-2xl flex flex-col justify-end p-8 transition-all duration-300 hover:border-white/40 block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 group-hover:bg-white backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                FEATURED VIDEO
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200">
                FEATURED REEL // 2026
              </h3>
              <p className="text-xs text-zinc-300">
                Visual projects and creative video archives.
              </p>
            </div>
          </Link>

          {/* Card 2: Trust The Thumb */}
          <a
            href="https://trustthethumb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 bg-gradient-to-br from-[#0f1008] via-[#12110a] to-[#090a0d] shadow-2xl flex flex-col justify-end p-8 transition-all duration-300 block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,160,20,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-400/10 group-hover:bg-amber-400 backdrop-blur-md border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
                <MapPin className="w-7 h-7" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                LIVE JOURNEY · OCT 1
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-amber-50">
                TRUST THE THUMB
              </h3>
              <p className="text-xs text-zinc-300">
                Hitchhiking LA → Columbus with my brother. Follow every mile in real time.
              </p>
            </div>
          </a>

        </div>
      </section>
    </div>
  );
}
