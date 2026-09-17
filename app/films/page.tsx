"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Film as FilmIcon } from 'lucide-react';
import TrustTheThumbCard from '@/components/TrustTheThumbCard';

interface YouTubeWork {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  url: string;
}

const YOUTUBE_VIDEOS: YouTubeWork[] = [
  {
    id: 'yt-1',
    youtubeId: 'fmW6gG8wgVc',
    title: 'I Had to Make a Life-or-Death Choice at 10,000 Feet',
    thumbnail: '/thumbnails/yt-fmW6gG8wgVc.jpg',
    url: 'https://www.youtube.com/watch?v=fmW6gG8wgVc',
  },
  {
    id: 'yt-2',
    youtubeId: 'qkyUS37kySE',
    title: "We almost didn't make it up the mountain",
    thumbnail: '/thumbnails/yt-qkyUS37kySE.jpg',
    url: 'https://www.youtube.com/watch?v=qkyUS37kySE',
  },
  {
    id: 'yt-3',
    youtubeId: '5OOd4M0tcbA',
    title: 'The beach is gone: What happened?',
    thumbnail: '/thumbnails/yt-5OOd4M0tcbA.jpg',
    url: 'https://www.youtube.com/watch?v=5OOd4M0tcbA',
  },
  {
    id: 'yt-4',
    youtubeId: 'T1yL8URtsIQ',
    title: 'Hiking to LA’s Hidden Waterfall: Switzer Falls',
    thumbnail: '/thumbnails/yt-T1yL8URtsIQ.jpg',
    url: 'https://www.youtube.com/watch?v=T1yL8URtsIQ',
  },
  {
    id: 'yt-5',
    youtubeId: '3SDolERwSv4',
    title: 'Playing Drums Under the Highest Peak in the US (Freaking Out Cover)',
    thumbnail: '/thumbnails/yt-3SDolERwSv4.jpg',
    url: 'https://www.youtube.com/watch?v=3SDolERwSv4',
  },
  {
    id: 'yt-6',
    youtubeId: 'B0MThDuAkI0',
    title: 'I found a place that doesn’t feel real',
    thumbnail: '/thumbnails/yt-B0MThDuAkI0.jpg',
    url: 'https://www.youtube.com/watch?v=B0MThDuAkI0',
  },
];

// Triplicate the video items to achieve a smooth, seamless infinite loop
const INFINITE_YOUTUBE_VIDEOS = [
  ...YOUTUBE_VIDEOS,
  ...YOUTUBE_VIDEOS,
  ...YOUTUBE_VIDEOS,
];

export default function FilmsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {
      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    });
  }, []);

  // Infinite auto-scroll logic matching the clothing lookbook
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Center scroll on mount so user can scroll left or right immediately
    if (el.scrollLeft === 0 && el.scrollWidth > 0) {
      el.scrollLeft = el.scrollWidth / 3;
    }

    let reqId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered && el) {
        // Continuous smooth auto-scroll from left to right (~35px / sec)
        el.scrollLeft += delta * 0.035;

        const singleSetWidth = el.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (el.scrollLeft >= singleSetWidth * 2) {
            el.scrollLeft -= singleSetWidth;
          } else if (el.scrollLeft <= 10) {
            el.scrollLeft += singleSetWidth;
          }
        }
      }
      reqId = requestAnimationFrame(animate);
    };

    reqId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqId);
  }, [isHovered]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 10) {
      el.scrollLeft += singleSetWidth;
    }
  };

  const scrollByOffset = (offset: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
              FILMS
            </h1>
          </div>
          <a
            href="https://youtube.com/@theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white text-xs font-bold uppercase tracking-wider transition-all self-start md:self-end hover:bg-white/5"
          >
            <span>YOUTUBE CHANNEL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Featured Reel - Clean Video Autoplay, No Box Outline, No Words Over Video */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="relative w-full flex items-center justify-center select-none">
          <video
            ref={videoRef}
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
            className="w-auto h-auto max-h-[82vh] max-w-full object-contain mx-auto block"
          >
            <source src="/videos/featured-reel.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* YOUTUBE VIDEOS Section - Continuous Infinite Horizontal Scrolling Carousel */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 border-t border-white/10 pt-16 relative">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">YOUTUBE ARCHIVE</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
              YOUTUBE VIDEOS
            </h2>
          </div>
          
          {/* Controls: Prev/Next Buttons and YouTube Link */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <a
              href="https://youtube.com/@theleeparsons"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors mr-2 hidden sm:flex"
            >
              <span>VIEW CHANNEL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByOffset(-380)}
                aria-label="Scroll previous"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByOffset(380)}
                aria-label="Scroll next"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Infinite Horizontal Carousel Strip */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Ambient Edge Shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#090a0d] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#090a0d] to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 md:gap-8 overflow-x-auto py-4 cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {INFINITE_YOUTUBE_VIDEOS.map((work, idx) => (
              <a
                key={`${work.id}-${idx}`}
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group shrink-0 w-[300px] sm:w-[360px] md:w-[400px] rounded-2xl bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full bg-black overflow-hidden border-b border-white/5">
                  <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                  
                  {/* Play Button Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-500 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info - Clean: Only Title & Watch Link */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#0d0e13]">
                  <h4 className="font-black text-sm sm:text-base uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors line-clamp-2">
                    {work.title}
                  </h4>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white">
                    <span className="flex items-center gap-1.5">
                      WATCH ON YOUTUBE
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PASSION PROJECTS Section - 3 Blank Boxes To Be Filled Soon */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 border-t border-white/10 pt-16">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">ORIGINAL FILMS // IN PRODUCTION</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
              PASSION PROJECTS
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest self-start sm:self-auto">
            3 UPCOMING RELEASES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((boxNum) => (
            <div
              key={boxNum}
              className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-white/15 bg-gradient-to-br from-[#111217] to-[#0a0b0e] flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:border-white/30 group shadow-xl"
            >
              {/* Subtle ambient glow on hover */}
              <div className="absolute inset-0 bg-white/[0.02] rounded-2xl group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/30 transition-all">
                  <FilmIcon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                    PROJECT {boxNum}
                  </span>
                  <p className="text-sm font-black uppercase tracking-wide text-zinc-300">
                    COMING SOON
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust The Thumb Journey Box at the bottom of the films page */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <TrustTheThumbCard />
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="p-8 md:p-12 rounded-2xl border border-white/15 bg-gradient-to-r from-[#12141c] to-[#0a0b10] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">GET IN TOUCH</h4>
            <p className="text-xs md:text-sm text-zinc-400 max-w-xl">
              For collaborations, videos, or creative projects.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex-shrink-0"
          >
            CONTACT
          </Link>
        </div>
      </section>

    </div>
  );
}
