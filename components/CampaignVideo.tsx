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
      className={`relative w-full flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Non-stop Looping Video without box outline or borders */}
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
        className="w-auto h-auto max-h-[68vh] sm:max-h-[72vh] max-w-full object-contain mx-auto block pointer-events-none"
      />
    </div>
  );
}
