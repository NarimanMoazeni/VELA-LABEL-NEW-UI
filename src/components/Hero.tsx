import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Sparkles, Feather } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, toPersianDigits } from '../data/products';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuickView: (product: Product) => void;
  featuredProducts?: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenQuickView,
  featuredProducts = [],
}) => {
  const pool = featuredProducts.length > 0 ? featuredProducts : PRODUCTS.slice(0, 3);

  const slides = pool.map((p) => ({
    product: p,
    image: p.gallery && p.gallery.length > 0 ? p.gallery[0] : p.image,
  }));

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play timer
  const go = useCallback(
    (d: 1 | -1) => {
      if (slides.length < 2) return;
      setDir(d);
      setPrevIndex(index);
      setIndex((prev) => (prev + d + slides.length) % slides.length);
    },
    [slides.length, index]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === index || slides.length < 2) return;
      setDir(i > index ? 1 : -1);
      setPrevIndex(index);
      setIndex(i);
    },
    [index, slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      go(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isHovered, go]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        go(1); // RTL swipe left -> next slide
      } else {
        go(-1); // RTL swipe right -> previous slide
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const safeIndex = Math.min(index, slides.length - 1);
  const current = slides[safeIndex];

  if (!current) return null;

  return (
    <section
      className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 pt-3 sm:pt-6 pb-6 select-none"
      aria-label="کمپین پاییز و زمستان ولا"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cinematic Wide Banner Frame */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 bg-[#14100E] min-h-[580px] sm:min-h-[560px] lg:min-h-[620px] flex items-center shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]">
        
        {/* Architectural Background Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Subtle Ambient Radial Lights */}
          <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#C5A880]/10 blur-[120px]" />
          <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] rounded-full bg-[#3D2B1F]/30 blur-[100px]" />
          
          {/* Embossed Architectural Wall Wordmark */}
          <span
            dir="ltr"
            className="font-serif font-bold uppercase text-[16vw] sm:text-[130px] lg:text-[180px] text-white/[0.035] tracking-widest absolute top-1/2 -translate-y-1/2 right-4 sm:right-16 select-none"
          >
            VELA
          </span>
          <span
            dir="ltr"
            className="font-latin text-[10px] sm:text-xs tracking-[0.45em] uppercase text-[#C5A880]/20 absolute top-[62%] right-8 sm:right-24 font-bold select-none"
          >
            CLOTHING STORE
          </span>
        </div>

        {/* Model Editorial Image Area (Positioned right/center with seamless fade) */}
        <div className="absolute inset-0 pointer-events-none">
          {slides.map((s, idx) => {
            const isActive = idx === safeIndex;
            return (
              <div
                key={s.image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <SafeImage
                  src={s.image}
                  fallback={s.product.image}
                  alt={isActive ? s.product.title : ''}
                  className="absolute inset-y-0 right-0 w-full sm:w-[68%] lg:w-[58%] h-full object-cover object-top sm:object-[center_top]"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Multi-stop Seamless Dark Blend Gradient */}
                {/* Horizontal blend (Desktop & Tablet) */}
                <div
                  className="hidden sm:block absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to right, #14100E 0%, #14100E 40%, rgba(20,16,14,0.85) 55%, rgba(20,16,14,0.3) 75%, transparent 100%)',
                  }}
                />

                {/* Vertical blend (Mobile) */}
                <div
                  className="sm:hidden absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #14100E 0%, #14100E 52%, rgba(20,16,14,0.7) 72%, rgba(20,16,14,0.2) 90%, transparent 100%)',
                  }}
                />

                {/* Top and Bottom soft dark vignettes */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#14100E]/80 via-[#14100E]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#14100E] via-[#14100E]/60 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Luxury Light Sweep Glint on slide change */}
        <div
          key={`hero-glint-${safeIndex}`}
          className="hero-glint absolute inset-0 z-15 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%] h-full -top-1/4 -left-1/2"
        />

        {/* Persian Content Column (Foreground Aligned Right-to-Left) */}
        <div className="relative z-20 w-full max-w-2xl px-6 sm:px-12 lg:px-16 py-12 sm:py-16 flex flex-col justify-center items-start text-right">
          
          {/* Season Tag with Gold Line */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-latin text-xs sm:text-[13px] text-[#C5A880] tracking-[0.25em] uppercase font-bold"
              dir="ltr"
            >
              AUTUMN / WINTER 2026
            </span>
            <div className="w-10 sm:w-14 h-[1.5px] bg-[#C5A880] rounded-full" />
          </div>

          {/* Main Campaign Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.2] drop-shadow-md">
            اصالت، وقار و سادگی
          </h1>

          {/* Dynamic Slide Subtitle */}
          <h2 className="text-lg sm:text-xl lg:text-2xl text-[#EAE0D5] font-semibold mt-2.5 drop-shadow-sm">
            {current.product.title}
          </h2>

          {/* Editorial Description */}
          <p className="text-sm sm:text-base text-[#A89B90] leading-relaxed max-w-lg mt-3.5 mb-7">
            ترکیب اصالت ایرانی و طراحی مدرن؛ برای زنانی که در هر موقعیتی، خاص هستند.
          </p>

          {/* Action CTAs: Solid Gold Pill + Glass Outline Pill */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] font-bold px-7 sm:px-8 py-3.5 rounded-full shadow-lg shadow-[#C5A880]/20 hover:shadow-[#C5A880]/35 transition-all duration-200 active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              <span>مشاهده کلکسیون</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenQuickView(current.product)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#C5A880] bg-white/5 hover:bg-white/10 text-white font-semibold px-6 sm:px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              <span>بررسی {current.product.category === 'set' ? 'ست وست و شلوار' : 'کت و بلیزر'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar Details: Floating Badge & Slide Pagination */}
        <div className="absolute bottom-5 inset-x-6 sm:inset-x-12 lg:inset-x-16 z-20 flex items-center justify-between pointer-events-none">
          
          {/* Bottom-Right Floating Glass Badge */}
          <div className="pointer-events-auto hidden min-[440px]:inline-flex items-center gap-2 bg-[#1A1613]/85 backdrop-blur-md border border-white/15 text-[#EAE0D5] text-xs font-semibold px-4 py-2 rounded-full shadow-md">
            <Feather className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>طراحی و دوخت اختصاصی</span>
          </div>

          {/* Bottom-Left Slide Pagination */}
          <div className="pointer-events-auto flex items-center gap-3.5 bg-[#14100E]/70 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === safeIndex
                      ? 'w-6 h-2 bg-[#C5A880]'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <span
              className="font-latin text-xs font-bold text-[#C5A880] tracking-wider border-r border-white/15 pr-3 mr-1"
              dir="ltr"
            >
              0{safeIndex + 1} / 0{slides.length}
            </span>
          </div>

        </div>

        {/* Circular Edge Navigation Chevrons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(1)}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-lg"
              aria-label="اسلاید قبلی"
              title="قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => go(-1)}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-lg"
              aria-label="اسلاید بعدی"
              title="بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )}

      </div>
    </section>
  );
};
