import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Only show custom cursor on devices that support hover / fine pointer (desktop)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Look for data-cursor attribute or parent with it
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
      } else {
        setCursorText('');
      }

      // Check if clickable
      const clickable = !!target.closest('button, a, input, select, textarea, [role="button"]');
      setIsPointer(clickable);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isDesktop || !isVisible) return null;

  const hasText = cursorText.length > 0;

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        left: 0,
        top: 0
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ease-out select-none ${
          hasText
            ? 'w-20 h-20 bg-[#1E2522]/90 backdrop-blur-md text-[#FAF8F5] text-[11px] font-semibold tracking-widest uppercase shadow-xl ring-1 ring-white/20'
            : isPointer
            ? 'w-10 h-10 bg-[#E27D60]/20 border border-[#E27D60] scale-110'
            : 'w-3.5 h-3.5 bg-[#1E2522]/70 ring-2 ring-[#1E2522]/20'
        }`}
      >
        {hasText && (
          <span className="animate-fade-in font-mono tracking-wider text-[10px]">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
