import { ACTIVITIES_DATA, ActivityItem } from '../data/schoolData';
import VideoCard from './VideoCard';
import { Palette, Sparkles } from 'lucide-react';

interface ActivityWallProps {
  onSelectActivity: (activity: ActivityItem) => void;
}

export default function ActivityWall({ onSelectActivity }: ActivityWallProps) {
  return (
    <section id="activities" className="relative py-28 bg-[#F5EFE7] border-y border-[#EAE1D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>Interactive Disciplines</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-[#1E2522] tracking-tight">
            The Hundred Languages of Learning
          </h2>

          <p className="mt-3 text-sm md:text-base text-[#55605A] font-sans leading-relaxed">
            Lorris Malaguzzi wrote that a child has a hundred languages, but the world steals ninety-nine. At WonderNest, hands, eyes, clay, instruments, and soil speak with equal dignity.
          </p>
        </div>

        {/* Visual Editorial Grid of Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES_DATA.map((activity) => (
            <div key={activity.id} className="flex flex-col">
              <VideoCard
                id={activity.id}
                title={activity.title}
                category={activity.category}
                duration={activity.duration}
                poster={activity.poster}
                quote={activity.expandedQuote}
                subtitle={activity.shortDesc}
                onOpenVideo={() => onSelectActivity(activity)}
                aspect="video"
              />

              {/* Editorial Caption Box below card */}
              <div className="mt-4 px-1 flex items-center justify-between text-xs text-[#707B75] font-mono">
                <span>Focus: {activity.curriculumFocus.split(',')[0]}</span>
                <span className="text-[#E27D60] font-sans font-medium hover:underline cursor-pointer" onClick={() => onSelectActivity(activity)}>
                  Explore studio →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Quotation Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-[#EFE9DF] border border-[#E0D8CB] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C8275] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E27D60]" />
              Material Integrity Principle
            </span>
            <p className="font-serif italic text-base md:text-lg text-[#1E2522]">
              “We do not give children synthetic plastic toys with pre-programmed sounds. We give them raw linen, resonant wood, stoneware clay, and real hand tools.”
            </p>
          </div>
          <div className="shrink-0 text-right md:border-l md:border-[#D5CCC0] md:pl-8">
            <div className="font-serif text-sm font-semibold text-[#1E2522]">Ms. Ananya Sen</div>
            <div className="text-xs font-mono text-[#7A8580]">Master Atelierista</div>
          </div>
        </div>
      </div>
    </section>
  );
}
