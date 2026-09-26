import { useState } from 'react';
import { VIRTUAL_TOUR_STOPS } from '../data/schoolData';
import { MapPin, Play, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

interface VirtualTourProps {
  onOpenTourVideo: (stop: typeof VIRTUAL_TOUR_STOPS[0]) => void;
}

export default function VirtualTour({ onOpenTourVideo }: VirtualTourProps) {
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const activeStop = VIRTUAL_TOUR_STOPS[activeStopIndex];

  return (
    <section className="relative py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Digital Architectural Walkthrough</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-[#1E2522] tracking-tight">
            Walk Through WonderNest
          </h2>

          <p className="mt-3 text-sm md:text-base text-[#55605A] font-sans leading-relaxed">
            Navigate through our 7 architectural stops. Inspect passive lighting design, material selections, and discover how our physical environment acts as the child’s third teacher.
          </p>
        </div>

        {/* Interactive Tour Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#F5EFE7] rounded-3xl p-6 md:p-10 border border-[#E5DDD0] shadow-sm">
          {/* Left Column: Navigation Radar & List of Stops */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8C8275] mb-2 px-2">
              Tour Sequence
            </div>

            {VIRTUAL_TOUR_STOPS.map((stop, idx) => {
              const isActive = activeStopIndex === idx;
              return (
                <button
                  key={stop.id}
                  onClick={() => setActiveStopIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#1E2522] text-white shadow-md'
                      : 'bg-white hover:bg-[#FAF8F5] text-[#1E2522] border border-[#E8E1D5]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono ${isActive ? 'text-[#F7DC6F]' : 'text-[#8C8275]'}`}>
                        {stop.tag}
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-mono uppercase bg-[#E27D60] text-white px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                          YOU ARE HERE
                        </span>
                      )}
                    </div>
                    <div className="font-serif text-sm md:text-base font-medium mt-0.5">
                      {stop.name}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#F7DC6F] translate-x-1' : 'text-[#8C8275]'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Res Panoramic View with "YOU ARE HERE" Beacon */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div
              onClick={() => onOpenTourVideo(activeStop)}
              data-cursor="PLAY"
              className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group shadow-lg bg-[#151B18]"
            >
              <img
                src={activeStop.poster}
                alt={activeStop.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />

              {/* "YOU ARE HERE" Radar Marker */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-[#1E2522]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E27D60] animate-ping" />
                <span className="text-[#F7DC6F] font-semibold">YOU ARE HERE:</span>
                <span>{activeStop.coords}</span>
              </div>

              {/* Center Play Beacon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-[#E27D60] group-hover:text-white text-[#1E2522] flex items-center justify-center shadow-xl transition-all duration-300">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom specification banner */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs z-10">
                <span className="font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                  Spec: {activeStop.keyStat}
                </span>
                <span className="font-mono text-[#F7DC6F] uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                  Experience Virtual Pan (02:30)
                </span>
              </div>
            </div>

            {/* Architectural Dossier */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EFE8DD]">
                <div>
                  <h3 className="font-serif text-2xl text-[#1E2522]">
                    {activeStop.name}
                  </h3>
                  <p className="text-xs text-[#8C8275] font-mono mt-0.5">
                    Location Zone: {activeStop.coords} · Architectural Spec: {activeStop.keyStat}
                  </p>
                </div>

                <button
                  onClick={() => onOpenTourVideo(activeStop)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E27D60] hover:bg-[#d66a4e] text-white text-xs font-semibold tracking-wide shadow-md transition-colors cursor-pointer self-start md:self-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>WATCH PANORAMA FILM</span>
                </button>
              </div>

              <p className="mt-4 text-xs md:text-sm text-[#55605A] font-sans leading-relaxed">
                {activeStop.description}
              </p>

              {/* Highlights checklist */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeStop.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-xs text-[#4A5550]">
                    <CheckCircle2 className="w-4 h-4 text-[#E27D60] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
