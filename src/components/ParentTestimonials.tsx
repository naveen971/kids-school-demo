import { PARENT_STORIES, ParentStory } from '../data/schoolData';
import { Play, HeartHandshake } from 'lucide-react';

interface ParentTestimonialsProps {
  onOpenParentVideo: (story: ParentStory) => void;
}

export default function ParentTestimonials({ onOpenParentVideo }: ParentTestimonialsProps) {
  return (
    <section id="families" className="relative py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Family Community Perspectives</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-[#1E2522] tracking-tight">
            What Families Notice
          </h2>

          <p className="mt-3 text-sm md:text-base text-[#55605A] font-sans leading-relaxed">
            Unscripted video conversations with parents about the subtle, profound shifts they witnessed at home—in their child’s sleep, curiosity, empathy, and joy.
          </p>
        </div>

        {/* Testimonial Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARENT_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => onOpenParentVideo(story)}
              data-cursor="PLAY"
              className="group cursor-pointer bg-white rounded-3xl p-6 border border-[#E8E1D5] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Video Thumbnail Frame with Play Beacon */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-[#151B18]">
                  <img
                    src={story.poster}
                    alt={story.parentNames}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                  {/* Play Beacon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-[#E27D60] group-hover:text-white text-[#1E2522] flex items-center justify-center shadow-lg transition-all duration-300">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom duration & location */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                      {story.location}
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[#F7DC6F]">
                      {story.duration} Reel
                    </span>
                  </div>
                </div>

                {/* Sincere Observation Headline */}
                <h3 className="font-serif text-lg md:text-xl text-[#1E2522] leading-snug group-hover:text-[#E27D60] transition-colors">
                  “{story.headline}”
                </h3>

                {/* Quote */}
                <p className="mt-3 text-xs md:text-sm text-[#55605A] font-sans leading-relaxed line-clamp-4">
                  {story.quote}
                </p>
              </div>

              {/* Parent Info Footnote */}
              <div className="mt-6 pt-4 border-t border-[#EFE8DD] flex items-center justify-between">
                <div>
                  <div className="font-serif text-sm font-semibold text-[#1E2522]">
                    {story.parentNames}
                  </div>
                  <div className="text-xs font-mono text-[#8C8275]">
                    {story.childInfo}
                  </div>
                </div>

                <span className="text-xs font-mono text-[#E27D60] group-hover:underline">
                  Watch interview →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
