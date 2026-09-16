import { Mail, ExternalLink } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TiktokIcon } from '@/components/Navbar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
            CONTACT
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Direct Email Card */}
          <div className="p-8 rounded-2xl bg-[#111217] border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">DIRECT EMAIL</span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">BUSINESS & PRESS</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                For clothing orders, collaborations, press, and inquiries:
              </p>
            </div>
            
            <a
              href="mailto:leeparsonsbusiness@gmail.com"
              className="inline-flex items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all text-xs md:text-sm font-mono font-bold text-white group"
            >
              <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white" />
              <span className="underline underline-offset-4">leeparsonsbusiness@gmail.com</span>
            </a>
          </div>

          {/* Social Connection Cards */}
          <div className="p-8 rounded-2xl bg-[#111217] border border-white/10 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">CHANNELS</span>
              <h3 className="text-xl font-black uppercase text-white mt-0.5">CONNECT ONLINE</h3>
            </div>
            
            <div className="space-y-3 pt-2">
              <a
                href="https://instagram.com/theleeparsons"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-xs font-bold uppercase tracking-wider group"
              >
                <div className="flex items-center gap-3">
                  <InstagramIcon className="w-4 h-4 text-zinc-300 group-hover:text-white" />
                  <span>INSTAGRAM</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-1">
                  @theleeparsons
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://youtube.com/@theleeparsons"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-xs font-bold uppercase tracking-wider group"
              >
                <div className="flex items-center gap-3">
                  <YoutubeIcon className="w-4 h-4 text-zinc-300 group-hover:text-white" />
                  <span>YOUTUBE</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-1">
                  @theleeparsons
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://tiktok.com/@theleeparsons"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-xs font-bold uppercase tracking-wider group"
              >
                <div className="flex items-center gap-3">
                  <TiktokIcon className="w-4 h-4 text-zinc-300 group-hover:text-white" />
                  <span>TIKTOK</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-1">
                  @theleeparsons
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
