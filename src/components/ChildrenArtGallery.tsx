import { useState } from 'react';
import { CHILDREN_ARTWORKS, ChildArtwork } from '../data/schoolData';
import { Sparkles, X, Heart, ZoomIn } from 'lucide-react';

export default function ChildrenArtGallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<ChildArtwork | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    'art-1': 42,
    'art-2': 38,
    'art-3': 51,
    'art-4': 29
  });

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="children-art" className="relative py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Children's Creative World</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1E2522] tracking-tight">
              Made by Little Hands
            </h2>
            <p className="text-sm md:text-base text-[#55605A] max-w-xl mt-2 font-sans">
              Authentic student paintings, architectural models, natural wood crafts, and handwritten dreams documented in their raw, unedited honesty.
            </p>
          </div>

          <div className="text-xs font-mono text-[#8C8275] border-b border-[#E0D8CB] pb-2">
            EXHIBIT NO. 14 · AUTUMN QUARTER ATELIER ARCHIVE
          </div>
        </div>

        {/* Editorial Asymmetric Artwork Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {CHILDREN_ARTWORKS.map((art, idx) => {
            const isWide = idx === 0 || idx === 3;
            const colSpan = isWide ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <div
                key={art.id}
                onClick={() => setSelectedArtwork(art)}
                data-cursor="VIEW"
                className={`${colSpan} group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                {/* Artwork Canvas Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF5EE]">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

                  {/* Top Creator Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-10">
                    <span className="font-serif text-sm font-medium text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      {art.artist}, age {art.age}
                    </span>
                    <button
                      onClick={(e) => toggleLike(art.id, e)}
                      aria-label="Appreciate artwork"
                      className="flex items-center gap-1.5 text-[11px] font-mono text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 hover:bg-[#E27D60] transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-[#F7DC6F]" />
                      <span>{likes[art.id] || 0}</span>
                    </button>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#1E2522] flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Editorial Label Plaque */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8275] mb-1">
                    <span>{art.grade}</span>
                    <span>{art.medium.split(',')[0]}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1E2522] tracking-tight group-hover:text-[#E27D60] transition-colors">
                    {art.title}
                  </h3>

                  <p className="mt-2.5 text-xs md:text-sm font-serif italic text-[#4A5550] border-l-2 border-[#E27D60] pl-3 leading-relaxed">
                    “{art.quote}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Artwork Lightbox Modal */}
      {selectedArtwork && (
        <div
          onClick={() => setSelectedArtwork(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedArtwork(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Artwork view */}
            <div className="md:w-3/5 bg-[#151B18] flex items-center justify-center p-4">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] md:max-h-[80vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Right: Curatorial Story & Dialogue */}
            <div className="md:w-2/5 p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-1">
                  WonderNest Atelier Collection
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[#1E2522] leading-tight">
                  {selectedArtwork.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#8C8275]">
                  <span className="font-semibold text-[#1E2522]">By {selectedArtwork.artist}</span>
                  <span>·</span>
                  <span>Age {selectedArtwork.age}</span>
                  <span>·</span>
                  <span>{selectedArtwork.grade}</span>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-[#F0EBE3] border border-[#E4DDD0]">
                  <div className="text-[11px] font-mono uppercase text-[#8C8275] mb-1">
                    The Child’s Voice
                  </div>
                  <p className="font-serif italic text-sm text-[#1E2522] leading-relaxed">
                    “{selectedArtwork.quote}”
                  </p>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8C8275] mb-1">
                    Medium & Materials
                  </div>
                  <p className="text-xs text-[#55605A] font-sans">
                    {selectedArtwork.medium}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8C8275] mb-1">
                    Curatorial Pedagogical Note
                  </div>
                  <p className="text-xs text-[#55605A] font-sans leading-relaxed">
                    {selectedArtwork.curatorNote}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8E1D5] flex items-center justify-between">
                <span className="text-xs font-mono text-[#8C8275]">Curator: Ms. Ananya Sen</span>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="px-4 py-2 rounded-full bg-[#1E2522] text-white text-xs font-medium cursor-pointer hover:bg-[#344039] transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
