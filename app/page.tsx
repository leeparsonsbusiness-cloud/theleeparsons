"use client";

import { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/lib/cartStore';
import CartDrawer from '@/components/CartDrawer';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, Mail, Sparkles } from 'lucide-react';

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
  const [selectedProductIndex, setSelectedProductIndex] = useState(0); // 0 = Tee, 1 = Hoodie
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [activeTab, setActiveTab] = useState<'mockup' | 'lifestyle'>('mockup');
  const [addedNotice, setAddedNotice] = useState(false);

  const { openCart, addItem, totalCount } = useCartStore();
  
  const currentProduct = PRODUCTS[selectedProductIndex];
  const currentColor = currentProduct.colorways[selectedColorIndex];

  const handleAddToCart = () => {
    addItem({
      productId: currentProduct.id,
      name: currentProduct.name,
      colorwayId: currentColor.id,
      colorwayName: currentColor.name,
      size: selectedSize,
      price: currentProduct.price,
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
          <span>SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME • LIMITED EDITION DROP • HEAVYWEIGHT STREETWEAR • FREE US SHIPPING ON 2+ ITEMS • THE LEE PARSONS • SHOUTOUT TO THE GAYS FOR LEAVING MORE CHICKS FOR ME • </span>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0a0b0e]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
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
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white bg-white/5 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>CART</span>
            <span className="bg-white text-black px-1.5 py-0.2 rounded-full text-[10px] font-mono">
              {totalCount()}
            </span>
          </button>
        </div>
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
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest text-zinc-300 font-mono flex items-center gap-2">
                <span>{currentProduct.type === 'tee' ? '7.5 OZ TEE' : '10 OZ HOODIE'}</span>
                <span>•</span>
                <span>{currentColor.name}</span>
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
                <Image src="/lifestyle/candid-diner.jpg" alt="Diner Candid" fill className="object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded font-mono">NIGHT</span>
              </div>

              <div className="relative aspect-square rounded-lg border border-white/10 overflow-hidden bg-black/40">
                <Image src="/lifestyle/macro-green.jpg" alt="Macro Fabric" fill className="object-cover" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1 rounded font-mono">TEXTURE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Order Card */}
          <div className="lg:col-span-5 space-y-7">
            
            {/* Silhouette Selector: T-Shirt vs Hoodie */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-mono">SELECT SILHOUETTE</span>
              <div className="grid grid-cols-2 gap-3 p-1.5 rounded-xl bg-white/5 border border-white/10">
                <button
                  onClick={() => {
                    setSelectedProductIndex(0);
                    setActiveTab('mockup');
                  }}
                  className={`py-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-0.5 ${
                    selectedProductIndex === 0
                      ? 'bg-white text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>T-SHIRT</span>
                  <span className="text-[10px] font-mono opacity-80">$27.99</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProductIndex(1);
                    setActiveTab('mockup');
                  }}
                  className={`py-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-0.5 ${
                    selectedProductIndex === 1
                      ? 'bg-white text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>HOODIE</span>
                  <span className="text-[10px] font-mono opacity-80">$49.99</span>
                </button>
              </div>
            </div>

            {/* Product Title & Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                {currentProduct.name}
              </h1>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mt-1">
                "{currentProduct.tagline}"
              </p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black tracking-tight">${currentProduct.price.toFixed(2)}</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  LIMITED DROP • READY TO PRINT
                </span>
              </div>
            </div>

            {/* Colorway Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono text-zinc-400 tracking-wider flex justify-between">
                <span>Colorway</span>
                <span className="text-white font-bold">{currentColor.name} ({currentColor.colorName})</span>
              </label>
              <div className="flex gap-2.5">
                {currentProduct.colorways.map((col, idx) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      setActiveTab('mockup');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg border transition-all ${
                      selectedColorIndex === idx
                        ? 'border-white bg-white/15 ring-2 ring-white/20'
                        : 'border-white/15 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/30" 
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
                <span className="text-zinc-400">Streetwear Boxy Fit</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {currentProduct.sizes.map((s) => (
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

            {/* Promo Callout */}
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3 text-xs">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-zinc-300">
                <strong>Special Offer:</strong> Buy 2+ items (any mix of shirts or hoodies) and unlock <strong>FREE US Shipping</strong>!
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
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
                    <ShoppingBag className="w-4 h-4" /> ADD TO CART (${currentProduct.price.toFixed(2)})
                  </>
                )}
              </button>
              
              <p className="text-[11px] text-center text-zinc-400">
                Direct-to-garment printed & shipped nationwide. Powered by <strong>Stripe</strong>.
              </p>
            </div>

            {/* Garment Highlights */}
            <div className="border-t border-white/10 pt-6 space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-zinc-400" />
                <span>$5.00 Flat Shipping • Free Shipping on 2+ items</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>{currentProduct.type === 'tee' ? '7.5 oz Heavyweight Combed Cotton' : '10.0 oz Heavyweight Cotton/Poly Fleece'}</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-zinc-400" />
                <span>100% Free replacement guarantee on any printing or sizing defects</span>
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
              Designed for dive bars, diner runs, pre-games, and shows. High-contrast lettering printed directly onto premium heavyweight blanks.
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
