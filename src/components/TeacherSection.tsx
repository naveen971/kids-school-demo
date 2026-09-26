import { useState } from 'react';
import { TEACHERS, TeacherProfile } from '../data/schoolData';
import { Sparkles, X, Quote, Play } from 'lucide-react';

interface TeacherSectionProps {
  onOpenTeacherVideo: (teacher: TeacherProfile) => void;
}

export default function TeacherSection({ onOpenTeacherVideo }: TeacherSectionProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile | null>(null);

  return (
    <section className="relative py-28 bg-[#F5EFE7] border-y border-[#EAE0D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Faculty & Mentorship</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-[#1E2522] tracking-tight">
            The People Behind Their First Big Questions
          </h2>

          <p className="mt-3 text-sm md:text-base text-[#55605A] font-sans leading-relaxed">
            Our educators are researchers, naturalists, and listeners. They do not stand over children with rigid lesson scripts; they kneel beside them with notebooks, magnifying lenses, and quiet reverence.
          </p>
        </div>

        {/* Human-Centered Editorial Teacher Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEACHERS.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              data-cursor="VIEW"
              className="group cursor-pointer flex flex-col"
            >
              {/* Portrait Frame */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1E2522] shadow-sm group-hover:shadow-xl transition-all duration-500 border border-[#E3DBD0]">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/85 transition-colors" />

                {/* Bottom Card Identity */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white transform transition-transform duration-300">
                  <span className="text-[11px] font-mono text-[#F7DC6F] uppercase tracking-wider">
                    {teacher.experience.split(' ')[0]} Yrs Experience
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium mt-0.5">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-white/80 font-sans mt-0.5">
                    {teacher.role}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-mono uppercase bg-white/90 text-black px-2.5 py-1 rounded-full shadow-xs">
                    View Story
                  </span>
                </div>
              </div>

              {/* Snippet Philosophy Below */}
              <p className="mt-3.5 text-xs font-serif italic text-[#4A5550] line-clamp-2 px-1">
                “{teacher.philosophy}”
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Teacher Profile Modal */}
      {selectedTeacher && (
        <div
          onClick={() => setSelectedTeacher(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedTeacher(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Portrait */}
            <div className="md:w-5/12 relative aspect-[3/4] md:aspect-auto bg-[#1A221F]">
              <img
                src={selectedTeacher.photo}
                alt={selectedTeacher.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 right-4 md:hidden text-white">
                <h3 className="font-serif text-2xl">{selectedTeacher.name}</h3>
                <p className="text-xs text-neutral-300">{selectedTeacher.role}</p>
              </div>
            </div>

            {/* Right: Pedagogy & Message */}
            <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="hidden md:block">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-1">
                    WonderNest Faculty Member
                  </div>
                  <h3 className="font-serif text-3xl text-[#1E2522]">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-sm text-[#55605A] font-sans mt-0.5">
                    {selectedTeacher.role}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-[#8C8275]">
                  <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-md text-[#1E2522]">
                    {selectedTeacher.experience}
                  </span>
                  <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-md text-[#55605A]">
                    {selectedTeacher.education}
                  </span>
                </div>

                {/* Educational Philosophy */}
                <div className="mt-6 p-4 rounded-xl bg-[#F0EBE3] border border-[#E3DBD0]">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#E27D60] mb-1">
                    <Quote className="w-3.5 h-3.5 fill-current" />
                    Teaching Philosophy
                  </div>
                  <p className="font-serif italic text-sm text-[#1E2522] leading-relaxed">
                    “{selectedTeacher.philosophy}”
                  </p>
                </div>

                {/* Letter to Parents */}
                <div className="mt-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8C8275] mb-1">
                    Message to Prospective Families
                  </div>
                  <p className="text-xs md:text-sm text-[#55605A] font-sans leading-relaxed">
                    {selectedTeacher.message}
                  </p>
                </div>

                {/* Favorite child question */}
                <div className="mt-5 p-3 rounded-lg bg-white border border-[#E8E1D5]">
                  <span className="text-[11px] font-mono text-[#8C8275] uppercase block mb-1">
                    Favorite Student Question Received This Term:
                  </span>
                  <p className="font-serif italic text-xs md:text-sm text-[#1E2522]">
                    {selectedTeacher.favoriteQuestion}
                  </p>
                </div>
              </div>

              {/* Action: Watch Video Message */}
              <div className="mt-8 pt-6 border-t border-[#E8E1D5] flex items-center justify-between">
                <button
                  onClick={() => {
                    const t = selectedTeacher;
                    setSelectedTeacher(null);
                    onOpenTeacherVideo(t);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E27D60] hover:bg-[#d66a4e] text-white text-xs font-semibold tracking-wide shadow-md transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>WATCH VIDEO MESSAGE (02:15)</span>
                </button>

                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="text-xs font-mono text-[#8C8275] hover:text-[#1E2522] uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
