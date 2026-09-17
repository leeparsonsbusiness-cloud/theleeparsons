"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowRight, ExternalLink } from 'lucide-react';

interface YouTubeWork {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  year: string;
  duration: string;
  views: string;
  description: string;
  thumbnail: string;
  url: string;
}

const TOP_YOUTUBE_WORKS: YouTubeWork[] = [
  {
    id: 'yt-1',
    youtubeId: 'fmW6gG8wgVc',
    title: 'I Had to Make a Life-or-Death Choice at 10,000 Feet',
    category: 'Adventure / Survival',
    year: '2026',
    duration: '20:50',
    views: '409 views',
    description: 'A harrowing high-altitude mountain expedition documenting raw survival, decision making, and endurance.',
    thumbnail: '/thumbnails/yt-fmW6gG8wgVc.jpg',
    url: 'https://www.youtube.com/watch?v=fmW6gG8wgVc',
  },
  {
    id: 'yt-2',
    youtubeId: 'qkyUS37kySE',
    title: "We almost didn't make it up the mountain",
    category: 'Expedition / Film',
    year: '2026',
    duration: '35:20',
    views: '294 views',
    description: 'Documenting an extreme ascent and unforeseen obstacles pushing through steep alpine terrain.',
    thumbnail: '/thumbnails/yt-qkyUS37kySE.jpg',
    url: 'https://www.youtube.com/watch?v=qkyUS37kySE',
  },
  {
    id: 'yt-3',
    youtubeId: '5OOd4M0tcbA',
    title: 'The beach is gone: What happened?',
    category: 'Documentary',
    year: '2026',
    duration: '3:14',
    views: '138 views',
    description: 'Investigating coastal transformation and the sudden disappearance of a beloved shoreline.',
    thumbnail: '/thumbnails/yt-5OOd4M0tcbA.jpg',
    url: 'https://www.youtube.com/watch?v=5OOd4M0tcbA',
  },
];

export default function FilmsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

      {/* Featured Reel - Video Autoplay Just Like Homepage, No Words Over Video */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl flex items-center justify-center select-none">
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
            className="w-full h-auto max-h-[82vh] object-contain mx-auto block"
          >
            <source src="/videos/featured-reel.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Selected Works Grid - Top 3 Most Viewed YouTube Videos */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">YOUTUBE ARCHIVE</span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-1">
              SELECTED WORKS
            </h3>
          </div>
          <a
            href="https://youtube.com/@theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>VIEW ALL ON YOUTUBE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TOP_YOUTUBE_WORKS.map((work) => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer rounded-2xl bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col"
            >
              {/* Thumbnail Container with YouTube Image */}
              <div className="relative aspect-video w-full bg-black overflow-hidden border-b border-white/5">
                <Image
                  src={work.thumbnail}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Button Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-500 group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-200">
                  {work.duration}
                </div>

                {/* Views Badge */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-white/10 px-2.5 py-0.5 rounded text-[10px] font-mono text-zinc-300 uppercase">
                  {work.views}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3 bg-[#0d0e13]">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>{work.category}</span>
                    <span>{work.year}</span>
                  </div>
                  <h4 className="font-black text-base uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors line-clamp-2">
                    {work.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {work.description}
                  </p>
                </div>

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

        {/* Contact CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl border border-white/15 bg-gradient-to-r from-[#12141c] to-[#0a0b10] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
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
