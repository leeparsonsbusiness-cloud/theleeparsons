"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/cartStore';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout failed. Please ensure Stripe keys are set in production.');
      }
    } catch (err) {
      console.error(err);
      alert('Error initiating checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={closeCart} 
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#121318] border-l border-white/10 text-white flex flex-col h-full z-10 shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-white" />
            <h2 className="text-lg font-black uppercase tracking-wider">YOUR CART</h2>
            <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full font-mono text-zinc-300">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12">
              <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 opacity-30" />
              <p className="text-sm uppercase tracking-widest font-semibold">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 items-center"
              >
                <div className="relative w-20 h-20 rounded bg-black/40 overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-contain p-1" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm uppercase tracking-wide truncate">{item.name}</h3>
                  <p className="text-xs text-zinc-400 capitalize">{item.colorwayName} • Size {item.size}</p>
                  <p className="text-sm font-bold mt-1 text-white">${item.price}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-white/20 rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >-</button>
                      <span className="px-2 text-xs font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-300 ml-auto p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400 uppercase tracking-widest text-xs">Subtotal</span>
              <span className="text-xl font-black">${totalPrice().toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-zinc-400">Taxes and standard shipping calculated at checkout via Stripe.</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all rounded flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'REDIRECTING TO STRIPE...' : (
                <>
                  CHECKOUT WITH STRIPE <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
