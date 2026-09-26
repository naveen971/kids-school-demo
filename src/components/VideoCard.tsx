import { useState, useRef } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  category?: string;
  duration?: string;
  poster: string;
  videoSrc?: string;
  quote?: string;
  subtitle?: string;
  onOpenVideo: () => void;
  aspect?: 'video' | 'portrait' | 'square' | 'wide';
}

export default function VideoCard({
  title,
  category,
  duration = '02:30',
  poster,
  videoSrc,
  quote,
  subtitle,
  onOpenVideo,
  aspect = 'video',
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoSrc && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoSrc && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const aspectClasses = {
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]'
  }[aspect];

  return (
    <div
      onClick={onOpenVideo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="PLAY"
      className={`group relative ${aspectClasses} rounded-2xl overflow-hidden cursor-pointer bg-[#151B18] shadow-md hover:shadow-xl transition-all duration-500 will-change-transform border border-[#1E2522]/10`}
    >
      {/* Background Poster Image */}
      <img
        src={poster}
        alt={title}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
          isHovered ? 'scale-105 filter brightness-95' : 'scale-100'
        }`}
      />

      {/* Optional video loop preview on hover */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Atmospheric gradient overlay scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/45" />

      {/* Top Header metadata */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        {category ? (
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            {category}
          </span>
        ) : <span />}

        {duration && (
          <span className="text-[11px] font-mono text-white/80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 tabular-nums">
            {duration}
          </span>
        )}
      </div>

      {/* Center Interactive Play Beacon */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div
          className={`w-14 h-14 rounded-full bg-white/90 text-[#1E2522] flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 ease-out ${
            isHovered ? 'scale-115 bg-[#E27D60] text-white shadow-xl' : 'scale-90 opacity-80'
          }`}
        >
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform transition-transform duration-300">
        <h4 className="font-serif text-lg md:text-xl text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#F7DC6F] transition-colors">
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs text-white/70 line-clamp-1 mt-1 font-sans">
            {subtitle}
          </p>
        )}
        {quote && (
          <p className="text-xs italic text-white/85 line-clamp-2 mt-1.5 font-serif border-l-2 border-[#E27D60] pl-2.5">
            “{quote}”
          </p>
        )}
      </div>
    </div>
  );
}
