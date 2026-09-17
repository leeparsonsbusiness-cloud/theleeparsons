"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IntroAnimation from '@/components/IntroAnimation';
import CampaignVideo from '@/components/CampaignVideo';
import TrustTheThumbCard from '@/components/TrustTheThumbCard';
import { ArrowRight, ShoppingBag, Film } from 'lucide-react';

export default function HomePage() {
  const filmsVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = filmsVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {
      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    });
  }, []);

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
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 overflow-hidden">
        
        {/* Ambient Radial Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.03] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center space-y-6">
          
          <h1 className="sr-only">THE LEE PARSONS</h1>

          {/* Featured Campaign Video (Unchanged) */}
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
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-white/10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              MY VIDEOS
            </h2>
          </div>
          <Link
            href="/films"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group"
          >
            <span>EXPLORE VIDEOS</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Video that autoplays from films page, no box outline, clicks to /films */}
        <Link
          href="/films"
          className="group relative block w-full select-none cursor-pointer"
        >
          <div className="relative w-full flex items-center justify-center">
            <video
              ref={filmsVideoRef}
              src="/videos/featured-reel.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              onPause={(e) => {
                e.currentTarget.play().catch(() => {});
              }}
              onEnded={(e) => {
                e.currentTarget.play().catch(() => {});
              }}
              className="w-auto h-auto max-h-[75vh] max-w-full object-contain mx-auto block group-hover:opacity-95 transition-opacity"
            >
              <source src="/videos/featured-reel.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Bold EXPLORE VIDEOS button */}
          <div className="mt-6 flex items-center justify-center">
            <div className="px-8 py-4 rounded-full bg-white text-black font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-2xl group-hover:scale-105">
              <span>EXPLORE VIDEOS</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* Under the video: Box with information about trustthethumb.com and journey */}
        <div className="pt-4">
          <TrustTheThumbCard />
        </div>

      </section>
    </div>
  );
}
