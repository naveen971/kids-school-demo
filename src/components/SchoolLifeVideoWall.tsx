import { useState } from 'react';
import { VIDEO_STORIES, VideoStory } from '../data/schoolData';
import VideoCard from './VideoCard';
import { Clapperboard } from 'lucide-react';

interface SchoolLifeVideoWallProps {
  onOpenVideo: (story: VideoStory) => void;
}

export default function SchoolLifeVideoWall({ onOpenVideo }: SchoolLifeVideoWallProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'CLASSROOM',
    'PLAY',
    'ART',
    'SPORTS',
    'MUSIC',
    'EVENTS',
    'NATURE'
  ];

  const filteredStories = activeCategory === 'ALL'
    ? VIDEO_STORIES
    : VIDEO_STORIES.filter((s) => s.category === activeCategory);

  return (
    <section className="relative py-28 bg-[#151B18] text-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Cinematic Dark Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F7DC6F] mb-3">
              <Clapperboard className="w-3.5 h-3.5" />
              <span>Documentary Video Wall</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">
              School Life in Motion
            </h2>
            <p className="mt-3 text-sm md:text-base text-neutral-300 font-sans max-w-xl leading-relaxed">
              Real moments documented across 4 seasons. Hover to preview footage; click to expand into our cinematic theater.
            </p>
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/5 p-1.5 rounded-xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#E27D60] text-white font-semibold shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <div key={story.id} className="flex flex-col">
              <VideoCard
                id={story.id}
                title={story.title}
                category={story.category}
                duration={story.duration}
                poster={story.poster}
                quote={story.quote}
                subtitle={story.description}
                onOpenVideo={() => onOpenVideo(story)}
                aspect="video"
              />
            </div>
          ))}
        </div>

        {/* Bottom Film Reel Note */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
          <span>ALL FOOTAGE CAPTURED ON CAMPUS · AUTHENTIC LEARNING MOMENTS</span>
          <span>CURATED BY WONDERNEST CREATIVE STUDIO</span>
        </div>
      </div>
    </section>
  );
}
