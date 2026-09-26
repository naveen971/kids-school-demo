import { useState, useRef } from 'react';
import { DAY_JOURNEY, DayTimelineItem } from '../data/schoolData';
import { Clock, Play, ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react';

interface DayInWorldProps {
  onOpenVideo: (item: DayTimelineItem) => void;
}

export default function DayInWorld({ onOpenVideo }: DayInWorldProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const activeItem = DAY_JOURNEY[activeIndex];

  const handleSelectTime = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) handleSelectTime(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < DAY_JOURNEY.length - 1) handleSelectTime(activeIndex + 1);
  };

  return (
    <section id="day-in-life" className="relative py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Cinematic Day Journey</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1E2522] tracking-tight">
              A Day in Their World
            </h2>
            <p className="text-sm md:text-base text-[#55605A] max-w-xl mt-2 font-sans">
              Follow how an unhurried, inquiry-centered day unfolds—from the first step across our timber threshold to muddy shoes and afternoon reflection.
            </p>
          </div>

          {/* Time Dial Scrubber Tabs */}
          <div className="flex items-center gap-2 bg-[#F0EBE3] p-1.5 rounded-full border border-[#E3DBD0] self-start md:self-auto overflow-x-auto max-w-full">
            {DAY_JOURNEY.map((item, idx) => (
              <button
                key={item.time}
                onClick={() => handleSelectTime(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-[#1E2522] text-white shadow-xs font-semibold'
                    : 'text-[#55605A] hover:text-[#1E2522]'
                }`}
              >
                {item.time}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Dynamic Active Time Story Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F3ECE4] rounded-3xl p-6 md:p-10 border border-[#E5DDD0] shadow-sm mb-12">
          {/* Left Column: Visual Video Banner with Play Beacon */}
          <div
            onClick={() => onOpenVideo(activeItem)}
            data-cursor="PLAY"
            className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group shadow-lg bg-[#151B18]"
          >
            <img
              src={activeItem.poster}
              alt={activeItem.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-[#E27D60] group-hover:text-white text-[#1E2522] flex items-center justify-center shadow-xl transition-all duration-300">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>

            {/* Bottom time and location tag */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs z-10">
              <span className="font-mono bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E27D60]" />
                {activeItem.location}
              </span>
              <span className="font-mono text-[#F7DC6F] uppercase tracking-wider bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                Watch 02:45 Reel
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Pedagogical Reflection */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#8C8275] mb-2">
                <span className="text-xl font-serif text-[#E27D60] font-normal">{activeItem.time}</span>
                <span>·</span>
                <span className="uppercase tracking-widest">{activeItem.period}</span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-[#1E2522] tracking-tight">
                {activeItem.title}
              </h3>

              <p className="mt-2 text-sm font-serif italic text-[#4A5550]">
                {activeItem.subtitle}
              </p>

              <p className="mt-4 text-xs md:text-sm text-[#55605A] font-sans leading-relaxed">
                {activeItem.description}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-white/80 border border-[#E8DFD3]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8C8275] mb-1">
                  Pedagogical Anchor
                </div>
                <p className="text-xs font-serif italic text-[#1E2522]">
                  “{activeItem.reflection}”
                </p>
              </div>
            </div>

            {/* Step Controls */}
            <div className="mt-8 pt-6 border-t border-[#E5DDD0] flex items-center justify-between">
              <button
                onClick={() => onOpenVideo(activeItem)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E2522] hover:bg-[#2C3832] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>EXPERIENCE THIS MOMENT</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#FAF8F5] disabled:opacity-40 text-[#1E2522] border border-[#DDD3C5] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === DAY_JOURNEY.length - 1}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#FAF8F5] disabled:opacity-40 text-[#1E2522] border border-[#DDD3C5] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Card Reel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
        >
          {DAY_JOURNEY.map((item, idx) => (
            <div
              key={item.time}
              onClick={() => handleSelectTime(idx)}
              className={`shrink-0 w-72 md:w-80 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'bg-white border-[#1E2522] shadow-md scale-102'
                  : 'bg-[#F7F3EE] border-[#E8E1D5] hover:bg-white hover:border-[#D6CCBF]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#E27D60]">{item.time}</span>
                <span className="text-[10px] font-mono uppercase text-[#8C8275]">{item.period}</span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-neutral-200">
                <img
                  src={item.poster}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center shadow-xs">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <h4 className="font-serif font-medium text-[#1E2522] text-sm leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-[#55605A] mt-1 line-clamp-2">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
