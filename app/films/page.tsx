"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Play, Clapperboard, Film, ArrowRight, X, ExternalLink } from 'lucide-react';

interface FilmProject {
  id: string;
  title: string;
  category: string;
  year: string;
  duration: string;
  description: string;
  youtubeId?: string;
  thumbnailGradient: string;
}

const FEATURED_FILM: FilmProject = {
  id: 'featured-1',
  title: 'CREATIVE LIVING — DIRECTORS REEL',
  category: 'Short Film / Visual Direction',
  year: '2026',
  duration: '3:45',
  description: 'An exploration of streetwear, cinematography, and raw self-expression. Directed, shot, and edited by Lee Parsons.',
  youtubeId: '', // Placeholder: add YouTube Video ID here e.g. "dQw4w9WgXcQ"
  thumbnailGradient: 'from-zinc-800 via-[#13141a] to-black',
};

const FILM_PROJECTS: FilmProject[] = [
  {
    id: 'film-1',
    title: 'STATEMENT PIECES // DROP 01 CAMPAIGN',
    category: 'Commercial / Fashion Film',
    year: '2026',
    duration: '1:30',
    description: 'Cinematic brand film showcasing the 7.5 oz heavyweight boxy tee and 10 oz fleece hoodie across urban environments.',
    youtubeId: '',
    thumbnailGradient: 'from-amber-950/40 via-[#17151f] to-black',
  },
  {
    id: 'film-2',
    title: 'NIGHT RUNS — DOCUMENTARY SHORT',
    category: 'Documentary',
    year: '2026',
    duration: '4:15',
    description: 'Documenting the late-night design and manufacturing process behind independent apparel production.',
    youtubeId: '',
    thumbnailGradient: 'from-emerald-950/40 via-[#101915] to-black',
  },
  {
    id: 'film-3',
    title: 'RAW CUTS & ARCHIVES',
    category: 'Visual Journal',
    year: '2026',
    duration: '2:20',
    description: 'Experimental 4K visual montage combining natural light, street audio, and high-contrast graded footage.',
    youtubeId: '',
    thumbnailGradient: 'from-blue-950/40 via-[#10141f] to-black',
  },
];

export default function FilmsPage() {
  const [activeVideo, setActiveVideo] = useState<FilmProject | null>(null);

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-white selection:text-black">
      
      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl bg-[#101217] border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">{activeVideo.category}</span>
                <h3 className="font-black text-sm uppercase text-white">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {activeVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
                    <Film className="w-8 h-8 opacity-80" />
                  </div>
                  <h4 className="font-black text-lg uppercase tracking-wider">{activeVideo.title}</h4>
                  <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
                    YouTube embed slot ready. Video links will be linked directly to your channel.
                  </p>
                  <a
                    href="https://youtube.com/@theleeparsons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all mt-2"
                  >
                    <span>VISIT YOUTUBE CHANNEL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">CINEMATOGRAPHY & VISUAL STORYTELLING</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">
              FILMS
            </h1>
          </div>
          <a
            href="https://youtube.com/@theleeparsons"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white text-xs font-bold uppercase tracking-wider transition-all self-start md:self-end"
          >
            <span>YOUTUBE CHANNEL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Featured Film Hero Card */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div 
          onClick={() => setActiveVideo(FEATURED_FILM)}
          className="group cursor-pointer relative aspect-video md:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#1c1e28] via-[#101117] to-black shadow-2xl flex flex-col justify-end p-6 md:p-12 transition-all duration-300 hover:border-white/40"
        >
          {/* Ambient Glow / Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 group-hover:bg-white backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
              <Play className="w-7 h-7 md:w-8 md:h-8 fill-current ml-1" />
            </div>
          </div>

          {/* Featured Metadata */}
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15 text-white font-bold">
                FEATURED REEL
              </span>
              <span>{FEATURED_FILM.year}</span>
              <span>•</span>
              <span>{FEATURED_FILM.duration}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors">
              {FEATURED_FILM.title}
            </h2>
            <p className="text-xs md:text-sm text-zinc-300 line-clamp-2">
              {FEATURED_FILM.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="mb-8">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-400">PROJECT ARCHIVE</span>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-1">
            SELECTED WORKS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FILM_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveVideo(project)}
              className="group cursor-pointer rounded-2xl bg-[#111217] border border-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className={`relative aspect-video w-full bg-gradient-to-br ${project.thumbnailGradient} flex items-center justify-center overflow-hidden border-b border-white/5`}>
                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300">
                  {project.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3 bg-[#0d0e13]">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h4 className="font-black text-base uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white">
                  <span>WATCH FILM</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inquire / Directing CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl border border-white/15 bg-gradient-to-r from-[#12141c] to-[#0a0b10] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">COMMERCIAL & DIRECTING INQUIRIES</span>
            <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">HAVE A PROJECT IN MIND?</h4>
            <p className="text-xs md:text-sm text-zinc-400 max-w-xl">
              Available for visual direction, commercial brand films, and creative storytelling.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex-shrink-0"
          >
            START A CONVERSATION
          </Link>
        </div>
      </section>

    </div>
  );
}
