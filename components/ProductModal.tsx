"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, Colorway, PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/lib/cartStore';
import { X, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, Sparkles } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductIndex: number;
  initialColorwayIndex: number;
}

export default function ProductModal({
  isOpen,
  onClose,
  initialProductIndex,
  initialColorwayIndex
}: ProductModalProps) {
  const [selectedProductIndex, setSelectedProductIndex] = useState(initialProductIndex);
  const [selectedColorIndex, setSelectedColorIndex] = useState(initialColorwayIndex);
  const [selectedSize, setSelectedSize] = useState('L');
  const [activeTab, setActiveTab] = useState<'mockup' | 'lifestyle'>('mockup');
  const [addedNotice, setAddedNotice] = useState(false);

  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    setSelectedProductIndex(initialProductIndex);
    setSelectedColorIndex(initialColorwayIndex);
    setActiveTab('mockup');
  }, [initialProductIndex, initialColorwayIndex, isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentProduct: Product = PRODUCTS[selectedProductIndex] || PRODUCTS[0];
  const currentColor: Colorway = currentProduct.colorways[selectedColorIndex] || currentProduct.colorways[0];

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
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
      openCart();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0f1015] border border-white/15 rounded-2xl shadow-2xl text-white z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Image Viewer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-[#171922] to-[#0c0d11] border border-white/10 overflow-hidden shadow-inner flex items-center justify-center p-6">
                <Image 
                  src={activeTab === 'mockup' ? currentColor.mockup : currentColor.lifestyle} 
                  alt={currentColor.name}
                  fill
                  priority
                  className="object-contain transition-all duration-300"
                />
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest text-zinc-300 font-mono flex items-center gap-2">
                  <span>{currentProduct.type === 'tee' ? '7.5 OZ TEE' : '10 OZ HOODIE'}</span>
                  <span>•</span>
                  <span>{currentColor.name}</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5">
                <button
                  onClick={() => setActiveTab('mockup')}
                  className={`relative aspect-square rounded-lg border overflow-hidden transition-all bg-black/40 ${
                    activeTab === 'mockup' ? 'border-white ring-2 ring-white/30' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={currentColor.mockup} alt="Studio Mockup" fill className="object-contain p-1" />
                  <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 px-1 rounded font-mono">STUDIO</span>
                </button>

                <button
                  onClick={() => setActiveTab('lifestyle')}
                  className={`relative aspect-square rounded-lg border overflow-hidden transition-all bg-black/40 ${
                    activeTab === 'lifestyle' ? 'border-white ring-2 ring-white/30' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={currentColor.lifestyle} alt="Lifestyle" fill className="object-cover" />
                  <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 px-1 rounded font-mono">LOOK</span>
                </button>

                <div className="relative aspect-square rounded-lg border border-white/10 overflow-hidden bg-black/40">
                  <Image src="/lifestyle/candid-diner.jpg" alt="Diner" fill className="object-cover" />
                  <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 px-1 rounded font-mono">NIGHT</span>
                </div>

                <div className="relative aspect-square rounded-lg border border-white/10 overflow-hidden bg-black/40">
                  <Image src="/lifestyle/macro-green.jpg" alt="Macro Texture" fill className="object-cover" />
                  <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 px-1 rounded font-mono">DETAIL</span>
                </div>
              </div>
            </div>

            {/* Right Column: Options & Add to Cart */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Silhouette Switcher */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-mono">SELECT SILHOUETTE</span>
                <div className="grid grid-cols-2 gap-2.5 p-1 rounded-xl bg-white/5 border border-white/10">
                  <button
                    onClick={() => {
                      setSelectedProductIndex(0);
                      setActiveTab('mockup');
                    }}
                    className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-0.5 ${
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
                    className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center gap-0.5 ${
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

              {/* Title & Price */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                  {currentProduct.name}
                </h2>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                  "{currentProduct.tagline}"
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl md:text-3xl font-black tracking-tight">${currentProduct.price.toFixed(2)}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                    LIMITED DROP • READY TO PRINT
                  </span>
                </div>
              </div>

              {/* Colorways */}
              <div className="space-y-2.5">
                <label className="text-xs uppercase font-mono text-zinc-400 tracking-wider flex justify-between">
                  <span>Colorway</span>
                  <span className="text-white font-bold">{currentColor.name} ({currentColor.colorName})</span>
                </label>
                <div className="flex gap-2">
                  {currentProduct.colorways.map((col, idx) => (
                    <button
                      key={col.id}
                      onClick={() => {
                        setSelectedColorIndex(idx);
                        setActiveTab('mockup');
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-xs font-bold uppercase ${
                        selectedColorIndex === idx
                          ? 'border-white bg-white/15 ring-2 ring-white/20'
                          : 'border-white/15 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <span 
                        className="w-3 h-3 rounded-full border border-white/30" 
                        style={{ backgroundColor: col.hex }} 
                      />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs uppercase font-mono text-zinc-400 tracking-wider">
                  <span>Select Size</span>
                  <span className="text-zinc-500">Boxy Streetwear Fit</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {currentProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 rounded font-black text-xs uppercase tracking-wider transition-all border ${
                        selectedSize === s
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shipping Promo */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2.5 text-[11px] text-zinc-300">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Buy <strong>2+ items</strong> for <strong>FREE US Shipping</strong>!</span>
              </div>

              {/* CTA Button */}
              <div className="space-y-2 pt-1">
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
                <p className="text-[10px] text-center text-zinc-500">
                  Powered by <strong>Stripe</strong>. 100% Secure Checkout.
                </p>
              </div>

              {/* Guarantees */}
              <div className="border-t border-white/10 pt-4 space-y-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>$5.00 Flat Shipping • Free on 2+ items (5–8 days delivery)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{currentProduct.type === 'tee' ? '7.5 oz Heavyweight Combed Cotton' : '10.0 oz Heavyweight Cotton/Poly Fleece'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                  <span>100% Free replacement guarantee on misprints or sizing defects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
