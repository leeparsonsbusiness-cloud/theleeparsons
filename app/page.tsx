"use client";

import { useState } from 'react';
import Image from 'next/image';
import { DISPLAY_GRID_ITEMS, DisplayItem } from '@/lib/products';
import { useCartStore } from '@/lib/cartStore';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import { ShoppingBag, Mail, Sparkles, Eye, RotateCw } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  );
}

export default function HomePage() {
  const [filterType, setFilterType] = useState<'all' | 'tee' | 'hoodie'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const { openCart, totalCount } = useCartStore();

  const handleOpenProduct = (item: DisplayItem) => {
    setSelectedProductIndex(item.productIndex);
    setSelectedColorIndex(item.colorwayIndex);
    setModalOpen(true);
  };

  const filteredItems = filterType === 'all' 
    ? DISPLAY_GRID_ITEMS 
    : DISPLAY_GRID_ITEMS.filter(item => item.productType === filterType);

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      <CartDrawer />
      
      {/* Quick Buy Popup Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProductIndex={selectedProductIndex}
        initialColorwayIndex={selectedColorIndex}
      />

      {/* Top Banner Marquee */}
      <div className="bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.2em] py-2 overflow-hidden whitespace-nowrap border-b border-black">
        <div className="inline-block animate-marquee">
          <span>SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME • LIMITED EDITION DROP • HEAVYWEIGHT STREETWEAR • FREE US SHIPPING ON 2+ ITEMS • THE LEE PARSONS • SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME • </span>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#090a0d]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-black text-lg md:text-xl tracking-tighter uppercase">THE LEE PARSONS</span>
          <span className="hidden sm:inline-block text-[10px] bg-white/10 text-zinc-400 px-2 py-0.5 rounded font-mono uppercase">EST. 2026</span>
        </div>

        {/* Socials & Cart */}
        <div className="flex items-center gap-3 md:gap-5">
          <a 
            href="https://instagram.com/theleeparsons" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1"
            title="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a 
            href="https://youtube.com/@theleeparsons" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1"
            title="YouTube"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>
          <a 
            href="mailto:leeparsonsbusiness@gmail.com"
            className="text-zinc-400 hover:text-white transition-colors p-1"
            title="Email Support"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={openCart}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white bg-white/5 transition-all text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>CART</span>
            <span className="bg-white text-black px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold">
              {totalCount()}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>DROP 01 // 3D STREETWEAR COLLECTION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white">
          THE STATEMENT DROP
        </h1>
        <p className="max-w-xl mx-auto text-zinc-400 text-xs sm:text-sm uppercase tracking-widest font-mono mt-3">
          "SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME"
        </p>

        {/* Filter Pills */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setFilterType('all')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === 'all'
                ? 'bg-white text-black shadow-lg'
                : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            ALL ITEMS ({DISPLAY_GRID_ITEMS.length})
          </button>
          <button
            onClick={() => setFilterType('tee')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === 'tee'
                ? 'bg-white text-black shadow-lg'
                : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            T-SHIRTS ($27.99)
          </button>
          <button
            onClick={() => setFilterType('hoodie')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === 'hoodie'
                ? 'bg-white text-black shadow-lg'
                : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            HOODIES ($49.99)
          </button>
        </div>
      </section>

      {/* 3D Multi-Box Interactive Showcase Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8" id="shop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
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

              {/* 3D Spinning Showcase Viewport */}
              <div className="relative aspect-square w-full perspective-1000 flex items-center justify-center p-8 bg-gradient-to-b from-[#181a24] to-[#0e0f14] overflow-hidden">
                
                {/* Turntable Pedestal / Ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
                
                {/* 3D Rotating Garment Container */}
                <div 
                  className={`relative w-4/5 h-4/5 ${
                    index % 2 === 0 ? 'animate-spin-3d' : 'animate-spin-3d-slow'
                  } transition-transform duration-500`}
                >
                  <Image
                    src={item.mockup}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Soft floor shadow */}
                <div className="absolute bottom-6 w-3/5 h-4 rounded-full bg-black/60 blur-md animate-shadow-pulse pointer-events-none" />

                {/* Hover Quick-View Pill */}
                <div className="absolute bottom-4 bg-white/90 text-black px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-2xl">
                  <Eye className="w-3.5 h-3.5" />
                  <span>CUSTOMIZE & BUY</span>
                </div>

                {/* 3D Rotation Badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-400 flex items-center gap-1 opacity-70 group-hover:opacity-100">
                  <RotateCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>360° 3D VIEW</span>
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
                  <span className="block text-[10px] font-mono text-emerald-400 uppercase">IN STOCK</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nightlife Campaign Banner (3 AM Diner Photo) */}
        <section className="mt-20 rounded-3xl overflow-hidden border border-white/10 relative bg-gradient-to-r from-black via-zinc-900 to-black">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 p-8 md:p-14 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">03:00 AM DINER RUN</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                BUILT FOR AFTER-HOURS
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Reckless, direct-flash late night merch. Heavyweight 7.5 oz shirts and 10.0 oz hoodies direct-to-garment printed on vintage mineral wash blanks.
              </p>
              <button
                onClick={() => handleOpenProduct(DISPLAY_GRID_ITEMS[0])}
                className="px-8 py-3.5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all rounded inline-flex items-center gap-2"
              >
                <span>SHOP THE DROP</span>
              </button>
            </div>

            <div className="md:col-span-6 relative h-80 md:h-[420px] w-full">
              <Image
                src="/lifestyle/candid-diner.jpg"
                alt="Direct Flash Diner Candid"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-transparent to-transparent" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/70 py-12 px-6 text-center text-xs text-zinc-500 space-y-4 mt-20">
        <div className="flex justify-center items-center gap-6 text-zinc-400 text-xs font-mono">
          <a href="https://instagram.com/theleeparsons" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
          <span>•</span>
          <a href="https://youtube.com/@theleeparsons" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YOUTUBE</a>
          <span>•</span>
          <a href="mailto:leeparsonsbusiness@gmail.com" className="hover:text-white transition-colors">SUPPORT</a>
        </div>
        <p className="font-black tracking-widest text-zinc-400 uppercase">THE LEE PARSONS • ALL RIGHTS RESERVED • theleeparsons.com</p>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed text-zinc-600">
          Independent limited-run streetwear. Direct-to-garment printed and fulfilled by Printful on premium heavyweight blanks. Powered by Stripe.
        </p>
      </footer>
    </div>
  );
}
