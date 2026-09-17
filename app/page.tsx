"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IntroAnimation from '@/components/IntroAnimation';
import CampaignVideo from '@/components/CampaignVideo';
import ProductModal from '@/components/ProductModal';
import TrustTheThumbCard from '@/components/TrustTheThumbCard';
import { DISPLAY_GRID_ITEMS, DisplayItem } from '@/lib/products';
import {
  ShoppingBag,
  Film,
  ArrowRight,
  ExternalLink,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play,
  Film as FilmIcon,
} from 'lucide-react';

const LOOKBOOK_ITEMS = [
  {
    title: 'WASHED CHARCOAL HOODIE',
    subtitle: '10.0 OZ FLEECE',
    src: '/lifestyle/lookbook-hoodie-charcoal.jpg',
  },
  {
    title: 'VINTAGE BONE HOODIE',
    subtitle: '10.0 OZ FLEECE',
    src: '/lifestyle/lookbook-hoodie-bone.jpg',
  },
  {
    title: 'FADED FOREST HOODIE',
    subtitle: '10.0 OZ FLEECE',
    src: '/lifestyle/lookbook-hoodie-green.jpg',
  },
  {
    title: 'WASHED CHARCOAL TEE',
    subtitle: '7.5 OZ HEAVYWEIGHT',
    src: '/lifestyle/lookbook-tee-charcoal.jpg',
  },
  {
    title: 'VINTAGE BONE TEE',
    subtitle: '7.5 OZ HEAVYWEIGHT',
    src: '/lifestyle/lookbook-tee-bone.jpg',
  },
  {
    title: 'FADED FOREST TEE',
    subtitle: '7.5 OZ HEAVYWEIGHT',
    src: '/lifestyle/lookbook-tee-green.jpg',
  },
];

const INFINITE_LOOKBOOK = [...LOOKBOOK_ITEMS, ...LOOKBOOK_ITEMS, ...LOOKBOOK_ITEMS];

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

const INFINITE_YOUTUBE_VIDEOS = [
  ...YOUTUBE_VIDEOS,
  ...YOUTUBE_VIDEOS,
  ...YOUTUBE_VIDEOS,
];

export default function HomePage() {
  // Modal State for Quick Buy
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const handleOpenProduct = (item: DisplayItem) => {
    setSelectedProductIndex(item.productIndex);
    setSelectedColorIndex(item.colorwayIndex);
    setModalOpen(true);
  };

  // Video Autoplay Ref for Films
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

  // Lookbook Infinite Scroll
  const lookbookScrollRef = useRef<HTMLDivElement>(null);
  const [isLookbookHovered, setIsLookbookHovered] = useState(false);

  useEffect(() => {
    const el = lookbookScrollRef.current;
    if (!el) return;

    if (el.scrollLeft === 0 && el.scrollWidth > 0) {
      el.scrollLeft = el.scrollWidth / 3;
    }

    let reqId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isLookbookHovered && el) {
        el.scrollLeft += delta * 0.04;
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
  }, [isLookbookHovered]);

  const handleLookbookScroll = () => {
    const el = lookbookScrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 10) {
      el.scrollLeft += singleSetWidth;
    }
  };

  const scrollLookbook = (offset: number) => {
    if (lookbookScrollRef.current) {
      lookbookScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // YouTube Videos Infinite Scroll
  const youtubeScrollRef = useRef<HTMLDivElement>(null);
  const [isYoutubeHovered, setIsYoutubeHovered] = useState(false);

  useEffect(() => {
    const el = youtubeScrollRef.current;
    if (!el) return;

    if (el.scrollLeft === 0 && el.scrollWidth > 0) {
      el.scrollLeft = el.scrollWidth / 3;
    }

    let reqId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isYoutubeHovered && el) {
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
  }, [isYoutubeHovered]);

  const handleYoutubeScroll = () => {
    const el = youtubeScrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 10) {
      el.scrollLeft += singleSetWidth;
    }
  };

  const scrollYoutube = (offset: number) => {
    if (youtubeScrollRef.current) {
      youtubeScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      <IntroAnimation />

      {/* Quick Buy Popup Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProductIndex={selectedProductIndex}
        initialColorwayIndex={selectedColorIndex}
      />
      
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

          {/* Featured Campaign Video */}
          <CampaignVideo />

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#clothing"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-2xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SHOP CLOTHING</span>
            </a>

            <a
              href="#films"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Film className="w-4 h-4" />
              <span>WATCH FILMS</span>
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 1: SEPTEMBER DROP (Exact Clothing Page Layout with 6 Designs + Lookbook) */}
      <section id="clothing" className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-white/10">
        
        {/* Header / Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">FALL 2026 // COLLECTION</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
              SEPTEMBER DROP
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              ● READY TO SHIP
            </span>
            <span>HEAVYWEIGHT 7.5 OZ & 10.0 OZ</span>
          </div>
        </div>

        {/* 6 Garment Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DISPLAY_GRID_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenProduct(item)}
              className="group cursor-pointer rounded-2xl bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col relative"
            >
              {/* Badge & Color indicator */}
              <div className="p-4 flex items-center justify-between border-b border-white/5 z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {item.badge}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                  <span 
                    className="w-2.5 h-2.5 rounded-full border border-white/30" 
                    style={{ backgroundColor: item.colorHex }} 
                  />
                  <span>{item.colorName}</span>
                </div>
              </div>

              {/* Garment Showcase Viewport */}
              <div className="relative aspect-square w-full flex items-center justify-center p-8 bg-gradient-to-b from-[#181a24] to-[#0e0f14] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
                
                <div className="relative w-4/5 h-4/5 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={item.mockup}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="absolute bottom-6 w-3/5 h-4 rounded-full bg-black/60 blur-md pointer-events-none" />

                <div className="absolute bottom-4 bg-white/90 text-black px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-2xl">
                  <Eye className="w-3.5 h-3.5" />
                  <span>CUSTOMIZE & BUY</span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5 border-t border-white/10 bg-[#0d0e13] flex items-center justify-between">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wide group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{item.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black tracking-tight text-white">${item.price.toFixed(2)}</span>
                  {item.stockLeft !== undefined ? (
                    <span className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      {item.stockLeft} LEFT
                    </span>
                  ) : (
                    <span className="block text-[10px] font-mono text-emerald-400 uppercase mt-0.5">IN STOCK</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOOKBOOK Section - Continuous Infinite Scroll Just Like Clothing Page */}
        <div className="mt-28 border-t border-white/10 pt-16 relative">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">ARCHIVE // GALLERY</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">LOOKBOOK</h3>
            </div>
            
            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => scrollLookbook(-340)}
                aria-label="Scroll previous"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollLookbook(340)}
                aria-label="Scroll next"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Infinite Horizontal Carousel Strip */}
          <div 
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsLookbookHovered(true)}
            onMouseLeave={() => setIsLookbookHovered(false)}
            onTouchStart={() => setIsLookbookHovered(true)}
            onTouchEnd={() => setIsLookbookHovered(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#090a0d] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#090a0d] to-transparent z-20 pointer-events-none" />

            <div
              ref={lookbookScrollRef}
              onScroll={handleLookbookScroll}
              className="flex gap-4 md:gap-6 overflow-x-auto py-4 cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {INFINITE_LOOKBOOK.map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[9/16] w-[240px] sm:w-[280px] md:w-[320px] shrink-0 rounded-2xl overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-300 group shadow-2xl bg-[#111217]"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-5 pointer-events-none">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                        {item.subtitle}
                      </span>
                      <h4 className="font-black text-xs sm:text-sm uppercase tracking-tight text-white mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 2: FILMS (Exact Films Page Layout with Video + YouTube Carousel + Passion Projects + TTT + Get In Touch) */}
      <section id="films" className="border-t border-white/10 pt-20">
        
        {/* Films Section Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
          <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">VISUAL ARCHIVES</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
                FILMS
              </h2>
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
        </div>

        {/* Featured Reel - Clean Video Autoplay, No Box Outline, No Words Over Video */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
          <div className="relative w-full flex items-center justify-center select-none">
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
              className="w-auto h-auto max-h-[82vh] max-w-full object-contain mx-auto block"
            >
              <source src="/videos/featured-reel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* YOUTUBE VIDEOS Section - Continuous Infinite Horizontal Scrolling Carousel */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 border-t border-white/10 pt-16 relative">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">YOUTUBE ARCHIVE</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
                YOUTUBE VIDEOS
              </h3>
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
                  onClick={() => scrollYoutube(-380)}
                  aria-label="Scroll previous"
                  className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollYoutube(380)}
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
            onMouseEnter={() => setIsYoutubeHovered(true)}
            onMouseLeave={() => setIsYoutubeHovered(false)}
            onTouchStart={() => setIsYoutubeHovered(true)}
            onTouchEnd={() => setIsYoutubeHovered(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#090a0d] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#090a0d] to-transparent z-20 pointer-events-none" />

            <div
              ref={youtubeScrollRef}
              onScroll={handleYoutubeScroll}
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

                  {/* Info */}
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
        </div>

        {/* PASSION PROJECTS Section - 3 Blank Boxes To Be Filled Soon */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20 border-t border-white/10 pt-16">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">ORIGINAL FILMS // IN PRODUCTION</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
                PASSION PROJECTS
              </h3>
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
        </div>

        {/* Trust The Thumb Journey Box */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
          <TrustTheThumbCard />
        </div>

        {/* Get In Touch Box */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
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
        </div>

      </section>
    </div>
  );
}
