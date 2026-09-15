"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cartStore';
import { ShoppingBag, Mail } from 'lucide-react';

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  );
}

export function TiktokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.33.89.19 1.85.07 2.64-.42.75-.44 1.25-1.22 1.37-2.09.08-.66.07-1.33.07-1.99V.02z"/>
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { openCart, totalCount } = useCartStore();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/clothing', label: 'Clothing' },
    { href: '/films', label: 'Films' },
    { href: '/music', label: 'Music' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090a0d]/90 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between transition-all">
      
      {/* Left: Clean Brand Logo */}
      <Link href="/" className="flex items-center group py-1" title="The Lee Parsons">
        <div className="relative w-8 h-8 md:w-9 md:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
          <Image
            src="/logo-white.png"
            alt="The Lee Parsons"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] font-bold transition-all relative py-1 ${
                isActive 
                  ? 'text-white' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right: Socials & Cart Button */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        
        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden items-center gap-2 mr-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded transition-colors ${
                pathname === link.href ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 text-zinc-400 border-r border-white/10 pr-4">
          <a
            href="https://instagram.com/theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://youtube.com/@theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="YouTube"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://tiktok.com/@theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-1"
            title="TikTok"
          >
            <TiktokIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:leeparsonsbusiness@gmail.com"
            className="hover:text-white transition-colors p-1"
            title="Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Cart Drawer Trigger Button */}
        <button
          onClick={openCart}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider text-white shadow-sm"
          title="Open Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">CART</span>
          <span className="bg-white text-black px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none">
            {totalCount()}
          </span>
        </button>
      </div>

    </header>
  );
}
