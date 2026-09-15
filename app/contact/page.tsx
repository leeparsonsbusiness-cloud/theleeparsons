"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Send, Check, ExternalLink, MessageSquare } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TiktokIcon } from '@/components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'General / Collaboration',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:leeparsonsbusiness@gmail.com?subject=${encodeURIComponent(
      `[${formData.inquiryType}] Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
            CONTACT
          </h1>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div className="p-8 rounded-2xl bg-[#111217] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">DIRECT EMAIL</span>
                <h3 className="text-xl font-black uppercase text-white mt-0.5">BUSINESS & PRESS</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                For clothing orders, collaborations, and press:
              </p>
              <a
                href="mailto:leeparsonsbusiness@gmail.com"
                className="inline-block text-sm md:text-base font-mono font-bold text-white hover:text-zinc-300 underline underline-offset-4"
              >
                leeparsonsbusiness@gmail.com
              </a>
            </div>

            {/* Social Connection Cards */}
            <div className="p-8 rounded-2xl bg-[#111217] border border-white/10 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">CHANNELS</span>
              <h3 className="text-lg font-black uppercase text-white">CONNECT ONLINE</h3>
              
              <div className="space-y-3 pt-2">
                <a
                  href="https://instagram.com/theleeparsons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-bold uppercase tracking-wider group"
                >
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="w-4 h-4 text-zinc-300" />
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
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-bold uppercase tracking-wider group"
                >
                  <div className="flex items-center gap-3">
                    <YoutubeIcon className="w-4 h-4 text-zinc-300" />
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
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-bold uppercase tracking-wider group"
                >
                  <div className="flex items-center gap-3">
                    <TiktokIcon className="w-4 h-4 text-zinc-300" />
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

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl bg-[#111217] border border-white/10 shadow-2xl">
              <div className="mb-6 space-y-1">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">SEND A MESSAGE</h3>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-white/5 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-base uppercase text-white">MESSAGE INITIATED</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Your email client was opened with your message details. You can also write directly to leeparsonsbusiness@gmail.com.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono uppercase text-zinc-300 underline underline-offset-4 mt-2"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/15 text-white text-xs focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/15 text-white text-xs focus:border-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">SUBJECT</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/15 text-white text-xs focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="General / Collaboration">General / Collaboration</option>
                      <option value="Clothing Order Question">Clothing Order Question</option>
                      <option value="Video Collaboration">Video Collaboration</option>
                      <option value="Music / Audio">Music / Audio</option>
                      <option value="Press">Press</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">MESSAGE DETAILS</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or message..."
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/15 text-white text-xs focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
