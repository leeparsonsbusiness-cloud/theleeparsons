"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Video, 
  Target, 
  Megaphone, 
  Zap, 
  BarChart3, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Users, 
  Sparkles, 
  Mail,
  ArrowRight,
  Play
} from 'lucide-react';

export interface CaseStudy {
  id: string;
  client: string;
  tagline: string;
  category: 'Paid Advertising' | 'Organic Growth' | 'Content Engine' | 'Full-Funnel';
  badge: string;
  stats: { label: string; value: string }[];
  overview: string;
  deliverables: string[];
  status: 'Featured Case' | 'Recent Win' | 'In Production';
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'dtc-growth',
    client: 'Direct-to-Consumer Apparel',
    tagline: 'Scaling customer acquisition with founder-led creative & high-ROAS paid social.',
    category: 'Paid Advertising',
    badge: 'PAID ADS // META & TIKTOK',
    stats: [
      { label: 'Return on Ad Spend', value: '3.8x' },
      { label: 'Customer Acquisition Cost', value: '-38%' },
      { label: 'Total Paid Reach', value: '4.2M+' }
    ],
    overview: 'Engineered a direct-response video advertising pipeline featuring raw, lifestyle-first storytelling and hook-testing variations that outperformed traditional studio ads.',
    deliverables: ['18 Ad Creatives', 'Meta Ads Setup', 'Audience Retargeting', 'Scriptwriting'],
    status: 'Featured Case'
  },
  {
    id: 'lifestyle-organic',
    client: 'Active & Lifestyle Brand',
    tagline: 'Building a multi-million-view organic short-form engine across Reels & TikTok.',
    category: 'Organic Growth',
    badge: 'ORGANIC // REELS & SHORTS',
    stats: [
      { label: 'Organic Views in 90 Days', value: '6.4M+' },
      { label: 'Follower Growth', value: '+42K' },
      { label: 'Average Watch Time', value: '88%' }
    ],
    overview: 'Shifted content strategy from static product showcases to narrative-driven, high-retention micro-documentaries that tapped into cultural outdoor & athletic trends.',
    deliverables: ['Content Strategy', 'Video Editing', 'Viral Hooks & Captions', 'Community Engagement'],
    status: 'Recent Win'
  },
  {
    id: 'omnichannel-scale',
    client: 'Beverage & Consumer Goods',
    tagline: 'Omnichannel product launch combining cinematic video and targeted paid distribution.',
    category: 'Full-Funnel',
    badge: 'FULL-FUNNEL // CAMPAIGN LAUNCH',
    stats: [
      { label: 'Launch Month Revenue', value: '+$180K' },
      { label: 'Email Opt-in Rate', value: '14.2%' },
      { label: 'Engagement Rate', value: '8.7%' }
    ],
    overview: 'Full-stack launch execution: from scripting and directing commercial spots to running top-of-funnel traffic into an exclusive pre-order waitlist funnel.',
    deliverables: ['Hero Commercial', 'Paid Traffic Campaigns', 'Landing Page Creative', 'Influencer Briefs'],
    status: 'Featured Case'
  }
];

const SERVICES = [
  {
    icon: Video,
    title: 'Short-Form Content Engine',
    tag: 'ORGANIC VIRALITY',
    description: 'Stop guessing what works on social. We build a high-frequency production engine delivering viral Reels, TikToks, and Shorts that build loyal audiences and turn viewers into buyers.',
    bullets: [
      'Hook-driven scriptwriting & storyboarding',
      'High-retention cinematic editing & sound design',
      'Trend forecasting & platform-native formats',
      'Weekly content delivery ready to publish'
    ]
  },
  {
    icon: Target,
    title: 'Paid Ads & Acquisition',
    tag: 'PERFORMANCE MARKETING',
    description: 'Creative is the new targeting. We write, film, and iterate direct-response ad creative across Meta and TikTok that lowers your customer acquisition costs and drives scalable sales.',
    bullets: [
      'Direct-response ad creative (UGC & commercial)',
      'Meta & TikTok Ads campaign management',
      'Multi-variant hook & CTA split-testing',
      'ROAS optimization & weekly performance reporting'
    ]
  },
  {
    icon: Layers,
    title: 'Brand Creative & Direction',
    tag: 'PREMIUM BRANDING',
    description: 'Elevate your brand aesthetic so you command higher prices and stand out from generic competitors. Cinematic visuals, launch videos, and cohesive visual storytelling.',
    bullets: [
      'Brand campaign films & product commercial shoots',
      'Visual aesthetic & creative strategy guidelines',
      'Lookbook & lifestyle photographic direction',
      'Full-funnel marketing collateral'
    ]
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Audit & Opportunity Blueprint',
    description: 'We dissect your existing social accounts, ad spend, creative assets, and competitors to pinpoint high-leverage growth bottlenecks.'
  },
  {
    step: '02',
    title: 'Creative Ideation & Scripting',
    description: 'We develop custom concepts, high-impact hooks, and storyboard content designed specifically to trigger platform algorithms and convert users.'
  },
  {
    step: '03',
    title: 'Production & Rapid Deployment',
    description: 'From filming and editing to ad campaign setup and scheduling, we launch campaigns quickly without sacrificing premium cinematic quality.'
  },
  {
    step: '04',
    title: 'Data-Backed Scale',
    description: 'We analyze retention curves, conversion metrics, and ROAS weekly—doubling down on winning angles and scaling your revenue predictably.'
  }
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredCases = activeCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16">
        <div className="border-b border-white/10 pb-12">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>GROWTH MARKETING & CREATIVE DIRECTION</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
                BRAND WORK
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 mt-4 leading-relaxed max-w-2xl font-normal">
                Helping modern brands scale through platform-native social content, high-converting paid advertisements, and cinematic visual storytelling.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl"
              >
                <span>BOOK A CALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="mailto:leeparsonsbusiness@gmail.com?subject=Brand%20Growth%20%26%20Advertising%20Inquiry"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>DIRECT EMAIL</span>
              </a>
            </div>
          </div>

          {/* High-Level Metric Ribbons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">ORGANIC REACH</span>
              <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">15M+</span>
              <span className="text-[11px] text-zinc-400 font-mono">Views across social</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">PAID ROAS</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">3.5x - 5.2x</span>
              <span className="text-[11px] text-zinc-400 font-mono">Target benchmark</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">FORMAT FOCUS</span>
              <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">9:16</span>
              <span className="text-[11px] text-zinc-400 font-mono">TikTok, Reels & Shorts</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">AVAILABILITY</span>
              <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">Q4 2026</span>
              <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Limited client spots
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">CAPABILITIES</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
            HOW I HELP BRANDS GROW
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-[#111217] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 uppercase">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs md:text-sm text-zinc-400 mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">KEY DELIVERABLES</span>
                  {service.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CASE STUDIES & RECENT WORK */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 border-t border-white/10 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">PORTFOLIO & RESULTS</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
              CASE STUDIES
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {['All', 'Paid Advertising', 'Organic Growth', 'Full-Funnel'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-mono uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="rounded-2xl bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0d0e13]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {cs.badge}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {cs.status}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                      {cs.client}
                    </h3>
                    <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed">
                      {cs.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-white/5">
                    {cs.overview}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {cs.stats.map((st, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-center">
                        <span className="text-sm sm:text-base font-black text-white block">
                          {st.value}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter block leading-tight mt-0.5">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom Deliverables */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {cs.deliverables.map((item, dIdx) => (
                    <span key={dIdx} className="text-[10px] font-mono bg-white/5 text-zinc-400 px-2 py-0.5 rounded border border-white/5">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <Link
                    href="/contact"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-black"
                  >
                    <span>INQUIRE ABOUT SIMILAR RESULTS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice for Custom Inquiries */}
        <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">PORTFOLIO EXPANSION</span>
            <p className="text-xs text-zinc-300 mt-1">
              Currently compiling detailed video breakdowns, analytics dashboards, and before/after ROAS reports.
            </p>
          </div>
          <a
            href="mailto:leeparsonsbusiness@gmail.com?subject=Request%20Full%20Brand%20Portfolio"
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white text-xs font-bold uppercase tracking-wider transition-all text-white shrink-0"
          >
            REQUEST FULL DECK
          </a>
        </div>
      </section>

      {/* THE 4-STEP PROCESS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 border-t border-white/10 pt-16">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono">METHODOLOGY</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
            HOW WE WORK TOGETHER
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[#111217] border border-white/10 space-y-3 relative group hover:border-white/30 transition-colors"
            >
              <span className="text-3xl font-black font-mono text-zinc-600 group-hover:text-white transition-colors block">
                {step.step}
              </span>
              <h4 className="text-base font-black uppercase tracking-tight text-white">
                {step.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INQUIRY & CONTACT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 border-t border-white/10 pt-16">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl border border-white/15 bg-gradient-to-br from-[#13151f] via-[#0d0e14] to-[#08090c] relative overflow-hidden shadow-2xl">
          
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.04] blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/[0.04] blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 font-bold block mb-2">
              ● ACCEPTING SELECT BRANDS FOR Q4
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              READY TO SCALE YOUR SOCIAL & PAID ACQUISITION?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed font-normal">
              Whether you need high-converting ad creative to drop your CAC, or a full-scale short-form content engine, let's talk through your brand's growth goals.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-2xl"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:leeparsonsbusiness@gmail.com?subject=Brand%20Growth%20%26%20Advertising%20Inquiry"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>EMAIL DIRECTLY</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
