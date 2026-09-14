"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MAIN_PRODUCT } from '@/lib/products';
import { useCartStore } from '@/lib/cartStore';
import CartDrawer from '@/components/CartDrawer';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';

export default function HomePage() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [activeTab, setActiveTab] = useState<'mockup' | 'lifestyle'>('mockup');
  const [addedNotice, setAddedNotice] = useState(false);

  const { openCart, addItem, totalCount } = useCartStore();
  const currentColor = MAIN_PRODUCT.colorways[selectedColorIndex];

  const handleAddToCart = () => {
    addItem({
      productId: MAIN_PRODUCT.id,
      name: MAIN_PRODUCT.name,
      colorwayId: currentColor.id,
      colorwayName: currentColor.name,
      size: selectedSize,
      price: MAIN_PRODUCT.price,
      image: currentColor.mockup,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white selection:bg-white selection:text-black">
      <CartDrawer />

      {/* Top Banner Marquee */}
      <div className="bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.2em] py-2 overflow-hidden whitespace-nowrap border-b border-black">
        <div className="inline-block animate-marquee">
          <span>SHOUTOUT TO ALL THE GAYS THAT SAVE MORE CHICKS FOR ME • LIMITED EDITION DROP • 7.5 OZ HEAVYWEIGHT BOX CUT • THE LEE PARSONS • SHOUTOUT TO ALL THE GAYS THAT SAVE MORE CHICKS FOR ME • LIMITED EDITION DROP • </span>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0a0b0e]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg md:text-xl tracking-tighter uppercase">THE LEE PARSONS</span>
          <span className="text-[10px] bg-white/10 text-zinc-400 px-2 py-0.5 rounded font-mono uppercase">EST. 2026</span>
        </div>
        <button
          onClick={openCart}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white bg-white/5 transition-all text-xs font-bold uppercase tracking-wider"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>CART</span>
          <span className="bg-white text-black px-1.5 py-0.2 rounded-full text-[10px] font-mono">
            {totalCount()}
          </span>
        </button>
      </header>

      {/* Main Hero & Product Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16" id="shop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-[#14161f] to-[#0d0e12] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-6">
              <Image 
                src={activeTab === 'mockup' ? currentColor.mockup : currentColor.lifestyle} 
                alt={currentColor.name}
                fill
                priority
                className="object-contain transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest text-zinc-300 font-mono">
                {currentColor.name}
              </div>
            </div>

            {/* Thumbnail View Switcher */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setActiveTab('mockup')}
                className={`relative aspect-square rounded-lg border overflow-hidden transition-all bg-black/40 ${
                  activeTab === 'mockup' ? 'border-white ring-2 ring-white/30' : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={currentColor.mockup} alt="Studio Mockup" fill className="object-contain p-1" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded font-mono">STUDIO</span>
              </button>

              <button
                onClick={() => setActiveTab('lifestyle')}
                className={`relative aspect-square rounded-lg border overflow-hidden transition-all bg-black/40 ${
                  activeTab === 'lifestyle' ? 'border-white ring-2 ring-white/30' : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={currentColor.lifestyle} alt="Lifestyle" fill className="object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded font-mono">LOOK</span>
              </button>

              <div className="relative aspect-square rounded-lg border border-white/10 overflow-hidden bg-black/40">
                <Image src="/lifestyle/candid-diner.jpg" alt="Diner" fill className="object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded font-mono">NIGHT</span>
              </div>

              <div className="relative aspect-square rounded-lg border border-white/10 overflow-hidden bg-black/40">
                <Image src="/lifestyle/macro-green.jpg" alt="Macro Ribbing" fill className="object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded font-mono">7.5 OZ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Order Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">DROP 01 // STATEMENT APPAREL</span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1 text-white">
                {MAIN_PRODUCT.name}
              </h1>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mt-1">
                "{MAIN_PRODUCT.tagline}"
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black tracking-tight">${MAIN_PRODUCT.price}.00</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  IN STOCK • READY TO FULFILL
                </span>
              </div>
            </div>

            {/* Colorway Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono text-zinc-400 tracking-wider flex justify-between">
                <span>Colorway</span>
                <span className="text-white font-bold">{currentColor.name} ({currentColor.colorName})</span>
              </label>
              <div className="flex gap-3">
                {MAIN_PRODUCT.colorways.map((col, idx) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      setActiveTab('mockup');
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                      selectedColorIndex === idx
                        ? 'border-white bg-white/15 ring-2 ring-white/20'
                        : 'border-white/15 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-white/30" 
                      style={{ backgroundColor: col.hex }} 
                    />
                    <span className="text-xs font-bold uppercase">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs uppercase font-mono text-zinc-400 tracking-wider">
                <span>Select Size</span>
                <span className="text-zinc-500">Boxy Streetwear Fit</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {MAIN_PRODUCT.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 rounded font-black text-xs uppercase tracking-wider transition-all border ${
                      selectedSize === s
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-all rounded shadow-lg flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> ADDED TO CART!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> ADD TO CART (${MAIN_PRODUCT.price}.00)
                  </>
                )}
              </button>
              
              <p className="text-[11px] text-center text-zinc-400">
                Secure checkout powered by <strong>Stripe</strong>. Free domestic exchanges.
              </p>
            </div>

            {/* Garment Highlights */}
            <div className="border-t border-white/10 pt-6 space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-zinc-400" />
                <span>Fast US fulfillment (5–8 business days via Printful)</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>7.5 oz Heavyweight Combed Cotton with 1" Ribbed Crewneck</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-zinc-400" />
                <span>Automatic order tracking sent straight to your email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lookbook / Nightlife Vibe Section */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">LATE NIGHT CAMPAIGN</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-1">DIRECT-FLASH NIGHTLIFE MERCH</h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              Designed for dive bars, diner runs, pre-games, and shows. High-contrast lettering printed directly onto premium heavyweight vintage blanks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 group">
              <Image 
                src="/lifestyle/candid-diner.jpg" 
                alt="Late Night Diner" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase">03:00 AM DINER RUN</span>
                  <h3 className="font-black text-lg uppercase">BUILT FOR AFTER-HOURS</h3>
                </div>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 group">
              <Image 
                src="/lifestyle/fitgrid-charcoal.jpg" 
                alt="Fit Grid" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase">OUTFIT ESSENTIALS</span>
                  <h3 className="font-black text-lg uppercase">WASHED CHARCOAL FIT-GRID</h3>
                </div>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 group">
              <Image 
                src="/lifestyle/flatlay-white.jpg" 
                alt="Vintage White Flatlay" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase">UNBLEACHED ECRU BONE</span>
                  <h3 className="font-black text-lg uppercase">VINTAGE COTTON DRAPE</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 px-6 text-center text-xs text-zinc-500 space-y-4">
        <p className="font-black tracking-widest text-zinc-400 uppercase">THE LEE PARSONS • ALL RIGHTS RESERVED • theleeparsons.com</p>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed text-zinc-600">
          Independent limited-run streetwear. Direct-to-garment printed and fulfilled by Printful on premium heavyweight blanks. Powered by Stripe.
        </p>
      </footer>
    </div>
  );
}
