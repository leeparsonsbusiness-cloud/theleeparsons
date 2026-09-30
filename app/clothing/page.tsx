"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { OCTOBER_GRID_ITEMS, SEPTEMBER_GRID_ITEMS, DisplayItem } from '@/lib/products';
import ProductModal from '@/components/ProductModal';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const OCTOBER_LOOKBOOK_ITEMS = [
  {
    title: 'FUCK T SWIFT TEE',
    subtitle: 'VINTAGE BLACK // 7.5 OZ HEAVYWEIGHT',
    src: '/lifestyle/october/lookbook-1.jpg',
  },
  {
    title: 'FUCK T SWIFT TEE',
    subtitle: 'VINTAGE WHITE // 7.5 OZ HEAVYWEIGHT',
    src: '/lifestyle/october/lookbook-2.jpg',
  },
  {
    title: 'FUCK T SWIFT HOODIE',
    subtitle: 'VINTAGE WHITE // 10.0 OZ FLEECE',
    src: '/lifestyle/october/lookbook-3.jpg',
  },
  {
    title: 'FUCK T SWIFT HOODIE',
    subtitle: 'VINTAGE BLACK // 10.0 OZ FLEECE',
    src: '/lifestyle/october/lookbook-4.jpg',
  },
  {
    title: 'OCTOBER DROP ARCHIVE',
    subtitle: 'LIMITED QUANTITIES // HEAVYWEIGHT',
    src: '/lifestyle/october/lookbook-5.jpg',
  },
  {
    title: 'LUXURY STREETWEAR CUT',
    subtitle: 'BOXY OVERSIZED SILHOUETTE',
    src: '/lifestyle/october/lookbook-6.jpg',
  },
];

const SEPTEMBER_LOOKBOOK_ITEMS = [
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

const INFINITE_OCTOBER_LOOKBOOK = [...OCTOBER_LOOKBOOK_ITEMS, ...OCTOBER_LOOKBOOK_ITEMS, ...OCTOBER_LOOKBOOK_ITEMS];
const INFINITE_SEPTEMBER_LOOKBOOK = [...SEPTEMBER_LOOKBOOK_ITEMS, ...SEPTEMBER_LOOKBOOK_ITEMS, ...SEPTEMBER_LOOKBOOK_ITEMS];

export default function ClothingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // October carousel
  const octScrollRef = useRef<HTMLDivElement>(null);
  const [isOctHovered, setIsOctHovered] = useState(false);

  // September carousel
  const sepScrollRef = useRef<HTMLDivElement>(null);
  const [isSepHovered, setIsSepHovered] = useState(false);

  // Auto-scroll loop for October
  useEffect(() => {
    const el = octScrollRef.current;
    if (!el) return;

    if (el.scrollLeft === 0 && el.scrollWidth > 0) {
      el.scrollLeft = el.scrollWidth / 3;
    }

    let reqId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isOctHovered && el) {
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
  }, [isOctHovered]);

  // Auto-scroll loop for September
  useEffect(() => {
    const el = sepScrollRef.current;
    if (!el) return;

    if (el.scrollLeft === 0 && el.scrollWidth > 0) {
      el.scrollLeft = el.scrollWidth / 3;
    }

    let reqId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isSepHovered && el) {
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
  }, [isSepHovered]);

  const handleOctScroll = () => {
    const el = octScrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;
    if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
    else if (el.scrollLeft <= 10) el.scrollLeft += singleSetWidth;
  };

  const handleSepScroll = () => {
    const el = sepScrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;
    if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
    else if (el.scrollLeft <= 10) el.scrollLeft += singleSetWidth;
  };

  const scrollOctByOffset = (offset: number) => {
    if (octScrollRef.current) {
      octScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const scrollSepByOffset = (offset: number) => {
    if (sepScrollRef.current) {
      sepScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleOpenProduct = (item: DisplayItem) => {
    setSelectedProductIndex(item.productIndex);
    setSelectedColorIndex(item.colorwayIndex);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      
      {/* Quick Buy Popup Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProductIndex={selectedProductIndex}
        initialColorwayIndex={selectedColorIndex}
      />

      {/* Top Banner: Free shipping promo */}
      <div className="bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.2em] py-2.5 overflow-hidden whitespace-nowrap border-b border-black">
        <div className="inline-block animate-marquee">
          <span>FREE SHIPPING WHEN YOU BUY 2 OR MORE ITEMS • OCTOBER DROP LIVE • SEPTEMBER ARCHIVE AVAILABLE • </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: OCTOBER DROP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-6" id="october-drop">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">OCTOBER 2026 // COLLECTION</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
              OCTOBER DROP
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              ● READY TO SHIP
            </span>
            <span>HEAVYWEIGHT 7.5 OZ & 10.0 OZ</span>
          </div>
        </div>
      </section>

      {/* October Garment Showcase Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {OCTOBER_GRID_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenProduct(item)}
              className="group cursor-pointer rounded-2xl bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col relative"
            >
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

        {/* October Lookbook */}
        <div className="mt-20 border-t border-white/10 pt-16 relative">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">ARCHIVE // GALLERY</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">OCTOBER LOOKBOOK</h2>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => scrollOctByOffset(-340)}
                aria-label="Scroll previous"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollOctByOffset(340)}
                aria-label="Scroll next"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsOctHovered(true)}
            onMouseLeave={() => setIsOctHovered(false)}
            onTouchStart={() => setIsOctHovered(true)}
            onTouchEnd={() => setIsOctHovered(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#090a0d] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#090a0d] to-transparent z-20 pointer-events-none" />

            <div
              ref={octScrollRef}
              onScroll={handleOctScroll}
              className="flex gap-4 md:gap-6 overflow-x-auto py-4 cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {INFINITE_OCTOBER_LOOKBOOK.map((item, idx) => (
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
                      <h3 className="font-black text-xs sm:text-sm uppercase tracking-tight text-white mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* SECTION 2: SEPTEMBER DROP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-6 border-t border-white/10" id="september-drop">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">SEPTEMBER 2026 // COLLECTION</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
              SEPTEMBER DROP
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              ● READY TO SHIP
            </span>
            <span>SHOUTOUT STREETWEAR</span>
          </div>
        </div>
      </section>

      {/* September Garment Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SEPTEMBER_GRID_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenProduct(item)}
              className="group cursor-pointer rounded-2xl bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col relative"
            >
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

        {/* September Lookbook */}
        <div className="mt-20 border-t border-white/10 pt-16 relative">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">ARCHIVE // GALLERY</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">SEPTEMBER LOOKBOOK</h2>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => scrollSepByOffset(-340)}
                aria-label="Scroll previous"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSepByOffset(340)}
                aria-label="Scroll next"
                className="p-3 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white transition-all shadow-lg active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsSepHovered(true)}
            onMouseLeave={() => setIsSepHovered(false)}
            onTouchStart={() => setIsSepHovered(true)}
            onTouchEnd={() => setIsSepHovered(false)}
          >
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#090a0d] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#090a0d] to-transparent z-20 pointer-events-none" />

            <div
              ref={sepScrollRef}
              onScroll={handleSepScroll}
              className="flex gap-4 md:gap-6 overflow-x-auto py-4 cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {INFINITE_SEPTEMBER_LOOKBOOK.map((item, idx) => (
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
                      <h3 className="font-black text-xs sm:text-sm uppercase tracking-tight text-white mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
