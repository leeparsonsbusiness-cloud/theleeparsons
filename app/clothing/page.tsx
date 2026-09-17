"use client";

import { useState } from 'react';
import Image from 'next/image';
import { DISPLAY_GRID_ITEMS, DisplayItem } from '@/lib/products';
import ProductModal from '@/components/ProductModal';
import CampaignVideo from '@/components/CampaignVideo';
import { Eye, Sparkles, ArrowDown } from 'lucide-react';

export default function ClothingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

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

      {/* Top Banner: Free shipping promo ONLY */}
      <div className="bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.2em] py-2.5 overflow-hidden whitespace-nowrap border-b border-black">
        <div className="inline-block animate-marquee">
          <span>FREE SHIPPING WHEN YOU BUY 2 OR MORE ITEMS • FREE SHIPPING WHEN YOU BUY 2 OR MORE ITEMS • FREE SHIPPING WHEN YOU BUY 2 OR MORE ITEMS • FREE SHIPPING WHEN YOU BUY 2 OR MORE ITEMS • </span>
        </div>
      </div>

      {/* Header / Intro */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
              CLOTHING
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

      {/* Campaign Video Showcase */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <CampaignVideo badge="SEPTEMBER DROP // OFFICIAL CAMPAIGN" />
      </section>

      {/* Multi-Box Garment Showcase Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20" id="shop">
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

              {/* Garment Showcase Viewport (Still Studio View) */}
              <div className="relative aspect-square w-full flex items-center justify-center p-8 bg-gradient-to-b from-[#181a24] to-[#0e0f14] overflow-hidden">
                
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
                
                {/* Static Garment Container */}
                <div className="relative w-4/5 h-4/5 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={item.mockup}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Soft floor shadow */}
                <div className="absolute bottom-6 w-3/5 h-4 rounded-full bg-black/60 blur-md pointer-events-none" />

                {/* Hover Quick-View Pill */}
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

        {/* LOOKBOOK Section */}
        <section className="mt-28 border-t border-white/10 pt-16" id="lookbook">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">ARCHIVE // GALLERY</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1">LOOKBOOK</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
              <Image 
                src="/lifestyle/fitgrid-charcoal.jpg" 
                alt="Washed Charcoal Fit-Grid" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">OUTFIT ESSENTIALS</span>
                  <h3 className="font-black text-xl uppercase tracking-tight text-white">WASHED CHARCOAL</h3>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
              <Image 
                src="/lifestyle/flatlay-white.jpg" 
                alt="Vintage White Flatlay" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">UNBLEACHED ECRU</span>
                  <h3 className="font-black text-xl uppercase tracking-tight text-white">VINTAGE COTTON DRAPE</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
