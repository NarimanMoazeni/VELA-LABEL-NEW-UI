import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Feather } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, toPersianDigits } from '../data/products';

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

  // 3 Wide Panoramic Hero Slides (matching Reference 1 media_1790347087207.png)
  const slides = [
    {
      product: pool[0] || PRODUCTS[0],
      image: '/products/hero-slide-1.webp',
      title: pool[0]?.title || 'ست وست و شلوار شکلاتی ولا',
      categoryType: 'set',
    },
    {
      product: pool[1] || PRODUCTS[1],
      image: '/products/hero-slide-2.webp',
      title: pool[1]?.title || 'کت تک کلاسیک مشکی آدل',
      categoryType: 'blazer',
    },
    {
      product: pool[2] || PRODUCTS[2],
      image: '/products/hero-slide-3.webp',
      title: pool[2]?.title || 'کت تک مزونی مشکی لورن',
      categoryType: 'blazer',
    },
  ];

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const go = useCallback(
    (d: 1 | -1) => {
      if (slides.length < 2) return;
      setIndex((prev) => (prev + d + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === index || slides.length < 2) return;
      setIndex(i);
    },
    [index, slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      go(1);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, isHovered, go]);

  // Touch swipe support for mobile
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

  const current = slides[index] || slides[0];

  return (
    <section
      className="w-full relative overflow-hidden select-none bg-[#120E0C] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center border-b border-[#2E251E] dark:border-white/10 border-stone-300"
      aria-label="کمپین پاییز و زمستان ولا لیبل"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 100% Full-Bleed Panoramic Slide Images */}
      <div className="absolute inset-0 pointer-events-none">
        {slides.map((s, idx) => {
          const isActive = idx === index;
          return (
            <div
              key={s.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image filling 100% of viewport width */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover object-[center_right] sm:object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Multi-stop Left Gradient to guarantee crystal-clear Persian text readability */}
              <div
                className="absolute inset-0 hidden sm:block pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, rgba(18, 14, 12, 0.95) 0%, rgba(18, 14, 12, 0.90) 32%, rgba(18, 14, 12, 0.65) 50%, rgba(18, 14, 12, 0.15) 68%, transparent 100%)',
                }}
              />

              {/* Mobile Gradient (vertical blend so model is visible at top and text is dark at bottom) */}
              <div
                className="absolute inset-0 sm:hidden pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(18, 14, 12, 0.97) 0%, rgba(18, 14, 12, 0.88) 52%, rgba(18, 14, 12, 0.45) 75%, transparent 100%)',
                }}
              />

              {/* Subtle top edge vignette to integrate with header */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Persian Content Block (Positioned cleanly on the left-center side, exactly as Reference 1) */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 sm:px-14 lg:px-20 py-16 sm:py-20 flex flex-col justify-center items-start text-right">
        
        {/* Season Tag with Gold Line */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="font-latin text-xs sm:text-[13px] text-[#C5A880] tracking-[0.25em] uppercase font-bold"
            dir="ltr"
          >
            AUTUMN / WINTER 2026
          </span>
          <div className="w-10 sm:w-12 h-[1.5px] bg-[#C5A880] rounded-full" />
        </div>

        {/* Main Persian Campaign Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.2] drop-shadow-md">
          اصالت، وقار و سادگی
        </h1>

        {/* Dynamic Slide Subtitle */}
        <h2 className="text-lg sm:text-xl lg:text-2xl text-[#EAE0D5] font-semibold mt-2.5 drop-shadow-sm">
          {current.title}
        </h2>

        {/* Gold Separator Line */}
        <div className="w-10 h-[1.5px] bg-[#C5A880] my-3 rounded-full" />

        {/* Description */}
        <p className="text-sm sm:text-base text-[#A89B90] leading-relaxed max-w-md sm:max-w-lg mb-8">
          ترکیب اصالت ایرانی و طراحی مدرن؛<br className="hidden sm:inline" />
          برای زنانی که در هر موقعیتی، خاص هستند.
        </p>

        {/* Action CTAs: Solid Gold Pill + Glass Outline Pill (matching Reference 1) */}
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-[#C5A880] bg-black/25 hover:bg-white/10 text-white font-semibold px-6 sm:px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            <span>بررسی {current.categoryType === 'set' ? 'ست وست و شلوار' : 'کت و بلیزر'}</span>
          </button>
        </div>

        {/* Bottom-Left Pagination Indicator */}
        <div className="mt-8 sm:mt-10 flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === index
                    ? 'w-6 h-2 bg-[#C5A880]'
                    : 'w-2 h-2 bg-white/35 hover:bg-white/70'
                }`}
                aria-label={`اسلاید ${idx + 1}`}
              />
            ))}
          </div>

          {/* Numerical Counter */}
          <span
            className="font-latin text-xs font-bold text-[#C5A880] tracking-wider border-r border-white/20 pr-3 mr-1"
            dir="ltr"
          >
            0{index + 1} / 0{slides.length}
          </span>
        </div>

      </div>

      {/* Bottom-Right Floating Glass Badge (matching Reference 1) */}
      <div className="absolute bottom-6 right-6 sm:right-14 z-20 pointer-events-auto hidden min-[440px]:inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 text-[#EAE0D5] text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
        <Feather className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>طراحی و دوخت اختصاصی</span>
      </div>

      {/* Circular Edge Navigation Chevrons (at the far edges of the screen) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(1)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-lg"
            aria-label="اسلاید قبلی"
            title="قبلی"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => go(-1)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-lg"
            aria-label="اسلاید بعدی"
            title="بعدی"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </>
      )}

    </section>
  );
};
