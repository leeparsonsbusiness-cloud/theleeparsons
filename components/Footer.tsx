import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, YoutubeIcon, TiktokIcon } from '@/components/Navbar';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06070a] py-16 px-6 text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Monogram Logo */}
        <div className="relative w-12 h-12 opacity-80 hover:opacity-100 transition-opacity">
          <Image
            src="/logo-white.png"
            alt="The Lee Parsons"
            fill
            className="object-contain"
          />
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase font-bold tracking-[0.2em] text-zinc-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/clothing" className="hover:text-white transition-colors">Clothing</Link>
          <Link href="/films" className="hover:text-white transition-colors">Films</Link>
          <Link href="/music" className="hover:text-white transition-colors">Music</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-zinc-400">
          <a
            href="https://instagram.com/theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            title="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/@theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            title="YouTube"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>
          <a
            href="https://tiktok.com/@theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            title="TikTok"
          >
            <TiktokIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:leeparsonsbusiness@gmail.com"
            className="hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Tagline & Copyright */}
        <div className="space-y-2 border-t border-white/5 pt-8 w-full max-w-md">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            Creative Living
          </p>
          <p className="text-[11px] text-zinc-600 font-mono">
            © {new Date().getFullYear()} THE LEE PARSONS. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
