import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, RotateCcw, Sparkles } from 'lucide-react';

interface InteractiveVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  posterSrc: string;
  title: string;
  subtitle?: string;
  quote?: string;
  author?: string;
}

export default function InteractiveVideoModal({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
  title,
  subtitle,
  quote,
  author,
}: InteractiveVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(94); // default ~1m 34s simulation
  const [hasRealVideo, setHasRealVideo] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const simTimerRef = useRef<number | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isPlaying, isMuted]);

  // Video playback or simulated reel timing
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      if (simTimerRef.current) clearInterval(simTimerRef.current);
      return;
    }

    setIsPlaying(true);

    if (!hasRealVideo) {
      simTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) return 0;
          return prev + 0.25;
        });
      }, 250);
    }

    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, [isOpen, hasRealVideo, duration]);

  useEffect(() => {
    setProgress((currentTime / duration) * 100);
  }, [currentTime, duration]);

  const togglePlay = () => {
    if (hasRealVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (hasRealVideo && videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    setCurrentTime(newTime);
    if (hasRealVideo && videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video bg-[#0D1110] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
          >
            {/* Real video if available, with graceful poster + live simulated canvas playback */}
            {videoSrc && (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                playsInline
                autoPlay
                muted={isMuted}
                onLoadedMetadata={() => {
                  setHasRealVideo(true);
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                onError={() => setHasRealVideo(false)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hasRealVideo ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {/* Cinematic simulated documentary visual display when video is in demo/poster state */}
            {!hasRealVideo && (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={posterSrc}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transform transition-transform duration-[12000ms] ease-out ${
                    isPlaying ? 'scale-108' : 'scale-100'
                  } filter brightness-[0.85] contrast-[1.05]`}
                />
                {/* Subtle film grain & gradient scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/70 pointer-events-none" />
              </div>
            )}

            {/* Top Bar Header */}
            <div
              className={`relative z-20 flex items-center justify-between p-6 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#E27D60] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  WonderNest Experiential Cinema
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-white tracking-tight mt-0.5">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs md:text-sm text-neutral-300 font-sans mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                aria-label="Close video player"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Poetic Reflection Overlay (fades out when playing) */}
            {quote && (
              <div
                className={`relative z-10 px-8 max-w-2xl mx-auto text-center transition-opacity duration-700 pointer-events-none ${
                  !isPlaying || showControls ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <p className="font-serif italic text-lg md:text-2xl text-white/95 leading-relaxed drop-shadow-md">
                  “{quote}”
                </p>
                {author && (
                  <p className="text-xs md:text-sm font-sans text-[#E27D60] uppercase tracking-widest font-medium mt-3">
                    — {author}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div
              className={`relative z-20 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Scrubber */}
              <div
                onClick={handleSeek}
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative group mb-4 overflow-hidden"
              >
                <div
                  className="h-full bg-[#E27D60] rounded-full relative transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white text-xs md:text-sm">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="w-9 h-9 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTime(0);
                      if (hasRealVideo && videoRef.current) videoRef.current.currentTime = 0;
                    }}
                    aria-label="Replay from start"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <span className="font-mono text-xs text-neutral-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-xs text-neutral-400 uppercase tracking-widest font-mono">
                    WonderNest 4K Campus Reel
                  </span>
                  <button
                    onClick={() => {
                      if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen?.().catch(() => {});
                      } else {
                        document.exitFullscreen?.().catch(() => {});
                      }
                    }}
                    aria-label="Fullscreen"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
