"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Compass, ExternalLink, ArrowRight, Clock, Users, Heart } from "lucide-react";

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

export default function TrustTheThumbCard() {
  const countdown = useCountdown("2026-10-01T00:00:00Z");

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-[#12110a] via-[#0d0e12] to-[#07080a] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white p-6 sm:p-10 md:p-14">
      {/* Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="relative z-10 flex flex-col gap-8">
        
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              UPCOMING EXPEDITION
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              LOS ANGELES, CA → COLUMBUS, OH
            </span>
          </div>

          <span className="text-xs font-mono text-amber-400/90 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            OCTOBER 1, 2026
          </span>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                TRUST THE THUMB
              </h3>
              <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-amber-400 font-bold">
                2,150 Miles Across America • Zero Booked Rides • Only Our Thumbs
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Starting October 1st, 2026, two brothers—<strong className="text-white">Lee (23)</strong> and <strong className="text-white">Jake (20)</strong>—are stepping into the unknown with only backpacks, thumbs out, and cameras rolling. Hitchhiking from Los Angeles to Columbus with zero safety nets.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              The algorithm tells everyone to be afraid of each other. We’re setting out to test whether everyday Americans across desert highways, truck stops, and heartland towns are as divided as the internet claims, or if genuine kindness, hospitality, and warmth still thrive.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-white uppercase tracking-wider">2,150 MILES</div>
                <div className="text-[11px] font-mono text-zinc-400">7 States via Route 66 & I-40</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-white uppercase tracking-wider">LIVE GPS TRACKER</div>
                <div className="text-[11px] font-mono text-zinc-400">Real-time route & ride logs</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-white uppercase tracking-wider">UNFILTERED VIDEO</div>
                <div className="text-[11px] font-mono text-zinc-400">Documenting every stranger</div>
              </div>
            </div>
          </div>

          {/* Right / Countdown & Action Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/10">
            
            {/* Countdown Display */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                EXPEDITION LAUNCH COUNTDOWN
              </div>
              <div className="grid grid-cols-4 gap-2 text-center pt-1">
                {[
                  { value: countdown.days, label: "DAYS" },
                  { value: countdown.hours, label: "HRS" },
                  { value: countdown.minutes, label: "MIN" },
                  { value: countdown.seconds, label: "SEC" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className="w-full aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                        {String(value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Creators mini avatars */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400">
                    <Image src="/ttt/lee.jpg" alt="Lee Parsons" fill className="object-cover" />
                  </div>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500">
                    <Image src="/ttt/jake.jpg" alt="Jake Parsons" fill className="object-cover" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white">Lee & Jake Parsons</div>
                  <div className="text-[10px] font-mono text-zinc-400">@theleeparsons • @Jake_thedrummer26</div>
                </div>
              </div>
            </div>

            {/* CTA Link Button to trustthethumb.com */}
            <a
              href="https://trustthethumb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/20 group"
            >
              <span>FOLLOW AT TRUSTTHETHUMB.COM</span>
              <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}
