"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';

export default function SuccessPage() {
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-8 text-emerald-400 text-3xl font-bold">
        ✓
      </div>
      <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-2">THE LEE PARSONS</span>
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">ORDER CONFIRMED</h1>
      <p className="max-w-md text-zinc-400 text-sm md:text-base mb-8 leading-relaxed">
        Thank you for your order! Your payment has been received. You will receive an email confirmation and tracking details as soon as your garment ships.
      </p>
      <Link 
        href="/" 
        className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all rounded"
      >
        BACK TO STORE
      </Link>
    </div>
  );
}
