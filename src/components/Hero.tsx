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

  // 3 Wide Panoramic Neutral-Architecture Hero Slides with Slide-Specific Focal Positioning
  const slides = [
    {
      product: pool[0] || PRODUCTS[0],
      image: '/products/hero-slide-1.webp',
      title: pool[0]?.title || 'ست وست و شلوار شکلاتی ولا',
      categoryType: 'set',
      slideClassName: 'hero-slide-img-0',
    },
    {
      product: pool[1] || PRODUCTS[1],
      image: '/products/hero-slide-2.webp',
      title: pool[1]?.title || 'کت تک کلاسیک مشکی آدل',
      categoryType: 'blazer',
      slideClassName: 'hero-slide-img-1',
    },
    {
      product: pool[2] || PRODUCTS[2],
      image: '/products/hero-slide-3.webp',
      title: pool[2]?.title || 'کت تک مزونی مشکی لورن',
      categoryType: 'blazer',
      slideClassName: 'hero-slide-img-2',
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
      className="w-full relative overflow-hidden select-none bg-[#F6F2EC] dark:bg-[#120E0C] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] h-[78vh] max-h-[820px] flex items-center border-b border-stone-300/80 dark:border-white/10 transition-colors duration-300"
      aria-label="کمپین پاییز و زمستان ولا لیبل"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 100% Full-Bleed Panoramic Slide Images with Slide-Specific Focal Positioning */}
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
              {/* Neutral Architectural Fashion Image with Slide-Specific Top/Model Anchoring */}
              <img
                src={s.image}
                alt={s.title}
                className={`w-full h-full object-cover ${s.slideClassName} transition-transform duration-[1400ms] ease-out scale-100`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Desktop Theme-Aware Left Gradient (Controlled & Subtle: Fades to 0% before reaching the model!) */}
              <div className="absolute inset-0 hidden sm:block pointer-events-none hero-gradient-desktop transition-opacity duration-300" />

              {/* Mobile Theme-Aware Vertical Gradient (Protects model at top, provides text contrast at bottom) */}
              <div className="absolute inset-0 sm:hidden pointer-events-none hero-gradient-mobile transition-opacity duration-300" />

              {/* Subtle Top Edge Vignette */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 dark:from-black/40 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Persian Editorial Content Block (Asymmetric, Left-Safe Area, Strictly Isolated from Model) */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex items-center" dir="rtl">
        <div className="w-full sm:max-w-[480px] lg:max-w-[500px] mr-auto flex flex-col items-start text-right">
          
          {/* Eyebrow: Season & Haute Couture Code */}
          <div className="flex items-center gap-3 mb-3.5">
            <span
              className="font-latin text-[10.5px] sm:text-[11.5px] text-[#7A5B36] dark:text-[#C5A880] tracking-[0.28em] uppercase font-semibold"
              dir="ltr"
            >
              AUTUMN / WINTER 2026
            </span>
            <div className="w-8 sm:w-10 h-[1.5px] bg-[#7A5B36]/60 dark:bg-[#C5A880]/70 rounded-full" />
          </div>

          {/* Main Persian Campaign Headline */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#181310] dark:text-white tracking-tight leading-[1.20] drop-shadow-xs">
            اصالت، وقار و سادگی
          </h1>

          {/* Dynamic Slide Subtitle */}
          <h2 className="text-base sm:text-lg lg:text-xl text-[#4A3D33] dark:text-[#DFD3C6] font-medium mt-2">
            {current.title}
          </h2>

          {/* Elegant Hairline Rule */}
          <div className="w-8 h-[1px] bg-[#7A5B36]/40 dark:bg-[#C5A880]/40 my-4 rounded-full" />

          {/* Compact 2-Line Poetic Description */}
          <p className="text-xs sm:text-[13.5px] text-[#55473D] dark:text-[#B0A396] leading-[1.8] max-w-[390px] mb-7 sm:mb-8">
            ترکیب اصالت ایرانی و طراحی مدرن؛<br className="hidden sm:inline" />
            برای زنانی که در هر موقعیتی، خاص هستند.
          </p>

          {/* Editorial Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Primary Action Button */}
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#181310] hover:bg-[#2C231E] dark:bg-[#C5A880] dark:hover:bg-[#D4B890] text-[#F8F5F0] dark:text-[#120E0C] font-semibold px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer text-xs sm:text-sm"
            >
              <span>مشاهده کلکسیون</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={() => onOpenQuickView(current.product)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#181310]/20 dark:border-white/25 hover:border-[#181310]/60 dark:hover:border-white/60 bg-white/40 dark:bg-black/25 hover:bg-white/70 dark:hover:bg-white/10 text-[#181310] dark:text-white font-medium px-5 sm:px-6 py-3 rounded-full backdrop-blur-xs transition-all duration-200 active:scale-95 cursor-pointer text-xs sm:text-sm"
            >
              <span>بررسی {current.categoryType === 'set' ? 'ست وست و شلوار' : 'کت و بلیزر'}</span>
            </button>
          </div>

          {/* Bottom Pagination Indicator (Dots + Counter) */}
          <div className="mt-8 flex items-center gap-3 bg-white/65 dark:bg-black/35 backdrop-blur-md border border-stone-300/80 dark:border-white/15 px-3 py-1.5 rounded-full shadow-2xs">
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === index
                      ? 'w-5 h-1.5 bg-[#7A5B36] dark:bg-[#C5A880]'
                      : 'w-1.5 h-1.5 bg-stone-400/50 dark:bg-white/30 hover:bg-stone-600 dark:hover:bg-white/60'
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>

            <span
              className="font-latin text-[10.5px] font-bold text-[#5A452D] dark:text-[#C5A880] tracking-wider border-r border-stone-300 dark:border-white/20 pr-2 mr-0.5"
              dir="ltr"
            >
              0{index + 1} / 0{slides.length}
            </span>
          </div>

        </div>
      </div>

      {/* Bottom-Right Floating Glass Badge */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 pointer-events-auto hidden min-[480px]:inline-flex items-center gap-2 bg-white/75 dark:bg-black/45 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#2A211B] dark:text-[#EAE0D5] text-xs font-medium px-4 py-2 rounded-full shadow-xs">
        <Feather className="w-3.5 h-3.5 text-[#7A5B36] dark:text-[#C5A880]" />
        <span>طراحی و دوخت اختصاصی</span>
      </div>

      {/* Circular Edge Navigation Chevrons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(1)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#181310] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-xs"
            aria-label="اسلاید قبلی"
            title="قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => go(-1)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-stone-300/80 dark:border-white/20 text-[#181310] dark:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 z-30 shadow-xs"
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
