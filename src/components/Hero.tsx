import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Feather } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

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

  // 3 Wide Panoramic Neutral-Architecture Hero Slides (Dark & Light Mode Compatible)
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
        go(1);
      } else {
        go(-1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = slides[index] || slides[0];

  return (
    <section
      className="w-full relative overflow-hidden select-none bg-[#F6F2EC] dark:bg-[#120E0C] min-h-[560px] sm:min-h-[630px] lg:min-h-[680px] flex items-center border-b border-stone-300/80 dark:border-white/10 transition-colors duration-300"
      aria-label="کمپین پاییز و زمستان ولا لیبل"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 100% Full-Bleed Panoramic Slide Images with Neutral Architectural Setting */}
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
              {/* Neutral Architectural Fashion Image */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover object-[center_right] sm:object-center transition-transform duration-[1400ms] ease-out scale-100"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Desktop Theme-Aware Left Gradient (Dark Espresso in Dark Mode / Warm Ivory in Light Mode) */}
              <div className="absolute inset-0 hidden sm:block pointer-events-none hero-gradient-desktop transition-opacity duration-300" />

              {/* Mobile Theme-Aware Vertical Gradient */}
              <div className="absolute inset-0 sm:hidden pointer-events-none hero-gradient-mobile transition-opacity duration-300" />

              {/* Subtle Top Edge Vignette */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/15 dark:from-black/45 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Persian Content Block (Positioned on the left-center side, matching Reference 1) */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 py-14 sm:py-20 flex flex-col justify-center items-end text-right" dir="rtl">
        <div className="w-full sm:max-w-[520px] lg:max-w-[560px] mr-auto flex flex-col items-start text-right">
          
          {/* Season Tag with Gold/Bronze Line */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-latin text-[11px] sm:text-xs text-[#8C6D46] dark:text-[#C5A880] tracking-[0.24em] uppercase font-bold"
              dir="ltr"
            >
              AUTUMN / WINTER 2026
            </span>
            <div className="w-9 sm:w-11 h-[1.5px] bg-[#8C6D46] dark:bg-[#C5A880] rounded-full" />
          </div>

          {/* Main Persian Campaign Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#1C1613] dark:text-white tracking-tight leading-[1.22]">
            اصالت، وقار و سادگی
          </h1>

          {/* Dynamic Slide Subtitle */}
          <h2 className="text-lg sm:text-xl lg:text-[22px] text-[#3A2E25] dark:text-[#EAE0D5] font-semibold mt-2.5">
            {current.title}
          </h2>

          {/* Accent Separator Line */}
          <div className="w-9 h-[1.5px] bg-[#8C6D46] dark:bg-[#C5A880] my-3.5 rounded-full" />

          {/* Description */}
          <p className="text-sm sm:text-[15px] text-[#5C4E43] dark:text-[#B5A89D] leading-relaxed max-w-md mb-7 sm:mb-8">
            ترکیب اصالت ایرانی و طراحی مدرن؛<br className="hidden sm:inline" />
            برای زنانی که در هر موقعیتی، خاص هستند.
          </p>

          {/* Action CTAs: Primary Gold Pill + Theme-Aware Secondary Glass Pill */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C5A880] hover:bg-[#D4B890] text-[#120E0C] font-bold px-7 sm:px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer text-sm sm:text-[15px]"
            >
              <span>مشاهده کلکسیون</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenQuickView(current.product)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#1C1613]/25 dark:border-white/30 hover:border-[#8C6D46] dark:hover:border-[#C5A880] bg-white/60 dark:bg-black/30 hover:bg-white/90 dark:hover:bg-white/10 text-[#1C1613] dark:text-white font-semibold px-6 sm:px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer text-sm sm:text-[15px]"
            >
              <span>بررسی {current.categoryType === 'set' ? 'ست وست و شلوار' : 'کت و بلیزر'}</span>
            </button>
          </div>

          {/* Bottom-Left Pagination Indicator (Dots + Counter matching Reference 1) */}
          <div className="mt-8 sm:mt-10 flex items-center gap-3 bg-white/70 dark:bg-black/40 backdrop-blur-md border border-stone-300/80 dark:border-white/15 px-3.5 py-1.5 rounded-full shadow-xs">
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === index
                      ? 'w-5 h-2 bg-[#8C6D46] dark:bg-[#C5A880]'
                      : 'w-2 h-2 bg-stone-400/60 dark:bg-white/35 hover:bg-stone-600 dark:hover:bg-white/70'
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>

            <span
              className="font-latin text-[11px] font-bold text-[#6E5638] dark:text-[#C5A880] tracking-wider border-r border-stone-300 dark:border-white/20 pr-2.5 mr-0.5"
              dir="ltr"
            >
              0{index + 1} / 0{slides.length}
            </span>
          </div>

        </div>
      </div>

      {/* Bottom-Right Floating Glass Badge (matching Reference 1) */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 pointer-events-auto hidden min-[480px]:inline-flex items-center gap-2 bg-white/75 dark:bg-black/45 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#2A211B] dark:text-[#EAE0D5] text-xs font-medium px-4 py-2 rounded-full shadow-md">
        <Feather className="w-3.5 h-3.5 text-[#8C6D46] dark:text-[#C5A880]" />
        <span>طراحی و دوخت اختصاصی</span>
      </div>

      {/* Circular Edge Navigation Chevrons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(1)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#1C1613] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-md"
            aria-label="اسلاید قبلی"
            title="قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => go(-1)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#1C1613] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-md"
            aria-label="اسلاید بعدی"
            title="بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </>
      )}

    </section>
  );
};
