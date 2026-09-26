import { useState } from 'react';
import { Play, Sparkles, Compass, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenHeroVideo: () => void;
  onExploreCampus: () => void;
  onBookVisit: () => void;
}

export default function HeroSection({
  onOpenHeroVideo,
  onExploreCampus,
  onBookVisit,
}: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <section id="our-world" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Subtle Editorial Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WonderNest School · Early Years & Elementary</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1E2522] leading-[1.08] text-balance">
            Where little minds grow big dreams.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#55605A] font-sans leading-relaxed max-w-2xl text-balance">
            A progressive, nature-immersed elementary school where children aged 3 to 12 investigate real-world questions through art, science, acoustic music, and unhurried woodland exploration.
          </p>
        </div>

        {/* Cinematic Hero Video Canvas Showcase */}
        <div
          onClick={onOpenHeroVideo}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor="PLAY"
          className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden cursor-pointer bg-[#151B18] shadow-2xl border border-[#E8E2D9] transition-all duration-700"
        >
          {/* Main Documentary Visual Asset */}
          <img
            src="/src/assets/images/hero_school_campus_1790399923439.jpg"
            alt="WonderNest School Campus Morning Arrival"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
              isHovered ? 'scale-104 filter brightness-95' : 'scale-100'
            }`}
          />

          {/* Measured Contrast Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

          {/* Top Bar inside Video Card */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-10">
            <span className="text-xs font-mono tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              School Life Documentary Film
            </span>
            <span className="text-xs font-mono text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              03:45 4K
            </span>
          </div>

          {/* Center Play Beacon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 text-[#1E2522] flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-500 ease-out ${
                isHovered
                  ? 'scale-110 bg-[#E27D60] text-white shadow-[0_0_40px_rgba(226,125,96,0.6)]'
                  : 'scale-95 opacity-90'
              }`}
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>

            <span className="text-xs md:text-sm font-sans tracking-wide text-white/90 mt-4 font-medium drop-shadow-md">
              Watch The WonderNest Story
            </span>
          </div>

          {/* Bottom Emotional Poetic Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
            <div className="max-w-xl">
              <p className="font-serif italic text-lg md:text-2xl text-white/95 leading-snug drop-shadow-md">
                “Every day begins with a question. What will we discover today?”
              </p>
              <p className="text-xs md:text-sm text-neutral-300 font-sans mt-2">
                Documentary footage of everyday moments across our classrooms, ateliers, and forest trails.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#F7DC6F] bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <span>Click to Expand Video</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* 4 Grounded Architectural Pillars (No Pill Badges, Clean Typography) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 pt-12 border-t border-[#E8E2D9]">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#8C8275] mb-2">
              01 · Student Ratio
            </div>
            <div className="font-serif text-3xl font-medium text-[#1E2522]">
              1 : 7
            </div>
            <p className="text-xs text-[#55605A] mt-1.5 leading-relaxed">
              Educators observe, listen, and document each child’s inquiry daily.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#8C8275] mb-2">
              02 · Forest Sanctuary
            </div>
            <div className="font-serif text-3xl font-medium text-[#1E2522]">
              4.2 Acres
            </div>
            <p className="text-xs text-[#55605A] mt-1.5 leading-relaxed">
              Living woodlands, running brooks, edible sensory gardens, and orchard.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#8C8275] mb-2">
              03 · Pedagogical Roots
            </div>
            <div className="font-serif text-3xl font-medium text-[#1E2522]">
              Reggio & Inquiry
            </div>
            <p className="text-xs text-[#55605A] mt-1.5 leading-relaxed">
              Honoring the child’s hundred languages of expression and thought.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#8C8275] mb-2">
              04 · Campus Design
            </div>
            <div className="font-serif text-3xl font-medium text-[#1E2522]">
              Passive Timber
            </div>
            <p className="text-xs text-[#55605A] mt-1.5 leading-relaxed">
              Natural daylighting, non-toxic organic finishes, and acoustics designed for calm.
            </p>
          </div>
        </div>

        {/* Quick Action Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-12 p-6 rounded-2xl bg-[#F4EFEA] border border-[#E8E2D9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E2522] text-white flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#F7DC6F]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-[#1E2522] text-base">
                Experience the WonderNest Campus in 3D
              </h3>
              <p className="text-xs text-[#55605A]">
                Explore our miniature architectural model and step directly into individual learning ateliers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreCampus}
              className="px-5 py-2.5 rounded-full bg-[#1E2522] hover:bg-[#2C3832] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              EXPLORE 3D CAMPUS
            </button>
            <button
              onClick={onBookVisit}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#EAE3D9] text-[#1E2522] border border-[#D8CFC2] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              SCHEDULE A WALKTHROUGH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
