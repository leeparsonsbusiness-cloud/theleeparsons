"use client";

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface CampaignVideoProps {
  badge?: string;
  className?: string;
  autoPlay?: boolean;
}

export default function CampaignVideo({
  badge = "SEPTEMBER DROP // CAMPAIGN",
  className = "",
  autoPlay = true,
}: CampaignVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [autoPlay]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={togglePlay}
      className={`relative w-full max-w-3xl lg:max-w-4xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer group select-none transition-all duration-300 hover:border-white/30 ${className}`}
    >
      {/* Ambient Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none z-10" />

      {/* Video Element */}
      <video
        ref={videoRef}
        src="/videos/clothes-promo.mp4"
        autoPlay={autoPlay}
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-auto max-h-[65vh] object-contain mx-auto block bg-black"
      />

      {/* Top Badge */}
      {badge && (
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 pointer-events-none">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
            {badge}
          </span>
        </div>
      )}

      {/* Floating Sound Toggle */}
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
          className="px-3 sm:px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-xl"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-300" />
              <span>TAP FOR SOUND</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">MUTE</span>
            </>
          )}
        </button>
      </div>

      {/* Center Paused Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl">
            <Play className="w-7 h-7 fill-current ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}
