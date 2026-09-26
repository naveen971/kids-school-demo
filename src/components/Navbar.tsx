import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Calendar } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface NavbarProps {
  onBookVisit: () => void;
  onReopenIntro?: () => void;
}

export default function Navbar({ onBookVisit, onReopenIntro }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundManager.toggleMute();
    setIsAudioActive(active);
  };

  const navLinks = [
    { label: 'Our World', href: '#our-world' },
    { label: '3D Campus', href: '#campus-3d' },
    { label: 'A Day in Life', href: '#day-in-life' },
    { label: 'Activities', href: '#activities' },
    { label: "Children's Work", href: '#children-art' },
    { label: 'Families', href: '#families' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E8E2D9] py-3.5 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="font-serif text-2xl font-semibold tracking-tight text-[#1E2522] hover:text-[#E27D60] transition-colors"
            >
              WONDERNEST
            </a>

            {onReopenIntro && (
              <button
                onClick={onReopenIntro}
                title="Watch opening experience again"
                className="hidden xl:inline-block text-[11px] font-mono text-[#8C8275] hover:text-[#1E2522] transition-colors"
              >
                (replay intro)
              </button>
            )}
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A5550]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#1E2522] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E27D60] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isAudioActive ? 'Mute atmosphere sound' : 'Enable atmosphere sound'}
              title={isAudioActive ? 'Mute atmosphere' : 'Enable ambient sound'}
              className="w-9 h-9 rounded-full bg-[#EFE9E0]/80 hover:bg-[#E8E2D9] text-[#2C3531] flex items-center justify-center transition-colors cursor-pointer"
            >
              {isAudioActive ? (
                <Volume2 className="w-4 h-4 text-[#E27D60]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#8C8275]" />
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onBookVisit}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E2522] hover:bg-[#2F3E37] text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F7DC6F]" />
              <span>BOOK A VISIT</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden w-10 h-10 rounded-full bg-[#EFE9E0] text-[#1E2522] flex items-center justify-center transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#FAF8F5] pt-24 px-8 pb-10 flex flex-col justify-between animate-fade-in">
          <nav className="flex flex-col gap-6 text-xl font-serif text-[#1E2522]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#EAE3D9] flex items-center justify-between hover:text-[#E27D60]"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#8C8275]">→</span>
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-[#EAE3D9] flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookVisit();
              }}
              className="w-full py-4 rounded-full bg-[#E27D60] text-white font-semibold text-center text-sm shadow-md"
            >
              BOOK A SCHOOL VISIT
            </button>

            <div className="flex items-center justify-between text-xs text-[#8C8275] font-mono">
              <span>WONDERNEST SCHOOL</span>
              <span>AGES 3–12</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
