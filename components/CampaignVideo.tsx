"use client";

import { useRef, useEffect } from 'react';

interface CampaignVideoProps {
  className?: string;
}

export default function CampaignVideo({
  className = "",
}: CampaignVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure seamless autoplay on load
    video.muted = true;
    video.play().catch(() => {
      // Fallback retry
      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    });
  }, []);

  return (
    <div
      className={`relative w-full max-w-3xl lg:max-w-4xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.85)] select-none pointer-events-none ${className}`}
    >
      {/* Ambient Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none z-10" />

      {/* Non-stop Looping Video */}
      <video
        ref={videoRef}
        src="/videos/clothes-promo.mp4"
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
        className="w-full h-auto max-h-[65vh] object-contain mx-auto block bg-black pointer-events-none"
      />
    </div>
  );
}
