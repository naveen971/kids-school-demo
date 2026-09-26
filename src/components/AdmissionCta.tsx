import { Calendar, Compass, ArrowRight } from 'lucide-react';

interface AdmissionCtaProps {
  onBookVisit: () => void;
  onExploreCampus: () => void;
}

export default function AdmissionCta({ onBookVisit, onExploreCampus }: AdmissionCtaProps) {
  return (
    <section className="relative py-32 bg-[#1E2522] text-[#FAF8F5] overflow-hidden">
      {/* Background Architectural Scrim & Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src="/src/assets/images/hero_school_campus_1790399923439.jpg"
          alt="Campus Grounds"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-[#1E2522] mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F7DC6F] mb-4 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
          <span>Admissions & Campus Visits</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight text-balance">
          Come See Where Their Story Begins.
        </h2>

        <p className="mt-6 text-base sm:text-xl text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed text-balance">
          Visit WonderNest and experience our learning spaces, meet our educators, and see everyday school life for yourself.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBookVisit}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E27D60] hover:bg-[#d66a4e] text-white font-sans text-sm font-semibold tracking-wide shadow-xl transition-all duration-300 ease-out cursor-pointer hover:scale-103"
          >
            <Calendar className="w-4 h-4 text-[#F7DC6F]" />
            <span>BOOK A SCHOOL VISIT</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCampus}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans text-sm font-semibold tracking-wide backdrop-blur-md transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-neutral-300" />
            <span>EXPLORE THE CAMPUS</span>
          </button>
        </div>

        {/* Quiet Reassurance Trust Line */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-neutral-400">
          <span>COGNITIVE RIGOR & DEEP JOY</span>
          <span>·</span>
          <span>NO STANDARDIZED TEST DRILLS</span>
          <span>·</span>
          <span>UNHURRIED CHILDHOOD</span>
        </div>
      </div>
    </section>
  );
}
